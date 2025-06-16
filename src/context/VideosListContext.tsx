import {createContext, useContext, useState} from "react";
import type {Dispatch, FC, ReactNode, SetStateAction} from "react"
import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {LuLoader} from "react-icons/lu";
import {Text} from "@chakra-ui/react";
import {useAppContext} from "@context/AppContextProvider/AppContextProvider";
import type {VideoRecord} from "@shared/types/types";
import type {ListOptions, ListResult} from "pocketbase";

interface VideosProviderProps {
    pageSize: number
    options?: ListOptions
    children: ReactNode
}

interface VideosProviderType {
    data: ListResult<VideoRecord>
    page: number
    setPage: Dispatch<SetStateAction<number>>
    setOptions: Dispatch<SetStateAction<ListOptions>>
}

const VideosListContext = createContext({} as VideosProviderType);

export const VideosListProvider: FC<VideosProviderProps> = (
    {
        pageSize,
        options: opts,
        children,
    }
) => {
    const {pb} = useAppContext();
    const [page, setPage] = useState(1);
    const [options, setOptions] = useState(opts);
    const {isPending, isError, data, error} = useQuery({
        queryKey: ['videos', page, options],
        placeholderData: keepPreviousData,
        queryFn: async () => {
            return await pb.collection('videos').getList<VideoRecord>(page, pageSize, options);
        },
    });

    if (isPending) {
        return <LuLoader/>
    }

    if (isError) {
        return <Text>Error: {error.message}</Text>
    }

    return (
        <VideosListContext.Provider value={{data, page, setPage, setOptions}}>
            {children}
        </VideosListContext.Provider>
    )
}

export const useVideos = () => useContext(VideosListContext);
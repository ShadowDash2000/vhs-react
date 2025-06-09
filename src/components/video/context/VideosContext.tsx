import {createContext, useContext, useState} from "react";
import type {Dispatch, FC, ReactNode, SetStateAction} from "react"
import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {LuLoader} from "react-icons/lu";
import {Text} from "@chakra-ui/react";
import {useAppContext} from "@context/AppContextProvider/AppContextProvider";
import type {VideoRecord} from "@shared/types/types";
import type {ListResult} from "pocketbase";

interface VideosProviderProps {
    pageSize: number
    children: ReactNode
}

interface VideosProviderType {
    data: ListResult<VideoRecord>
    page: number
    setPage: Dispatch<SetStateAction<number>>
}

const VideosContext = createContext({} as VideosProviderType);

export const VideosProvider: FC<VideosProviderProps> = ({pageSize, children}) => {
    const {pb} = useAppContext();
    const [page, setPage] = useState(1);
    const {isPending, isError, data, error} = useQuery({
        queryKey: ['videos', page],
        placeholderData: keepPreviousData,
        queryFn: async () => {
            return await pb.collection('videos').getList<VideoRecord>(page, pageSize, {
                sort: '-created',
            });
        },
    });

    if (isPending) {
        return <LuLoader/>
    }

    if (isError) {
        return <Text>Error: {error.message}</Text>
    }

    return (
        <VideosContext.Provider value={{data, page, setPage}}>
            {children}
        </VideosContext.Provider>
    )
}

export const useVideos = () => useContext(VideosContext);
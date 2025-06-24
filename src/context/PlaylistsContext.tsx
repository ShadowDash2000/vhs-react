import {createContext, useContext, useState} from "react";
import type {Dispatch, FC, ReactNode, SetStateAction} from "react"
import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {LuLoader} from "react-icons/lu";
import {Text} from "@chakra-ui/react";
import {useAppContext} from "@context/AppContextProvider/AppContextProvider";
import type {PlaylistRecord} from "@shared/types/types";
import type {ListOptions, ListResult} from "pocketbase";

interface PlaylistsProviderProps {
    pageSize: number
    page?: number
    options?: ListOptions
    children: ReactNode
}

interface PlaylistsProviderType {
    data: ListResult<PlaylistRecord>
    setOptions: Dispatch<SetStateAction<ListOptions>>
}

const PlaylistsContext = createContext({} as PlaylistsProviderType);

export const PlaylistsProvider: FC<PlaylistsProviderProps> = (
    {
        pageSize,
        page = 1,
        options: opts,
        children,
    }
) => {
    const {pb} = useAppContext();
    const [options, setOptions] = useState(opts);
    const {isPending, isError, data, error} = useQuery({
        queryKey: ['playlists', page, options],
        placeholderData: keepPreviousData,
        queryFn: async () => {
            return await pb.collection('playlists').getList<PlaylistRecord>(page, pageSize, options);
        },
    });

    if (isPending) {
        return <LuLoader/>
    }

    if (isError) {
        return <Text>Error: {error.message}</Text>
    }

    return (
        <PlaylistsContext.Provider value={{data, setOptions}}>
            {children}
        </PlaylistsContext.Provider>
    )
}

export const usePlaylists = () => useContext(PlaylistsContext);
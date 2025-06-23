import {createContext, useContext} from "react";
import type {ReactNode} from "react";
import {keepPreviousData, useInfiniteQuery} from "@tanstack/react-query";
import type {
    QueryFunctionContext,
    InfiniteData,
    InfiniteQueryObserverResult,
    FetchNextPageOptions
} from "@tanstack/react-query";
import {LuLoader} from "react-icons/lu";
import {Text} from "@chakra-ui/react";
import {useAppContext} from "@context/AppContextProvider/AppContextProvider";
import {type PlaylistRecord} from "@shared/types/types";
import type {ListResult} from "pocketbase";
import {Sort, useSort} from "@shared/hook/useSort";

interface PlaylistsProviderProps {
    pageSize: number
    initialSort?: Map<string, Sort>
    children: ReactNode
}

interface PlaylistsInfiniteProviderType {
    data: InfiniteData<ListResult<PlaylistRecord>>
    fetchNextPage: (options?: FetchNextPageOptions | undefined) => Promise<InfiniteQueryObserverResult<InfiniteData<ListResult<PlaylistRecord>, unknown>, Error>>,
    isFetching: boolean
    hasNextPage: boolean
    sortSet: (key: string, value: Sort) => void
    sortIs: (key: string, value: Sort) => boolean
    sortToggle(key: string): void
}

const PlaylistsInfiniteContext = createContext({} as PlaylistsInfiniteProviderType);

export const PlaylistsInfiniteProvider = ({pageSize, children, initialSort}: PlaylistsProviderProps) => {
    const {pb} = useAppContext();
    const {sortSet, sortIs, sortBuild, sortToggle} = useSort({initial: initialSort});
    const fetchPlaylists = async ({pageParam}: QueryFunctionContext<string[], number>) => {
        return await pb.collection('playlists').getList<PlaylistRecord>(pageParam, pageSize, {
            sort: sortBuild,
        });
    }
    const {
        fetchNextPage,
        isPending,
        isError,
        isFetching,
        hasNextPage,
        data,
        error,
    } = useInfiniteQuery({
        queryKey: ['playlists_infinite', sortBuild],
        placeholderData: keepPreviousData,
        queryFn: fetchPlaylists,
        initialPageParam: 1,
        getNextPageParam: (lastPage, _allPages, lastPageParam) => {
            if (lastPage.page === lastPage.totalPages) return null;
            return ++lastPageParam;
        },
    });

    if (isPending) {
        return <LuLoader/>
    }

    if (isError) {
        return <Text>Error: {error.message}</Text>
    }

    return (
        <PlaylistsInfiniteContext.Provider value={{
            data,
            isFetching,
            hasNextPage,
            fetchNextPage,
            sortSet,
            sortIs,
            sortToggle,
        }}>
            {children}
        </PlaylistsInfiniteContext.Provider>
    )
}

export const useInfinitePlaylists = () => useContext(PlaylistsInfiniteContext);
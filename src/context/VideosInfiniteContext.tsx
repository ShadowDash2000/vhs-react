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
import {type VideoRecord} from "@shared/types/types";
import type {ListResult} from "pocketbase";
import {Sort, useSort} from "@shared/sort";

interface VideosProviderProps {
    pageSize: number
    initialSort?: Map<string, Sort>
    children: ReactNode
}

interface VideosInfiniteProviderType {
    data: InfiniteData<ListResult<VideoRecord>>
    fetchNextPage: (options?: FetchNextPageOptions | undefined) => Promise<InfiniteQueryObserverResult<InfiniteData<ListResult<VideoRecord>, unknown>, Error>>,
    isFetching: boolean
    hasNextPage: boolean
    sortSet: (key: string, value: Sort) => void
    sortBuild: string
    sortIs: (key: string, value: Sort) => boolean
    sortToggle(key: string): void
}

const VideosInfiniteContext = createContext({} as VideosInfiniteProviderType);

export const VideosInfiniteProvider = ({pageSize, children, initialSort}: VideosProviderProps) => {
    const {pb} = useAppContext();
    const {sortSet, sortIs, sortBuild, sortToggle} = useSort({initial: initialSort});
    const fetchVideos = async ({pageParam}: QueryFunctionContext<string[], number>) => {
        return await pb.collection('videos').getList<VideoRecord>(pageParam, pageSize, {
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
        queryKey: ['videos_infinite', sortBuild],
        placeholderData: keepPreviousData,
        queryFn: fetchVideos,
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
        <VideosInfiniteContext.Provider value={{
            data,
            isFetching,
            hasNextPage,
            fetchNextPage,
            sortSet,
            sortBuild,
            sortIs,
            sortToggle,
        }}>
            {children}
        </VideosInfiniteContext.Provider>
    )
}

export const useInfiniteVideos = () => useContext(VideosInfiniteContext);
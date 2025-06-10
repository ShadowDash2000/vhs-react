import {createContext, useContext} from "react";
import type {FC, ReactNode} from "react"
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
import type {VideoRecord} from "@shared/types/types";
import type {ListResult} from "pocketbase";

interface VideosProviderProps {
    pageSize: number
    children: ReactNode
}

interface VideosInfiniteProviderType {
    data: InfiniteData<ListResult<VideoRecord>>
    fetchNextPage: (options?: FetchNextPageOptions | undefined) => Promise<InfiniteQueryObserverResult<InfiniteData<ListResult<VideoRecord>, unknown>, Error>>,
    isFetching: boolean
    hasNextPage: boolean
}

const VideosInfiniteContext = createContext({} as VideosInfiniteProviderType);

export const VideosInfiniteProvider: FC<VideosProviderProps> = ({pageSize, children}) => {
    const {pb} = useAppContext();
    const fetchVideos = async ({pageParam}: QueryFunctionContext<string[], number>) => {
        return await pb.collection('videos').getList<VideoRecord>(pageParam, pageSize, {
            sort: '-created',
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
        queryKey: ['videos_infinite'],
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
        }}>
            {children}
        </VideosInfiniteContext.Provider>
    )
}

export const useInfiniteVideos = () => useContext(VideosInfiniteContext);
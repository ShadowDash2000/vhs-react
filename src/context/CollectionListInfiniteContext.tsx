import type {Context,Dispatch, ReactNode, SetStateAction} from "react";
import {createContext, useContext, useState} from "react";
import type {
    FetchNextPageOptions,
    InfiniteData,
    InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import {keepPreviousData, useInfiniteQuery} from "@tanstack/react-query";
import {LuLoader} from "react-icons/lu";
import {Text} from "@chakra-ui/react";
import type {ListOptions, ListResult, RecordModel, RecordService} from "pocketbase";
import {Sort, useSort} from "@shared/hook/useSort";
import type {ClientResponseError} from "pocketbase";
import NotFound from "../components/pages/404";

interface CollectionListInfiniteProviderProps<T extends RecordModel> {
    collection: RecordService<T>
    pageSize: number
    options?: Omit<ListOptions, 'sort'>
    initialSort?: Map<string, Sort>
    children: ReactNode
}

interface CollectionListInfiniteProviderType<T extends RecordModel> {
    data: InfiniteData<ListResult<T>>
    isFetching: boolean
    hasNextPage: boolean
    fetchNextPage: (options?: FetchNextPageOptions | undefined) => Promise<InfiniteQueryObserverResult<InfiniteData<ListResult<T>, unknown>, Error>>,
    setOptions: Dispatch<SetStateAction<ListOptions>>
    sortSet: (key: string, value: Sort) => void
    sortIs: (key: string, value: Sort) => boolean
    sortToggle(key: string): void
}

export const CollectionListInfiniteContext = createContext({} as CollectionListInfiniteProviderType<RecordModel>);

export const CollectionListInfiniteProvider = <T extends RecordModel>(
    {
        collection,
        pageSize,
        options: opts,
        initialSort,
        children,
    }: CollectionListInfiniteProviderProps<T>
) => {
    const {sortSet, sortIs, sortBuild, sortToggle} = useSort({initial: initialSort});
    const [options, setOptions] = useState(opts);
    const {
        fetchNextPage,
        isPending,
        isError,
        isFetching,
        hasNextPage,
        data,
        error,
    } = useInfiniteQuery({
        queryKey: [collection.collectionIdOrName, options, sortBuild],
        placeholderData: keepPreviousData,
        queryFn: async ({pageParam}) => {
            return await collection.getList<T>(pageParam, pageSize, {
                sort: sortBuild,
                ...options
            });
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage, _allPages, lastPageParam) => {
            if (lastPage.page === lastPage.totalPages) return null;
            return ++lastPageParam;
        },
        retry: (failureCount, e: any) => {
            const error = e as ClientResponseError;
            if (error.status === 404) return false;
            return failureCount < 10;
        },
    });

    if (isPending) {
        return <LuLoader/>
    }

    if (isError) {
        const e = error as ClientResponseError;
        if (e.status === 404) return <NotFound/>;

        return <Text>Error: {error.message}</Text>
    }

    return <CollectionListInfiniteContext.Provider value={{
        data,
        isFetching,
        hasNextPage,
        fetchNextPage,
        setOptions,
        sortSet,
        sortIs,
        sortToggle,
    }}>
        {children}
    </CollectionListInfiniteContext.Provider>
}

export const useCollectionListInfinite = <T extends RecordModel>() => useContext<CollectionListInfiniteProviderType<T>>((CollectionListInfiniteContext as unknown) as Context<CollectionListInfiniteProviderType<T>>);
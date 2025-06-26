import type {Context, Dispatch, ReactNode, SetStateAction,} from "react";
import {useContext, useState, createContext} from "react";
import {useQuery} from "@tanstack/react-query";
import {LuLoader} from "react-icons/lu";
import {Text} from "@chakra-ui/react";
import type {ListOptions, ListResult, RecordModel, RecordService, ClientResponseError} from "pocketbase";
import type {PlaylistRecord} from "@shared/types/types";
import NotFound from "../components/pages/404";

interface CollectionListProviderProps<T extends RecordModel> {
    collection: RecordService<T>
    page?: number
    pageSize: number
    options?: ListOptions
    children: ReactNode
}

interface CollectionListProviderType<T extends RecordModel> {
    data: ListResult<T>
    setOptions: Dispatch<SetStateAction<ListOptions>>
}

export const CollectionListContext = createContext({} as CollectionListProviderType<RecordModel>);

export const CollectionListProvider = <T extends RecordModel>(
    {
        collection,
        page = 1,
        pageSize,
        options: opts,
        children,
    }: CollectionListProviderProps<T>
) => {
    const [options, setOptions] = useState(opts);
    const {isPending, isError, data, error} = useQuery({
        queryKey: [collection.collectionIdOrName, page, options],
        queryFn: async () => await collection.getList<PlaylistRecord>(page, pageSize, options),
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

    return <CollectionListContext.Provider value={{
        data,
        setOptions,
    }}>
        {children}
    </CollectionListContext.Provider>
}

export const useCollectionList = <T extends RecordModel>() => useContext<CollectionListProviderType<T>>((CollectionListContext as unknown) as Context<CollectionListProviderType<T>>);
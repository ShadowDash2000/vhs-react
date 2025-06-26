import {type Context, createContext, type ReactNode, useContext} from "react";
import {useQuery} from "@tanstack/react-query";
import {LuLoader} from "react-icons/lu";
import {Text} from "@chakra-ui/react";
import type {ClientResponseError, RecordModel, RecordService} from "pocketbase";
import NotFound from "../components/pages/404";

interface CollectionOneProviderProps<T extends RecordModel> {
    collection: RecordService<T>
    recordId: string
    children: ReactNode
}

interface CollectionOneProviderType<T extends RecordModel> {
    data: T
}

export const CollectionOneContext = createContext({} as CollectionOneProviderType<RecordModel>);

export const CollectionOneProvider = <T extends RecordModel>(
    {
        collection,
        recordId,
        children,
    }: CollectionOneProviderProps<T>
) => {
    const {isPending, isError, data, error} = useQuery({
        queryKey: [collection.collectionIdOrName, recordId],
        queryFn: async () => await collection.getOne<T>(recordId),
        retry: (failureCount, e: any) => {
            const error = e as ClientResponseError;
            if (error.status === 404) return false;
            return failureCount < 10;
        }
    });

    if (isPending) {
        return <LuLoader/>
    }

    if (isError) {
        const e = error as ClientResponseError;
        if (e.status === 404) return <NotFound/>;

        return <Text>Error: {error.message}</Text>
    }


    return <CollectionOneContext.Provider value={{data}}>
        {children}
    </CollectionOneContext.Provider>
}

export const useCollectionOne = <T extends RecordModel>() => useContext<CollectionOneProviderType<T>>((CollectionOneContext as unknown) as Context<CollectionOneProviderType<T>>);
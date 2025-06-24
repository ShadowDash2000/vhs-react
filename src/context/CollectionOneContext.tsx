import {type Context, createContext, type ReactNode, useContext} from "react";
import {useQuery} from "@tanstack/react-query";
import {LuLoader} from "react-icons/lu";
import {Text} from "@chakra-ui/react";
import type {RecordModel, RecordService} from "pocketbase";

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
        queryFn: async () => await collection.getOne<T>(recordId)
    });

    if (isPending) {
        return <LuLoader/>
    }

    if (isError) {
        return <Text>Error: {error.message}</Text>
    }

    return <CollectionOneContext.Provider value={{data}}>
        {children}
    </CollectionOneContext.Provider>
}

export const useCollectionOne = <T extends RecordModel>() => useContext<CollectionOneProviderType<T>>((CollectionOneContext as unknown) as Context<CollectionOneProviderType<T>>);
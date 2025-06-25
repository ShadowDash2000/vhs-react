import type {Context, Dispatch, ReactNode, SetStateAction,} from "react";
import {useContext, useState, createContext} from "react";
import {useQuery} from "@tanstack/react-query";
import {LuLoader} from "react-icons/lu";
import {Text} from "@chakra-ui/react";
import type {ListOptions, RecordModel, RecordService} from "pocketbase";
import type {PlaylistRecord} from "@shared/types/types";

interface CollectionListAllProviderProps<T extends RecordModel> {
    collection: RecordService<T>
    options?: ListOptions
    children: ReactNode
}

interface CollectionListAllProviderType<T extends RecordModel> {
    data: T[]
    setOptions: Dispatch<SetStateAction<ListOptions>>
}

export const CollectionListAllContext = createContext({} as CollectionListAllProviderType<RecordModel>);

export const CollectionListAllProvider = <T extends RecordModel>(
    {
        collection,
        options: opts,
        children,
    }: CollectionListAllProviderProps<T>
) => {
    const [options, setOptions] = useState(opts);
    const {isPending, isError, data, error} = useQuery({
        queryKey: [collection.collectionIdOrName, options],
        queryFn: async () => await collection.getFullList<PlaylistRecord>(options)
    });

    if (isPending) {
        return <LuLoader/>
    }

    if (isError) {
        return <Text>Error: {error.message}</Text>
    }

    return <CollectionListAllContext.Provider value={{
        data,
        setOptions,
    }}>
        {children}
    </CollectionListAllContext.Provider>
}

export const useCollectionListAll = <T extends RecordModel>() => useContext<CollectionListAllProviderType<T>>((CollectionListAllContext as unknown) as Context<CollectionListAllProviderType<T>>);
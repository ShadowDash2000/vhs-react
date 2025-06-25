import type {SearchCollectionType} from "@ui/search/search";
import {createListCollection} from "@chakra-ui/react";
import type {ListResult, RecordModel} from "pocketbase";

type CollectionType = {
    name: string
    id: string
}

export const createCollection = <T extends CollectionType>(listResult: ListResult<T>) => {
    const items: Array<SearchCollectionType> = listResult.items.map(item => ({
        label: item.name,
        value: item.id
    }));
    return createListCollection<SearchCollectionType>({items});
}

export const createRecordCollection = <T extends RecordModel>(list: T[]) => {
    const items: Array<SearchCollectionType> = list.map(item => ({
        label: item.name,
        value: item.id
    }));
    return createListCollection<SearchCollectionType>({items});
}
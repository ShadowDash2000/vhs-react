import type {SearchCollectionType} from "@ui/search/search";
import {createListCollection} from "@chakra-ui/react";
import type {ListResult} from "pocketbase";

type CollectionType = {
    name: string
    id: string
}

export const createCollection = <T extends  CollectionType>(videos: ListResult<T>) => {
    let items: Array<SearchCollectionType> = [];
    for (const video of videos.items) {
        items.push({
            label: video.name,
            value: video.id,
        });
    }
    return createListCollection<SearchCollectionType>({items});
}
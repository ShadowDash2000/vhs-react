import PocketBase from "pocketbase";
import type {AuthRecord, RecordModel, RecordService} from "pocketbase";
import {createListCollection, type ListCollection} from "@chakra-ui/react";

export interface TypedPocketBase extends PocketBase {
    collection(idOrName: string): RecordService
    collection(idOrName: 'users'): RecordService<UserRecord>
}

export type IsoDateString = string
export type RecordIdString = string

export type UserRecord = {
    name: string
    avatar?: string
    created: string
    updated: string
} & AuthRecord

export const enum VideosStatusOptions {
    PUBLIC = "public",
    LINK = "link",
    CLOSED = "closed",
}

export type VideoStatusOptionsCollectionType = {
    label: string
    value: VideosStatusOptions
}

export const VideoStatusOptionsCollection: ListCollection<VideoStatusOptionsCollectionType> = createListCollection({
    items: [
        {label: 'Для всех', value: VideosStatusOptions.PUBLIC},
        {label: 'Доступ по ссылке', value: VideosStatusOptions.LINK},
        {label: 'Ограниченный доступ', value: VideosStatusOptions.CLOSED},
    ],
});

export type VideoRecord = {
    created: IsoDateString
    id: string
    name: string
    description: string
    preview: string
    status: VideosStatusOptions
    thumbnails: string[]
    updated: IsoDateString
    user: RecordIdString
    video: string
    webvtt: string
} & RecordModel
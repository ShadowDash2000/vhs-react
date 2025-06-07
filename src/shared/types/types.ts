import PocketBase, {type AuthRecord, RecordService} from "pocketbase";

export interface TypedPocketBase extends PocketBase{
    collection(idOrName: string): RecordService
    collection(idOrName: 'users'): RecordService<User>
}

export type IsoDateString = string
export type RecordIdString = string

export type User = {
    name: string
    avatar?: string
    created: string
    updated: string
} & AuthRecord

export enum VideosStatusOptions {
    "public" = "public",
    "link" = "link",
    "closed" = "closed",
}
export type VideosRecord = {
    created?: IsoDateString
    id: string
    name: string
    preview?: string
    status: VideosStatusOptions
    thumbnails?: string[]
    updated?: IsoDateString
    user: RecordIdString
    video?: string
    webvtt?: string
}
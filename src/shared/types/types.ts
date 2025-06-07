import PocketBase, {type AuthRecord, RecordService} from "pocketbase";

export type User = {
    name: string
    avatar?: string
    created: string
    updated: string
} & AuthRecord

export interface RecordModelUser extends PocketBase{
    collection(idOrName: string): RecordService
    collection(idOrName: 'users'): RecordService<User>
}
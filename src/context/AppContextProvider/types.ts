import PocketBase, {type RecordModel} from "pocketbase";
import type { ReactNode } from "react";

export type AppProviderType = {
    pb: PocketBase
    isAuth: boolean
    user: RecordModel | null
    setUser: (user: RecordModel | null) => void
}

export type AppContextProviderProps = {
    children: ReactNode
}

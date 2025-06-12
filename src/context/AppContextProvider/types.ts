import PocketBase from "pocketbase";
import type {Dispatch, ReactNode, SetStateAction} from "react";
import type {UserRecord} from "@shared/types/types";

export type AppProviderType = {
    pb: PocketBase
    isAuth: boolean
    user: UserRecord | null
    setUser: Dispatch<SetStateAction<UserRecord>>;
}

export type AppContextProviderProps = {
    children: ReactNode
}

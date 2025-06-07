import PocketBase from "pocketbase";
import type {Dispatch, ReactNode, SetStateAction} from "react";
import type {User} from "@shared/types/types";

export type AppProviderType = {
    pb: PocketBase
    isAuth: boolean
    user: User | null
    setUser: Dispatch<SetStateAction<User>>;
}

export type AppContextProviderProps = {
    children: ReactNode
}

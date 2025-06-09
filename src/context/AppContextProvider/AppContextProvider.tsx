import {useContext, createContext, useMemo, useEffect, useState} from "react";
import PocketBase from "pocketbase";
import type {AppProviderType, AppContextProviderProps} from "./types";
import type {UserRecord} from "@shared/types/types";

const AppContext = createContext<AppProviderType>({} as AppProviderType);

export const AppContextProvider = ({children}: AppContextProviderProps) => {
    const pb = useMemo(() => new PocketBase(import.meta.env.VITE_PB_URL), []);
    const [user, setUser] = useState({} as UserRecord);
    const [isAuth, setIsAuth] = useState<boolean>(pb.authStore.isValid);

    useEffect(() => {
        if (pb.authStore.isValid) {
            pb.collection('users').authRefresh();
            console.log(pb.authStore.record);

            setUser(pb.authStore.record as UserRecord);
        } else {
            pb.authStore.clear();
        }
    }, []);

    useEffect(() => {
        setIsAuth(pb.authStore.isValid);
    }, [user]);

    return (
        <AppContext.Provider value={{pb, user, setUser, isAuth}}>
            {children}
        </AppContext.Provider>
    );
}

export const useAppContext: () => AppProviderType = () => useContext(AppContext);
import {useContext, createContext, useMemo, useEffect, useState} from "react";
import PocketBase from "pocketbase";

const AppContext = createContext(null);

export const AppContextProvider = ({children}) => {
    const pb = useMemo(() => new PocketBase(import.meta.env.VITE_PB_URL), []);
    const [user, setUser] = useState(null);
    const [isAuth, setIsAuth] = useState(pb.authStore.isValid);

    useEffect(() => {
        if (pb.authStore.isValid) {
            pb.collection('users').authRefresh();
            setUser(pb.authStore.record);
        } else {
            pb.authStore.clear();
        }
    }, []);

    useEffect(() => {
        setIsAuth(pb.authStore.isValid);
    }, [user]);

    return <AppContext.Provider value={{pb, user, setUser, isAuth}}>
        {children}
    </AppContext.Provider>;
}

export const useAppContext = () => useContext(AppContext);
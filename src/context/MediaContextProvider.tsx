import {createContext, useContext, type ReactNode, type RefObject} from "react";
import type {MediaPlayerInstance} from "@vidstack/react";

export interface MediaContextProviderProps {
    ref: RefObject<MediaPlayerInstance | null>
    children: ReactNode
}

export interface MediaContextProviderType {
    ref: RefObject<MediaPlayerInstance | null>
}

const MediaContext = createContext<MediaContextProviderType>({} as MediaContextProviderType);

export const MediaContextProvider = ({ref, children}: MediaContextProviderProps) => {
    return (
        <MediaContext.Provider value={{ref}}>
            {children}
        </MediaContext.Provider>
    );
}

export const useMediaContext: () => MediaContextProviderType = () => useContext(MediaContext);
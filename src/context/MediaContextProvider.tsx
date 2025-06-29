import {createContext, useContext, type ReactNode, type RefObject} from "react";
import type {MediaPlayerInstance} from "@vidstack/react";

export interface MediaContextProviderProps {
    player: RefObject<MediaPlayerInstance | null>
    children: ReactNode
}

export interface MediaContextProviderType {
    player: RefObject<MediaPlayerInstance | null>
}

const MediaContext = createContext<MediaContextProviderType>({} as MediaContextProviderType);

export const MediaContextProvider = ({player, children}: MediaContextProviderProps) => {
    return (
        <MediaContext.Provider value={{player}}>
            {children}
        </MediaContext.Provider>
    );
}

export const useMediaContext: () => MediaContextProviderType = () => useContext(MediaContext);
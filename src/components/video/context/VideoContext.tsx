import {createContext, type FC, type ReactNode, useContext} from "react";
import {useQuery} from "@tanstack/react-query";
import {LuLoader} from "react-icons/lu";
import {Text} from "@chakra-ui/react";
import {useAppContext} from "@context/AppContextProvider/AppContextProvider";
import type {VideoRecord} from "@shared/types/types";


interface VideoProviderProps {
    children: ReactNode
    videoId: string
}

interface VideoProviderType {
    data: VideoRecord
}

const VideoContext = createContext({} as VideoProviderType);

export const VideoProvider: FC<VideoProviderProps> = ({children, videoId}) => {
    const {pb} = useAppContext();
    const {isPending, isError, data, error} = useQuery({
        queryKey: ['video', videoId],
        queryFn: async () => await pb.collection('videos').getOne<VideoRecord>(videoId)
    });

    if (isPending) {
        return <LuLoader/>
    }

    if (isError) {
        return <Text>Error: {error.message}</Text>
    }

    return <VideoContext.Provider value={{data}}>
        {children}
    </VideoContext.Provider>
}

export const useVideo = () => useContext(VideoContext);
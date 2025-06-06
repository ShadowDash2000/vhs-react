import {createContext, useContext} from "react";
import {useQuery} from "@tanstack/react-query";
import {LuLoader} from "react-icons/lu";
import {Text} from "@chakra-ui/react";
import {useAppContext} from "../../../context/AppContextProvider.jsx";

const VideoContext = createContext(null);

export const VideoProvider = ({children, videoId}) => {
    const {pb} = useAppContext();
    const {isPending, isError, data, error} = useQuery({
        queryKey: ['video', videoId],
        queryFn: async () => await pb.collection('videos').getOne(videoId)
    });

    if (isPending) {
        return <LuLoader/>
    }

    if (isError) {
        return <Text>Error: {error.message}</Text>
    }

    return <VideoContext.Provider value={data}>
        {children}
    </VideoContext.Provider>
}

export const useVideo = () => useContext(VideoContext);
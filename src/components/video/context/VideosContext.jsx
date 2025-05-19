import {createContext, useContext} from "react";
import {useQuery} from "@tanstack/react-query";
import {LuLoader} from "react-icons/lu";
import {Text} from "@chakra-ui/react";
import {useAppContext} from "../../../context/AppContextProvider.jsx";

const VideosContext = createContext(null);

export const VideosProvider = ({children}) => {
    const {pb} = useAppContext();
    const {isPending, isError, data, error} = useQuery({
        queryKey: ['videos'],
        queryFn: async () => {
            return await pb.collection('videos').getFullList();
        },
    });

    if (isPending) {
        return <LuLoader/>
    }

    if (isError) {
        return <Text>Error: {error.message}</Text>
    }

    return <VideosContext.Provider value={data}>
        {children}
    </VideosContext.Provider>
}

export const useVideos = () => useContext(VideosContext);
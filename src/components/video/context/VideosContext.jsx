import {createContext, useContext, useState} from "react";
import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {LuLoader} from "react-icons/lu";
import {Text} from "@chakra-ui/react";
import {useAppContext} from "../../../context/AppContextProvider.jsx";

const VideosContext = createContext(null);

export const VideosProvider = ({pageSize, children}) => {
    const {pb} = useAppContext();
    const [page, setPage] = useState(1);
    const {isPending, isError, data, error} = useQuery({
        queryKey: ['videos', page],
        placeholderData: keepPreviousData,
        queryFn: async () => {
            return await pb.collection('videos').getList(page, pageSize, {
                sort: '-created',
            });
        },
    });

    if (isPending) {
        return <LuLoader/>
    }

    if (isError) {
        return <Text>Error: {error.message}</Text>
    }

    return <VideosContext.Provider value={{data, page, setPage}}>
        {children}
    </VideosContext.Provider>
}

export const useVideos = () => useContext(VideosContext);
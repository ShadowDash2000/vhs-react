import {useAppContext} from "../context/AppContextProvider.jsx";
import {useSuspenseQuery} from "@tanstack/react-query";

const collectionName = 'videos';

export const useVideos = () => {
    const {pb} = useAppContext();

    return useSuspenseQuery({
        queryKey: ['videos'],
        queryFn: async () => {
            return await pb.collection(collectionName).getFullList();
        },
    });
}
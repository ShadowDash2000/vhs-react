import {useParams} from "react-router-dom";
import {Sort} from "@shared/hook/useSort";
import {VideoList} from "../video/VideoList";
import {VideosInfiniteProvider} from "@context/VideosInfiniteContext";
import {useAppContext} from "@context/AppContextProvider/AppContextProvider";
import {keepPreviousData, useQuery} from "@tanstack/react-query";
import type {PlaylistRecord} from "@shared/types/types";
import {LuLoader} from "react-icons/lu";
import {Text} from "@chakra-ui/react";

const Playlist = () => {
    const {playlistId} = useParams();

    if (!playlistId) return null;

    const {pb} = useAppContext();
    const {data: playlist, isPending, isError, error} = useQuery({
        queryKey: ['playlist', playlistId],
        placeholderData: keepPreviousData,
        queryFn: async () => {
            return await pb.collection('playlists').getOne<PlaylistRecord>(playlistId);
        }
    });

    if (isPending) {
        return <LuLoader/>
    }

    if (isError) {
        return <Text>Error: {error.message}</Text>
    }

    const filter = playlist.videos.map(video => `id="${video}"`).join("||");

    return (
        <VideosInfiniteProvider
            pageSize={24}
            initialSort={new Map([['created', Sort.DESC]])}
            options={{filter}}
        >
            <VideoList/>
        </VideosInfiniteProvider>
    )
}

export default Playlist;
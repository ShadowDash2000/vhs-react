import {useParams} from "react-router-dom";
import {Sort} from "@shared/hook/useSort";
import {VideoList} from "../video/VideoList";
import {useAppContext} from "@context/AppContextProvider/AppContextProvider";
import {keepPreviousData, useQuery} from "@tanstack/react-query";
import type {PlaylistRecord} from "@shared/types/types";
import {LuLoader} from "react-icons/lu";
import {Text} from "@chakra-ui/react";
import {CollectionListInfiniteProvider} from "@context/CollectionListInfiniteContext";

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

    let filter = playlist.videos.map(video => `id="${video}"`).join("||");

    if (!filter) filter = 'id=""';

    return (
        <CollectionListInfiniteProvider
            collection={pb.collection('videos')}
            pageSize={24}
            initialSort={new Map([['created', Sort.DESC]])}
            options={{filter}}
        >
            <VideoList playlist={playlist}/>
        </CollectionListInfiniteProvider>
    )
}

export default Playlist;
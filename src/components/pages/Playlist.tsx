import {useParams} from "react-router-dom";
import {Sort} from "@shared/hook/useSort";
import {VideoList} from "../video/VideoList";
import {useAppContext} from "@context/AppContextProvider/AppContextProvider";
import {keepPreviousData, useQuery} from "@tanstack/react-query";
import type {PlaylistRecord} from "@shared/types/types";
import {LuLoader} from "react-icons/lu";
import {Text} from "@chakra-ui/react";
import {CollectionListInfiniteProvider} from "@context/CollectionListInfiniteContext";
import {ClientResponseError} from "pocketbase";
import NotFound from "./404";

const Playlist = () => {
    const {playlistId} = useParams();
    if (!playlistId) return null;

    const {pb} = useAppContext();
    const {data: playlist, isPending, isError, error} = useQuery({
        queryKey: ['playlist', playlistId],
        placeholderData: keepPreviousData,
        queryFn: async () => {
            return await pb.collection('playlists').getOne<PlaylistRecord>(playlistId);
        },
        retry: (failureCount, e: any) => {
            const error = e as ClientResponseError;
            if (error.status === 404) return false;
            return failureCount < 10;
        }
    });

    if (isPending) {
        return <LuLoader/>
    }

    if (isError) {
        const e = error as ClientResponseError;
        if (e.status === 404) return <NotFound/>;

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
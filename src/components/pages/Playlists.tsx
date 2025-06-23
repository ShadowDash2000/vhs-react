import {PlaylistsInfiniteProvider} from "@context/PlaylistsInfiniteContext";
import {PlaylistsList} from "../playlists/PlaylistsList";
import {Sort} from "@shared/hook/useSort";

const Playlists = () => {
    return (
        <PlaylistsInfiniteProvider
            pageSize={24}
            initialSort={new Map([['created', Sort.DESC]])}
        >
            <PlaylistsList/>
        </PlaylistsInfiniteProvider>
    )
}

export default Playlists;
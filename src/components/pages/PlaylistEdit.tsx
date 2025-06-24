import {useParams} from "react-router-dom";
import {useAppContext} from "@context/AppContextProvider/AppContextProvider";
import {PlaylistEditDashboard} from "../dashboard/PlaylistEditDashboard";
import {CollectionOneProvider} from "@context/CollectionOneContext";
import {VideosListProvider} from "@context/VideosListContext";

const PlaylistEdit = () => {
    const {playlistId} = useParams();
    if (!playlistId) return null;

    const {pb} = useAppContext();

    return (
        <CollectionOneProvider
            collection={pb.collection('playlists')}
            recordId={playlistId}
        >
            <VideosListProvider pageSize={10}>
                <PlaylistEditDashboard/>
            </VideosListProvider>
        </CollectionOneProvider>
    )
}

export default PlaylistEdit;
import {useParams} from "react-router-dom";
import {useAppContext} from "@context/AppContextProvider/AppContextProvider";
import {PlaylistEditDashboard} from "../dashboard/PlaylistEditDashboard";
import {CollectionOneProvider} from "@context/CollectionOneContext";
import {CollectionListProvider} from "@context/CollectionListContext";

const PlaylistEdit = () => {
    const {playlistId} = useParams();
    if (!playlistId) return null;

    const {pb} = useAppContext();

    return (
        <CollectionOneProvider
            collection={pb.collection('playlists')}
            recordId={playlistId}
        >
            <CollectionListProvider
                collection={pb.collection('videos')}
                pageSize={10}
            >
                <PlaylistEditDashboard/>
            </CollectionListProvider>
        </CollectionOneProvider>
    )
}

export default PlaylistEdit;
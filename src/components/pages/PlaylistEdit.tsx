import {useParams} from "react-router-dom";
import {useAppContext} from "@context/AppContextProvider/AppContextProvider";
import {PlaylistEditDashboard} from "../dashboard/PlaylistEditDashboard";
import {CollectionOneProvider} from "@context/CollectionOneContext";
import {CollectionListAllProvider} from "@context/CollectionListAllContext";

const PlaylistEdit = () => {
    const {playlistId} = useParams();
    if (!playlistId) return null;

    const {pb} = useAppContext();

    return (
        <CollectionOneProvider
            collection={pb.collection('playlists')}
            recordId={playlistId}
        >
            <CollectionListAllProvider
                collection={pb.collection('videos')}
            >
                <PlaylistEditDashboard/>
            </CollectionListAllProvider>
        </CollectionOneProvider>
    )
}

export default PlaylistEdit;
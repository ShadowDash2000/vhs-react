import {useParams} from "react-router-dom";
import {VideoEditDashboard} from "../dashboard/VideoEditDashboard";
import { PlaylistsProvider } from "@context/PlaylistsContext";
import {useAppContext} from "@context/AppContextProvider/AppContextProvider";
import {CollectionOneProvider} from "@context/CollectionOneContext";

const VideoEdit = () => {
    const {videoId} = useParams();
    if (!videoId) return null;

    const {pb, user} = useAppContext();

    return (
        <CollectionOneProvider
            collection={pb.collection('videos')}
            recordId={videoId}
        >
            <PlaylistsProvider
                pageSize={10}
                options={{
                    filter: `user = "${user?.id}"`,
                }}
            >
                <VideoEditDashboard/>
            </PlaylistsProvider>
        </CollectionOneProvider>
    )
}

export default VideoEdit;
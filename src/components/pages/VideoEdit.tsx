import {useParams} from "react-router-dom";
import {VideoEditDashboard} from "../dashboard/VideoEditDashboard";
import {useAppContext} from "@context/AppContextProvider/AppContextProvider";
import {CollectionOneProvider} from "@context/CollectionOneContext";
import {CollectionListAllProvider} from "@context/CollectionListAllContext";

const VideoEdit = () => {
    const {videoId} = useParams();
    if (!videoId) return null;

    const {pb, user} = useAppContext();

    return (
        <CollectionOneProvider
            collection={pb.collection('videos')}
            recordId={videoId}
        >
            <CollectionListAllProvider
                collection={pb.collection('playlists')}
                options={{
                    filter: `user = "${user?.id}"`,
                }}
            >
                <VideoEditDashboard/>
            </CollectionListAllProvider>
        </CollectionOneProvider>
    )
}

export default VideoEdit;
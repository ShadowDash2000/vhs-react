import {useParams} from "react-router-dom";
import {VideoEditDashboard} from "../dashboard/VideoEditDashboard";
import {useAppContext} from "@context/AppContextProvider/AppContextProvider";
import {CollectionOneProvider} from "@context/CollectionOneContext";
import {CollectionListProvider} from "@context/CollectionListContext";

const VideoEdit = () => {
    const {videoId} = useParams();
    if (!videoId) return null;

    const {pb, user} = useAppContext();

    return (
        <CollectionOneProvider
            collection={pb.collection('videos')}
            recordId={videoId}
        >
            <CollectionListProvider
                collection={pb.collection('playlists')}
                pageSize={10}
                options={{
                    filter: `user = "${user?.id}"`,
                }}
            >
                <VideoEditDashboard/>
            </CollectionListProvider>
        </CollectionOneProvider>
    )
}

export default VideoEdit;
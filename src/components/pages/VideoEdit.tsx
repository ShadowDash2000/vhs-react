import {useParams} from "react-router-dom";
import {VideoProvider} from "@context/VideoContext";
import {VideoEditDashboard} from "../dashboard/VideoEditDashboard";
import { PlaylistsProvider } from "@context/PlaylistsContext";
import {useAppContext} from "@context/AppContextProvider/AppContextProvider";

const VideoEdit = () => {
    const {videoId} = useParams();
    const {user} = useAppContext();

    if (!videoId) return null;

    return (
        <VideoProvider videoId={videoId}>
            <PlaylistsProvider
                pageSize={10}
                options={{
                    filter: `user = "${user?.id}"`,
                }}
            >
                <VideoEditDashboard/>
            </PlaylistsProvider>
        </VideoProvider>
    )
}

export default VideoEdit;
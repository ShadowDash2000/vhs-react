import {useParams} from "react-router-dom";
import {VideoProvider} from "@context/VideoContext";
import {VideoEditDashboard} from "../dashboard/VideoEditDashboard";

const VideoEdit = () => {
    const {videoId} = useParams();

    if (!videoId) return null;

    return (
        <VideoProvider videoId={videoId}>
            <VideoEditDashboard/>
        </VideoProvider>
    )
}

export default VideoEdit;
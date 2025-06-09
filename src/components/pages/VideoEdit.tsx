import {useParams} from "react-router-dom";
import {VideoProvider} from "../video/context/VideoContext";
import {VideoEditDashboard} from "../dashboard/VideoEditDashboard";

const VideoEdit = () => {
    const {videoId} = useParams();
    return (
        <VideoProvider videoId={videoId}>
            <VideoEditDashboard/>
        </VideoProvider>
    )
}

export default VideoEdit;
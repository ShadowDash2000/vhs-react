import {useParams} from "react-router-dom";
import {VideoDetail} from "../video/VideoDetail";
import {VideoProvider} from "@context/VideoContext";

const Video = () => {
    const {videoId} = useParams();

    if (!videoId) return null;

    return (
        <VideoProvider videoId={videoId}>
            <VideoDetail/>
        </VideoProvider>
    )
}

export default Video;
import {useParams} from "react-router-dom";
import {VideoDetail} from "../video/VideoDetail";
import {VideoProvider} from "../video/context/VideoContext";

const Video = () => {
    const {videoId} = useParams();    
    return (
        <VideoProvider videoId={videoId}>
            <VideoDetail/>
        </VideoProvider>
    )
}

export default Video;
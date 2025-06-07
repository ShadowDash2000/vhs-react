import {useParams} from "react-router-dom";
import {VideoDetail} from "../video/VideoDetail.jsx";
import {VideoProvider} from "../video/context/VideoContext.jsx";

const Video = () => {
    const {videoId} = useParams();    
    return (
        <VideoProvider videoId={videoId}>
            <VideoDetail/>
        </VideoProvider>
    )
}

export default Video;
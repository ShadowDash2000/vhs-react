import {useLoaderData} from "react-router-dom";
import {VideoDetail} from "../video/VideoDetail.jsx";
import {VideoProvider} from "../video/context/VideoContext.jsx";

export const Video = () => {
    const {params} = useLoaderData();
    const videoId = params.videoId;

    return (
        <VideoProvider videoId={videoId}>
            <VideoDetail/>
        </VideoProvider>
    )
}
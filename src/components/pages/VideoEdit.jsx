import {useLoaderData} from "react-router-dom";
import {VideoProvider} from "../video/context/VideoContext.jsx";
import {VideoEditDashboard} from "../dashboard/VideoEditDashboard.jsx";

export const VideoEdit = () => {
    const {params} = useLoaderData();
    const videoId = params.videoId;

    return (
        <VideoProvider videoId={videoId}>
            <VideoEditDashboard/>
        </VideoProvider>
    )
}
import {VideoEditForm} from "./VideoEditForm.jsx";
import {useVideo} from "../video/context/VideoContext.jsx";
import {Box} from "@chakra-ui/react";

export const VideoEditDashboard = () => {
    const video = useVideo();

    return (
        <Box w="100dvw" md={{w: "50dvw"}}>
            <VideoEditForm videoId={video.id} video={video}/>
        </Box>
    )
}
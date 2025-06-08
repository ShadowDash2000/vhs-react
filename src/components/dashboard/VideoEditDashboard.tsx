import {VideoEditForm} from "./VideoEditForm";
import {useVideo} from "../video/context/VideoContext";
import {Box} from "@chakra-ui/react";

export const VideoEditDashboard = () => {
    const { data: video } = useVideo();

    return (
        <Box w="100dvw" md={{w: "50dvw"}}>
            <VideoEditForm videoId={video.id} video={video}/>
        </Box>
    )
}
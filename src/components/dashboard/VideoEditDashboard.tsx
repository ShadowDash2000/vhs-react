import {VideoEditForm} from "./VideoEditForm";
import {Box} from "@chakra-ui/react";
import type {VideoRecord} from "@shared/types/types";
import {useCollectionOne} from "@context/CollectionOneContext";

export const VideoEditDashboard = () => {
    const {data: video} = useCollectionOne<VideoRecord>();

    return (
        <Box w="100dvw" md={{w: "50dvw"}}>
            <VideoEditForm videoId={video.id} video={video}/>
        </Box>
    )
}
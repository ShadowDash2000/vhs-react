import {For, Grid} from "@chakra-ui/react";
import {VideoCard} from "./VideoCard.jsx";
import {useVideos} from "./context/VideosContext.jsx";

export const VideoList = () => {
    const {data: videos, page, setPage} = useVideos();

    return (
        <Grid templateColumns="repeat(4, 1fr)" gap={3}>
            <For each={videos.items}>
                {(item) => (
                    <VideoCard video={item} key={item.id}/>
                )}
            </For>
        </Grid>
    )
}
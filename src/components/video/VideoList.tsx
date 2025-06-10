import {For, Grid} from "@chakra-ui/react";
import {VideoCard} from "./VideoCard";
import {useInfiniteVideos} from "@context/VideosInfiniteContext";
import {useInView} from "react-intersection-observer";

export const VideoList = () => {
    const {
        data: videos,
        isFetching,
        hasNextPage,
        fetchNextPage,
    } = useInfiniteVideos();
    const {ref} = useInView({
        onChange: async (inView) => {
            if (inView && hasNextPage && !isFetching) {
                await fetchNextPage();
            }
        },
        trackVisibility: true,
        delay: 100,
    });

    return (
        <Grid templateColumns="repeat(4, 1fr)" gap={3}>
            <For each={videos.pages}>
                {list => (
                    list.items.map((video) => (
                        <VideoCard video={video} key={video.id}/>
                    ))
                )}
            </For>
            <div ref={ref}></div>
        </Grid>
    )
}
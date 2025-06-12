import {Flex, For, Grid, Text} from "@chakra-ui/react";
import {VideoCard} from "./VideoCard";
import {useInfiniteVideos} from "@context/VideosInfiniteContext";
import {useInView} from "react-intersection-observer";
import {LuArrowDown, LuArrowUp} from "react-icons/lu";
import {Sort} from "@shared/hook/useSort";

export const VideoList = () => {
    const {
        data: videos,
        isFetching,
        hasNextPage,
        fetchNextPage,
        sortIs,
        sortToggle,
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
        <Flex direction="column">
            <Flex justify="end">
                <Flex onClick={() => sortToggle('created')} pb={5} gap={1} align="center" cursor="pointer">
                    <Text userSelect="none">По дате</Text>
                    {sortIs('created', Sort.DESC) ? <LuArrowDown/> : <LuArrowUp/>}
                </Flex>
            </Flex>
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
        </Flex>
    )
}
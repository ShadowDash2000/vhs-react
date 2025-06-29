import {Flex, For, Grid, Text, Heading} from "@chakra-ui/react";
import {VideoCard} from "./VideoCard";
import {useInView} from "react-intersection-observer";
import {LuArrowDown, LuArrowUp} from "react-icons/lu";
import {Sort} from "@shared/hook/useSort";
import type {FC} from "react";
import {useCollectionListInfinite} from "@context/CollectionListInfiniteContext";
import type {PlaylistRecord, VideoRecord} from "@shared/types/types";

export type VideoListProps = {
    playlist?: PlaylistRecord
}

export const VideoList: FC<VideoListProps> = ({playlist}) => {
    const {
        data: videos,
        isFetching,
        hasNextPage,
        fetchNextPage,
        sortIs,
        sortToggle,
    } = useCollectionListInfinite<VideoRecord>();

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
        <Flex direction="column" width="100%">
            {playlist ?
                <Flex justify="space-between" pb={5}>
                    <Heading size="4xl">{playlist.name}</Heading>
                    <Flex onClick={() => sortToggle('created')} gap={1} align="center" cursor="pointer">
                        <Text userSelect="none">По дате</Text>
                        {sortIs('created', Sort.DESC) ? <LuArrowDown/> : <LuArrowUp/>}
                    </Flex>
                </Flex>
                :
                <Flex justify="end" pb={5}>
                    <Flex onClick={() => sortToggle('created')} gap={1} align="center" cursor="pointer">
                        <Text userSelect="none">По дате</Text>
                        {sortIs('created', Sort.DESC) ? <LuArrowDown/> : <LuArrowUp/>}
                    </Flex>
                </Flex>
            }
            <Grid
                templateColumns={["repeat(1, 1fr)", undefined, undefined, "repeat(4, 1fr)"]}
                gap={3}
                alignItems="start"
                justifyItems="center"
            >
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
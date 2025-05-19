import {Flex, For} from "@chakra-ui/react";
import {VideoCard} from "./VideoCard.jsx";
import {useVideos} from "./context/VideosContext.jsx";
import {VideoProvider} from "./context/VideoContext.jsx";

export const VideoList = () => {
    const videos = useVideos();

    return (
        <Flex gap={3}>
            <For each={videos}>
                {(item) => (
                    <VideoProvider video={item} key={item.id}>
                        <VideoCard/>
                    </VideoProvider>
                )}
            </For>
        </Flex>
    )
}
import {useVideos} from "../pocketbase/videos.js";
import {Flex, For} from "@chakra-ui/react";
import {Video} from "./Video.jsx";

export const Videos = () => {
    const {data: videos} = useVideos();

    return (
        <Flex gap={3}>
            <For each={videos}>
                {(item, index) => (
                    <Video key={index} video={item}/>
                )}
            </For>
        </Flex>
    )
}
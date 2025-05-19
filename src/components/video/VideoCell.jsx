import {Table, Image} from "@chakra-ui/react";
import {useVideo} from "./context/VideoContext.jsx";

export const VideoCell = () => {
    const video = useVideo();

    return (
        <>
            <Table.Cell>
                <Image maxW="50%" src={video.image}/>
            </Table.Cell>
            <Table.Cell>{video.name}</Table.Cell>
        </>
    )
}
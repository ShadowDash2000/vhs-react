import {Card, Image} from "@chakra-ui/react";
import {useVideo} from "./context/VideoContext.jsx";

export const VideoCard = () => {
    const video = useVideo();

    return (
        <Card.Root maxW="sm">
            <Image src={video.image}/>
            <Card.Body gap="2">
                <Card.Title>{video.name}</Card.Title>
            </Card.Body>
            <Card.Footer gap="2">
            </Card.Footer>
        </Card.Root>
    )
}
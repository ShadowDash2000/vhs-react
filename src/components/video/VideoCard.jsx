import {Card, Image} from "@chakra-ui/react";
import {useAppContext} from "../../context/AppContextProvider/AppContextProvider.tsx";

export const VideoCard = ({video}) => {
    const {pb} = useAppContext();

    return (
        <Card.Root maxW="sm" as="a" href={`/video/${video.id}`}>
            <Image src={pb.files.getURL(video, video.preview)}/>
            <Card.Body gap="2">
                <Card.Title>{video.name}</Card.Title>
            </Card.Body>
            <Card.Footer gap="2">
            </Card.Footer>
        </Card.Root>
    )
}
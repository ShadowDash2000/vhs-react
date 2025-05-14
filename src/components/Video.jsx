import {Card, Image} from "@chakra-ui/react";
import {useAppContext} from "../context/AppContextProvider.jsx";

export const Video = ({video}) => {
    const {pb} = useAppContext();
    const imageId = video?.preview || video.defaultPreview;
    const image = pb.files.getURL(video, imageId);

    return (
        <Card.Root maxW="sm">
            <Image src={image}/>
            <Card.Body gap="2">
                <Card.Title>{video.name}</Card.Title>
            </Card.Body>
            <Card.Footer gap="2">
            </Card.Footer>
        </Card.Root>
    )
}
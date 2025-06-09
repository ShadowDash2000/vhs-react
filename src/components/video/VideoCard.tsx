import {Card, Image} from "@chakra-ui/react";
import {Link} from "react-router-dom"
import {useAppContext} from "@context/AppContextProvider/AppContextProvider";
import type {VideoRecord} from "@shared/types/types";
import type {FC} from "react";

interface VideoCardProps {
    video: VideoRecord
}

export const VideoCard: FC<VideoCardProps> = ({video}) => {
    const {pb} = useAppContext();

    return (
        <Link to={`/video/${video.id}`}>
            <Card.Root maxW="sm">
                <Image src={pb.files.getURL(video, video.preview)}/>
                <Card.Body gap="2">
                    <Card.Title>{video.name}</Card.Title>
                </Card.Body>
                <Card.Footer gap="2">
                </Card.Footer>
            </Card.Root>
        </Link>

    )
}
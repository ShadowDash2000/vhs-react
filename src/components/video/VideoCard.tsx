import {Card, Image, Link as ChakraLink} from "@chakra-ui/react";
import {useAppContext} from "@context/AppContextProvider/AppContextProvider";
import type {VideoRecord} from "@shared/types/types";
import type {FC} from "react";
import {dateFormat} from "@shared/helpers/dateFormat";
import {Link} from "react-router-dom";
import {truncate} from "@shared/helpers/truncate";

interface VideoCardProps {
    video: VideoRecord
}

export const VideoCard: FC<VideoCardProps> = ({video}) => {
    const {pb} = useAppContext();
    const timeDateFormatted = dateFormat(video.created);
    const date = new Date(video.created);
    const dateFormatted = date.toLocaleDateString();

    return (
        <ChakraLink width="100%" asChild>
            <Link to={`/video/${video.id}`}>
                <Card.Root width="100%">
                    <Image
                        src={pb.files.getURL(video, video.preview, {thumb: '1280x0'})}
                        height="15rem"
                        loading="lazy"
                    />
                    <Card.Body gap="2">
                        <Card.Title
                            height="4rem"
                            overflow="hidden"
                            wordBreak="break-all"
                            title={video.name}
                        >
                            {truncate(video.name, 70)}
                        </Card.Title>
                        <Card.Description>
                            <time
                                dateTime={dateFormatted}
                                title={dateFormatted}
                            >
                                {timeDateFormatted}
                            </time>
                        </Card.Description>
                    </Card.Body>
                </Card.Root>
            </Link>
        </ChakraLink>

    )
}
import {Card, Image, Link as ChakraLink} from "@chakra-ui/react";
import {useAppContext} from "@context/AppContextProvider/AppContextProvider";
import type {PlaylistRecord} from "@shared/types/types";
import type {FC} from "react";
import {dateFormat} from "@shared/helpers/dateFormat";
import {Link} from "react-router-dom";
import {truncate} from "@shared/helpers/truncate";

interface PlaylistsCard {
    playlist: PlaylistRecord
}

export const PlaylistsCard: FC<PlaylistsCard> = ({playlist}) => {
    const {pb} = useAppContext();
    const timeDateFormatted = dateFormat(playlist.created);
    const date = new Date(playlist.created);
    const dateFormatted = date.toLocaleDateString();

    return (
        <ChakraLink width="100%" asChild>
            <Link to={`/playlists/${playlist.id}`}>
                <Card.Root width="100%">
                    <Image
                        src={pb.files.getURL(playlist, playlist.preview, {thumb: '1280x0'})}
                        height="15rem"
                        loading="lazy"
                    />
                    <Card.Body gap="2">
                        <Card.Title
                            height="4rem"
                            overflow="hidden"
                            wordBreak="break-all"
                            title={playlist.name}
                        >
                            {truncate(playlist.name, 70)}
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
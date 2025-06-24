import {Box} from "@chakra-ui/react";
import {PlaylistEditForm} from "./PlaylistEditForm";
import {useCollectionOne} from "@context/CollectionOneContext";
import type {PlaylistRecord} from "@shared/types/types";

export const PlaylistEditDashboard = () => {
    const {data: playlist} = useCollectionOne<PlaylistRecord>();

    return (
        <Box w="100dvw" md={{w: "50dvw"}}>
            <PlaylistEditForm playlist={playlist}/>
        </Box>
    )
}
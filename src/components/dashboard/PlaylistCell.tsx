import {Table, Image} from "@chakra-ui/react";
import {useAppContext} from "@context/AppContextProvider/AppContextProvider";
import type {FC} from "react";
import {type PlaylistRecord} from "@shared/types/types"
import {NavLink} from "react-router-dom";

interface PlaylistCellProps {
    playlist: PlaylistRecord
}

export const PlaylistCell: FC<PlaylistCellProps> = ({playlist}) => {
    const {pb} = useAppContext();
    const date = new Date(playlist.created);

    return (
        <>
            <Table.Cell width="20%">
                <NavLink to={`/dashboard/playlist/${playlist.id}`}>
                    <Image
                        width="100%"
                        height="12rem"
                        src={pb.files.getURL(playlist, playlist.preview, {thumb: '1280x0'})}
                        loading="lazy"
                    />
                </NavLink>
            </Table.Cell>
            <Table.Cell>
                {playlist.name}
            </Table.Cell>
            <Table.Cell textAlign="center">
                {date.toLocaleDateString()}
            </Table.Cell>
        </>
    )
}
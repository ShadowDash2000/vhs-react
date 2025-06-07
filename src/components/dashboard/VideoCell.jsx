import {Table, Image} from "@chakra-ui/react";
import {useAppContext} from "../../context/AppContextProvider.tsx";
import {NavLink} from "react-router-dom";

export const VideoCell = ({video}) => {
    const {pb} = useAppContext();
    const link = `/dashboard/video/${video.id}`;

    return (
        <>
            <Table.Cell width="20%">
                <NavLink to={link}>
                    <Image width="100%" src={pb.files.getURL(video, video.preview)}/>
                </NavLink>
            </Table.Cell>
            <Table.Cell>
                <NavLink to={link}>
                    {video.name}
                </NavLink>
            </Table.Cell>
        </>
    )
}
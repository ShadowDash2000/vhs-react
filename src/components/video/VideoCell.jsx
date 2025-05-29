import {Table, Image} from "@chakra-ui/react";
import {useAppContext} from "../../context/AppContextProvider.jsx";

export const VideoCell = ({video}) => {
    const {pb} = useAppContext();

    return (
        <>
            <Table.Cell width="20%">
                <Image width="100%" src={pb.files.getURL(video, video.preview)}/>
            </Table.Cell>
            <Table.Cell>{video.name}</Table.Cell>
        </>
    )
}
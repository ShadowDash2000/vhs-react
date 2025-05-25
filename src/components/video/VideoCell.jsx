import {Table, Image} from "@chakra-ui/react";
import {useAppContext} from "../../context/AppContextProvider.jsx";

export const VideoCell = ({video}) => {
    const {pb} = useAppContext();

    return (
        <>
            <Table.Cell>
                <Image maxW="50%" src={pb.files.getURL(video, video.image)}/>
            </Table.Cell>
            <Table.Cell>{video.name}</Table.Cell>
        </>
    )
}
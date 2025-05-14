import {Table, Image} from "@chakra-ui/react";
import {useAppContext} from "../../context/AppContextProvider.jsx";

export const Video = ({video}) => {
    const {pb} = useAppContext();
    const imageId = video?.preview || video.defaultPreview;
    const image = pb.files.getURL(video, imageId);

    return (
        <>
            <Table.Cell>
                <Image maxW="50%" src={image}/>
            </Table.Cell>
            <Table.Cell>{video.name}</Table.Cell>
        </>
    )
}
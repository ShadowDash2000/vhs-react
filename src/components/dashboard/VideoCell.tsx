import {Table, Image} from "@chakra-ui/react";
import {useAppContext} from "@context/AppContextProvider/AppContextProvider";
import type {FC} from "react";
import type {VideoRecord} from "@shared/types/types"

interface VideoCellProps {
    video: VideoRecord
}

export const VideoCell: FC<VideoCellProps> = ({video}) => {
    const {pb} = useAppContext();
    return (
        <>
            <Table.Cell width="20%">
                <Image width="100%" src={pb.files.getURL(video, video.preview)}/>
            </Table.Cell>
            <Table.Cell>
                {video.name}
            </Table.Cell>
        </>
    )
}
import {Table, Image} from "@chakra-ui/react";
import {useAppContext} from "@context/AppContextProvider/AppContextProvider";
import type {FC} from "react";
import {type VideoRecord, VideoStatusOptionsCollection} from "@shared/types/types"

interface VideoCellProps {
    video: VideoRecord
}

export const VideoCell: FC<VideoCellProps> = ({video}) => {
    const {pb} = useAppContext();
    const date = new Date(video.created);
    const status = VideoStatusOptionsCollection.find(video.status);

    return (
        <>
            <Table.Cell width="20%">
                <Image
                    width="100%"
                    height="12rem"
                    src={pb.files.getURL(video, video.preview, {thumb: '1280x0'})}
                    loading="lazy"
                />
            </Table.Cell>
            <Table.Cell>
                {video.name}
            </Table.Cell>
            <Table.Cell>
                {date.toLocaleDateString()}
            </Table.Cell>
            <Table.Cell>
                {status?.label}
            </Table.Cell>
        </>
    )
}
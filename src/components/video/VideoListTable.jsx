import {Table, For, Flex} from "@chakra-ui/react";
import {VideoCell} from "./VideoCell.jsx";
import {UploadModal} from "../dashboard/upload/UploadModal.jsx";
import {useVideos} from "./context/VideosContext.jsx";
import {VideoProvider} from "./context/VideoContext.jsx";

export const VideoListTable = () => {
    const videos = useVideos();

    return (
        <Flex direction="column">
            <UploadModal/>
            <Table.Root size="sm">
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeader></Table.ColumnHeader>
                        <Table.ColumnHeader>Название</Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <For each={videos}>
                        {(item) => (
                            <Table.Row key={item.id}>
                                <VideoProvider video={item}>
                                    <VideoCell/>
                                </VideoProvider>
                            </Table.Row>
                        )}
                    </For>
                </Table.Body>
            </Table.Root>
        </Flex>
    )
}
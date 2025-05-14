import {Table, For, Flex} from "@chakra-ui/react";
import {Video} from "./Video.jsx";
import {useVideos} from "../../pocketbase/videos.js";
import {UploadModal} from "./upload/UploadModal.jsx";

export const Videos = () => {
    const {data: videos} = useVideos();

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
                        {(item, index) => (
                            <Table.Row key={index}>
                                <Video video={item}/>
                            </Table.Row>
                        )}
                    </For>
                </Table.Body>
            </Table.Root>
        </Flex>
    )
}
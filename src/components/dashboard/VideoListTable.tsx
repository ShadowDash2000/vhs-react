import {Table, For, Flex} from "@chakra-ui/react";
import {VideoCell} from "./VideoCell";
import {VideoListTablePagination} from "./VideoListTablePagination";
import {useVideos} from "../video/context/VideosContext.jsx";
import {UploadModal} from "./UploadModal";

export const VideoListTable = () => {
    const {data: videos, setPage} = useVideos();
    return (
        <Flex direction="column">
            <UploadModal/>
            <Table.Root size="sm" striped showColumnBorder>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeader></Table.ColumnHeader>
                        <Table.ColumnHeader>Название</Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <For each={videos.items}>
                        {(item) => (
                            <Table.Row key={item.id}>
                                <VideoCell video={item}/>
                            </Table.Row>
                        )}
                    </For>
                </Table.Body>
            </Table.Root>
            <VideoListTablePagination
                count={videos.totalItems}
                pageSize={videos.perPage}
                page={videos.page}
                onChange={(i) => setPage(i)}
            />
        </Flex>
    )
}
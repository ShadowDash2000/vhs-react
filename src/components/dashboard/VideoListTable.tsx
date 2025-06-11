import {Table, For, Flex} from "@chakra-ui/react";
import {VideoCell} from "./VideoCell";
import {VideoListTablePagination} from "./VideoListTablePagination";
import {useVideos} from "@context/VideosListContext";
import {UploadModal} from "./UploadModal";
import {useNavigate} from "react-router-dom";

export const VideoListTable = () => {
    const {data: videos, setPage} = useVideos();
    const navigate = useNavigate();
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
                            <Table.Row
                                key={item.id}
                                cursor="pointer"
                                onClick={() => navigate(`/dashboard/video/${item.id}`)}
                            >
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
import {Table, For, Flex, Menu} from "@chakra-ui/react";
import {VideoCell} from "./VideoCell";
import {VideoListTablePagination} from "./VideoListTablePagination";
import {useVideos} from "@context/VideosListContext";
import {UploadModal} from "./UploadModal";
import {useNavigate} from "react-router-dom";
import {MenuBox} from "@ui/menu/menu";
import {PlaylistModal} from "./PlaylistModal";

export const VideoListTable = () => {
    const {data: videos, setPage} = useVideos();
    const navigate = useNavigate();
    return (
        <Flex direction="column">
            <Flex justify="flex-end">
                <MenuBox label="Создать" rootProps={{unmountOnExit: false}}>
                    <Menu.Item value="upload-video">
                        <UploadModal>
                            <span>Загрузить видео</span>
                        </UploadModal>
                    </Menu.Item>
                    <Menu.Item value="create-playlist">
                        <PlaylistModal title={"Создать плейлист"}>
                            <span>Создать плейлист</span>
                        </PlaylistModal>
                    </Menu.Item>
                </MenuBox>
            </Flex>
            <Table.Root size="sm" striped showColumnBorder>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeader></Table.ColumnHeader>
                        <Table.ColumnHeader>Название</Table.ColumnHeader>
                        <Table.ColumnHeader>Дата</Table.ColumnHeader>
                        <Table.ColumnHeader>Статус</Table.ColumnHeader>
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
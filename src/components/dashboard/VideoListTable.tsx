import {Table, For, Flex, Menu} from "@chakra-ui/react";
import {VideoCell} from "./VideoCell";
import {VideoListTablePagination} from "./VideoListTablePagination";
import {useVideos} from "@context/VideosListContext";
import {UploadModal} from "./UploadModal";
import {useNavigate} from "react-router-dom";
import {MenuBox} from "@ui/menu/menu";
import {PlaylistModal} from "./PlaylistModal";
import {RiPlayListAddLine} from "react-icons/ri";
import {LuCloudUpload} from "react-icons/lu";
import {PlaylistsProvider} from "@context/PlaylistsContext";
import {useAppContext} from "@context/AppContextProvider/AppContextProvider";

export const VideoListTable = () => {
    const {user} = useAppContext();
    const {data: videos, setPage} = useVideos();
    const navigate = useNavigate();

    return (
        <Flex direction="column">
            <Flex justify="flex-end">
                <MenuBox
                    label="Создать"
                    rootProps={{unmountOnExit: false}}
                >
                    <PlaylistsProvider
                        pageSize={10}
                        options={{
                            filter: `user = "${user?.id}"`,
                        }}
                    >
                        <UploadModal>
                            <Menu.Item value="upload-video">
                                <Flex alignItems="center" gap={2}>
                                    <LuCloudUpload/> Загрузить видео
                                </Flex>
                            </Menu.Item>
                        </UploadModal>
                    </PlaylistsProvider>
                    <PlaylistModal title={"Создать плейлист"}>
                        <Menu.Item value="create-playlist">
                            <Flex alignItems="center" gap={2}>
                                <RiPlayListAddLine/> Создать плейлист
                            </Flex>
                        </Menu.Item>
                    </PlaylistModal>
                </MenuBox>
            </Flex>
            <Table.Root size="sm" striped showColumnBorder>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeader></Table.ColumnHeader>
                        <Table.ColumnHeader>Название</Table.ColumnHeader>
                        <Table.ColumnHeader textAlign="center">Дата</Table.ColumnHeader>
                        <Table.ColumnHeader textAlign="center">Статус</Table.ColumnHeader>
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
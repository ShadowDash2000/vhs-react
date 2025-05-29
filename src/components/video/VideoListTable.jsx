import {Table, For, Flex, Pagination, ButtonGroup, IconButton} from "@chakra-ui/react";
import {VideoCell} from "./VideoCell.jsx";
import {UploadModal} from "../dashboard/upload/UploadModal.jsx";
import {useVideos} from "./context/VideosContext.jsx";
import {LuChevronLeft, LuChevronRight} from "react-icons/lu";

export const VideoListTable = () => {
    const {data: videos, page, setPage} = useVideos();

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
            <Pagination.Root count={videos.totalItems} pageSize={videos.perPage} page={videos.page}>
                <ButtonGroup variant="ghost" size="sm" wrap="wrap">
                    <Pagination.PrevTrigger asChild>
                        <IconButton onClick={() => setPage(page - 1)}>
                            <LuChevronLeft/>
                        </IconButton>
                    </Pagination.PrevTrigger>
                    <Pagination.Items
                        render={(page) => (
                            <IconButton
                                variant={{base: "ghost", _selected: "outline"}}
                                onClick={() => setPage(page.value)}
                            >
                                {page.value}
                            </IconButton>
                        )}
                    />
                    <Pagination.NextTrigger asChild>
                        <IconButton onClick={() => setPage(page + 1)}>
                            <LuChevronRight/>
                        </IconButton>
                    </Pagination.NextTrigger>
                </ButtonGroup>
            </Pagination.Root>
        </Flex>
    )
}
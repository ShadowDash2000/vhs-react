import {Table, For} from "@chakra-ui/react";
import {VideoCell} from "./VideoCell";
import {PaginationBox} from "./PaginationBox";
import {useNavigate} from "react-router-dom";
import {useCollectionList} from "@context/CollectionListContext";
import type {VideoRecord} from "@shared/types/types";

export const VideoListTable = () => {
    const {data: videos} = useCollectionList<VideoRecord>();
    const navigate = useNavigate();

    return (
        <>
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
            <PaginationBox
                count={videos.totalItems}
                pageSize={videos.perPage}
                page={videos.page}
            />
        </>
    )
}
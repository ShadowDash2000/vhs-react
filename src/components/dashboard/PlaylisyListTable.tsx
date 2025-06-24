import {Table, For} from "@chakra-ui/react";
import {PaginationBox} from "./PaginationBox";
import {useNavigate} from "react-router-dom";
import {PlaylistCell} from "./PlaylistCell";
import {useCollectionList} from "@context/CollectionListContext";
import type {PlaylistRecord} from "@shared/types/types";

export const PlaylistListTable = () => {
    const {data: playlists} = useCollectionList<PlaylistRecord>();
    const navigate = useNavigate();

    return (
        <>
            <Table.Root size="sm" striped showColumnBorder>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeader></Table.ColumnHeader>
                        <Table.ColumnHeader>Название</Table.ColumnHeader>
                        <Table.ColumnHeader textAlign="center">Дата</Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <For each={playlists.items}>
                        {(item) => (
                            <Table.Row
                                key={item.id}
                                cursor="pointer"
                                onClick={() => navigate(`/dashboard/playlist/${item.id}`)}
                            >
                                <PlaylistCell playlist={item}/>
                            </Table.Row>
                        )}
                    </For>
                </Table.Body>
            </Table.Root>
            <PaginationBox
                count={playlists.totalItems}
                pageSize={playlists.perPage}
                page={playlists.page}
            />
        </>
    )
}
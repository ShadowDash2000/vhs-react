import {Table, For, Checkbox, ActionBar, Portal, Button, Kbd, Text} from "@chakra-ui/react";
import {PaginationBox} from "./PaginationBox";
import {PlaylistCell} from "./PlaylistCell";
import {useCollectionList} from "@context/CollectionListContext";
import type {PlaylistRecord} from "@shared/types/types";
import {useState} from "react";
import {DialogBox} from "@ui/dialog/dialog";
import {useAppContext} from "@context/AppContextProvider/AppContextProvider";
import {useQueryClient} from "@tanstack/react-query";

export const PlaylistListTable = () => {
    const {pb} = useAppContext();
    const queryClient = useQueryClient();
    const {data: playlists} = useCollectionList<PlaylistRecord>();

    const [selection, setSelection] = useState<string[]>([]);

    const hasSelection = selection.length > 0;
    const indeterminate = hasSelection && selection.length < playlists.items.length;

    const deletePlaylists = async () => {
        const batch = pb.createBatch();

        for (const id of selection) {
            batch.collection('playlists').delete(id);
        }

        await batch.send();
        await queryClient.invalidateQueries({
            queryKey: ['playlists'],
        });
        setSelection([]);
    }

    return (
        <>
            <Table.Root size="sm" width="80vw" striped showColumnBorder>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeader w="6">
                            <Checkbox.Root
                                size="sm"
                                top="0.5"
                                aria-label="Select all rows"
                                checked={indeterminate ? "indeterminate" : selection.length > 0}
                                onCheckedChange={(changes) => {
                                    setSelection(
                                        changes.checked
                                            ? playlists.items.map((item) => item.id)
                                            : [],
                                    )
                                }}
                            >
                                <Checkbox.HiddenInput/>
                                <Checkbox.Control/>
                            </Checkbox.Root>
                        </Table.ColumnHeader>
                        <Table.ColumnHeader></Table.ColumnHeader>
                        <Table.ColumnHeader>Название</Table.ColumnHeader>
                        <Table.ColumnHeader textAlign="center">Дата</Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <For each={playlists.items}>
                        {(item) => (
                            <Table.Row key={item.id}>
                                <Table.Cell>
                                    <Checkbox.Root
                                        size="sm"
                                        top="0.5"
                                        aria-label="Select row"
                                        checked={selection.includes(item.id)}
                                        onCheckedChange={(changes) => {
                                            setSelection((prev) =>
                                                changes.checked
                                                    ? [...prev, item.id]
                                                    : selection.filter((id) => id !== item.id),
                                            )
                                        }}
                                    >
                                        <Checkbox.HiddenInput/>
                                        <Checkbox.Control/>
                                    </Checkbox.Root>
                                </Table.Cell>
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
            <ActionBar.Root open={hasSelection}>
                <Portal>
                    <ActionBar.Positioner>
                        <ActionBar.Content>
                            <ActionBar.SelectionTrigger>
                                {selection.length} выбрано
                            </ActionBar.SelectionTrigger>
                            <ActionBar.Separator/>
                            <Button variant="outline" size="sm">
                                <DialogBox
                                    body={<Text>Вы уверены?</Text>}
                                    onSubmit={deletePlaylists}
                                >
                                    <Text>
                                        Удалить <Kbd>⌫</Kbd>
                                    </Text>
                                </DialogBox>
                            </Button>
                        </ActionBar.Content>
                    </ActionBar.Positioner>
                </Portal>
            </ActionBar.Root>
        </>
    )
}
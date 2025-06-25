import {Table, For, Portal, ActionBar, Button, Text, Kbd, Checkbox} from "@chakra-ui/react";
import {VideoCell} from "./VideoCell";
import {PaginationBox} from "./PaginationBox";
import {useCollectionList} from "@context/CollectionListContext";
import type {VideoRecord} from "@shared/types/types";
import {DialogBox} from "@ui/dialog/dialog";
import {useAppContext} from "@context/AppContextProvider/AppContextProvider";
import {useState} from "react";
import {useQueryClient} from "@tanstack/react-query";

export const VideoListTable = () => {
    const {pb} = useAppContext();
    const queryClient = useQueryClient();
    const {data: videos} = useCollectionList<VideoRecord>();

    const [selection, setSelection] = useState<string[]>([]);

    const hasSelection = selection.length > 0;
    const indeterminate = hasSelection && selection.length < videos.items.length;

    const deleteVideos = async () => {
        const batch = pb.createBatch();

        for (const id of selection) {
            batch.collection('videos').delete(id);
        }

        await batch.send();
        await queryClient.invalidateQueries({
            queryKey: ['videos'],
        });
        setSelection([]);
    }

    return (
        <>
            <Table.Root size="sm" striped showColumnBorder>
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
                                            ? videos.items.map((item) => item.id)
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
                        <Table.ColumnHeader textAlign="center">Статус</Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <For each={videos.items}>
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
                                    onSubmit={deleteVideos}
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
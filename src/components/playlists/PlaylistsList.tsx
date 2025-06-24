import {useInView} from "react-intersection-observer";
import {Flex, For, Grid, Text} from "@chakra-ui/react";
import {Sort} from "@shared/hook/useSort";
import {LuArrowDown, LuArrowUp} from "react-icons/lu";
import {PlaylistsCard} from "./PlaylistsCard";
import {useCollectionListInfinite} from "@context/CollectionListInfiniteContext";
import type {PlaylistRecord} from "@shared/types/types";

export const PlaylistsList = () => {
    const {
        data: playlists,
        isFetching,
        hasNextPage,
        fetchNextPage,
        sortIs,
        sortToggle,
    } = useCollectionListInfinite<PlaylistRecord>();

    const { ref } = useInView({
        onChange: async (inView) => {
            if (inView && hasNextPage && !isFetching) {
                await fetchNextPage();
            }
        },
        trackVisibility: true,
        delay: 100,
    });

    return (
        <Flex direction="column">
            <Flex justify="end">
                <Flex onClick={() => sortToggle('created')} pb={5} gap={1} align="center" cursor="pointer">
                    <Text userSelect="none">По дате</Text>
                    {sortIs('created', Sort.DESC) ? <LuArrowDown/> : <LuArrowUp/>}
                </Flex>
            </Flex>
            <Grid templateColumns="repeat(4, 1fr)" gap={3} alignItems="start">
                <For each={playlists.pages}>
                    {list => (
                        list.items.map((playlists) => (
                            <PlaylistsCard playlist={playlists} key={playlists.id}/>
                        ))
                    )}
                </For>
                <div ref={ref}></div>
            </Grid>
        </Flex>
    )
}
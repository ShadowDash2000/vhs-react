import {Box, Button, createListCollection, Field, Flex, Input} from "@chakra-ui/react";
import {useForm} from "react-hook-form";
import {type FC, useEffect, useRef, useState} from "react";
import {useAppContext} from "@context/AppContextProvider/AppContextProvider";
import type {PlaylistRecord, VideoRecord} from "@shared/types/types";
import {Search, type SearchCollectionType} from "@ui/search/search";
import {useVideos} from "@context/VideosListContext";
import type {ListResult} from "pocketbase";

interface PlaylistEditFormProps {
    playlist?: PlaylistRecord
    onSuccess?: () => void
}

interface PlaylistFormFieldsProps {
    name: string
    videos: string[]
}

const createVideosCollection = (videos: ListResult<VideoRecord>) => {
    let items: Array<SearchCollectionType> = [];
    for (const video of videos.items) {
        items.push({
            label: video.name,
            value: video.id,
        });
    }
    return createListCollection<SearchCollectionType>({items});
}

export const PlaylistEditForm: FC<PlaylistEditFormProps> = ({playlist, onSuccess}) => {
    const {pb} = useAppContext();
    const {
        register,
        handleSubmit,
        formState
    } = useForm<PlaylistFormFieldsProps>();
    const {data: videos, setOptions} = useVideos();
    const countRef = useRef<number>(0);
    const [videosCollection, setVideosCollection] = useState(createVideosCollection(videos));

    useEffect(() => {
        if (countRef.current > 0) {
            setVideosCollection(createVideosCollection(videos));
        }
        ++countRef.current;
    }, [videos]);

    const [resError, setResError] = useState<string>('');

    const onSubmit = async (values: PlaylistFormFieldsProps) => {
        try {
            let url = `${import.meta.env.VITE_PB_URL}/api/playlist`;
            if (playlist) {
                url += `/${playlist.id}`;
            }

            const res = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(values),
                headers: {
                    'Authorization': `Bearer ${pb.authStore.token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!res.ok) setResError('Ошибка при сохранении.');
            if (onSuccess) onSuccess();
        } catch (error) {
            console.error(error);
            setResError('Ошибка при сохранении.');
        }
    }

    return (
        <Flex
            as="form"
            onSubmit={handleSubmit(onSubmit)}
            direction="column"
            gap={3}
        >
            <Field.Root required>
                <Field.Label>
                    Название <Field.RequiredIndicator/>
                </Field.Label>
                <Input
                    placeholder="Название"
                    {...register('name', {required: true})}
                    aria-invalid={formState.errors.name ? "true" : "false"}
                    maxLength={200}
                    defaultValue={playlist?.name}
                />
            </Field.Root>
            <Field.Root>
                <Field.Label>
                    Видео <Field.RequiredIndicator/>
                </Field.Label>
                <Search
                    items={videosCollection}
                    label="Видео"
                    rootProps={{
                        collection: videosCollection,
                        multiple: true,
                        ...register('videos', {required: false})
                    }}
                    onChange={(query) => {
                        setOptions(prev => ({
                            ...prev,
                            filter: `name ~ "${query}"`
                        }));
                    }}
                />
            </Field.Root>
            {!!resError && <Box color="red.500">{resError}</Box>}
            <Button type="submit" colorPalette="blue" rounded="lg">Сохранить</Button>
        </Flex>
    )
}
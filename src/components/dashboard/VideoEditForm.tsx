import {Box, Button, Field, FileUpload, Flex, Icon, Input, Select, Textarea, useFileUpload} from "@chakra-ui/react";
import {useForm} from "react-hook-form";
import {LuUpload} from "react-icons/lu";
import {type FC, useState} from "react";
import {useAppContext} from "@context/AppContextProvider/AppContextProvider";
import type {PlaylistRecord, VideoRecord, VideoStatusOptionsCollectionType} from "@shared/types/types";
import {VideosStatusOptions, VideoStatusOptionsCollection} from "@shared/types/types";
import {SelectBox} from "@ui/select/select";
import {Search} from "@ui/search/search";
import {createRecordCollection} from "@shared/helpers/createCollection";
import {toaster} from "@ui/toaster";
import {useCollectionListAll} from "@context/CollectionListAllContext";

interface VideoEditFormProps {
    videoId: string
    video?: VideoRecord
    onSuccess?: () => void
}

interface FormFieldsProps {
    name: string
    description: string
    status: string
    preview: File | null
    playlists: string[]
}

export const VideoEditForm: FC<VideoEditFormProps> = ({videoId, video, onSuccess}) => {
    const {pb} = useAppContext();

    const {
        register,
        handleSubmit,
        formState
    } = useForm<FormFieldsProps>();

    const [preview, setPreview] = useState<File | null>(null);
    const [resError, setResError] = useState<string>('');

    const fileUpload = useFileUpload({
        maxFiles: 1,
        accept: ['image/png', 'image/jpeg', 'image/jpg'],
        onFileAccept: (details) => {
            setPreview(details.files[0]);
        },
    });

    const {data: playlists} = useCollectionListAll<PlaylistRecord>();
    const playlistsCollection = createRecordCollection(playlists);


    const onSubmit = async (values: FormFieldsProps) => {
        try {
            const formData = new FormData();

            formData.append('name', values.name);
            formData.append('status', values.status);
            formData.append('description', values.description);
            if (preview) {
                formData.append('preview', preview);
            }

            for (const playlistId of values.playlists) {
                formData.append('playlists', playlistId);
            }

            const res = await fetch(`${import.meta.env.VITE_PB_URL}/api/video/${videoId}/update`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${pb.authStore.token}`,
                },
            });

            if (!res.ok) setResError('Ошибка при сохранении.');
            if (onSuccess) onSuccess();

            toaster.create({
                description: 'Видео успешно сохранено.',
                type: 'success',
            });
        } catch (error) {
            console.error(error);
            setResError('Ошибка при сохранении.');
        }
    }

    const fetchPlaylists = async (query: string) => {
        return createRecordCollection(await pb.collection('playlists').getFullList<PlaylistRecord>({
            filter: `name ~ "${query}"`
        }))
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
                    defaultValue={video?.name}
                />
            </Field.Root>
            <Field.Root>
                <Field.Label>
                    Описание
                </Field.Label>
                <Textarea
                    placeholder="Описание"
                    {...register('description', {required: false})}
                    aria-invalid={formState.errors.description ? "true" : "false"}
                    maxLength={5000}
                    defaultValue={video?.description}
                    minH={300}
                    autoresize
                />
            </Field.Root>
            <Field.Root required>
                <Field.Label>
                    Статус
                </Field.Label>
                <SelectBox<VideoStatusOptionsCollectionType>
                    collection={VideoStatusOptionsCollection}
                    defaultValue={[video?.status ?? VideosStatusOptions.CLOSED]}
                    label='Статус'
                    {...register('status', {required: true})}
                >
                    {VideoStatusOptionsCollection.items.map((status) => (
                        <Select.Item item={status} key={status.value}>
                            {status.label}
                            <Select.ItemIndicator/>
                        </Select.Item>
                    ))}
                </SelectBox>
            </Field.Root>
            <Field.Root>
                <Field.Label>Плейлисты</Field.Label>
                <Search
                    items={playlistsCollection}
                    label="Поиск плейлистов"
                    collection={playlistsCollection}
                    multiple={true}
                    defaultValue={video?.playlists}
                    fetch={fetchPlaylists}
                    {...register('playlists', {required: false})}
                />
            </Field.Root>
            <FileUpload.RootProvider
                maxW="xl"
                alignItems="stretch"
                value={fileUpload}
            >
                <FileUpload.HiddenInput/>
                <FileUpload.Dropzone>
                    <Icon size="md" color="fg.muted">
                        <LuUpload/>
                    </Icon>
                    <FileUpload.DropzoneContent>
                        <Box>Drag and drop files here</Box>
                        <Box color="fg.muted">.jpeg, .png</Box>
                    </FileUpload.DropzoneContent>
                </FileUpload.Dropzone>
                <FileUpload.List/>
            </FileUpload.RootProvider>
            {!!resError && <Box color="red.500">{resError}</Box>}
            <Button type="submit" colorPalette="blue" rounded="lg">Сохранить</Button>
        </Flex>
    )
}
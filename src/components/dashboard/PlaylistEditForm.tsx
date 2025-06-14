import {Box, Button, Field, Flex, Input} from "@chakra-ui/react";
import {useForm} from "react-hook-form";
import {type FC, useState} from "react";
import {useAppContext} from "@context/AppContextProvider/AppContextProvider";
import type {PlaylistRecord} from "@shared/types/types";

interface PlaylistEditFormProps {
    playlist?: PlaylistRecord
    onSuccess?: () => void
}

interface PlaylistFormFieldsProps {
    name: string
    videos: string[]
}

export const PlaylistEditForm: FC<PlaylistEditFormProps> = ({playlist, onSuccess}) => {
    const {pb} = useAppContext();
    const {
        register,
        handleSubmit,
        formState
    } = useForm<PlaylistFormFieldsProps>();

    const [resError, setResError] = useState<string>('');

    const onSubmit = async (values: PlaylistFormFieldsProps) => {
        try {
            const formData = new FormData();

            formData.append('name', values.name);

            let url = `${import.meta.env.VITE_PB_URL}/api/playlist`;
            if (playlist) {
                url += `/${playlist.id}`;
            }

            const res = await fetch(url, {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${pb.authStore.token}`,
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
            {!!resError && <Box color="red.500">{resError}</Box>}
            <Button type="submit" colorPalette="blue" rounded="lg">Сохранить</Button>
        </Flex>
    )
}
import {Box, Button, Field, FileUpload, Flex, Icon, Input, Textarea, useFileUpload} from "@chakra-ui/react";
import {useForm} from "react-hook-form";
import {LuUpload} from "react-icons/lu";
import {useState} from "react";
import {useAppContext} from "../../context/AppContextProvider.jsx";

export const VideoEditForm = ({videoId, video, onSuccess}) => {
    const {pb} = useAppContext();

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    const [error, setError] = useState(null);
    const [preview, setPreview] = useState(null);

    const fileUpload = useFileUpload({
        maxFiles: 1,
        accept: ['image/png', 'image/jpeg', 'image/jpg'],
        onFileAccept: (details) => {
            setPreview(details.files[0]);
        },
    });

    const onSubmit = async (values) => {
        try {
            const formData = new FormData();

            formData.append('name', values.name);
            formData.append('description', values.description);
            if (preview) {
                formData.append('preview', preview);
            }

            const res = await fetch(`${import.meta.env.VITE_PB_URL}/api/video/${videoId}/update`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${pb.authStore.token}`,
                },
            });

            if (!res.ok) setError('Ошибка при сохранении.');

            if (onSuccess) onSuccess();
        } catch (error) {
            setError(error.message);
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
                    aria-invalid={errors.name ? "true" : "false"}
                    maxLength={200}
                    defaultValue={video?.name}
                />
            </Field.Root>
            <Field.Root required>
                <Field.Label>
                    Описание
                </Field.Label>
                <Textarea
                    placeholder="Описание"
                    {...register('description', {required: false})}
                    aria-invalid={errors.description ? "true" : "false"}
                    maxLength={5000}
                    defaultValue={video?.description}
                    minH={300}
                    autoresize
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
            {error && <Box color="red.500">{error}</Box>}
            <Button type="submit" colorPalette="blue" rounded="lg">Сохранить</Button>
        </Flex>
    )
}
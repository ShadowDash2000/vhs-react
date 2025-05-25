import {Button, Field, Flex, Input, Textarea} from "@chakra-ui/react";
import {useForm} from "react-hook-form";

export const VideoEditForm = () => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    const onSubmit = () => {

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
                />
            </Field.Root>
            <Textarea
                placeholder="Описание"
                {...register('description', {required: false})}
                aria-invalid={errors.description ? "true" : "false"}
                maxLength={5000}
            />
            <Button type="submit" colorPalette="blue" rounded="lg">Сохранить</Button>
        </Flex>
    )
}
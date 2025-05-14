import {useAppContext} from "../context/AppContextProvider.jsx";
import {useState} from "react";
import {Button, Input, Field, Flex} from "@chakra-ui/react";
import {useForm} from "react-hook-form";
import {PasswordInput} from "./ui/password-input.jsx";

export const LoginForm = () => {
    const {pb, setUser} = useAppContext();
    const [open, setOpen] = useState(false);
    const {register, handleSubmit, formState: {errors}} = useForm();

    const onSubmit = async (values) => {
        const authResult = await pb.collection('users').authWithPassword(
            values['login'],
            values['password'],
        );

        if (authResult.token) {
            setOpen(false);
            setUser(authResult.record);
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
                    Логин <Field.RequiredIndicator/>
                </Field.Label>
                <Input
                    placeholder="Логин"
                    {...register('login', {required: true})}
                    aria-invalid={errors.login ? "true" : "false"}
                />
            </Field.Root>
            <Field.Root required>
                <Field.Label>
                    Пароль <Field.RequiredIndicator/>
                </Field.Label>
                <PasswordInput
                    placeholder="Пароль"
                    {...register('password', {required: true})}
                    aria-invalid={errors.password ? "true" : "false"}
                />
            </Field.Root>
            <Button type="submit" colorPalette="blue" rounded="lg">Войти</Button>
        </Flex>
    )
}
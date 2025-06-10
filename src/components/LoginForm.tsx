import {useAppContext} from "@context/AppContextProvider/AppContextProvider";
import {Button, Input, Field, Flex} from "@chakra-ui/react";
import {useForm} from "react-hook-form";
import {PasswordInput} from "./ui/password-input/password-input";

type LoginFormValues = {
    login: string
    password: string
}

export const LoginForm = () => {
    const {pb, setUser} = useAppContext();
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<LoginFormValues>();

    const onSubmit = async (values: LoginFormValues) => {
        const authResult = await pb.collection('users').authWithPassword(
            values['login'],
            values['password'],
        );

        if (authResult.token) {
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
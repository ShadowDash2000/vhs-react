import {useAppContext} from "../context/AppContextProvider.jsx";
import {Box, Button, ButtonGroup} from "@chakra-ui/react";
import {NavLink} from "react-router-dom";

export const Header = () => {
    const {isAuth} = useAppContext();

    return (
        <Box
            py={4}
            px={28}
            display="flex"
            justifyContent="justify-between"
            alignItems="items-end"
        >
            {
                isAuth &&
                <ButtonGroup>
                    <Button asChild>
                        <NavLink to="/">Главная</NavLink>
                    </Button>
                    <Button asChild>
                        <NavLink to="/login">Вход</NavLink>
                    </Button>
                    <Button asChild>
                        <NavLink to="/dashboard">Dashboard</NavLink>
                    </Button>
                </ButtonGroup>
            }
        </Box>
    )
}
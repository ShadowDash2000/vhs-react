import {Outlet} from "react-router-dom";
import {Header} from "./Header";
import {Flex} from "@chakra-ui/react";

const Layout = () => {
    return (
        <>
            <Header/>
            <Flex
                as="main"
                justify="center"
                w="100%"
                overflowX="hidden"
                p="0"
                m="0"
            >
                <Outlet/>
            </Flex>
        </>
    )
}

export default Layout;
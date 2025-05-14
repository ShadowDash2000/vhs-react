import {Outlet} from "react-router-dom";
import {Header} from "./Header.jsx";
import {AppContextProvider} from "../context/AppContextProvider.jsx";
import {defaultConfig, defineConfig, createSystem, ChakraProvider, Flex} from "@chakra-ui/react";
import {ColorModeProvider} from "./ui/color-mode.jsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

export const Layout = () => {
    const colorModeConfig = {
        forcedTheme: 'dark',
    };

    const themeConfig = defineConfig({
        theme: {
            semanticTokens: {
                colors: {
                    bg: {
                        panel: {value: '#303e54'},
                    },
                },
            },
        },
    })

    const system = createSystem(defaultConfig, themeConfig);

    const queryClient = new QueryClient();

    return (
        <ChakraProvider value={system}>
            <ColorModeProvider {...colorModeConfig} />
            <AppContextProvider>
                <QueryClientProvider client={queryClient}>
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
                </QueryClientProvider>
            </AppContextProvider>
        </ChakraProvider>
    )
}
import {createRoot} from 'react-dom/client';
import {RouterProvider} from 'react-router-dom';
import {router} from "./router/router";
import './main.css';
import {ChakraProvider, createSystem, defaultConfig, defineConfig} from "@chakra-ui/react";
import {ColorModeProvider} from "./components/ui/color-mode";
import {AppContextProvider} from "@context/AppContextProvider/AppContextProvider";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";


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

createRoot(document.getElementById('root')!).render(
    <ChakraProvider value={system}>
        <ColorModeProvider {...colorModeConfig} />
        <AppContextProvider>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router}/>
            </QueryClientProvider>
        </AppContextProvider>
    </ChakraProvider>
)

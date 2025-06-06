import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import type { Preview, ReactRenderer } from "@storybook/react";
import { withThemeByClassName } from "@storybook/addon-themes";

const preview: Preview = {
    decorators: [
        withThemeByClassName<ReactRenderer>({
            defaultTheme: 'dark',
            themes: {
                light: "",
                dark: "dark"
            }
        }),
        (Story) => (
            <ChakraProvider value={defaultSystem}>
                <Story/>
            </ChakraProvider>
        )
    ],
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            }
        }
    }
};

export default preview;
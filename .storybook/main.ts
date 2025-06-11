import type {StorybookConfig} from "@storybook/react-vite";

const config: StorybookConfig = {
    "stories": [
        "../src/**/*.mdx",
        "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
    ],
    "addons": [
        "@storybook/addon-onboarding",
        "@chromatic-com/storybook",
        "@storybook/addon-docs",
        "@storybook/addon-a11y",
        "@storybook/addon-vitest",
        "@storybook/addon-themes"
    ],
    "framework": {
        "name": "@storybook/react-vite",
        "options": {}
    },
    typescript: {
        check: true,
        reactDocgen: 'react-docgen-typescript'
    },
    refs: {
        "@chakra-ui/react": {
            disable: true,
        },
    },
};
export default config;
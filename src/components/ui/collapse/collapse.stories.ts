import type {Meta, StoryObj} from "@storybook/react-vite";
import {Collapse} from "./collapse"


const meta = {
    component: Collapse,
    title: "ui/collapse",
    argTypes:{

    }
} satisfies Meta<typeof Collapse>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PasswordInputDefault: Story = {
    args: {
        children: `sadpokdsaodksaodsaodksaodkosakdsakodkasdosadkasodkaosdksaokdoaskdosakdosakdosakdosakdosakdsaasodkaosdksaokdoaskdosakdosakdosakdosakdosakdsaasodkaosdksaokdoaskdosakdosakdosakdosakdosakdsaasodkaosdksaokdoaskdosakdosakdosakdosakdosakdsa
      asodkaosdksaokdoaskdosakdosakdosakdosakdosakdsa
        asodkaosdksaokdoaskdosakdosakdosakdosakdosakdsa`
    }
}
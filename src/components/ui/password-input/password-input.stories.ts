import type {Meta, StoryObj} from "@storybook/react-vite";
import {} from ""
import {PasswordInput} from "./password-input"

const meta = {
    component: PasswordInput,
    title: "ui/password-input",
    argTypes:{
        
    }
} satisfies Meta<typeof PasswordInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PasswordInputDefault: Story = {
    args: {

    }
}


import {Button, Menu, type MenuRootProps, Portal} from "@chakra-ui/react";
import type {FC, ReactNode} from "react";

interface MenuBoxProps extends Omit<MenuRootProps, 'children'> {
    label: string
    children?: ReactNode
}

export const MenuBox: FC<MenuBoxProps> = ({label, children, ...props}) => {
    return (
        <Menu.Root {...props}>
            <Menu.Trigger asChild>
                <Button variant="solid" size="sm">
                    {label}
                </Button>
            </Menu.Trigger>
            <Portal>
                <Menu.Positioner>
                    <Menu.Content>
                        {children}
                    </Menu.Content>
                </Menu.Positioner>
            </Portal>
        </Menu.Root>
    )
}
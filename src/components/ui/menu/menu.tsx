import {Button, Menu, type MenuRootProps, Portal} from "@chakra-ui/react";
import type {FC, ReactNode} from "react";

interface MenuBoxProps {
    label: string
    rootProps?: Omit<MenuRootProps, 'children'>
    children?: ReactNode
}

export const MenuBox: FC<MenuBoxProps> = ({label, rootProps, children}) => {
    return (
        <Menu.Root {...rootProps}>
            <Menu.Trigger asChild>
                <Button variant="outline" size="sm">
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
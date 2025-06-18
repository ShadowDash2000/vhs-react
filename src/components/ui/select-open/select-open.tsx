import {Select, type SelectRootProps} from "@chakra-ui/react"
import type {ReactNode} from "react";

interface SelectBoxOpenProps<T> {
    label: string
    rootProps: Omit<SelectRootProps<T>, 'children'>
    children: ReactNode
}

export const SelectBoxOpen = <T, >(
    {
        rootProps,
        children,
    }: SelectBoxOpenProps<T>
) => {
    return (
        <Select.Root
            {...rootProps}
            defaultOpen={true}
            open={true}
        >
            <Select.HiddenSelect/>
            <Select.Content>
                {children}
            </Select.Content>
        </Select.Root>
    )
}
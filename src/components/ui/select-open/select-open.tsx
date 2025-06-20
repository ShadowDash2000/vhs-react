import {Select, type SelectRootProps} from "@chakra-ui/react"
import type {ReactNode} from "react";

export interface SelectBoxOpenProps<T> extends SelectRootProps<T> {
    children: ReactNode
}

export const SelectBoxOpen = <T, >(
    {
        children,
        ...props
    }: SelectBoxOpenProps<T>
) => {
    return (
        <Select.Root
            {...props}
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
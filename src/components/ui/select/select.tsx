import {type ListCollection, Portal, Select, type SelectRootProps} from "@chakra-ui/react"
import type {ReactNode} from "react";

export interface SelectBoxProps<T> extends SelectRootProps {
    label: string
    children: ReactNode
    collection: ListCollection<T>
}

export const SelectBox = <T, >({label, children, ...props}: SelectBoxProps<T>) => {
    return (
        <Select.Root {...props}>
            <Select.HiddenSelect/>
            <Select.Control>
                <Select.Trigger>
                    <Select.ValueText placeholder={label}/>
                </Select.Trigger>
                <Select.IndicatorGroup>
                    <Select.Indicator/>
                </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
                <Select.Positioner>
                    <Select.Content>
                        {children}
                    </Select.Content>
                </Select.Positioner>
            </Portal>
        </Select.Root>
    )
}
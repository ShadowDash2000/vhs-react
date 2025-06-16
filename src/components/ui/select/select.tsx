import {Portal, Select, type SelectRootProps} from "@chakra-ui/react"
import type {ReactNode} from "react";

interface SelectBoxProps<T> {
    label: string
    rootProps: Omit<SelectRootProps<T>, 'children'>
    children: ReactNode
}

export const SelectBox = <T,>(
    {
        label,
        rootProps,
        children,
    } : SelectBoxProps<T>
) => {
    return (
        <Select.Root {...rootProps}>
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
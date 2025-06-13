import {type ListCollection, Portal, Select} from "@chakra-ui/react"
import type {ReactNode, Ref} from "react";

interface SelectBoxProps<T> {
    collection: ListCollection<T>
    label: string
    children: ReactNode
    defaultValue?: string[]
    ref?: Ref<HTMLDivElement>
    name?: string
    value?: string[]
    onChange?: (value: any) => void
}

export const SelectBox = <T,>(
    {
        collection,
        label,
        children,
        defaultValue,
        ref,
        name,
        value,
        onChange,
    } : SelectBoxProps<T>
) => {
    return (
        <Select.Root
            collection={collection}
            defaultValue={defaultValue}
            ref={ref}
            name={name}
            value={value}
            onChange={onChange}
        >
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
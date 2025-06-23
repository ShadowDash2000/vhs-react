import {Field, For, Input, InputGroup, type ListCollection, Select} from "@chakra-ui/react";
import {SelectBoxOpen, type SelectBoxOpenProps} from "@ui/select-open/select-open";
import {LuSearch} from "react-icons/lu";

interface SearchProps extends Omit<SelectBoxOpenProps<SearchCollectionType>, 'children'> {
    label: string
    items: ListCollection<SearchCollectionType>
    onInputChange?: (query: string) => void
}

export type SearchCollectionType = {
    label: string
    value: any
}

export const Search = (
    {
        label,
        items,
        onInputChange,
        ...props
    }: SearchProps
) => {
    return (
        <>
            <InputGroup endElement={<LuSearch/>}>
                <Input
                    placeholder={label}
                    onChange={(e) => {
                        onInputChange?.(e.target.value);
                    }}
                />
            </InputGroup>
            <Field.Root>
                <SelectBoxOpen {...props}>
                    <For each={items.items}>
                        {(item) => (
                            <Select.Item item={item} key={item.value}>
                                {item.label}
                                <Select.ItemIndicator/>
                            </Select.Item>
                        )}
                    </For>
                </SelectBoxOpen>
            </Field.Root>
        </>
    )
}
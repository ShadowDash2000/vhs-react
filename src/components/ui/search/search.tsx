import {Field, For, Input, type ListCollection, Select} from "@chakra-ui/react";
import {SelectBoxOpen, type SelectBoxOpenProps} from "@ui/select-open/select-open";

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
            <Input
                placeholder={label}
                onChange={(e) => {
                    onInputChange?.(e.target.value);
                }}
            />
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
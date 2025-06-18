import {Field, For, Input, type ListCollection, Select, type SelectRootProps} from "@chakra-ui/react";
import {SelectBoxOpen} from "@ui/select-open/select-open";

interface SearchProps<T> {
    items: ListCollection<SearchCollectionType>
    label: string
    rootProps: Omit<SelectRootProps<T>, 'children'>
    onChange?: (query: string) => void
}

export type SearchCollectionType = {
    label: string
    value: any
}

export const Search = <T, >(
    {
        items,
        label,
        rootProps,
        onChange,
    }: SearchProps<T>
) => {
    return (
        <>
            <Input
                placeholder={label}
                onChange={(e) => {
                    onChange?.(e.target.value);
                }}
            />
            <Field.Root>
                <SelectBoxOpen
                    label={label}
                    rootProps={rootProps}
                >
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
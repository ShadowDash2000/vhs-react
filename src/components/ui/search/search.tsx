import {SelectBox} from "@ui/select/select"
import {Field, For, Input, type ListCollection, Select, type SelectRootProps} from "@chakra-ui/react";

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

export const Search = <T,>(
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
                placeholder="Название"
                onChange={(e) => {
                    onChange?.(e.target.value);
                }}
            />
            <Field.Root required>
                <SelectBox
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
                </SelectBox>
            </Field.Root>
        </>
    )
}
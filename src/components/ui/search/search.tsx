import {Field, For, Input, InputGroup, type ListCollection, Select} from "@chakra-ui/react";
import {SelectBoxOpen, type SelectBoxOpenProps} from "@ui/select-open/select-open";
import {LuSearch} from "react-icons/lu";
import {useState} from "react";

interface SearchProps extends Omit<SelectBoxOpenProps<SearchCollectionType>, 'children'> {
    label: string
    items: ListCollection<SearchCollectionType>
    onInputChange?: (query: string) => void
    fetch: (query: string) => Promise<ListCollection<SearchCollectionType>>
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
        fetch,
        ...props
    }: SearchProps
) => {
    const [list, setList] = useState(items);

    return (
        <>
            <InputGroup endElement={<LuSearch/>}>
                <Input
                    placeholder={label}
                    onChange={async (e) => {
                        onInputChange?.(e.target.value);
                        setList(await fetch(e.target.value));
                    }}
                />
            </InputGroup>
            <Field.Root>
                <SelectBoxOpen {...props}>
                    <For each={list.items}>
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
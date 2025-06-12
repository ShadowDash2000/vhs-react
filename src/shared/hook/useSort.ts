import {useEffect, useRef, useState} from "react";

interface SortProps {
    sortSet: (key: string, value: Sort) => void

    sortRemove(key: string): void

    sortIs(key: string, value: Sort): boolean

    sortToggle(key: string): void

    sortBuild: string
}

interface SortType {
    initial?: Map<string, Sort>
}

export const enum Sort {
    DESC = 'desc',
    ASC = 'asc',
}

const build = (sort: Map<string, Sort>) => {
    let i = 0;
    let sortString = '';
    for (const [key, sortType] of sort) {
        let sortValue = sortType === Sort.DESC ? '-' : '';
        let newValue = sortValue + key;
        if (i + 1 !== sort.size) {
            newValue += ',';
        }
        sortString += newValue;
        i++;
    }
    return sortString;
}

export const useSort = ({initial = new Map()}: SortType): SortProps => {
    const [sort, setSort] = useState<Map<string, Sort>>(initial);
    const [sortBuild, setSortBuild] = useState<string>(build(sort));
    const countRef = useRef<number>(0);

    const set = (key: string, value: Sort) => {
        setSort(new Map(sort).set(key, value));
    }

    const remove = (key: string) => {
        setSort(prev => {
            prev.delete(key);
            return new Map(prev);
        })
    }

    const is = (key: string, value: Sort) => {
        return sort.get(key) === value;
    }

    const toggle = (key: string) => {
        const value = sort.get(key);
        if (value === Sort.ASC) {
            set(key, Sort.DESC);
        } else if (value === Sort.DESC) {
            set(key, Sort.ASC);
        }
    }

    useEffect(() => {
        if (countRef.current > 0) {
            setSortBuild(build(sort));
        }
        ++countRef.current;
    }, [sort]);

    return {
        sortSet: set,
        sortRemove: remove,
        sortIs: is,
        sortToggle: toggle,
        sortBuild,
    }
}
import {useEffect, useState} from "react";

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

export const useSort = ({initial = new Map()}: SortType): SortProps => {
    const [sort, setSort] = useState<Map<string, Sort>>(initial);
    const [sortBuild, setSortBuild] = useState<string>('');

    const set = (key: string, value: Sort) => {
        setSort(() => {
            const m = new Map(sort);
            m.set(key, value);
            return m;
        });
    }

    const remove = (key: string) => {
        setSort(prev => {
            prev.delete(key);
            return prev;
        })
    }

    const build = () => {
        setSortBuild('');
        let i = 0;
        for (const [key, sortType] of sort) {
            let sortValue = sortType === Sort.DESC ? '-' : '';
            let newValue = sortValue + key;
            if (i + 1 !== sort.size) {
                newValue += ',';
            }
            setSortBuild(prev => prev + newValue);
            i++;
        }
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
        build();
    }, [sort]);

    return {
        sortSet: set,
        sortRemove: remove,
        sortIs: is,
        sortToggle: toggle,
        sortBuild,
    }
}
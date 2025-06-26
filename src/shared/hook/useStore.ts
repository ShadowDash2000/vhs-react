type SetType<T> = (prev: T) => T

interface UseStoreProps<T> {
    getStore(key: string): T
    setStore(key: string, set: SetType<T>): void
}

export const useStore = <T>(): UseStoreProps<T> => {

    const getStore = (key: string) => {
        return JSON.parse(localStorage.getItem(key) || "{}");
    }

    const setStore = <T>(key: string, set: SetType<T>) => {
        localStorage.setItem(key, JSON.stringify(set(getStore(key))));
    };

    return {
        setStore,
        getStore
    }
}
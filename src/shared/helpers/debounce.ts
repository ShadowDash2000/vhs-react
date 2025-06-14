export const debounce = <T extends (...args: any[]) => void>(callback: T, ms: number): ((...args: Parameters<T>) => void) => {
    let timeout: ReturnType<typeof setTimeout> | null = null;
    return (...args) => {
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
            callback(...args);
            timeout = null;
        }, ms);
    }
}
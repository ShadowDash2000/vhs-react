import {useEffect, useRef} from "react";

type UseSkipCallbackType = () => void

type UseSkipDepsType = readonly any[];

export const useSkip = (callback: UseSkipCallbackType, deps: UseSkipDepsType) => {
    const countRef = useRef<boolean>(false);

    useEffect(() => {
        if (countRef.current) {
            callback();
        }
        countRef.current = true;
    }, deps)
}
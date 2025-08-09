// import { useEffect, useState } from "react";

// function useDebounce<T>(value: T, delay: number = 1000): T {
//     const [debouncedValue, setDebouncedValue] = useState<T>(value);

//     useEffect(() => {
//         const handler = setTimeout(() => {
//             setDebouncedValue(value);
//         }, delay);

//         return () => {
//             clearTimeout(handler);
//         };
//     }, [value, delay]);

//     return debouncedValue;
// }

// export default useDebounce;

import { useEffect, useState } from "react";

function useDebounce<T>(fn: () => T, delay: number = 1000): T | undefined {
    const [result, setResult] = useState<T>();

    useEffect(() => {
        const handler = setTimeout(() => {
            setResult(fn());
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [fn, delay]);

    return result;
}

export default useDebounce;
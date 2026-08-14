import { useCallback, useRef, useState } from "react";

/**
 * Tracks the scroll position of a horizontally scrollable element and exposes
 * whether the left/right edges are reachable, plus smooth-scroll actions
 * (useful for "scroll row" arrows).
 *
 * Uses a React 19 callback ref so it also attaches to elements that mount after
 * the hook runs (e.g. a row rendered only once its data has loaded).
 */
export function useHorizontalScroll<T extends HTMLElement>() {
    const elementRef = useRef<T | null>(null);
    const [canLeft, setCanLeft] = useState(false);
    const [canRight, setCanRight] = useState(false);

    const update = useCallback(() => {
        const el = elementRef.current;
        if (!el) return;
        setCanLeft(el.scrollLeft > 1);
        setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
    }, []);

    // React 19 callback ref: attaches listeners when the node mounts (which may
    // be after the hook runs for conditionally-rendered rows) and returns a
    // cleanup that runs on unmount.
    const ref = useCallback(
        (node: T | null) => {
            elementRef.current = node;
            if (!node) return;

            update();
            const observer = new ResizeObserver(update);
            observer.observe(node);
            node.addEventListener("scroll", update, { passive: true });
            window.addEventListener("resize", update);

            return () => {
                observer.disconnect();
                node.removeEventListener("scroll", update);
                window.removeEventListener("resize", update);
            };
        },
        [update]
    );

    const scrollBy = useCallback((amount: number) => {
        elementRef.current?.scrollBy({ left: amount, behavior: "smooth" });
    }, []);

    return {
        ref,
        canLeft,
        canRight,
        scrollLeft: useCallback(() => scrollBy(-420), [scrollBy]),
        scrollRight: useCallback(() => scrollBy(420), [scrollBy]),
    };
}

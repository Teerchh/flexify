import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import useDebounce from "./useDebounce";

describe("useDebounce", () => {
    afterEach(() => {
        vi.useRealTimers();
    });

    it("returns the initial value immediately", () => {
        const { result } = renderHook(() => useDebounce("hello", 200));
        expect(result.current).toBe("hello");
    });

    it("only updates the value after the delay elapses", () => {
        vi.useFakeTimers();
        const { result, rerender } = renderHook(({ value }) => useDebounce(value, 200), {
            initialProps: { value: "a" },
        });

        rerender({ value: "b" });
        expect(result.current).toBe("a");

        act(() => {
            vi.advanceTimersByTime(199);
        });
        expect(result.current).toBe("a");

        act(() => {
            vi.advanceTimersByTime(1);
        });
        expect(result.current).toBe("b");
    });

    it("debounces rapid consecutive changes", () => {
        vi.useFakeTimers();
        const { result, rerender } = renderHook(({ value }) => useDebounce(value, 200), {
            initialProps: { value: "a" },
        });

        rerender({ value: "b" });
        act(() => {
            vi.advanceTimersByTime(150);
        });
        rerender({ value: "c" });
        act(() => {
            vi.advanceTimersByTime(150);
        });
        rerender({ value: "d" });

        // Only the last change should eventually win.
        act(() => {
            vi.advanceTimersByTime(200);
        });
        expect(result.current).toBe("d");
    });
});

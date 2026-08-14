import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/libs/axios.lib", () => ({
    default: { get: vi.fn() },
}));

import httpClient from "@/libs/axios.lib";
import useSearch from "./useSearch";
import type { Movie } from "@/types/movie";

const mockedGet = vi.mocked(httpClient.get);

const movie: Movie = {
    adult: false,
    backdrop_path: "/backdrop.jpg",
    genre_ids: [18],
    id: 550,
    original_language: "en",
    original_title: "Fight Club",
    overview: "An insomniac and a soap salesman channel primal male aggression.",
    popularity: 73.4,
    poster_path: "/poster.jpg",
    release_date: "1999-10-15",
    title: "Fight Club",
    video: false,
    vote_average: 8.4,
    vote_count: 26279,
};

function makeWrapper() {
    const queryClient = new QueryClient({
        defaultOptions: { queries: { retry: false } },
    });
    return ({ children }: { children: ReactNode }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
}

describe("useSearch", () => {
    beforeEach(() => {
        mockedGet.mockReset();
    });

    it("fetches results for a query", async () => {
        mockedGet.mockResolvedValue({
            data: { page: 1, results: [movie], total_pages: 1, total_results: 1 },
        });

        const { result } = renderHook(() => useSearch("fight club"), {
            wrapper: makeWrapper(),
        });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(result.current.data?.pages[0].results[0].id).toBe(550);
        expect(mockedGet).toHaveBeenCalledWith(
            "/search/movie",
            expect.objectContaining({ params: expect.objectContaining({ query: "fight club" }) })
        );
    });

    it("does not fetch while the query is empty", () => {
        const { result } = renderHook(() => useSearch(""), {
            wrapper: makeWrapper(),
        });

        expect(result.current.fetchStatus).toBe("idle");
        expect(mockedGet).not.toHaveBeenCalled();
    });
});

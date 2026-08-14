import type { SortBy } from "@/constants/genres";
import httpClient from "@/libs/axios.lib";
import type { MovieResponse } from "@/types/api";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";

type UsePopularOptions = {
    genres?: number[];
    sortBy?: SortBy;
};

/** Discover/popular movies with optional genre + sort filters (infinite scroll). */
export default function usePopular({ genres = [], sortBy = "popularity.desc" }: UsePopularOptions = {}) {
    return useInfiniteQuery({
        queryKey: ['popular movies', genres, sortBy],
        queryFn: async ({ pageParam }) => {
            const response = await httpClient.get<MovieResponse>("/discover/movie", {
                params: {
                    language: "en-US",
                    page: pageParam,
                    sort_by: sortBy,
                    with_genres: genres.length > 0 ? genres.join(",") : undefined,
                },
            });
            return response.data;
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            if (lastPage.page < lastPage.total_pages) {
                return lastPage.page + 1;
            }
            return undefined;
        },
        placeholderData: keepPreviousData,
    });
}
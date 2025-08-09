import type { Movie } from "@/App";
import httpClient from "@/libs/axios.lib";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";

export type MovieResponse = {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
};

export default function usePopular() {
    return useInfiniteQuery({
        queryKey: ['popular movies'],
        queryFn: async ({ pageParam }) => await fetchPopular({ pageParam }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            if (lastPage.page < lastPage.total_pages) {
                return lastPage.page + 1
            }
            return undefined
        },
        placeholderData: keepPreviousData,
    })
}

async function fetchPopular({ pageParam }: { pageParam: number }): Promise<MovieResponse> {
    const response = await httpClient.get(`/discover/movie?language=en-US&page=${pageParam}&sort_by=popularity.desc`);
    return response.data;
}
import httpClient from "@/libs/axios.lib";
import type { SearchResponse } from "@/types/api";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";

export default function useSearch(query: string) {
    return useInfiniteQuery({
        queryKey: ['search movies', query],
        queryFn: async ({ pageParam }) => {
            const response = await httpClient.get<SearchResponse>("/search/movie", {
                params: { query, language: "en-US", page: pageParam },
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
        enabled: query.length > 0,
        placeholderData: keepPreviousData,
    });
}

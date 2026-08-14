import httpClient from "@/libs/axios.lib";
import type { MovieResponse } from "@/types/api";
import { useQuery } from "@tanstack/react-query";

export default function useTrending() {
    return useQuery({
        queryKey: ['trending movies'],
        queryFn: async () => {
            const response = await httpClient.get<MovieResponse>("/movie/top_rated", {
                params: { language: "en-US", page: 1 },
            });
            return response.data.results;
        },
    });
}
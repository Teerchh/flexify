import httpClient from "@/libs/axios.lib";
import type { MovieResponse } from "@/types/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export default function useUpcoming() {
    return useQuery({
        queryKey: ['upcoming movies'],
        queryFn: async () => {
            const response = await httpClient.get<MovieResponse>("/movie/upcoming", {
                params: { language: "en-US", page: 1 },
            });
            return response.data;
        },
        placeholderData: keepPreviousData,
    });
}

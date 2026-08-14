import httpClient from "@/libs/axios.lib";
import type { MovieResponse } from "@/types/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export default function useNowPlaying() {
    return useQuery({
        queryKey: ['now playing movies'],
        queryFn: async () => {
            const response = await httpClient.get<MovieResponse>("/movie/now_playing", {
                params: { language: "en-US", page: 1 },
            });
            return response.data;
        },
        placeholderData: keepPreviousData,
    });
}

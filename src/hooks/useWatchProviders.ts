import httpClient from "@/libs/axios.lib";
import type { WatchProviders } from "@/types/movie";
import { useQuery } from "@tanstack/react-query";

export default function useWatchProviders(movieId: number | null) {
    return useQuery({
        queryKey: ['watch providers', movieId],
        queryFn: async () => {
            const response = await httpClient.get<WatchProviders>(`/movie/${movieId}/watch/providers`);
            return response.data;
        },
        enabled: movieId !== null,
        // Streaming availability changes rarely — cache for a day to avoid hammering the API.
        staleTime: 1000 * 60 * 60 * 24,
    });
}

import httpClient from "@/libs/axios.lib";
import type { MovieDetails } from "@/types/movie";
import { useQuery } from "@tanstack/react-query";

export default function useMovieDetails(movieId: number | null) {
    return useQuery({
        queryKey: ['movie details', movieId],
        queryFn: async () => {
            const response = await httpClient.get<MovieDetails>(`/movie/${movieId}`);
            return response.data;
        },
        enabled: movieId !== null,
        // Details change rarely — cache for a day.
        staleTime: 1000 * 60 * 60 * 24,
    });
}

import httpClient from "@/libs/axios.lib";
import type { VideosResponse } from "@/types/movie";
import { useQuery } from "@tanstack/react-query";

export default function useMovieVideos(movieId: number | null) {
    return useQuery({
        queryKey: ['movie videos', movieId],
        queryFn: async () => {
            const response = await httpClient.get<VideosResponse>(`/movie/${movieId}/videos`);
            return response.data;
        },
        enabled: movieId !== null,
        staleTime: 1000 * 60 * 60 * 24,
    });
}

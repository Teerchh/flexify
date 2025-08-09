import type { Movie } from "@/App";
import httpClient from "@/libs/axios.lib";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

export default function useTrending() {
    return useQuery({
        queryKey: ['trending movies'],
        queryFn: async () => await fetchTrendingMovies()
    })
}

async function fetchTrendingMovies(): Promise<Movie[]> {
    try {
        const response = await httpClient.get("/movie/top_rated?language=en-US&page=1");
        return response.data.results

    } catch (err) {
        const error = err as AxiosError
        throw new Error(error.message)
    }
}
import type { Movie } from "./movie";

export type PaginatedResponse<T> = {
    page: number;
    results: T[];
    total_pages: number;
    total_results: number;
};

export type MovieResponse = PaginatedResponse<Movie>;

export type SearchResponse = PaginatedResponse<Movie>;

import { useEffect, useRef } from "react";
import ErrorState from "../ErrorState";
import MovieCard from "../MovieCard";
import { CardSkeleton } from "../Skeleton";
import Spinner from "../Spinner";
import useSearch from "@/hooks/useSearch";
import type { Movie } from "@/types/movie";

type SearchResultsSectionProps = {
    query: string;
    onSelect: (movie: Movie) => void;
    onClear?: () => void;
};

export default function SearchResultsSection({ query, onSelect, onClear }: SearchResultsSectionProps) {
    const { data, isPending, error, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useSearch(query);
    const loaderRef = useRef<HTMLDivElement | null>(null);

    const movies = data?.pages.flatMap((page) => page.results) ?? [];

    useEffect(() => {
        if (!loaderRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const first = entries[0];
                if (first.isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            },
            { threshold: 1.0 }
        );

        observer.observe(loaderRef.current);
        return () => observer.disconnect();
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

    return (
        <section className="all-movies">
            <h2>Search Results</h2>

            {isPending ? (
                <ul>
                    {Array.from({ length: 8 }, (_, i) => (
                        <CardSkeleton key={i} />
                    ))}
                </ul>
            ) : error ? (
                <ErrorState message={error.message} onRetry={() => refetch()} />
            ) : movies.length > 0 ? (
                <>
                    <ul>
                        {movies.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} onClick={() => onSelect(movie)} />
                        ))}
                    </ul>
                    <div ref={loaderRef} className="flex items-center justify-center">
                        {isFetchingNextPage ? <Spinner /> : hasNextPage ? "Scroll to load more" : "No more movies"}
                    </div>
                </>
            ) : (
                <div className="text-center">
                    <p className="text-gray-100">No movies found for “{query}”. Try a different title.</p>
                    {onClear && (
                        <button
                            type="button"
                            onClick={onClear}
                            className="mt-3 rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
                        >
                            Clear search
                        </button>
                    )}
                </div>
            )}
        </section>
    );
}

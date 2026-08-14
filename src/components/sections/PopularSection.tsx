import { useEffect, useRef, useState } from "react";
import ErrorState from "../ErrorState";
import MovieCard from "../MovieCard";
import { CardSkeleton } from "../Skeleton";
import Spinner from "../Spinner";
import { GENRES, SORT_OPTIONS, type SortBy } from "@/constants/genres";
import usePopular from "@/hooks/usePopular";
import type { Movie } from "@/types/movie";

type PopularSectionProps = {
    onSelect: (movie: Movie) => void;
};

export default function PopularSection({ onSelect }: PopularSectionProps) {
    const [genres, setGenres] = useState<number[]>([]);
    const [sortBy, setSortBy] = useState<SortBy>("popularity.desc");
    const { data, isPending, error, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = usePopular({
        genres,
        sortBy,
    });
    const loaderRef = useRef<HTMLDivElement | null>(null);

    const movies = data?.pages.flatMap((page) => page.results) ?? [];

    const toggleGenre = (id: number) => {
        setGenres((prev) => (prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]));
    };

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
            <div className="flex flex-wrap items-center justify-between gap-3">
                <h2>Discover</h2>

                <label className="flex items-center gap-2 text-sm text-gray-100">
                    Sort by
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as SortBy)}
                        className="rounded-lg bg-dark-100 px-3 py-1.5 text-sm text-white ring-1 ring-white/10 outline-none"
                    >
                        {SORT_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </label>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
                {GENRES.map((genre) => {
                    const active = genres.includes(genre.id);
                    return (
                        <button
                            key={genre.id}
                            type="button"
                            onClick={() => toggleGenre(genre.id)}
                            aria-pressed={active}
                            className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                                active
                                    ? "bg-linear-to-r from-[#D6C7FF] to-[#AB8BFF] text-primary"
                                    : "bg-white/5 text-gray-100 ring-1 ring-white/10 hover:bg-white/10"
                            }`}
                        >
                            {genre.name}
                        </button>
                    );
                })}
            </div>

            {isPending ? (
                <ul>
                    {Array.from({ length: 8 }, (_, i) => (
                        <CardSkeleton key={i} />
                    ))}
                </ul>
            ) : error ? (
                <ErrorState message={error.message} onRetry={() => refetch()} />
            ) : (
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
            )}
        </section>
    );
}

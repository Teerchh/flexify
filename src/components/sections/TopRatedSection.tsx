import ErrorState from "../ErrorState";
import { PosterSkeleton } from "../Skeleton";
import TrendingCard from "../TrendingCard";
import useTrending from "@/hooks/useTrending";
import type { Movie } from "@/types/movie";

type TopRatedSectionProps = {
    onSelect: (movie: Movie) => void;
};

export default function TopRatedSection({ onSelect }: TopRatedSectionProps) {
    const { data, isPending, error, refetch } = useTrending();

    return (
        <section className="trending">
            <h2>Top Rated</h2>

            {isPending ? (
                <div className="mt-4 flex gap-5 overflow-hidden">
                    {Array.from({ length: 6 }, (_, i) => (
                        <PosterSkeleton key={i} />
                    ))}
                </div>
            ) : error ? (
                <ErrorState message={error.message} onRetry={() => refetch()} />
            ) : (
                <ul>
                    {data?.map((movie, index) => (
                        <TrendingCard
                            key={movie.id}
                            movie={movie}
                            index={index + 1}
                            onClick={() => onSelect(movie)}
                        />
                    ))}
                </ul>
            )}
        </section>
    );
}

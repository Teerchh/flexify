import ErrorState from "../ErrorState";
import ScrollArrows from "../ScrollArrows";
import { PosterSkeleton } from "../Skeleton";
import TrendingCard from "../TrendingCard";
import { useHorizontalScroll } from "@/hooks/useHorizontalScroll";
import useTrending from "@/hooks/useTrending";
import type { Movie } from "@/types/movie";

type TopRatedSectionProps = {
    onSelect: (movie: Movie) => void;
};

export default function TopRatedSection({ onSelect }: TopRatedSectionProps) {
    const { data, isPending, error, refetch } = useTrending();
    const { ref, canLeft, canRight, scrollLeft, scrollRight } = useHorizontalScroll<HTMLUListElement>();

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
                <div className="relative">
                    <ul ref={ref}>
                        {data?.map((movie, index) => (
                            <TrendingCard
                                key={movie.id}
                                movie={movie}
                                index={index + 1}
                                onClick={() => onSelect(movie)}
                            />
                        ))}
                    </ul>
                    <ScrollArrows canLeft={canLeft} canRight={canRight} onLeft={scrollLeft} onRight={scrollRight} />
                </div>
            )}
        </section>
    );
}

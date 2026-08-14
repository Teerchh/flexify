import ErrorState from "../ErrorState";
import MovieRow from "../MovieRow";
import { PosterSkeleton } from "../Skeleton";
import useUpcoming from "@/hooks/useUpcoming";
import type { Movie } from "@/types/movie";

type UpcomingSectionProps = {
    onSelect: (movie: Movie) => void;
};

export default function UpcomingSection({ onSelect }: UpcomingSectionProps) {
    const { data, isPending, error, refetch } = useUpcoming();

    return (
        <section className="mt-12">
            <h2>Upcoming</h2>

            {isPending ? (
                <div className="mt-4 flex gap-5 overflow-hidden">
                    {Array.from({ length: 6 }, (_, i) => (
                        <PosterSkeleton key={i} />
                    ))}
                </div>
            ) : error ? (
                <ErrorState message={error.message} onRetry={() => refetch()} />
            ) : (
                <MovieRow movies={data?.results ?? []} onSelect={onSelect} />
            )}
        </section>
    );
}

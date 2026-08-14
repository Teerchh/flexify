import { useEffect, useState } from "react";
import { Link } from "react-router";
import Spinner from "@/components/Spinner";
import WatchProvidersList from "@/components/WatchProvidersList";
import useMovieDetails from "@/hooks/useMovieDetails";
import useMovieVideos from "@/hooks/useMovieVideos";
import type { Movie } from "@/types/movie";

type WatchModalProps = {
    movie: Movie | null;
    onClose: () => void;
};

export default function WatchModal({ movie, onClose }: WatchModalProps) {
    const details = useMovieDetails(movie?.id ?? null);
    const videos = useMovieVideos(movie?.id ?? null);
    const [showTrailer, setShowTrailer] = useState(false);

    // Close on Escape, lock body scroll, and reset the trailer on movie change.
    useEffect(() => {
        if (!movie) return;

        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", onKey);
        document.body.style.overflow = "hidden";

        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [movie, onClose]);

    useEffect(() => {
        setShowTrailer(false);
    }, [movie?.id]);

    if (!movie) return null;

    const year = movie.release_date ? movie.release_date.split("-")[0] : null;
    const trailer =
        videos.data?.results.find((v) => v.site === "YouTube" && v.type === "Trailer") ??
        videos.data?.results[0];
    const isLoading = details.isLoading || videos.isLoading;
    const error = details.error ?? videos.error;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label={`Where to watch ${movie.title}`}
        >
            {/* Backdrop — click to close */}
            <div className="absolute inset-0 bg-black/80" onClick={onClose} />

            <div className="relative z-10 flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-dark-100 shadow-2xl ring-1 ring-white/10">
                {/* Header */}
                <div className="relative h-44 shrink-0">
                    {(movie.backdrop_path || details.data?.backdrop_path) ? (
                        <img
                            src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path ?? details.data?.backdrop_path}`}
                            alt=""
                            className="h-full w-full object-cover opacity-40"
                        />
                    ) : (
                        <div className="h-full w-full bg-primary/60" />
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-dark-100 via-dark-100/40 to-transparent" />

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close"
                        className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80"
                    >
                        ✕
                    </button>

                    <div className="absolute bottom-3 left-5 pr-5">
                        <h3 className="text-xl font-bold text-white">{movie.title}</h3>
                        <p className="text-sm text-gray-100">
                            {year ? `${year} • ` : ""}★ {movie.vote_average ? movie.vote_average.toFixed(1) : "NA"}
                            {details.data?.runtime ? ` • ${details.data.runtime} min` : ""}
                        </p>
                    </div>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-5">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-10">
                            <Spinner />
                        </div>
                    ) : error ? (
                        <p className="py-6 text-center text-red-500">
                            Couldn't load movie info. Please try again.
                        </p>
                    ) : (
                        <>
                            {/* Trailer */}
                            {trailer && !showTrailer && (
                                <button
                                    type="button"
                                    onClick={() => setShowTrailer(true)}
                                    className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
                                >
                                    ▶ Watch Trailer
                                </button>
                            )}
                            {trailer && showTrailer && (
                                <div className="aspect-video w-full overflow-hidden rounded-lg">
                                    <iframe
                                        src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
                                        title={`${movie.title} trailer`}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="h-full w-full"
                                    />
                                </div>
                            )}

                            {/* Tagline */}
                            {details.data?.tagline && (
                                <p className="mt-3 italic text-light-200">{details.data.tagline}</p>
                            )}

                            {/* Overview */}
                            <p className="mt-3 text-sm leading-relaxed text-gray-100">
                                {details.data?.overview || movie.overview || "No overview available."}
                            </p>

                            {/* Genres */}
                            {details.data?.genres && details.data.genres.length > 0 && (
                                <div className="mt-3 flex flex-wrap gap-1.5">
                                    {details.data.genres.map((genre) => (
                                        <span
                                            key={genre.id}
                                            className="rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-medium text-light-100"
                                        >
                                            {genre.name}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* Watch providers */}
                            <div className="mt-5 border-t border-white/10 pt-5">
                                <WatchProvidersList movieId={movie.id} title={movie.title} />
                            </div>
                        </>
                    )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-white/10 px-5 py-3">
                    <Link
                        to={`/movie/${movie.id}`}
                        onClick={onClose}
                        className="text-sm font-semibold text-light-100 hover:underline"
                    >
                        View full details →
                    </Link>
                    <button type="button" onClick={onClose} className="text-sm text-gray-100 hover:text-white">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}


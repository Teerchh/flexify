import { useState } from "react";
import { Link, useParams } from "react-router";
import FavoriteButton from "@/components/FavoriteButton";
import WatchProvidersList from "@/components/WatchProvidersList";
import useMovieDetails from "@/hooks/useMovieDetails";
import useMovieVideos from "@/hooks/useMovieVideos";
import { posterUrl } from "@/libs/images";
import type { Movie, MovieDetails } from "@/types/movie";

/** Map the details object onto the list-item shape so it can be saved as a favorite. */
function toMovie(details: MovieDetails): Movie {
    return {
        id: details.id,
        title: details.title,
        overview: details.overview,
        backdrop_path: details.backdrop_path ?? "",
        poster_path: details.poster_path ?? "",
        release_date: details.release_date,
        vote_average: details.vote_average,
        adult: false,
        genre_ids: [],
        original_language: "",
        original_title: details.title,
        popularity: 0,
        video: false,
        vote_count: 0,
    };
}

export default function MoviePage() {
    const { id } = useParams();
    const movieId = Number(id);
    const validId = Number.isNaN(movieId) ? null : movieId;

    const details = useMovieDetails(validId);
    const videos = useMovieVideos(validId);
    const [showTrailer, setShowTrailer] = useState(false);

    const movie = details.data;

    if (validId === null) {
        return (
            <div className="wrapper">
                <p className="text-red-500">Invalid movie id.</p>
                <Link to="/" className="mt-4 inline-block text-light-100 underline">
                    ← Back to Home
                </Link>
            </div>
        );
    }

    if (details.isPending) {
        return (
            <div className="wrapper">
                <Link to="/" className="inline-block text-sm text-gray-100 hover:text-white">
                    ← Back to Home
                </Link>
                <p className="mt-8 text-gray-100">Loading movie…</p>
            </div>
        );
    }

    if (details.error || !movie) {
        return (
            <div className="wrapper">
                <p className="text-red-500">Couldn't load this movie. Please try again.</p>
                <Link to="/" className="mt-4 inline-block text-light-100 underline">
                    ← Back to Home
                </Link>
            </div>
        );
    }

    const trailer =
        videos.data?.results.find((v) => v.site === "YouTube" && v.type === "Trailer") ??
        videos.data?.results[0];
    const year = movie.release_date ? movie.release_date.split("-")[0] : null;

    return (
        <div className="relative">
            {movie.backdrop_path && (
                <img
                    src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
                    alt=""
                    className="absolute inset-0 h-80 w-full object-cover opacity-30"
                />
            )}
            <div className="absolute inset-0 h-80 bg-linear-to-b from-transparent to-primary" />

            <div className="relative z-10 wrapper">
                <Link to="/" className="inline-block text-sm text-gray-100 hover:text-white">
                    ← Back to Home
                </Link>

                <div className="mt-6 flex flex-col gap-6 sm:flex-row">
                    <img
                        src={posterUrl(movie.poster_path, 500)}
                        alt={`${movie.title} poster`}
                        fetchPriority="high"
                        decoding="async"
                        className="h-auto w-48 shrink-0 self-start rounded-xl sm:w-56"
                    />

                    <div>
                        <h1 className="text-3xl font-bold text-white sm:text-4xl">{movie.title}</h1>
                        <p className="mt-2 text-sm text-gray-100">
                            {year ? `${year} • ` : ""}★ {movie.vote_average ? movie.vote_average.toFixed(1) : "NA"}
                            {movie.runtime ? ` • ${movie.runtime} min` : ""}
                        </p>

                        {movie.tagline && <p className="mt-2 italic text-light-200">{movie.tagline}</p>}

                        {movie.genres && movie.genres.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-1.5">
                                {movie.genres.map((genre) => (
                                    <span
                                        key={genre.id}
                                        className="rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-medium text-light-100"
                                    >
                                        {genre.name}
                                    </span>
                                ))}
                            </div>
                        )}

                        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-100">
                            {movie.overview || "No overview available."}
                        </p>

                        <div className="mt-4 flex items-center gap-3">
                            <FavoriteButton movie={toMovie(movie)} />
                            {trailer && !showTrailer && (
                                <button
                                    type="button"
                                    onClick={() => setShowTrailer(true)}
                                    className="rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
                                >
                                    ▶ Watch Trailer
                                </button>
                            )}
                        </div>

                        {trailer && showTrailer && (
                            <div className="mt-4 aspect-video w-full max-w-2xl overflow-hidden rounded-lg">
                                <iframe
                                    src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
                                    title={`${movie.title} trailer`}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="h-full w-full"
                                />
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-10 max-w-2xl">
                    <h2 className="text-xl font-bold text-white">Where to Watch</h2>
                    <WatchProvidersList movieId={movie.id} title={movie.title} />
                </div>
            </div>
        </div>
    );
}

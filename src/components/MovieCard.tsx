import FavoriteButton from "./FavoriteButton";
import { posterSrcSet, posterUrl } from "@/libs/images";
import type { Movie } from "@/types/movie";

export type MovieCardProps = {
    movie: Movie;
    onClick?: () => void;
};

export default function MovieCard({ movie, onClick }: MovieCardProps) {
    const { title, vote_average, poster_path, release_date, original_language, overview } = movie;

    return (
        <div className="relative">
            <button type="button" onClick={onClick} className="movie-card group block w-full cursor-pointer text-left">
                <div className="relative overflow-hidden rounded-lg">
                    <img
                        src={posterUrl(poster_path)}
                        srcSet={posterSrcSet(poster_path)}
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 100vw"
                        alt={title ? `${title} poster` : "Movie poster"}
                        loading="lazy"
                        decoding="async"
                        className="h-auto w-full"
                    />

                    {/* Hover overlay with overview snippet */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 flex items-end bg-linear-to-t from-black/85 via-black/40 to-transparent p-3 opacity-0 transition group-hover:opacity-100"
                    >
                        <p className="line-clamp-4 text-xs leading-relaxed text-gray-100">
                            {overview || "No overview available."}
                        </p>
                    </div>
                </div>

                <div className="mt-4">
                    <h3>{title}</h3>

                    <div className="content">
                        <div className="rating">
                            <img src="star.svg" alt="" />
                            <p>{vote_average ? vote_average.toFixed(1) : "NA"}</p>
                        </div>

                        <span>•</span>
                        <p className="lang">{original_language}</p>
                        <span>•</span>
                        <p className="year">{release_date ? release_date.split('-')[0] : 'NA'}</p>

                    </div>
                </div>
            </button>

            <FavoriteButton movie={movie} className="absolute right-3 top-3" />
        </div>
    )
}
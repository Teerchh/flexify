import FavoriteButton from "./FavoriteButton";
import ScrollArrows from "./ScrollArrows";
import { useHorizontalScroll } from "@/hooks/useHorizontalScroll";
import { posterSrcSet, posterUrl } from "@/libs/images";
import type { Movie } from "@/types/movie";

type MovieRowProps = {
    movies: Movie[];
    onSelect: (movie: Movie) => void;
};

/** A horizontally scrollable row of clickable movie posters (e.g. Now Playing, Upcoming). */
export default function MovieRow({ movies, onSelect }: MovieRowProps) {
    const { ref, canLeft, canRight, scrollLeft, scrollRight } = useHorizontalScroll<HTMLUListElement>();

    return (
        <div className="relative">
            <ul ref={ref} className="mt-4 flex w-full flex-row gap-5 overflow-x-auto hide-scrollbar">
                {movies.map((movie) => (
                    <li key={movie.id} className="min-w-[230px] shrink-0">
                        <div className="relative w-[127px]">
                            <button
                                type="button"
                                onClick={() => onSelect(movie)}
                                aria-label={`${movie.title} poster`}
                                className="cursor-pointer"
                            >
                                <img
                                    src={posterUrl(movie.poster_path)}
                                    srcSet={posterSrcSet(movie.poster_path)}
                                    sizes="(min-width: 640px) 127px, 127px"
                                    alt=""
                                    loading="lazy"
                                    decoding="async"
                                    className="h-[163px] w-[127px] rounded-lg object-cover"
                                />
                            </button>
                            <FavoriteButton movie={movie} className="absolute right-1 top-1" size={18} />
                        </div>
                    </li>
                ))}
            </ul>

            <ScrollArrows canLeft={canLeft} canRight={canRight} onLeft={scrollLeft} onRight={scrollRight} />
        </div>
    );
}

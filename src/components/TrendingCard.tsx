import FavoriteButton from "./FavoriteButton";
import { posterSrcSet, posterUrl } from "@/libs/images";
import type { Movie } from "@/types/movie";

export type TrendingCardProps = {
    movie: Movie;
    index: number;
    onClick?: () => void;
};

export default function TrendingCard({ movie, index, onClick }: TrendingCardProps) {
    const { poster_path, title } = movie;

    return (
        <li>
            <p>{index}</p>
            <div className="relative z-10 shrink-0">
                <button
                    type="button"
                    onClick={onClick}
                    aria-label={`${title} poster`}
                    className="cursor-pointer"
                >
                    <img
                        src={posterUrl(poster_path)}
                        srcSet={posterSrcSet(poster_path)}
                        sizes="(min-width: 640px) 127px, 127px"
                        alt=""
                        loading="lazy"
                    />
                </button>
                <FavoriteButton movie={movie} className="absolute right-1 top-1" size={18} />
            </div>
        </li>
    )
}
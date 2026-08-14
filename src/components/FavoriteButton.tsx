import { useFavorites } from "@/hooks/useFavorites";
import type { Movie } from "@/types/movie";

type FavoriteButtonProps = {
    movie: Movie;
    className?: string;
    size?: number;
};

export default function FavoriteButton({ movie, className = "", size = 22 }: FavoriteButtonProps) {
    const { isFavorite, toggleFavorite } = useFavorites();
    const active = isFavorite(movie.id);

    return (
        <button
            type="button"
            onClick={(event) => {
                event.stopPropagation();
                toggleFavorite(movie);
            }}
            aria-label={active ? `Remove ${movie.title} from favorites` : `Add ${movie.title} to favorites`}
            aria-pressed={active}
            title={active ? "Remove from favorites" : "Add to favorites"}
            className={`flex h-9 w-9 items-center justify-center rounded-full bg-black/60 backdrop-blur transition hover:scale-110 ${className}`}
        >
            <svg
                width={size}
                height={size}
                viewBox="0 0 24 24"
                fill={active ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={active ? "text-red-500" : "text-white"}
                aria-hidden="true"
            >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
        </button>
    );
}

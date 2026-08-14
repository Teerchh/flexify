import MovieCard from "../MovieCard";
import { useFavorites } from "@/hooks/useFavorites";
import type { Movie } from "@/types/movie";

type FavoritesSectionProps = {
    onSelect: (movie: Movie) => void;
};

export default function FavoritesSection({ onSelect }: FavoritesSectionProps) {
    const { favorites, clearFavorites } = useFavorites();

    if (favorites.length === 0) return null;

    return (
        <section className="all-movies mt-12">
            <div className="flex items-center justify-between">
                <h2>My Favorites</h2>
                <button type="button" onClick={clearFavorites} className="text-sm text-gray-100 underline">
                    Clear all
                </button>
            </div>
            <ul>
                {favorites.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} onClick={() => onSelect(movie)} />
                ))}
            </ul>
        </section>
    );
}

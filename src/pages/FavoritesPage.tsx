import { Link, useNavigate } from "react-router";
import MovieCard from "@/components/MovieCard";
import { useFavorites } from "@/hooks/useFavorites";

export default function FavoritesPage() {
    const { favorites, clearFavorites } = useFavorites();
    const navigate = useNavigate();

    return (
        <section className="wrapper">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <h1 className="text-3xl font-bold text-white">My Favorites</h1>
                {favorites.length > 0 && (
                    <button
                        type="button"
                        onClick={clearFavorites}
                        className="text-sm text-gray-100 underline"
                    >
                        Clear all
                    </button>
                )}
            </div>

            {favorites.length === 0 ? (
                <div className="mt-12 text-center">
                    <p className="text-gray-100">You haven't added any favorites yet.</p>
                    <Link to="/" className="mt-3 inline-block font-semibold text-light-100 underline">
                        Browse movies →
                    </Link>
                </div>
            ) : (
                <ul className="mt-8 grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {favorites.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                            onClick={() => navigate(`/movie/${movie.id}`)}
                        />
                    ))}
                </ul>
            )}
        </section>
    );
}

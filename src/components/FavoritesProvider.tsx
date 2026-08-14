import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { FavoritesContext, type FavoritesContextValue } from "@/state/favorites";
import type { Movie } from "@/types/movie";

const STORAGE_KEY = "movieapp:favorites";

function loadFavorites(): Movie[] {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? (JSON.parse(raw) as Movie[]) : [];
    } catch {
        return [];
    }
}

export default function FavoritesProvider({ children }: { children: ReactNode }) {
    const [favorites, setFavorites] = useState<Movie[]>(loadFavorites);

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
        } catch {
            // storage unavailable — ignore
        }
    }, [favorites]);

    const isFavorite = useCallback(
        (id: number) => favorites.some((movie) => movie.id === id),
        [favorites]
    );

    const toggleFavorite = useCallback((movie: Movie) => {
        setFavorites((prev) =>
            prev.some((m) => m.id === movie.id)
                ? prev.filter((m) => m.id !== movie.id)
                : [movie, ...prev]
        );
    }, []);

    const clearFavorites = useCallback(() => setFavorites([]), []);

    const value = useMemo<FavoritesContextValue>(
        () => ({ favorites, isFavorite, toggleFavorite, clearFavorites }),
        [favorites, isFavorite, toggleFavorite, clearFavorites]
    );

    return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

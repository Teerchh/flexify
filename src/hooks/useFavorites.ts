import { useContext } from "react";
import { FavoritesContext } from "@/state/favorites";

export function useFavorites() {
    const ctx = useContext(FavoritesContext);
    if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
    return ctx;
}

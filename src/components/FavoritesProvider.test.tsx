import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import FavoritesProvider from "./FavoritesProvider";
import { useFavorites } from "@/hooks/useFavorites";
import type { Movie } from "@/types/movie";

const movie: Movie = {
    adult: false,
    backdrop_path: "/backdrop.jpg",
    genre_ids: [18],
    id: 550,
    original_language: "en",
    original_title: "Fight Club",
    overview: "An insomniac and a soap salesman channel primal male aggression.",
    popularity: 73.4,
    poster_path: "/poster.jpg",
    release_date: "1999-10-15",
    title: "Fight Club",
    video: false,
    vote_average: 8.4,
    vote_count: 26279,
};

function Consumer() {
    const { favorites, isFavorite, toggleFavorite, clearFavorites } = useFavorites();
    return (
        <div>
            <p data-testid="count">{favorites.length}</p>
            <p data-testid="is-fav">{String(isFavorite(movie.id))}</p>
            <button type="button" onClick={() => toggleFavorite(movie)}>
                toggle
            </button>
            <button type="button" onClick={clearFavorites}>
                clear
            </button>
        </div>
    );
}

describe("FavoritesProvider", () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it("toggles a movie on and off", async () => {
        const user = userEvent.setup();
        render(
            <FavoritesProvider>
                <Consumer />
            </FavoritesProvider>
        );

        expect(screen.getByTestId("count")).toHaveTextContent("0");
        expect(screen.getByTestId("is-fav")).toHaveTextContent("false");

        await user.click(screen.getByRole("button", { name: "toggle" }));
        expect(screen.getByTestId("count")).toHaveTextContent("1");
        expect(screen.getByTestId("is-fav")).toHaveTextContent("true");

        await user.click(screen.getByRole("button", { name: "toggle" }));
        expect(screen.getByTestId("count")).toHaveTextContent("0");
        expect(screen.getByTestId("is-fav")).toHaveTextContent("false");
    });

    it("persists favorites to localStorage", async () => {
        const user = userEvent.setup();
        const { unmount } = render(
            <FavoritesProvider>
                <Consumer />
            </FavoritesProvider>
        );

        await user.click(screen.getByRole("button", { name: "toggle" }));
        unmount();

        const raw = localStorage.getItem("movieapp:favorites");
        expect(raw).toBeTruthy();
        expect(JSON.parse(raw as string)[0].title).toBe("Fight Club");
    });
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import FavoritesProvider from "./FavoritesProvider";
import MovieCard from "./MovieCard";
import type { Movie } from "@/types/movie";

const movie: Movie = {
    adult: false,
    backdrop_path: "/backdrop.jpg",
    genre_ids: [28, 18],
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

function renderCard(onClick?: () => void) {
    return render(
        <FavoritesProvider>
            <MovieCard movie={movie} onClick={onClick} />
        </FavoritesProvider>
    );
}

describe("MovieCard", () => {
    it("renders the title, rating, year and language", () => {
        renderCard();
        expect(screen.getByText("Fight Club")).toBeInTheDocument();
        expect(screen.getByText("8.4")).toBeInTheDocument();
        expect(screen.getByText("1999")).toBeInTheDocument();
        expect(screen.getByText("en")).toBeInTheDocument();
    });

    it("renders a lazy-loaded poster with descriptive alt text and a srcset", () => {
        renderCard();
        const img = screen.getByAltText("Fight Club poster");
        expect(img).toHaveAttribute("loading", "lazy");
        expect(img).toHaveAttribute("src", expect.stringContaining("/t/p/w500"));
        expect(img).toHaveAttribute("srcset", expect.stringContaining("w185"));
    });

    it("fires onClick when the card is activated", async () => {
        const user = userEvent.setup();
        const onClick = vi.fn();
        renderCard(onClick);

        await user.click(screen.getByRole("button", { name: /8\.4/ }));
        expect(onClick).toHaveBeenCalledTimes(1);
    });
});

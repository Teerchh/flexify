import { useState } from "react";
import BackToTop from "@/components/BackToTop";
import Search from "@/components/Search";
import WatchModal from "@/components/WatchModal";
import FavoritesSection from "@/components/sections/FavoritesSection";
import NowPlayingSection from "@/components/sections/NowPlayingSection";
import PopularSection from "@/components/sections/PopularSection";
import SearchResultsSection from "@/components/sections/SearchResultsSection";
import TopRatedSection from "@/components/sections/TopRatedSection";
import UpcomingSection from "@/components/sections/UpcomingSection";
import useDebounce from "@/hooks/useDebounce";
import type { Movie } from "@/types/movie";

export default function HomePage() {
    const [query, setQuery] = useState("");
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const debouncedQuery = useDebounce(query, 500);
    const trimmedQuery = debouncedQuery.trim();
    const isSearching = trimmedQuery.length > 0;

    const handleSelect = (movie: Movie) => setSelectedMovie(movie);

    return (
        <>
            <div className="pattern" />

            <div className="wrapper">
                <header>
                    <button
                        type="button"
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        aria-label="Movie App home — back to top"
                        className="block w-full cursor-pointer"
                    >
                        <img src="hero.png" alt="Hero Banner" />
                    </button>
                    <h1>
                        {" "}
                        Find <span className="text-gradient">Movies</span> You'll Enjoy without the Hassle
                    </h1>

                    <Search query={query} handleChange={setQuery} />
                </header>

                {isSearching ? (
                    <SearchResultsSection query={trimmedQuery} onSelect={handleSelect} onClear={() => setQuery("")} />
                ) : (
                    <>
                        <FavoritesSection onSelect={handleSelect} />
                        <NowPlayingSection onSelect={handleSelect} />
                        <UpcomingSection onSelect={handleSelect} />
                        <TopRatedSection onSelect={handleSelect} />
                        <PopularSection onSelect={handleSelect} />
                    </>
                )}
            </div>

            <WatchModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
            <BackToTop />
        </>
    );
}

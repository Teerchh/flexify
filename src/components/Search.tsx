import type { Dispatch, SetStateAction } from "react";

export type SearchProps = {
    query: string;
    handleChange: Dispatch<SetStateAction<string>>;
};

export default function Search({ query, handleChange }: SearchProps) {
    const clear = () => handleChange("");

    return (
        <div className="search" role="search">
            <div>
                <img src="search.svg" alt="" />

                <input
                    type="search"
                    aria-label="Search movies"
                    placeholder="Search through thousands of movies"
                    value={query}
                    onChange={(event) => handleChange(event.target.value)}
                />

                {query && (
                    <button
                        type="button"
                        onClick={clear}
                        aria-label="Clear search"
                        className="absolute right-2 flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                    >
                        ✕
                    </button>
                )}
            </div>
        </div>
    )
}

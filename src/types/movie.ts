export type Movie = {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
};

/** A streaming service (Netflix, Disney+, Prime Video, etc.) from TMDB's watch providers. */
export type Provider = {
    provider_id: number;
    provider_name: string;
    logo_path: string;
    display_priority: number;
};

/** The watch options for a movie in a single country. */
export type WatchProviderResult = {
    link?: string;
    flatrate?: Provider[]; // included in the streaming subscription
    rent?: Provider[];
    buy?: Provider[];
    free?: Provider[];
    ads?: Provider[];
};

/** Response from GET /movie/{id}/watch/providers, keyed by ISO 3166-1 country code. */
export type WatchProviders = {
    id: number;
    results: Record<string, WatchProviderResult>;
};

export type Genre = {
    id: number;
    name: string;
};

/** Full movie object from GET /movie/{id} — the subset the UI uses. */
export type MovieDetails = {
    id: number;
    title: string;
    overview: string;
    tagline: string | null;
    genres: Genre[];
    runtime: number | null;
    release_date: string;
    backdrop_path: string | null;
    poster_path: string | null;
    vote_average: number;
    status: string;
};

export type Video = {
    id: string;
    key: string;
    name: string;
    site: string; // e.g. "YouTube"
    size: number;
    type: string; // e.g. "Trailer"
    official: boolean;
    published_at: string;
};

/** Response from GET /movie/{id}/videos. */
export type VideosResponse = {
    id: number;
    results: Video[];
};

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";
const FALLBACK_IMAGE = "no-movie.png";

const POSTER_WIDTHS = [185, 342, 500] as const;

/** Build a TMDB poster URL at the given width, falling back to the local placeholder. */
export function posterUrl(path: string | null | undefined, width: number = 500): string {
    if (!path) return FALLBACK_IMAGE;
    return `${TMDB_IMAGE_BASE}/w${width}${path}`;
}

/** Responsive srcset for the poster, or undefined when there's no image path. */
export function posterSrcSet(path: string | null | undefined): string | undefined {
    if (!path) return undefined;
    return POSTER_WIDTHS.map((width) => `${TMDB_IMAGE_BASE}/w${width}${path} ${width}w`).join(", ");
}

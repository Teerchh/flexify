import type { Movie } from "@/App";

export default function TrendingCard({ movie: { poster_path }, index }: { movie: Movie, index: number }) {
    return (
        <li>
            <p>{index}</p>
            <img
                src={poster_path ?
                    `https://image.tmdb.org/t/p/w500/${poster_path}`
                    : "no-movie.png"}
                alt="movie poster"
                className="z-10"
            />
        </li>
    )
}
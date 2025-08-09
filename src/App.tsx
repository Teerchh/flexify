import '@/App.css'
import Search from '@/components/Search'
import { useEffect, useRef, useState } from 'react'
import Spinner from '@/components/Spinner';
import MovieCard from './components/MovieCard';
import TrendingCard from './components/TrendingCard';
import useTrending from './hooks/useTrending';
import usePopular from './hooks/usePopular';

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

function App() {
  const [query, setQuery] = useState("");

  const { data: trendingMovies, isPending: trendLoading, error } = useTrending();
  const { data, isPending, error: popularError, fetchNextPage, hasNextPage, isFetchingNextPage } = usePopular();

  const popularMovies = data?.pages?.flatMap((page) => page.results);
  const loading = isPending || trendLoading
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!loaderRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);



  return (
    <main>
      <div className='pattern' />

      <div className='wrapper'>
        <header>
          <img src='hero.png' alt='Hero Banner' />
          <h1> Find <span className='text-gradient'>Movies</span> You'll Enjoy without the Hassle</h1>

          <Search query={query} handleChange={setQuery} />
        </header>

        <section className='trending'>
          <h2>Trending</h2>

          {loading ? (
            <Spinner />
          ) : error?.message ?
            (<p className='text-red-500'>{error.message}</p>)
            : (
              <ul>
                {trendingMovies?.map((movie, index) => (
                  <TrendingCard key={movie.id} movie={movie} index={index + 1} />
                ))}
              </ul>
            )}

        </section>
        <section className="all-movies">
          <h2>Popular</h2>

          {loading ? (
            <Spinner />
          ) : popularError ?
            (<p className='text-red-500'>{popularError.message}</p>)
            :
            (
              <>
                <ul>
                  {popularMovies?.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </ul>
                <div ref={loaderRef} className='flex items-center justify-center'>
                  {isFetchingNextPage ? <Spinner /> : hasNextPage ? "Scroll to load more" : "No more movies"}
                </div>
              </>
            )
          }
        </section>
      </div>
    </main>
  )
}

export default App

# 🎬 Movie App

A simple, modern movie discovery web app built with **React 19**, **TypeScript**, and **Vite**. It pulls live movie data from the [TMDB (The Movie Database) API](https://developer.themoviedb.org/) to show now-playing, upcoming, top-rated, and discoverable movies — with infinite scrolling, routing, and "Where to Watch" info.

> **Note:** Search, favorites, trailers, routing, filtering, accessibility, and a shared types layer are implemented. See [Improvements](./IMPROVEMENTS.md) for what's next.

## ✨ Features

- 🎬 **Now Playing & Upcoming rows** — horizontally scrollable poster rows for films in theaters and coming soon
- 🔥 **Top Rated row** — horizontally scrollable list of the top-rated movies with rank badges
- 🎥 **Discover grid** — paginated movie grid with genre filter chips and a sort dropdown (popularity, rating, release date, revenue)
- ♾️ **Infinite scroll** — loads the next page for Discover and Search results when you reach the bottom
- 🧭 **Routing** — `react-router` with lazy-loaded pages: Home (`/`), Movie detail (`/movie/:id`), and Favorites (`/favorites`)
- 🍿 **Where to Watch** — see legal streaming providers (Stream/Rent/Buy) via TMDB + JustWatch on the detail page and quick-view modal
- 🎞️ **Movie detail + trailer** — dedicated detail page and modal with overview, tagline, runtime, genre chips, and an embedded YouTube trailer
- ❤️ **Favorites / Watchlist** — heart toggle on any card, persisted to `localStorage`, with a "My Favorites" section
- 🔍 **Search** — debounced (500ms) search with instant results and a "no movies found" empty state
- 🛡️ **Resilient UI** — skeleton loaders, an error boundary with retry, and friendly normalized error messages
- ⚡ **Fast data layer** — TanStack Query with sensible caching defaults + devtools
- ♿ **Accessible** — real buttons for cards, descriptive alt text, lazy-loaded images, ARIA-labelled search
- 🎨 **Tailwind CSS v4** styling with a custom dark theme

## 🧰 Tech Stack

| Layer         | Technology                                         |
| ------------- | -------------------------------------------------- |
| Framework     | [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org/) |
| Build tool    | [Vite](https://vite.dev) (SWC plugin)              |
| Data fetching | [TanStack Query](https://tanstack.com/query) v5 + [Axios](https://axios-http.com/) |
| Routing       | [react-router](https://reactrouter.com) v8 (lazy-loaded) |
| Styling       | [Tailwind CSS v4](https://tailwindcss.com)         |
| Testing       | [Vitest](https://vitest.dev) + [Testing Library](https://testing-library.com) |
| Package mgr   | [pnpm](https://pnpm.io)                            |

## 📋 Prerequisites

- [Node.js](https://nodejs.org) (v18+ recommended)
- [pnpm](https://pnpm.io/installation)
- A free **TMDB API key** — sign up at https://www.themoviedb.org/signup and request an API key

## 🚀 Getting Started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env.local` and fill in your TMDB credentials:

```bash
cp .env.example .env.local
```

```env
VITE_TMDB_API_KEY="your_tmdb_api_read_access_token"
VITE_API_URL="https://api.themoviedb.org/3"
```

> ⚠️ Use your TMDB **API Read Access Token** (v4 auth), which is sent as a `Bearer` token in requests.

### 3. Run the dev server

```bash
pnpm dev
```

Vite serves the app at [http://localhost:3000](http://localhost:3000).

### 4. Build for production

```bash
pnpm build
```

The output is emitted to the `dist/` folder. Preview it locally with:

```bash
pnpm preview
```

## � Deploy to Vercel

The project is Vercel-ready (Vite framework preset, see [`vercel.json`](./vercel.json)).

1. **Connect the repo** — push to GitHub, then import the repo in [Vercel](https://vercel.com/new) (or run `vercel` from the CLI). Vercel auto-detects the build: command `pnpm build`, output directory `dist`.
2. **Set environment variables** in Vercel → Project → Settings → Environment Variables:
   - `VITE_TMDB_API_KEY` — your TMDB API Read Access Token
   - `VITE_API_URL` — `https://api.themoviedb.org/3`
   - ⚠️ Without `VITE_TMDB_API_KEY`, the deployed app will show stuck loaders (the API returns 401).
3. **Deep links work** — `vercel.json` adds an SPA rewrite so routes like `/movie/550` and `/favorites` render correctly on refresh.

> 🔒 `VITE_*` variables are inlined into the client bundle at build time, so the TMDB read token is visible in the browser. This is expected and fine for TMDB client apps; to keep the token fully server-side, proxy the API through a Vercel serverless function instead (see [Improvements](./IMPROVEMENTS.md) #25).

## �📜 Available Scripts

| Script         | Description                                       |
| -------------- | ------------------------------------------------- |
| `pnpm dev`     | Start the Vite dev server (port 3000)             |
| `pnpm build`   | Type-check (`tsc -b`) then build with Vite        |
| `pnpm preview` | Preview the production build                      |
| `pnpm lint`    | Run ESLint on the project                         |
| `pnpm test`    | Run the Vitest unit tests                         |

## 🗂️ Project Structure

```
MovieApp/
├── public/                 # Static assets (hero, logos, icons, fallback images)
├── src/
│   ├── assets/             # App assets
│   ├── components/
│   │   ├── BackToTop.tsx  # Floating "back to top" button
│   │   ├── ErrorBoundary.tsx # Error boundary (also used as the route error boundary)
│   │   ├── ErrorState.tsx # Section-level error message + retry
│   │   ├── FavoriteButton.tsx # Heart toggle (uses favorites store)
│   │   ├── FavoritesProvider.tsx # Favorites context provider (localStorage)
│   │   ├── MovieCard.tsx  # Grid card (poster, rating, year, lang, hover overview)
│   │   ├── MovieRow.tsx   # Horizontal poster row (Now Playing, Upcoming)
│   │   ├── Search.tsx     # Header search input (controlled)
│   │   ├── sections/      # Favorites, NowPlaying, Upcoming, TopRated, Discover, SearchResults
│   │   ├── Skeleton.tsx   # Skeleton loading primitives
│   │   ├── Spinner.tsx    # Loading spinner
│   │   ├── TrendingCard.tsx # Ranked top-rated card
│   │   ├── WatchModal.tsx # Quick-view modal (detail + trailer)
│   │   └── WatchProvidersList.tsx # Shared "Where to Watch" provider rows
│   ├── constants/
│   │   └── genres.ts      # Genre list + sort options for Discover
│   ├── hooks/
│   │   ├── useDebounce.ts # Debounce hook (used by search)
│   │   ├── useFavorites.ts# useFavorites hook (reads favorites context)
│   │   ├── useMovieDetails.ts # useQuery for /movie/{id}
│   │   ├── useMovieVideos.ts  # useQuery for /movie/{id}/videos
│   │   ├── useNowPlaying.ts# useQuery for /movie/now_playing
│   │   ├── usePopular.ts   # useInfiniteQuery for discover/popular (genre + sort)
│   │   ├── useSearch.ts    # useInfiniteQuery for /search/movie
│   │   ├── useTrending.ts  # useQuery for top-rated movies
│   │   ├── useUpcoming.ts  # useQuery for /movie/upcoming
│   │   └── useWatchProviders.ts # useQuery for /movie/{id}/watch/providers
│   ├── libs/
│   │   ├── axios.lib.ts    # Axios client + error normalization interceptor
│   │   └── images.ts       # Responsive poster URL/srcset helpers
│   ├── pages/
│   │   ├── Layout.tsx      # Sticky nav + <Outlet/>
│   │   ├── HomePage.tsx    # Search + all home sections
│   │   ├── MoviePage.tsx   # Movie detail page (/movie/:id)
│   │   └── FavoritesPage.tsx # Favorites grid (/favorites)
│   ├── state/
│   │   └── favorites.ts    # Favorites context definition
│   ├── test/
│   │   └── setup.ts        # Jest-DOM matchers for Vitest
│   ├── types/
│   │   ├── api.ts          # API response types (PaginatedResponse, etc.)
│   │   └── movie.ts        # Movie, provider, detail & video types
│   ├── App.tsx             # Renders the router
│   ├── App.css             # Global/custom styles
│   ├── index.css           # Tailwind entry
│   ├── main.tsx            # QueryClient config + providers + devtools
│   └── router.tsx          # createBrowserRouter + lazy route config
├── .env.example            # Environment variable template
├── index.html              # HTML entry point
├── vite.config.ts          # Vite config (@ alias, Tailwind, port 3000)
└── vitest.config.ts        # Vitest config (jsdom, threads pool)
```

## 🔌 API Integration

- **Base URL:** `https://api.themoviedb.org/3` (from `VITE_API_URL`)
- **Auth:** `Authorization: Bearer <VITE_TMDB_API_KEY>` header set in `src/libs/axios.lib.ts`
- **Endpoints used:**
  - `GET /movie/now_playing?language=en-US&page=1` — "Now Playing" row
  - `GET /movie/upcoming?language=en-US&page=1` — "Upcoming" row
  - `GET /movie/top_rated?language=en-US&page=1` — "Top Rated" row
  - `GET /discover/movie?language=en-US&page={n}&sort_by=popularity.desc` — popular grid (paginated)
  - `GET /search/movie?query={q}&language=en-US&page=1` — debounced search results
  - `GET /movie/{id}/watch/providers` — streaming providers for the "Where to Watch" modal
  - `GET /movie/{id}` — movie details (overview, genres, runtime, tagline) for the modal
  - `GET /movie/{id}/videos` — trailers for the modal's embedded YouTube player

## 💡 Notable Implementation Details

- **Shared `Movie` type** lives in `src/types/movie.ts` (imported by hooks/components), with paginated API responses in `src/types/api.ts`; components export typed `Props` interfaces.
- **Infinite scroll** is implemented with a sentinel `<div>` observed by an `IntersectionObserver` in `App.tsx` (`threshold: 1.0`), which calls `fetchNextPage` from `usePopular`.
- **`keepPreviousData`** is used as `placeholderData` for list queries, so previous data stays visible while the next page/query loads.
- **Search** debounces the query (500ms) via `useDebounce`, calls `useSearch` (`/search/movie`), and swaps the main sections for a "Search Results" list with an empty state when nothing matches.
- **Where to Watch** opens a modal (`WatchModal`) on card click. It fetches `/movie/{id}/watch/providers`, picks the country from the browser locale (fallback: first available), groups providers by Stream/Rent/Buy/Free/Ads, and shows the required "Powered by JustWatch" attribution. It also loads movie details (`/movie/{id}`) and an embedded YouTube trailer (`/movie/{id}/videos`).
- **Favorites** are stored in `localStorage` through a `FavoritesProvider` context (`src/state/favorites.ts` + `src/components/FavoritesProvider.tsx`), consumed via `useFavorites()`; a heart toggle on every card updates the "My Favorites" section.
- **Error handling** — an axios response interceptor normalizes API errors into friendly messages, each section shows `ErrorState` with a retry, and an `ErrorBoundary` wraps the app.
- **Loading UX** — skeleton placeholders (`Skeleton`/`CardSkeleton`/`PosterSkeleton`) replace spinners while queries load.
- **Query defaults** — the shared `QueryClient` in `main.tsx` sets `staleTime: 5m`, `gcTime: 1h`, `refetchOnWindowFocus: false`, `retry: 1`, and mounts `ReactQueryDevtools` in dev.
- The path alias `@` maps to `./src` (configured in both `vite.config.ts` and `tsconfig`).
- The dev server is configured to run on **port 3000**.

## 🧪 Linting

Run ESLint with:

```bash
pnpm lint
```

The project ships with an ESLint 9 flat config (`eslint.config.js`) using the recommended TypeScript + React Hooks rules from the Vite template.

## 📄 License

This project is for demonstration/learning purposes. Data and images are provided by [TMDB](https://www.themoviedb.org/) and are subject to their terms of use.

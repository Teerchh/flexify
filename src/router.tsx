/* eslint-disable react-refresh/only-export-components -- router config is a module, not a component file */
import { lazy, Suspense, type ComponentType } from "react";
import Spinner from "@/components/Spinner";
import { createBrowserRouter } from "react-router";
import ErrorBoundary from "./components/ErrorBoundary";
import Layout from "./pages/Layout";

// Pages are lazy-loaded so each route is code-split and fetched on demand.

function PageFallback() {
    return (
        <div className="wrapper">
            <div className="flex min-h-[60vh] items-center justify-center">
                <Spinner />
            </div>
        </div>
    );
}

function lazyElement(loader: () => Promise<{ default: ComponentType }>) {
    const Component = lazy(loader);
    return (
        <Suspense fallback={<PageFallback />}>
            <Component />
        </Suspense>
    );
}

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        ErrorBoundary: ErrorBoundary,
        children: [
            { index: true, element: lazyElement(() => import("./pages/HomePage")) },
            { path: "movie/:id", element: lazyElement(() => import("./pages/MoviePage")) },
            { path: "favorites", element: lazyElement(() => import("./pages/FavoritesPage")) },
        ],
    },
]);

export default router;

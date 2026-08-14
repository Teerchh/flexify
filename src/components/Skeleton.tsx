type SkeletonProps = {
    className?: string;
};

export function Skeleton({ className = "" }: SkeletonProps) {
    return <div aria-hidden="true" className={`animate-pulse rounded-lg bg-white/10 ${className}`} />;
}

/** Skeleton for a single poster (Now Playing / Upcoming / Top Rated rows). */
export function PosterSkeleton() {
    return <Skeleton className="h-[163px] w-[127px] shrink-0" />;
}

/** Skeleton for a full movie card (Popular / Search / Favorites grids). */
export function CardSkeleton() {
    return (
        <div className="movie-card">
            <Skeleton className="aspect-[2/3] w-full" />
            <div className="mt-4 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
            </div>
        </div>
    );
}

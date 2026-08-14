import Spinner from "@/components/Spinner";
import useWatchProviders from "@/hooks/useWatchProviders";
import type { Provider } from "@/types/movie";

type ProviderGroup = {
    label: string;
    providers?: Provider[];
};

/** Pick the user's ISO 3166-1 region from the browser locale, e.g. "en-US" -> "US". */
function getUserRegion(): string {
    const locale = typeof navigator !== "undefined" ? navigator.language : "en-US";
    const parts = locale.split("-");
    const region = parts.length > 1 ? parts[1].toUpperCase() : "US";
    return /^[A-Z]{2}$/.test(region) ? region : "US";
}

function ProviderRow({ label, providers }: ProviderGroup) {
    if (!providers || providers.length === 0) return null;

    return (
        <div className="mt-5">
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-light-200">{label}</h4>
            <div className="flex flex-wrap gap-3">
                {providers.map((provider) => (
                    <div
                        key={provider.provider_id}
                        className="flex flex-col items-center gap-1"
                        title={provider.provider_name}
                    >
                        <img
                            src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`}
                            alt={`${provider.provider_name} logo`}
                            loading="lazy"
                            className="h-12 w-12 rounded-lg bg-white/10 object-contain p-1"
                        />
                        <span className="max-w-[72px] truncate text-center text-[10px] text-gray-100">
                            {provider.provider_name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

type WatchProvidersListProps = {
    movieId: number;
    title: string;
};

/** Where a movie can be streamed/rented/bought, grouped by provider type. */
export default function WatchProvidersList({ movieId, title }: WatchProvidersListProps) {
    const { data, isLoading, error } = useWatchProviders(movieId);

    const region = getUserRegion();
    const results = data?.results ?? {};
    const country = results[region] ?? Object.values(results)[0];
    const groups: ProviderGroup[] = [
        { label: "Stream", providers: country?.flatrate },
        { label: "Rent", providers: country?.rent },
        { label: "Buy", providers: country?.buy },
        { label: "Free", providers: country?.free },
        { label: "With Ads", providers: country?.ads },
    ];
    const hasProviders = groups.some((group) => group.providers && group.providers.length > 0);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-8">
                <Spinner />
            </div>
        );
    }

    if (error) {
        return <p className="mt-3 text-red-500">Couldn't load streaming info. Please try again.</p>;
    }

    return (
        <div className="mt-3">
            <p className="text-sm text-gray-100">
                Where you can watch <span className="font-semibold text-white">{title}</span>
                {region !== "US" ? ` in ${region}` : ""}:
            </p>

            {hasProviders ? (
                groups.map((group) => <ProviderRow key={group.label} {...group} />)
            ) : (
                <div className="mt-3 text-center">
                    <p className="text-gray-100">No streaming info available for this movie.</p>
                    {country?.link && (
                        <a
                            href={country.link}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-3 inline-block font-semibold text-light-100 underline"
                        >
                            Check TMDB for options →
                        </a>
                    )}
                </div>
            )}

            <p className="mt-5 text-[10px] text-gray-100">Powered by JustWatch</p>
        </div>
    );
}

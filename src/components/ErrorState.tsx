type ErrorStateProps = {
    message?: string;
    onRetry?: () => void;
};

export default function ErrorState({ message, onRetry }: ErrorStateProps) {
    return (
        <div className="py-8 text-center">
            <p className="text-red-500">{message ?? "Something went wrong."}</p>
            {onRetry && (
                <button
                    type="button"
                    onClick={onRetry}
                    className="mt-3 rounded-lg bg-linear-to-r from-[#D6C7FF] to-[#AB8BFF] px-4 py-2 text-sm font-semibold text-primary"
                >
                    Try again
                </button>
            )}
        </div>
    );
}

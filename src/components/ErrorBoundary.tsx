import { Component, type ReactNode } from "react";

type ErrorBoundaryProps = {
    children?: ReactNode;
    /** Provided by react-router when this is used as a route ErrorBoundary. */
    error?: unknown;
};

type ErrorBoundaryState = {
    hasError: boolean;
    message?: string;
};

function errorMessage(error: unknown): string {
    if (error instanceof Error) return error.message;
    if (typeof error === "string") return error;
    return "Something went wrong.";
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state: ErrorBoundaryState = { hasError: false };

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, message: error.message };
    }

    render() {
        const routeError = this.props.error;
        const hasFailed = this.state.hasError || routeError !== undefined;

        if (hasFailed) {
            return (
                <div className="py-16 text-center">
                    <p className="text-red-500">{errorMessage(routeError ?? this.state.message)}</p>
                    <button
                        type="button"
                        onClick={() => {
                            if (routeError !== undefined) {
                                window.location.reload();
                            } else {
                                this.setState({ hasError: false });
                            }
                        }}
                        className="mt-3 rounded-lg bg-linear-to-r from-[#D6C7FF] to-[#AB8BFF] px-4 py-2 text-sm font-semibold text-primary"
                    >
                        Try again
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

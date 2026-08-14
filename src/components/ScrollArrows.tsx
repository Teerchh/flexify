type ScrollArrowsProps = {
    canLeft: boolean;
    canRight: boolean;
    onLeft: () => void;
    onRight: () => void;
};

const arrowClass =
    "absolute top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/70 text-lg text-white shadow-lg transition hover:scale-105 hover:bg-black/90";

/** Overlay scroll arrows for a horizontally scrollable row. */
export default function ScrollArrows({ canLeft, canRight, onLeft, onRight }: ScrollArrowsProps) {
    return (
        <>
            {canLeft && (
                <button type="button" onClick={onLeft} aria-label="Scroll left" className={`${arrowClass} left-0`}>
                    ◀
                </button>
            )}
            {canRight && (
                <button type="button" onClick={onRight} aria-label="Scroll right" className={`${arrowClass} right-0`}>
                    ▶
                </button>
            )}
        </>
    );
}

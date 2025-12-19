
export function LoadingIndicator() {
    return (
        <div className="fixed inset-0 bg-background z-50 flex items-center justify-center">
            <div className="relative h-10 w-10">
                <div className="absolute h-full w-full rounded-full bg-[conic-gradient(from_90deg_at_50%_50%,white_0%,white_50%,transparent_100%)] animate-spin"></div>
                <div className="absolute inset-[2px] rounded-full bg-background"></div>
            </div>
        </div>
    );
}

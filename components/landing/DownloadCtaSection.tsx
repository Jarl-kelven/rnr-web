import GooglePlayBadge from "@/components/ui/google-play-badge";
import AppStoreBadge from "@/components/ui/app-store-badge";

export default function DownloadCtaSection() {
    return (
        <section className="bg-primary py-24 md:py-32">
            <div className="container text-center text-primary-foreground">
                <h2 className="text-4xl font-black leading-tight tracking-tighter md:text-5xl">
                    Download RideAndRest Today
                </h2>
                <p className="mt-6 max-w-2xl mx-auto text-lg text-primary-foreground/90 md:text-xl">
                    Unlock a world of unparalleled convenience and comfort for your future
                    trips, all from the palm of your hand.
                </p>
                <div className="mt-16 flex flex-col items-center justify-center gap-8 sm:flex-row">
                    <GooglePlayBadge theme="light" />
                    <AppStoreBadge theme="light" />
                </div>
            </div>
        </section>
    );
}
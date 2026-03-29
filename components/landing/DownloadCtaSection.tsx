
import { Button } from "@/components/ui/button";

export default function DownloadCtaSection() {
    return (
        <section className="bg-primary flex items-center justify-center h-96 py-7 md:py-32">
            <div className="container text-center text-primary-foreground">
                <h2 className="text-4xl font-black leading-tight tracking-tighter md:text-5xl">
                    Download RideAndRest Today
                </h2>
                <p className="mt-6 font-extralight max-w-2xl mx-auto text-lg text-primary-foreground/90 md:text-xl">
                    Unlock a world of unparalleled convenience and comfort for your future
                    trips, all from the palm of your hand.
                </p>
                <div className="mt-16 flex flex-col items-center justify-center gap-8 sm:flex-row">
                    <Button className="px-12 py-6.5 text-md border-4 border-white bg-white text-primary rounded-[13px] cursor-pointer" variant={"plain"}>Download Passenger App</Button>
                    <Button className="px-12 py-6.5 text-md bg-transparent border-4 border-white rounded-[13px] cursor-pointer">Download Driver App</Button>
                </div>
            </div>
        </section>
    );
}
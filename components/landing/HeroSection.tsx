import Image from "next/image";
import TextTypewriter from "@/components/ui/text-typewriter";
import GooglePlayBadge from "@/components/ui/google-play-badge";
import AppStoreBadge from "@/components/ui/app-store-badge";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
    
    
    const heroPhrases = [
        "Ride Safely. Rest Comfortably.",
        "Your Trusted Journey Companion.",
        "Premium Fleet. Vetted Stays.",
        "Arrive in Style. Stay in Luxury."
    ];
    return (
        <section className="relative flex min-h-screen w-full items-center justify-center pt-20">
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/hero-bg.png"
                    alt="Luxury Car on highway"
                    fill
                    priority
                    className="object-cover"
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+FNPQAI/wM6mS+S8QAAAABJRU5ErkJggg=="
                />
                <div className="absolute inset-0 bg-black/70" />
            </div>
            <div className="container relative z-10 flex flex-col items-center text-center text-primary-foreground">
                <TextTypewriter
                    phrases={heroPhrases}
                    pauseDuration={3000} // 3 seconds is usually best for readability, but you can change to 30000
                    className="text-4xl md:text-7xl font-black tracking-tighter"
                />
                <p className="mt-8 max-w-2xl text-lg text-primary-foreground/90 sm:text-xl">
                    The ultimate executive ecosystem for your journey, bringing reliable
                    rides and handpicked stays together in one powerful platform.
                </p>
                <div className="mt-12 flex flex-col items-center gap-8 md:flex-row">
                    <div className="flex flex-col gap-4 sm:flex-row">
                        <GooglePlayBadge />
                        <AppStoreBadge />
                    </div>
                    <Button variant="outline" size="lg">
                        Book Now
                    </Button>
                </div>
            </div>
        </section>
    );
}
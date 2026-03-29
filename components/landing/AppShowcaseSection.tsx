import ShowcasePhone from "@/components/ui/showcase-phone";

const phoneScreens = [
    { src: "/images/phone-1.png", alt: "App Splash Screen" },
    { src: "/images/phone-2.png", alt: "Map Tracking" },
    { src: "/images/phone-3.png", alt: "Hotel Listing" },
    { src: "/images/phone-4.png", alt: "Profile & History" },
];

export default function AppShowcaseSection() {
    return (
        <section className="bg-muted flex items-center justify-center py-24 md:py-32">
            <div className="container text-center">
                <h2 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
                    Simple. Intuitive. Powerful
                </h2>
                <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground md:text-xl">
                    Experience our robust tools at a glance. We’ve made navigation intuitive
                    so you can focus on your journey.
                </p>
                <div className="mt-20 grid grid-cols-2 gap-10 md:grid-cols-4 lg:grid-cols-4">
                    {phoneScreens.map((screen, index) => (
                        <ShowcasePhone key={index} {...screen} delay={index * 150} />
                    ))}
                </div>
            </div>
        </section>
    );
}
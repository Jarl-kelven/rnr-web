'use client';

import FeatureItem from "@/components/ui/feature-item";
import { ShieldCheck, MapPin, Zap, Star } from "lucide-react";



const features = [
    { icon: ShieldCheck, text: "Verified Drivers" },
    { icon: MapPin, text: "Real-time Tracking" },
    { icon: Zap, text: "Instant Booking" },
    { icon: Star, text: "Premium Hotels" },
    { icon: ShieldCheck, text: "24/7 Support" },
    { icon: Zap, text: "Transparent Pricing" },
];

export default function FeaturesSection() {
    return (
        <section className="bg-accent/10 flex items-center justify-center py-24 md:py-32">
            <div className="container text-center">
                <h2 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
                    Packed with Powerful Features
                </h2>
                <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground md:text-xl">
                    Every tool you need for a seamless journey, built with precision and care
                    to make your experience effortless.
                </p>
                <div className="mt-16 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => (
                        <FeatureItem
                            key={index}
                            icon={feature.icon}
                            text={feature.text}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
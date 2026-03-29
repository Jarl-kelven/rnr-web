'use client';

import BenefitCard from "@/components/ui/benefit-card";
import { Car, Hotel, Target } from "lucide-react";

const benefits = [
    {
        icon: Car,
        title: "One-Stop App",
        description: "Manage your entire trip, from a quick city ride to your curated hotel stay, all from a single, seamless platform.",
    },
    {
        icon: Hotel,
        title: "Vetted Stays",
        description: "Every hotel is handpicked to meet our strict standards for quality and comfort, ensuring you rest easy, every single time.",
    },
    {
        icon: Target,
        title: "Reliable Rides",
        description: "Our fleet and trained drivers are committed to your safety and punctuality, offering dependable transport whenever you need it.",
    },
];

export default function BenefitsSection() {
    return (
        <section className="bg-muted flex items-center justify-center m-auto py-24 md:py-32">
            <div className="container text-center">
                <h2 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
                    Complete Journey Solution
                </h2>
                <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground md:text-xl">
                    We bring unparalleled convenience to your travels, combining trusted
                    transport and curated stays on a single platform.
                </p>
                <div className="mt-20 grid gap-10 md:grid-cols-3">
                    {benefits.map((benefit, index) => (
                        <BenefitCard
                            key={index}
                            icon={benefit.icon}
                            title={benefit.title}
                            description={benefit.description}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
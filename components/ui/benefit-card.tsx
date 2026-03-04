"use client";

import { LucideIcon } from 'lucide-react';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

interface BenefitCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
    className?: string;
}

export default function BenefitCard({
    icon: Icon,
    title,
    description,
    className
}: BenefitCardProps) {
    return (
        <div className={cn(
            "group relative flex flex-col items-center p-8 rounded-[32px] transition-all duration-300",
            "bg-white dark:bg-card border border-transparent hover:border-primary/10 hover:shadow-2xl hover:shadow-primary/5",
            className
        )}>
            {/* Icon Container with your branded light orange background */}
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-light text-primary transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
                <Icon size={28} strokeWidth={2.5} />
            </div>

            {/* Content */}
            <Text
                as="h3"
                className="mb-3 text-xl font-black tracking-tight text-foreground"
            >
                {title}
            </Text>

            <Text
                variant="muted"
                className="text-center leading-relaxed max-w-60"
            >
                {description}
            </Text>

            {/* Subtle decorative element that appears on hover */}
            <div className="absolute bottom-4 right-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
            </div>
        </div>
    );
}
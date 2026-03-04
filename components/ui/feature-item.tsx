"use client";
import { LucideIcon } from 'lucide-react';
import { Text } from '@/components/ui/text';

interface FeatureItemProps {
    icon: LucideIcon;
    text: string;
    description?: string;
}

export default function FeatureItem({ icon: Icon, text, description }: FeatureItemProps) {
    return (
        <div className="group flex items-center gap-5 p-6 rounded-2xl bg-white dark:bg-card border border-border/40 hover:border-primary/20 transition-all duration-300">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon size={22} />
            </div>
            <div className="flex flex-col text-left">
                <Text className="font-bold text-base md:text-lg leading-tight">
                    {text}
                </Text>
                <Text variant="muted" className="text-xs md:text-sm mt-1">
                    {description || "Travel with peace of mind with our vetted drivers."}
                </Text>
            </div>
        </div>
    );
}
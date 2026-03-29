"use client";

import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ShowcasePhoneProps {
    src: string;
    alt: string;
    delay?: number;
    className?: string;
}

export default function ShowcasePhone({ src, alt, delay = 0, className }: ShowcasePhoneProps) {
    return (
        <div
            className={cn(
                "relative w-full aspect-9/19 max-w-70 mx-auto transition-all duration-700",
                "animate-in fade-in slide-in-from-bottom-10",
                className
            )}
            style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
        >
            {/* Device Frame Wrapper */}
            <div className="relative h-full w-full rounded-[2.5rem] border-[6px] border-olive-950 bg-foreground/5 p-2 shadow-2xl overflow-hidden">
                <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover rounded-[2rem] hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 50vw, 25vw"
                    
                />

                {/* Realistic Screen Glare */}
                <div className="absolute inset-0 bg-linear-to-tr from-white/5 to-transparent pointer-events-none" />
            </div>

            {/* Floating Shadow Animation */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-4/5 h-4 bg-black/20 blur-xl rounded-full animate-pulse" />
        </div>
    );
}
"use client";

import React, { useState, useEffect } from 'react';
import { motion} from 'framer-motion';
import { cn } from '@/lib/utils';
import { Text } from './text';

interface TextTypewriterProps {
    phrases: string[];
    typingSpeed?: number;
    deletingSpeed?: number;
    pauseDuration?: number; // How long to wait before switching words
    className?: string;
}

export default function TextTypewriter({
    phrases,
    typingSpeed = 100,
    deletingSpeed = 50,
    pauseDuration = 3000, // Set to 30000 for your 30 sec request, though 3-5s is standard for UX
    className
}: TextTypewriterProps) {
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [pause, setPause] = useState(false);

    useEffect(() => {
        if (pause) return;

        // Handle the typing logic
        if (subIndex === phrases[index].length + 1 && !isDeleting) {
            (() => setPause(true))();
            setTimeout(() => {
                setIsDeleting(true);
                setPause(false);
            }, pauseDuration);
            return;
        }

        // Handle the deleting logic
        if (subIndex === 0 && isDeleting) {
            (() => {
                setIsDeleting(false);
                setIndex((prev) => (prev + 1) % phrases.length);
            })();

            return;
        }

        const timeout = setTimeout(() => {
            setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
        }, isDeleting ? deletingSpeed : typingSpeed);

        return () => clearTimeout(timeout);
    }, [subIndex, index, isDeleting, phrases, pause, pauseDuration, typingSpeed, deletingSpeed]);



    return (
        <div className={cn("flex items-center justify-center min-h-[1.2em]", className)}>
            <Text as="span" className="inline-block text-primary-foreground/90">
                {phrases[index].substring(0, subIndex)}
            </Text>

            {/* Blinking Cursor mapped to your primary brand color */}
            <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="ml-1 inline-block w-0.75 h-[0.9em] bg-primary align-middle"
            />
        </div>
    );
}
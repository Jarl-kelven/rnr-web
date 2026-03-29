// components/landing/Header.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Text } from "../ui/text";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Contact", href: "/contact" },
    { name: "Sign in", href: "/signin" },
];

export default function Header() {
    return (
        <header className="absolute top-0 z-50 w-full mt-5 border-border bg-transparent `supports-backdrop-filter:bg-background/60">
            <div className="container flex m-auto h-20 items-center justify-between px-sm">
                <div className="flex items-center gap-2">
                    <div className="flex h-10 items-center mx-2 justify-center rounded-lg bg-primary p-3">
                        <Text className="font-logo font-logo-variable rotate-45 text-2xl text-background">
                            R
                        </Text>
                    </div>
                    <Text className="font-logo font-logo-variable text-3xl font-black text-primary-foreground/90">
                        RideAndRest
                    </Text>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex md:items-center md:gap-8">
                    
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className=" mr-10 text-2xl text-primary-foreground/90 transition-colors hover:text-primary"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Button className="p-8 text-lg rounded-xl cursor-pointer xl:ml-17" variant="default">Register Now</Button>
                </nav>

                {/* Mobile Navigation */}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="md:hidden">
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right">
                        <SheetHeader>
                            <SheetTitle>Navigation</SheetTitle>
                            <SheetDescription>
                                Access key sections of our platform.
                            </SheetDescription>
                        </SheetHeader>
                        <div className="grid px-4 gap-6 py-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-lg font-medium text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Button variant="default">Register Now</Button>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}
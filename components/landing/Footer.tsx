import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Text } from "../ui/text";

const footerSections = [
    {
        title: "Quick Links",
        links: [
            { name: "Support", href: "#" },
            { name: "FAQ", href: "#" },
            { name: "Terms of Service", href: "#" },
        ],
    },
    {
        title: "Navigation",
        links: [
            { name: "Our Fleet", href: "#" },
            { name: "vetted Stays", href: "#" },
            { name: "Become Partner", href: "#" },
        ],
    },
    {
        title: "Get in Touch",
        links: [{ icon: Mail, name: "support@rnr.ng", href: "mailto:support@rnr.ng" }],
    },
];

export default function Footer() {
    return (
        <footer className="bg-foreground py-20 text-primary-foreground/80">
            <div className="container grid gap-12 md:grid-cols-footer">
                {/* Brand & Social */}
                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-2">
                        <div className="flex h-10 items-center justify-center rounded-lg bg-primary p-2">
                            <Text className="font-logo font-logo-variable rotate-45 text-2xl text-background">
                                R
                            </Text>
                        </div>
                        <Text className="font-logo font-logo-variable text-3xl font-black text-primary-foreground">
                            RideAndRest
                        </Text>
                    </div>
                    <p className="max-w-md text-sm">
                        Bringing executive convenience to the Nigerian traveler through trusted
                        rides and curated hotel stays, all in one seamless companion.
                    </p>
                    <div className="flex gap-4">
                        <Link href="#" className="hover:text-primary-foreground">
                            <Facebook className="h-5 w-5" />
                        </Link>
                        <Link href="#" className="hover:text-primary-foreground">
                            <Twitter className="h-5 w-5" />
                        </Link>
                        <Link href="#" className="hover:text-primary-foreground">
                            <Instagram className="h-5 w-5" />
                        </Link>
                        <Link href="#" className="hover:text-primary-foreground">
                            <Linkedin className="h-5 w-5" />
                        </Link>
                    </div>
                </div>

                {/* Links */}
                <div className="grid grid-cols-2 gap-10 md:grid-cols-3">
                    {footerSections.map((section) => (
                        <div key={section.title}>
                            <h4 className="text-sm font-bold uppercase tracking-wider text-primary-foreground">
                                {section.title}
                            </h4>
                            <nav className="mt-6 flex flex-col gap-4 text-sm">
                                {section.links.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className="hover:text-primary-foreground"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    ))}
                </div>

                {/* Newsletter */}
                <div className="flex flex-col gap-6">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-primary-foreground">
                        Our Newsletters
                    </h4>
                    <p className="text-sm">
                        Sign up for the latest updates on new services, vetted hotels, and trip
                        tips.
                    </p>
                    <form className="flex gap-2">
                        <Input
                            type="email"
                            placeholder="Your email address"
                            className="border-primary-foreground/20 text-foreground bg-primary-foreground"
                        />
                        <Button variant="default">Subscribe</Button>
                    </form>
                </div>
            </div>
            <div className="container mt-16 border-t border-primary-foreground/10 pt-8 text-center text-xs">
                <p>&copy; 2024 RideAndRest Solutions. All rights reserved.</p>
            </div>
        </footer>
    );
}
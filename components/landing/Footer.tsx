import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPinIcon, Phone } from "lucide-react";
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
        links: [
            { icon: MapPinIcon, name: "123 Example street, Victoria Island, Lagos, Nigeria", href: "mailto:support@rnr.ng" },
            { icon: Mail, name: "support@rnr.ng", href: "mailto:support@rnr.ng" },
            { icon: Phone, name: "07012345567, 08012345567", href: "mailto:support@rnr.ng" },
        ],
    },
];

export default function Footer() {
    return (
        <footer className="bg-secondary-foreground pt-20 pb-7 text-primary-foreground/80">
            <div className="container m-auto px-5 md:px-20 grid gap-12 md:grid-cols-footer">
                <div className="flex flex-col gap-6 my-9 justify-between items-start md:gap-20 md:justify-start  md:flex-row">
                    {/* Brand & Social */}
                    <div className="mr-25">
                        {/* Logo */}
                        <div className="-mt-10.75 mb-20 md:mt-0 flex items-center gap-2">
                            <div className="flex h-10 items-center justify-center rounded-lg bg-primary p-3">
                                <Text className="font-logo font-logo-variable rotate-45 text-2xl text-background">
                                    R
                                </Text>
                            </div>
                            <Text className="font-logo font-logo-variable text-3xl font-black text-primary-foreground">
                                RideAndRest
                            </Text>
                        </div>
                        
                    </div>

                    {/* Links */}
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-0">
                        {footerSections.map((section) => (
                            <div key={section.title}>
                                <h4 className=" md:text-xl font-bold uppercase tracking-wider text-primary-foreground">
                                    {section.title}
                                </h4>
                                <nav className="mt-2 md:mt-6 font-light items-start flex flex-col gap-2 text-xs md:text-sm">
                                    {section.links.map((link) => (
                                        <Link
                                            key={link.name}
                                            href={link.href}
                                            className="hover:text-primary-foreground flex gap-2 items-center"
                                        >
                                                {link.icon && <link.icon className="h-4 w-4 md:w-6 md:h-6  md:my-2.5 shrink-0" />}
                                                <span>{link.name}</span>

                                        </Link>
                                    ))}
                                </nav>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Newsletter */}

                <div className="flex mt-14 justify-between items-start gap-12 md:gap-20 flex-col md:flex-row md:justify-between text-start md:items-start">
                    <div className="w-sm">
                        <p className="my-6  font-light">Questions or updates? Follow us on social media! Contact us!</p>
                        <div  className="flex gap-6">
                            <Link href="#" className="hover:text-primary-foreground">
                                <Facebook className="h-8 w-8 md:h-16 md:w-16" />
                            </Link>
                            <Link href="#" className="hover:text-primary-foreground">
                                <Twitter className="h-8 w-8 md:h-16 md:w-16" />
                            </Link>
                            <Link href="#" className="hover:text-primary-foreground">
                                <Instagram className="h-8 w-8 md:h-16 md:w-16" />
                            </Link>
                            <Link href="#" className="hover:text-primary-foreground">
                                <Linkedin className="h-8 w-8 md:h-16 md:w-16" />
                            </Link>

                        </div>
                    </div>

                    <div className="flex flex-col gap-3 md:gap-6">
                        <h4 className="text-lg md:text-3xl font-bold uppercase tracking-wider text-primary-foreground">
                            Our Newsletters
                        </h4>
                        <p className="text-xs md:text-sm font-light">
                            Sign up for the latest updates on new services, vetted hotels, and trip
                            tips.
                        </p>
                        <form className="flex w-full max-w-md items-center justify-between rounded-4xl bg-primary p-3">
                            <Input
                                type="email"
                                placeholder="Enter your email address"
                                className="flex-1 font-light bg-primary border-none px-3 py-2 text-primary-foreground placeholder:text-primary-foreground focus:outline-none"
                            />
                            <Button
                               
                                type="submit"
                                className="ml-2 font-light bg-gray-900 rounded-xl px-5 py-2 text-white hover:cursor-pointer"
                            >
                                Subscribe
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center mt-16 border-t border-primary-foreground/10 pt-4 text-xs">
                <p>&copy; 2024 RideAndRest Solutions. All rights reserved.</p>
            </div>
        </footer>
    );
}
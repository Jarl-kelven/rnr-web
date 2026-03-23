"use client";

import { Sidebar } from '@/components/hotel-manager-dashboard/Sidebar';
import { MobileNav } from '@/components/hotel-manager-dashboard/MobileNav';
import { ListingsProvider } from '@/context/ListingContect';

export default function HotelManagerLayout({ children }: { children: React.ReactNode }) {
    return (
        <ListingsProvider>
            <div className="flex min-h-screen bg-background text-foreground">
                {/* Sidebar: Hidden on mobile, fixed width on desktop */}
                <aside className="hidden md:flex w-64 flex-col border-r border-border sticky top-0 h-screen">
                    <Sidebar role="Hotel Manager" />
                </aside>

                <div className="flex-1 flex flex-col">
                    {/* Mobile Header: Visible only on small screens */}
                    <header className="md:hidden sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur">
                        <MobileNav />
                    </header>

                    <main className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto w-full">
                        {children}
                    </main>
                </div>
            </div>
        </ListingsProvider>
    );
}
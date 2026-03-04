"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, PlusCircle, Hotel, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Text } from "@/components/ui/text";

const menuItems = [
    { name: "Overview", href: "/dashboard/hotel-manager", icon: LayoutDashboard },
    { name: "List New Room", href: "/dashboard/hotel-manager/upload", icon: PlusCircle },
    { name: "My Listings", href: "/dashboard/hotel-manager/listings", icon: Hotel },
    { name: "Settings", href: "/dashboard/hotel-manager/settings", icon: Settings },
];

export function Sidebar({ role }: { role: string }) {
    const pathname = usePathname();

    return (
        <div className="flex h-full flex-col bg-card p-6">
            <div className="mb-10 flex items-center gap-2 px-2">
                <div className="h-8 w-8 bg-primary rounded flex items-center justify-center text-background font-black rotate-45">R</div>
                <Text variant="logo" className="text-xl">RNR</Text>
            </div>

            <nav className="flex-1 space-y-2">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium group",
                                isActive
                                    ? "bg-primary/10 text-primary"
                                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                            )}
                        >
                            <item.icon size={20} className={cn(isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="pt-6 border-t border-border">
                <button className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-destructive transition-colors w-full">
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
}
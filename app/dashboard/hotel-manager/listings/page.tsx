"use client";

import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { PlusCircle, Search } from "lucide-react";
import ListingCard from "@/components/ListingCard";
import { ListingDataTypes, RoomStatus } from "@/types/listings";
import { UseListings } from "@/context/ListingContect";
import { useRouter } from "next/navigation";


export default function ListingsPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("Home");
    const [homeFilter, setHomeFilter] = useState("All");

    const { listings: rooms, updateListing: setRooms, deleteListing: setDeleteRoom } = UseListings();

    // Logic to filter rooms based on Tab and then Status
    const filteredRooms = rooms.filter(room => {
        if (activeTab !== "Home" && room.tab !== activeTab) return false;
        if (activeTab === "Home" && room.tab !== "Home") return false;
        if (activeTab === "Home" && homeFilter !== "All" && room.status !== homeFilter) return false;
        return true;
    });

    const continueWriting = (id: string) => {
        router.push('./draft/' + id)
    };

    const updateStock = (id: string, mathType: 'minus' | 'plus') => {
        const listing = rooms.find(r => r.id === id);
        let getInventory = parseInt(listing?.inventory || '0');
        if (getInventory === 0 && mathType === 'minus') return;

        const inventory = (mathType === 'plus' ? getInventory = getInventory + 1 : getInventory = getInventory - 1).toString();
        setRooms(id, { inventory });
    };

    const updateStatus = (id: string, newStatus: RoomStatus) => {
        setRooms(id, { status: newStatus });
    };
    const updateTab = (id: string, newTab: ListingDataTypes['tab']) => {
        setRooms(id, { tab: newTab });
    };
    const edit = (id: string) => {
        router.push('./edit/' + id)
    };

    const restore = (id: string) => {
        setRooms(id, { tab: "Home" });
        setRooms(id, { status: "Pending" });

    };

    const deleteListing = (id: string) => {
        setRooms(id, { status: "Down" });
        setDeleteRoom(id);
    };
    

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <Text variant="h1" className="text-3xl font-black tracking-tighter">Room Listings</Text>
                    <div />
                    <Text variant="muted">Manage your {rooms.length} inventory items.</Text>
                </div>
                <Button className="h-14 px-8 rounded-2xl font-bold gap-2 shadow-lg shadow-primary/20">
                    <PlusCircle size={20} /> List New Room
                </Button>
            </div>

            {/* Tabs System */}
            <div className="flex border-b border-border/60 gap-10">
                {["Home", "Draft", "Trash"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => { setActiveTab(tab); setHomeFilter("All"); }}
                        className={cn(
                            "pb-4 text-xs font-black tracking-[0.2em] uppercase transition-all relative",
                            activeTab === tab ? "text-primary" : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        {tab}
                        {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-1 bg-primary rounded-t-full" />}
                    </button>
                ))}
            </div>

            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                {activeTab === "Home" && (
                    <div className="flex flex-wrap items-center gap-2">
                        {["All", "Live", "Down", "Pending", "Rejected"].map((f) => (
                            <button
                                key={f}
                                onClick={() => setHomeFilter(f)}
                                className={cn(
                                    "px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border",
                                    homeFilter === f
                                        ? "bg-foreground text-background border-foreground"
                                        : "border-border text-muted-foreground hover:bg-secondary"
                                )}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                )}
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                    <Input placeholder="Quick search..." className="pl-11 h-12 rounded-xl bg-card/50" />
                </div>
            </div>

            {/* LISTINGS GRID/LIST */}
            <div className="grid gap-4">
                {filteredRooms.length > 0 ? (
                    filteredRooms.map((room) => (
                        <ListingCard
                            key={room.id}
                            room={room}
                            onStatusChange={updateStatus}
                            onTabChange={updateTab}
                            onEditChange={edit}
                            onDeleteChange={deleteListing}
                            onRestoreChange={restore}
                            onDraftChange={continueWriting}
                            updateStock={updateStock}
                        />
                    ))
                ) : (
                    <div className="py-20 text-center border-2 border-dashed border-border rounded-3xl">
                        <Text variant="muted">No rooms found in this category.</Text>
                    </div>
                )}
            </div>
        </div>
    );
}




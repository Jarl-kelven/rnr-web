"use client";

import { createContext, useContext, useEffect, useState, } from "react";
import { ListingDataTypes } from "@/types/listings";
import { MOCK_ROOMS } from "@/mock/room";

interface ListingContextType {
    listings: ListingDataTypes[];
    addLisiting: (listing: ListingDataTypes) => void;
    updateListing: (id: string, listing: Partial<ListingDataTypes>) => void;
    deleteListing: (id: string) => void;
    loading: boolean
}

const ListingContext = createContext<ListingContextType | null>(null);

export function ListingsProvider({ children }: { children: React.ReactNode }) {
    const [listings, setListings] = useState<ListingDataTypes[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const listingAll = () => {
            setLoading(true);
            setListings(MOCK_ROOMS);
            setLoading(false);
        };
        listingAll();
    }, []);

    const addLisiting = (listing: ListingDataTypes) => {
        setListings(pre => ([listing, ...pre]));
    };
    const updateListing = (id: string, update: Partial<ListingDataTypes>) => {
        if (!id) return;

        setListings(pre => pre.map(i => i.id === id ? { ...i, ...update } : i));
    };
    const deleteListing = (id: string) => {
        if (id) return;
        setListings(pre => pre.filter(i => i.id !== id));
    };


    return (
        <ListingContext.Provider
            value={{
                listings,
                loading,
                addLisiting,
                updateListing,
                deleteListing,
            }}
        >
            {children}
        </ListingContext.Provider>
    );

};

export const UseListings = () => {
    const l = useContext(ListingContext);
    if (!l) throw new Error("Use Uselingts component inside Listings Provider");
    return l;
};

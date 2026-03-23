import { ListingDataTypes } from "@/types/listings";

export const MOCK_ROOMS: ListingDataTypes[] =
    [
    { id: "1", description: '', name: "Deluxe Executive Suite", price: "45,000", inventory: '5', images: [], video:{url: '', file: null, isYouTube: false}, status: "Live", tab: "Home", type: "Suite" },
    { id: "2", description: '', name: "Standard Queen Room", price: "25,000", inventory: '0', images: [], video:{url: '', file: null, isYouTube: false}, status: "Down", tab: "Home", type: "Standard" },
    { id: "3", description: '', name: "Penthouse Presidential", price: "120,000", inventory: '1', images: [], video:{url: '', file: null, isYouTube: false}, status: "Pending", tab: "Home", type: "Penthouse" },
    { id: "4", description: '', name: "Studio Apartment", price: "18,000", inventory: '3', images: [], video:{url: '', file: null, isYouTube: false}, status: "Rejected", tab: "Home", type: "Studio" },
    { id: "5", description: '', name: "Double Luxury Room", price: "35,000", inventory: '2', images: [], video:{url: '', file: null, isYouTube: false}, status: "Live", tab: "Draft", type: "Deluxe" },
    { id: "6", description: '', name: "Economy Single", price: "12,000", inventory: '0', images: [], video:{url: '', file: null, isYouTube: false}, status: "Down", tab: "Trash", type: "Standard" },
];

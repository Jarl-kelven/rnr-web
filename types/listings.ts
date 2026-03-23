export type ListingDataTypes = {
    id: string,
    name: string;
    type: string;
    description: string;
    price: string;
    inventory: string;
    images: { url: string, primary?: boolean, file: File | null }[];
    video: { url: string, file: File | null, isYouTube: boolean } | null;
    tab: 'Home' | 'Draft' | 'Trash'
    status: 'Live' | 'Down' | 'Pending'| 'Rejected'
};

export type RoomStatus = ListingDataTypes['status'];
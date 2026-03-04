export type FormData = {
    name: string;
    type: string;
    description: string;
    price: string;
    inventory: string;
    images: { url: string, primary: boolean, file: File | null }[];
    video: { url: string, isYouTube: boolean } | null;
};
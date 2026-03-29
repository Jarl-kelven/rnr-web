import convertYoutubeLink from "@/utils/convert-youtube-link";
import { X } from "lucide-react";

type Props = {
    type: "file" | "youtube";
    url: string;
    deleteVideo?: () => void;
    useDelete?: boolean
    autoPlay?: boolean;
    controls?: boolean;
}
export default function DisplayVideo({ type, url, deleteVideo, useDelete = false, autoPlay = false, controls = true }: Props) {

    if (type === "youtube") {
        const embedUrl = convertYoutubeLink(url);
        if (!useDelete) {
            return (
                <iframe
                    width="560"
                    height="315"
                    src={embedUrl}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="border rounded-md shadow border-primary w-full h-full"
                />
            )
        }
        return (
            <div
                className='relative'
            >
                <button
                    type='button'
                    className='absolute top-2 right-2 p-2 bg-red-100 rounded-full z-10'
                    onClick={(e) => {
                        e.stopPropagation();
                        deleteVideo?.()
                    }}
                >
                    <X size={20} color='red' />
                </button>
                <iframe
                    width="560"
                    height="315"
                    src={embedUrl}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="border rounded-md shadow border-primary w-full h-full"                    
                />
            </div>
        )
    }


    if (!useDelete) {
        return (
            <video
                width="560"
                height="315"
                controls={controls}
                className="border rounded-md shadow border-primary w-full h-full"
                autoPlay={autoPlay}
            >
                <source src={url} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        )
    }
    return (
        <div
            className='relative'
        >
            <button
                type='button'
                className='absolute top-2 right-2 p-2 bg-red-100 rounded-full z-10'
                onClick={(e) => {
                    e.stopPropagation();
                    deleteVideo?.()
                }}
            >
                <X size={20} color='red' />
            </button>
            <video
                width="560"
                height="315"                
                className="border rounded-md shadow border-primary w-full h-full"
                autoPlay={autoPlay}
                controls={controls}
            >
                <source src={url} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    )
}

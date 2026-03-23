import Image from 'next/image'
import { X } from 'lucide-react';

type Props = {
    url: string;
    alt?: string;
    index?: number;
    deleteImage?: () => void;
    useDelete?: boolean;
}

export default function DisplayImage({ url, alt, index = 0, deleteImage, useDelete = false }: Props) {

    if (!useDelete) {
        return (
            <Image
                src={url}
                alt={alt || `Room Image ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
                priority={index < 3}
                fill
            />
        )
    }

    return (
        <div
            className='w-full h-full relative'
        >
            <button
                type='button'
                className='absolute top-2 right-2 p-2 bg-red-100 rounded-full z-10'
                onClick={(e) => {
                    e.stopPropagation();
                    deleteImage?.()
                }}
            >
                <X size={20} color='red' />
            </button>
            <Image
                src={url}
                alt={alt || `Room Image ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
                priority={index < 3}
                fill
            />
        </div>
    )
}

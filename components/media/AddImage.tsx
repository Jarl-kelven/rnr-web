import { ImageIcon } from 'lucide-react'
import React from 'react'
import { Text } from '../ui/text'
import useUplaodFile from '@/hooks/useUploadFile';

type Props = {
    multiple?: boolean;
    accept?: string;
    getImages: (images: { url: string, file: File }[]) => void;
}

export default function AddImage({ multiple = false, accept = "image/*", getImages }: Props) {
    const fileRef = React.useRef<HTMLInputElement>(null);
    const { uploadMultipleFiles } = useUplaodFile();

    const onClickUploadImage = async () => {
        fileRef.current?.click();
    };

    const onDragUploadImage = async (e: React.DragEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const files = e.dataTransfer.files;

        if (files && files.length > 0) {
            const images = await uploadMultipleFiles(files, 10);
            getImages(images);
        }
    }

    const onChangeUploadImage = async (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const images = await uploadMultipleFiles(files, 10);
            getImages(images);
        }
    };


    return (
        <button
            type='button'
            className="border-2 border-dashed border-border rounded-2xl p-12 flex flex-col items-center justify-center hover:border-primary/40 transition-colors cursor-pointer group"
            onClick={onClickUploadImage}
            onDragOver={(e) => e.preventDefault()}
            onDrop={onDragUploadImage}
        >
            <input
                ref={fileRef}
                type="file"
                className='hidden'
                multiple={multiple}
                accept={accept}
                onChange={onChangeUploadImage}
            />
            <ImageIcon
                size={48}
                className="text-muted-foreground group-hover:text-primary transition-colors mb-4"
            />
            <Text className="font-bold">Upload High Quality Photos (10MB max)</Text>
            <Text variant="muted" className="text-sm">Drag and drop up to 10 images</Text>
        </button>
    )
}

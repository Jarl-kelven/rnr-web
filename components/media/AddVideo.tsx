import { Video } from 'lucide-react'
import { Text } from '../ui/text'
import useUplaodFile from '@/hooks/useUploadFile';
import { ChangeEvent, useRef } from 'react';

type Props = {
    multiple?: boolean;
    accept?: string;
    getVideo?: (video: { url: string, file: File }) => void;
}


export default function AddVideo({ multiple = false, accept = "video/*", getVideo }: Props) {
    const fileRef = useRef<HTMLInputElement>(null);
    const { uploadSingleFile } = useUplaodFile();

    const onClickUploadVideo = () => {
        fileRef.current?.click();
    };

    const onChangeUploadVideo = async (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        const files = e.target.files;

        if (files && files.length > 0) {
            const video = await uploadSingleFile(files, 50);
            getVideo?.(video);
        }
    };

    return <button
        type='button'
        className="p-6 border border-border rounded-xl flex items-center gap-4 hover:bg-secondary/50 cursor-pointer transition-all"
        onClick={onClickUploadVideo}
    >
        <input
            ref={fileRef}
            type="file"
            className='hidden'
            multiple={multiple}
            accept={accept}
            onChange={onChangeUploadVideo}
        />
        <Video className="text-primary" />
        <Text className="text-sm font-medium">Upload Video File</Text>
    </button>
}




export default function useUplaodFile() {
    const oneMB = 1024 * 1024;

    const upload = (file: File, sizeLimitMB: number = 5) => {
        return new Promise<{ url: string; file: File }>((resolve, reject) => {
            if (file.size > sizeLimitMB * oneMB) {
                reject(new Error(`File size exceeds ${sizeLimitMB}MB limit.`));
                return;
            }

            resolve({ url: URL.createObjectURL(file), file });
        });
    }

    const uploadSingleFile = async (files: FileList, sizeLimitMB: number = 5) => {
        if (!files) return Promise.reject(new Error("No file provided"));

        return await upload(files[0], sizeLimitMB);
    };

    const uploadMultipleFiles = async (files: FileList, sizeLimitMB: number = 5) => {
        if (!files) return Promise.reject(new Error("No files provided"));

        return await Promise.all(
            Array.from(files).map(async (file) => {
                return await upload(file, sizeLimitMB);
            })
        );
    };


    return { uploadMultipleFiles, uploadSingleFile };
}
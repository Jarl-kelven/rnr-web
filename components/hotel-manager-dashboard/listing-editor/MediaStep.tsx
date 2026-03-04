import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { FormData } from "@/types/listings";
import { ImageIcon, LinkIcon, Video } from "lucide-react";

type Props = { onNext: () => void; onBack: () => void; data: FormData; updateData: (field: keyof FormData, value: unknown) => void };

export default function MediaStep({ onNext, onBack, data, updateData }: Props) {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
            <div className="grid gap-6">
                <Text variant="h3">Room Media</Text>

                {/* Cloudinary Image Upload Placeholder */}
                <div className="border-2 border-dashed border-border rounded-2xl p-12 flex flex-col items-center justify-center hover:border-primary/40 transition-colors cursor-pointer group">
                    <ImageIcon size={48} className="text-muted-foreground group-hover:text-primary transition-colors mb-4" />
                    <Text className="font-bold">Upload High Quality Photos</Text>
                    <Text variant="muted" className="text-sm">Drag and drop up to 10 images</Text>
                </div>

                {/* Video Section */}
                <div className="space-y-4">
                    <Text className="font-bold">Room Video</Text>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-6 border border-border rounded-xl flex items-center gap-4 hover:bg-secondary/50 cursor-pointer transition-all">
                            <Video className="text-primary" />
                            <Text className="text-sm font-medium">Upload Video File</Text>
                        </div>
                        <div className="relative">
                            <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                            <Input placeholder="Paste YouTube Link" className="pl-12 h-full py-4 rounded-xl" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex gap-4 pt-6">
                <Button variant="outline" onClick={onBack} className="flex-1 h-14 rounded-xl font-bold">Back</Button>
                <Button onClick={onNext} className="flex-1 h-14 rounded-xl font-bold">Continue</Button>
            </div>
        </div>
    );
};
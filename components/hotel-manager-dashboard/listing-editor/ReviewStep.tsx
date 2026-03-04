import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { FormData } from "@/types/listings";
import { Check, FileVideo, Play, Youtube } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type Props = { onBack: () => void; onPublish: () => void; formData: FormData };


export default function ReviewStep({ onBack, onPublish, formData }: Props) {
    // Mock data for demonstration - in production use formData.images / formData.video
    const [activeIndex, setActiveIndex] = useState(0);
    const media = [
        { type: 'image', url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800' },
        { type: 'image', url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=800' },
        { type: 'video', url: '#', isYouTube: true }, // Logic for YT embed
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
            <div className="grid lg:grid-cols-2 gap-10">

                {/* LEFT: MEDIA PREVIEW */}
                <div className="space-y-4">
                    <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-muted border border-border">
                        {media[activeIndex].type === 'image' ? (
                            <Image
                                src={media[activeIndex].url}
                                alt="Room Preview"
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center bg-black">
                                {media[activeIndex].isYouTube ? (
                                    <div className="flex flex-col items-center gap-3 text-white">
                                        <Youtube size={48} className="text-red-600" />
                                        <Text className="text-white/70 text-sm italic">YouTube Video Linked</Text>
                                    </div>
                                ) : (
                                    <FileVideo size={48} className="text-primary" />
                                )}
                            </div>
                        )}
                        <div className="absolute top-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-[10px] text-white font-bold uppercase tracking-widest">
                            Live Preview
                        </div>
                    </div>

                    {/* THUMBNAIL CAROUSEL */}
                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                        {media.map((item, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveIndex(idx)}
                                className={cn(
                                    "relative h-20 w-28 shrink-0 rounded-xl overflow-hidden border-2 transition-all",
                                    activeIndex === idx ? "border-primary scale-95" : "border-transparent opacity-60"
                                )}
                            >
                                {item.type === 'image' ? (
                                    <Image src={item.url} alt="thumb" fill className="object-cover" />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center bg-secondary">
                                        <Play size={16} className="fill-foreground" />
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* RIGHT: DETAILS SUMMARY */}
                <div className="flex flex-col justify-between py-2">
                    <div className="space-y-6">
                        <div>
                            <Text variant="h2" className="text-2xl font-black">Deluxe Executive Suite</Text>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                                <Text className="text-primary font-bold text-sm">5 Rooms Available</Text>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6 p-6 rounded-2xl bg-secondary/30">
                            <div>
                                <Text variant="muted" className="text-xs uppercase font-bold tracking-widest">Price</Text>
                                <Text className="text-xl font-black">₦45,000<span className="text-sm font-normal text-muted-foreground">/night</span></Text>
                            </div>
                            <div>
                                <Text variant="muted" className="text-xs uppercase font-bold tracking-widest">Category</Text>
                                <Text className="text-xl font-black">Deluxe</Text>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Text className="font-bold text-sm">Essential Info Checklist:</Text>
                            <div className="space-y-1">
                                <CheckItem label="High Quality Images Uploaded" checked={true} />
                                <CheckItem label="Room Availability Manually Set" checked={true} />
                                <CheckItem label="Video Content Verified" checked={true} />
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex flex-col gap-3">
                        <Button
                            onClick={onPublish}
                            className="h-16 w-full rounded-2xl font-black text-lg bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 transition-all hover:-translate-y-1"
                        >
                            Confirm & Publish Listing
                        </Button>
                        <div className="flex gap-3">
                            <Button variant="outline" onClick={onBack} className="flex-1 h-12 rounded-xl font-bold">Back to Edit</Button>
                            <Button variant="secondary" className="flex-1 h-12 rounded-xl font-bold">Save Draft</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function CheckItem({ label, checked }: { label: string, checked: boolean }) {
    return (
        <div className="flex items-center gap-2 text-sm">
            <Check size={14} className={checked ? "text-green-500" : "text-muted-foreground"} />
            <span className={checked ? "text-foreground" : "text-muted-foreground"}>{label}</span>
        </div>
    );
}
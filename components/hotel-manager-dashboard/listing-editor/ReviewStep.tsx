import DisplayImage from "@/components/media/DisplayImage";
import DisplayVideo from "@/components/media/DisplayVideo";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { ListingDataTypes } from "@/types/listings";
import convertCurrency from "@/utils/convert-currency";
import { Check, Play, } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type Props = {
    onBack?: () => void;
    onPublish?: () => void;
    data: ListingDataTypes;
    where: "editor" | "display";
};

type i = {
    type: 'image';
    url: string;
    primary?: boolean;
    file: File | null;

}
type v = {
    type: 'video';
    url: string;
    file: File | null;
    isYouTube: boolean;
}

export default function ReviewStep({ onBack, onPublish, data, where = 'editor' }: Props) {
    // Mock data for demonstration - in production use data.images / data.video
    const [activeIndex, setActiveIndex] = useState(0);

    const images = (data.images.length ? [data.images[0], ...data.images.slice(1)].map(item => ({ ...item, type: 'image' })) : []) as i[] | [];
    const video = (data.video && { ...data.video, type: 'video' }) as v | null;
    const media = video ? [...images, video] : images;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
            <div className="grid lg:grid-cols-2 gap-10">

                {/* LEFT: MEDIA PREVIEW */}
                <div className="space-y-4">
                    <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-muted border border-border">
                        {media[activeIndex] &&
                            <>

                            {media[activeIndex].type === 'image' ? (
                                <Image
                                    src={media[activeIndex].url}
                                    alt="Room Preview"
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center bg-black">
                                        <DisplayVideo
                                            type={media[activeIndex].isYouTube ? 'youtube' : 'file'}
                                            url={media[activeIndex].url}
                                            useDelete={false}
                                            autoPlay={true}
                                        />
                                    </div>
                                )}
                            </>
                        }
                        <div className="absolute top-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-[10px] text-white font-bold uppercase tracking-widest">
                            Live Preview
                        </div>
                    </div>

                    {/* THUMBNAIL CAROUSEL */}
                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                        {media.length ?
                            media.map((item, idx) => (
                                <div
                                    key={idx}
                                    className={cn(
                                        "relative h-20 w-28 shrink-0 rounded-xl overflow-hidden border-2 transition-all",
                                        activeIndex === idx ? "border-primary scale-95" : "border-transparent opacity-60",
                                    )}
                                >
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            setActiveIndex(idx);
                                            e.stopPropagation();
                                        }}
                                        className="absolute top-0 right-0 left-0 bottom-0 bg-transparent z-20 "
                                    >
                                        {item.type === 'video' &&
                                            <Play size={18} className="text-primary absolute top-1/2 left-1/2 -translate-1/2" />
                                        }
                                    </button>
                                    {media[activeIndex] &&
                                        <>
                                        {item.type === 'image' ? (
                                            <DisplayImage
                                                url={item.url}
                                                alt="thumb"
                                                useDelete={false}
                                            />
                                        ) : (
                                                <DisplayVideo
                                                    type={item.isYouTube ? 'youtube' : 'file'}
                                                    url={item.url}
                                                    useDelete={false}
                                                    autoPlay={false}
                                                    controls={false}
                                                />
                                            )}

                                        </>
                                    }
                                </div>
                            )) :
                            null
                        }
                    </div>
                </div>

                {/* RIGHT: DETAILS SUMMARY */}
                <div className="flex flex-col justify-between py-2">
                    <div className="space-y-6">
                        <div>
                            <Text variant="h2" className="text-2xl font-black">
                                {data.name || 'No title'}
                            </Text>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                                <Text className="text-primary font-bold text-sm">
                                    {data.inventory || '0'} Rooms Available
                                </Text>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6 p-6 rounded-2xl bg-secondary/30">
                            <div>
                                <Text variant="muted" className="text-xs uppercase font-bold tracking-widest">Price</Text>
                                <Text className="text-xl font-black">{convertCurrency(parseInt(data.price))}<span className="text-sm font-normal text-muted-foreground">/night</span></Text>
                            </div>
                            <div>
                                <Text variant="muted" className="text-xs uppercase font-bold tracking-widest">Category</Text>
                                <Text className="text-xl font-black">{data.type || "No categoty"}</Text>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Text className="font-bold text-sm">Essential Info Checklist:</Text>
                            <div className="space-y-1">
                                <CheckItem label="High Quality Images Uploaded" checked={data.images.length > 0} />
                                <CheckItem label="Room Availability Manually Set" checked={parseInt(data.inventory) > 0} />
                                <CheckItem label="Video Content Verified" checked={data.video ? true : false} />
                            </div>
                        </div>
                    </div>

                   {where === "editor" && <div className="mt-8 flex flex-col gap-3">
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
                    </div>}
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
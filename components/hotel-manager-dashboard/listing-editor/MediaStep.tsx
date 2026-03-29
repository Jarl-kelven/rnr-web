import ImageCarousel from "@/components/ImageCarousel";
import AddImage from "@/components/media/AddImage";
import AddVideo from "@/components/media/AddVideo";
import DisplayImage from "@/components/media/DisplayImage";
import DisplayVideo from "@/components/media/DisplayVideo";
import { Button } from "@/components/ui/button";
import { CarouselItem } from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { ListingDataTypes } from "@/types/listings";
import { LinkIcon } from "lucide-react";
import { useCallback, useEffect } from "react";

type Props = {
    onNext: () => void;
    onBack: () => void;
    data: ListingDataTypes;
    updateData: <K extends keyof ListingDataTypes>(key: K, value: ListingDataTypes[K]) => void
};

export default function MediaStep({ onNext, onBack, data, updateData }: Props) {

    const handlePrimaryImageSelect = (index: number) => {
        const updatedImages = data.images.map((img, i) => ({
            ...img,
            primary: i === index,
        }));
        updateData("images", updatedImages);
    }



    // useEffect(() => {
    //     const f = () => {
    //         updateData('images', data.images.map((im, idx) => ({ ...im, primary: idx === 0 })));
    //     };
    //     f()
    // }, []);


    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
            <div className="grid gap-6">
                <Text variant="h3">Room Media</Text>
                <>
                    {/* Cloudinary Image Upload Placeholder */}
                    {
                        data.images.length >= 1 ?
                            <ImageCarousel>
                                {data.images.map((item, index) => (
                                    <CarouselItem
                                        key={index}
                                        className={cn("pl-2 md:pl-4", "basis-1/2 lg:basis-1/3")}
                                        onClick={() => handlePrimaryImageSelect(index)}
                                    >
                                        <div className={cn("w-full h-full relative aspect-video overflow-hidden rounded-2xl", item.primary && "ring-3 ring-blue-700")}>
                                            <DisplayImage
                                                url={item.url}
                                                alt={item.file?.name || index + "_hotel_image"}
                                                index={index}
                                                useDelete={true}
                                                deleteImage={() => updateData('images', data.images.filter((_, i) => i !== index))}
                                            />
                                        </div>
                                    </CarouselItem>
                                ))}
                                <CarouselItem className={cn("pl-2 md:pl-4", "basis-1/2 lg:basis-1/3")}>
                                    <AddImage
                                        multiple={true}
                                        accept="image/jpeg, image/png, image/jpg"
                                        getImages={(images) => updateData("images", [...data.images, ...images])}
                                    />
                                </CarouselItem>
                            </ImageCarousel> :
                            <AddImage
                                multiple={true}
                                accept="image/jpeg, image/png, image/jpg"
                                getImages={(images) => {
                                    updateData("images", images)
                                }}
                            />
                    }
                </>
                {/* Video Section */}
                <div className="space-y-4">
                    <Text className="font-bold">Room Video</Text>
                    <div className="grid md:grid-cols-2 gap-4">
                        <AddVideo
                            multiple={false}
                            accept="video/mp4, video/webm"
                            getVideo={(video) => updateData("video", { ...video, isYouTube: false })}
                        />
                        <div className="relative">
                            <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                            <Input
                                placeholder="Paste YouTube Link"
                                className="pl-12 h-full py-4 rounded-xl"
                                value={(data.video?.url) || ''}
                                onChange={(e) => updateData("video", { url: e.target.value, file: null, isYouTube: true })}
                            />
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        {data.video?.url &&
                            <DisplayVideo
                                type={data.video?.isYouTube ? "youtube" : "file"}
                                url={data.video?.url || ""}
                                deleteVideo={() => updateData("video", null)}
                                useDelete={true}
                            />
                        }
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
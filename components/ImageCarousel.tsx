import { Carousel, CarouselContent, CarouselNext, CarouselPrevious } from './ui/carousel'

export default function ImageCarousel({ children }: { children: React.ReactNode }) {
    return (
        <Carousel
            className="w-full max-w-5xl mx-auto h-auto"
            opts={{
                align: "start",
                loop: true,
                dragFree: false,
                slidesToScroll: 2,       
            }}
        >
            <CarouselContent className="w-full py-2">
                {children}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}

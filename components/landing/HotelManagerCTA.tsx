import { Button } from "@/components/ui/button";

export default function HotelCtaSection() {
    return (
        <section className="bg-background flex items-center justify-center py-12 md:py-32">
            <div className="container flex flex-col md:flex-row items-center md:justify-between gap-6 p-5 text-center md:text-left">
                <div className="max-w-xl">
                    <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground">
                        List Your Hotel on RNR
                    </h2>
                    <p className="mt-6 text-base md:text-xl text-muted-foreground">
                        Become a trusted part of our curated network and connect with executive
                        travelers looking for quality accommodations.
                    </p>
                </div>

                <Button
                variant="default"
                size="lg"
                className=" md:w-auto p-6 md:p-8 text-base md:text-lg rounded-xl"
                >
                Register as a Hotel Manager
                </Button>
            </div>
        </section>
    );
}
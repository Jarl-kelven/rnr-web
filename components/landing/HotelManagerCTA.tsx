import { Button } from "@/components/ui/button";

export default function HotelCtaSection() {
    return (
        <section className="bg-background py-24 md:py-32">
            <div className="container text-center">
                <h2 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
                    List Your Hotel on RNR
                </h2>
                <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground md:text-xl">
                    Become a trusted part of our curated network and connect with executive
                    travelers looking for quality accommodations.
                </p>
                <Button variant="default" size="lg" className="mt-12">
                    Partner with Us
                </Button>
            </div>
        </section>
    );
}
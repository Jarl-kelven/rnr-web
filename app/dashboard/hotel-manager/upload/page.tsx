"use client";

import React, { useState } from "react";
import { Text } from "@/components/ui/text";
import { CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import GeneralInfoStep from "@/components/hotel-manager-dashboard/listing-editor/GeneralInfoStep";
import InventoryStep from "@/components/hotel-manager-dashboard/listing-editor/InventoryStep";
import MediaStep from "@/components/hotel-manager-dashboard/listing-editor/MediaStep";
import ReviewStep from "@/components/hotel-manager-dashboard/listing-editor/ReviewStep";
import { ListingDataTypes } from "@/types/listings";
import { UseListings } from "@/context/ListingContect";
import { showSuccess } from "@/components/ui/toasts";
import { useRouter } from "next/navigation";



const defaultFormValue: ListingDataTypes = {
    id: "",
    name: "",
    type: "",
    description: "",
    price: "",
    inventory: "",
    images: [],
    video: null,
    tab: 'Draft',
    status: 'Pending',
}

export default function UploadRoomPage() {
    const [step, setStep] = useState(1);
    const router = useRouter()

    const { addLisiting } = UseListings();
    const [isPublishing, setIsPublishing] = useState(false);
    const [formData, setFormData] = useState<ListingDataTypes>(defaultFormValue);

    const updateData = <K extends keyof typeof formData>(key: K, value: (typeof formData)[K]) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const nextStep = () => setStep((s) => s + 1);
    const prevStep = () => setStep((s) => s - 1);

    const sendListing = () => {
        const l = { ...formData, id: Date.now().toString() }
        addLisiting(l);
        showSuccess("Listing sent Succefully");
        setFormData(defaultFormValue);
        router.back();
        setIsPublishing(true)
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-10">
                <Text variant="h1" className="text-3xl mb-2">List New Room</Text>
                <div />
                <Text variant="muted">Fill in the details to add a new room type to your hotel.</Text>
            </div>

            {/* Step Indicator */}
            <div className="flex items-center gap-4 mb-12">
                {[1, 2, 3, 4].map((i) => (
                    <React.Fragment key={i}>
                        <div className={cn(
                            "h-10 w-10 rounded-full flex items-center justify-center font-bold border-2 transition-all",
                            step >= i ? "bg-primary border-primary text-background" : "border-border text-muted-foreground"
                        )}>
                            {step > i ? <CheckCircle2 size={20} /> : i}
                        </div>
                        {i < 4 && <div className={cn("h-1 flex-1 rounded", step > i ? "bg-primary" : "bg-border")} />}
                    </React.Fragment>
                ))}
            </div>

            <Card className="p-8 border-border/60 shadow-sm">
                {step === 1 && <GeneralInfoStep
                    onNext={nextStep}
                    data={formData}
                    updateData={updateData}
                />}
                {step === 2 && <InventoryStep
                    onNext={nextStep}
                    onBack={prevStep}
                    data={formData}
                    updateData={updateData}
                />}
                {step === 3 && <MediaStep
                    onNext={nextStep}
                    onBack={prevStep}
                    data={formData}
                    updateData={updateData}
                />}
                {step === 4 && <ReviewStep
                    onPublish={sendListing}
                    onBack={prevStep}
                    data={formData}
                    where="editor"
                />}
            </Card>
        </div>
    );
};

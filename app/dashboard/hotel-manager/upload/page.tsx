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
import { FormData } from "@/types/listings";



export default function UploadRoomPage() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<FormData>({
        name: "",
        type: "",
        description: "",
        price: "",
        inventory: "",
        images: [{ url: "", primary: false, file: null }] ,
        video: null,
    });
    
    const updateData = (field: keyof FormData, value: unknown) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const [isPublishing, setIsPublishing] = useState(false);

    const nextStep = () => setStep((s) => s + 1);
    const prevStep = () => setStep((s) => s - 1);

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-10">
                <Text variant="h1" className="text-3xl mb-2">List New Room</Text>
                <div/>
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
                    onPublish={() => setIsPublishing(true)}
                    onBack={prevStep}
                    formData={formData}
                />}
            </Card>
        </div>
    );
};

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { FormData } from "@/types/listings";
import { CheckCircle2 } from "lucide-react";

type Props = {
    onNext: () => void;
    data: FormData;
    updateData: (field: keyof FormData, value: unknown) => void
};

export default function GeneralInfoStep({ onNext, data, updateData }: Props) {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
            <div className="space-y-6">
                <div className="grid gap-2">
                    <Text className="font-bold">Room Ca tegory Name</Text>
                    <Input
                        placeholder="e.g. Deluxe Executive Suite"
                        className="h-14 rounded-xl border-border/50 focus:border-primary"
                        value={data.name}
                        onChange={(e) => updateData('name', e.target.value)}
                    />
                </div> 

                <div className="grid gap-4">
                    <Text className="font-bold">Select Room Type</Text>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {['Standard', 'Deluxe', 'Suite', 'Penthouse', 'Studio']
                            .map((type) => (
                            <button
                                key={type}
                                    className={cn("flex justify-center items-center py-4 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-all text-sm font-medium",
                                        data.type === type ? "border-primary bg-primary/5" : "")}
                                    value={data.type}
                                    onClick={() => updateData('type', type)}
                            >
                                    {type}
                                    <span>
                                        {data.type === type && <CheckCircle2 size={18} className="text-primary ml-2" />}
                                    </span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid gap-2">
                    <Text className="font-bold">Room Description</Text>
                    <textarea
                        className="min-h-30 w-full rounded-xl border border-border/50 p-4 focus:outline-none focus:ring-1 focus:ring-primary bg-transparent"
                        placeholder="Describe the luxury and comfort of this room..."
                        value={data.description}
                        onChange={(e) => updateData('description', e.target.value)}
                    />
                </div>
            </div>
            <Button onClick={onNext} className="w-full h-14 rounded-xl font-bold">Continue</Button>
        </div>
    );
};
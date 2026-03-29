import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { ListingDataTypes } from "@/types/listings";



type Props = {
    onNext: () => void;
    onBack: () => void;
    data: ListingDataTypes;
    updateData: <K extends keyof ListingDataTypes>(key: K, value: ListingDataTypes[K]) => void
};


export default function InventoryStep({ onNext, onBack, data, updateData }: Props) {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
            <div className="grid gap-8">
                {/* Availability Logic */}
                <div className="p-6 rounded-2xl bg-secondary/30 border border-border/40">
                    <Text className="font-bold mb-4 flex items-center gap-2">
                        Total Inventory Availability
                    </Text>
                    <div className="flex items-center gap-6">
                        <div className="flex-1">
                            <Input
                                type="number"
                                placeholder="5"
                                className="h-14 rounded-xl text-lg font-bold"
                                value={data.inventory}
                                onChange={(e) => updateData('inventory', e.target.value)}
                            />
                            <Text variant="muted" className="text-xs mt-2">Number of rooms of this type currently available.</Text>
                        </div>
                        <Text className="text-muted-foreground font-medium italic">Rooms Available</Text>
                    </div>
                </div>

                {/* Pricing */}
                <div className="grid gap-2">
                    <Text className="font-bold">Price per Night (₦)</Text>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-muted-foreground">₦</span>
                        <Input
                            type="number"
                            placeholder="45,000"
                            className="h-14 pl-10 rounded-xl text-lg font-bold"
                            value={data.price}
                            onChange={(e) => updateData('price', e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="flex gap-4">
                <Button variant="outline" onClick={onBack} className="flex-1 h-14 rounded-xl font-bold">Back</Button>
                <Button onClick={onNext} className="flex-1 h-14 rounded-xl font-bold">Continue</Button>
            </div>
        </div>
    );
};
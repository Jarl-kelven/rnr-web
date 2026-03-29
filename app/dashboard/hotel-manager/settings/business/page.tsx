"use client";

import { FieldError, useForm } from "react-hook-form";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox"; // Assuming Shadcn Checkbox
import { ChevronLeft, Save, Phone, X } from "lucide-react";
import Link from "next/link";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import useUplaodFile from "@/hooks/useUploadFile";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useRouter } from "next/navigation";



export const BusinessSchema = z.object({
    hotelImage: z.string().optional(),
    hotelName: z.string().min(2, "Hotel name is required"),
    describtion: z.string().max(50).optional(),
    cacNumber: z.string().min(7, "Invalid CAC number format"),
    address: z.string().min(10, "Full physical address is required"),
    city: z.string().min(2, "City is required"),
    state: z.string().min(2, "State is required"),
    email: z.email("Invalid email address"),
    supportPhone: z.string().length(11, "Nigerian phone numbers must be 11 digits"), // e.g., 08012345678
    amenities: z.array(z.string()).optional(),

});

export type BusinessValues = z.infer<typeof BusinessSchema>;

const AMENITIES = ["Free Wi-Fi", "Pool", "Gym", "Parking", "Restaurant", "24/7 Power"];

export default function BusinessEditor() {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const imageFileRef = useRef<HTMLInputElement>(null);
    const displayImageAlertDialogRef = useRef<HTMLButtonElement>(null);
    const { uploadSingleFile } = useUplaodFile();
    const router = useRouter();

    const { handleSubmit, register, reset, formState: { errors, isDirty }, getValues, setValue } = useForm({
        resolver: zodResolver(BusinessSchema),
        defaultValues: {
            hotelName: '',
            describtion: '',
            cacNumber: '',
            address: '',
            city: '',
            state: '',
            email: 'support@peopleshotels.com',
            supportPhone: '',
            amenities: [],
        }
    });

    useEffect(() => {
        //Update ui with api data
        // reset()
    }, []);

    const submit = (data: BusinessValues) => {
        if (imageFile) {
            // Upload the image file to cloud
            // And update the ui with the return ui

            //setValue('hotelImage', '');
            //setImageFile(null)
        }
        // Send the rest data to db
        console.log(data);

    };

    const uploadImage = async (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const file = await uploadSingleFile(files);
        setValue('hotelImage', file.url, { shouldDirty: true });
        setImageFile(file.file);
    };

    const deleteImage = () => {
        if (imageFile) {
            // Delete image from ui
            setValue('hotelImage', '');
            setImageFile(null);

            return;
        }
        // Delete image from ui
        setValue('hotelImage', '', { shouldDirty: true });
        // Delete image from cloud
    };

    const selectAmenity = (amenity: string) => {
        const amenities = getValues('amenities') || [];
        if (amenities.includes(amenity)) {
            setValue("amenities", amenities.filter(a => a !== amenity), { shouldDirty: true });
            return;
        }
        setValue('amenities', [amenity, ...amenities], { shouldDirty: true });
    }

    return (
        <div className="animate-in fade-in duration-500 pb-20">
            <header className="flex items-center justify-between">
                <div className="flex gap-10 items-center">
                    <Link href="/dashboard/hotel-manager/settings" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                        <ChevronLeft size={20} /> <Text className="font-bold">Back</Text>
                    </Link>
                    <Text variant="h3" className="text-2xl font-black">Business Identity</Text>
                </div>
                <Button
                    onClick={handleSubmit(submit)}
                    className="rounded-xl px-8 font-black"
                    disabled={!isDirty}
                >
                    <Save size={16} className="mr-2" />
                    Save Profile
                </Button>
            </header>

            <div className="space-y-8">

                {/* Display image Alert Dialog */}

                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button ref={displayImageAlertDialogRef} variant="outline" className="opacity-0"></Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader className="flex justify-center">
                            <AlertDialogTitle className="flex justify-center">Update Business image</AlertDialogTitle>
                            <AlertDialogAction variant='ghost'>
                                <X size={20} color="red" />
                            </AlertDialogAction>
                        </AlertDialogHeader>
                        <AlertDialogDescription></AlertDialogDescription>
                        <AlertDialogFooter>
                            <div className="w-full flex justify-between">
                                <AlertDialogAction
                                    variant="outline"
                                    onClick={deleteImage}
                                >
                                    Remove image
                                </AlertDialogAction>
                                <AlertDialogAction
                                    onClick={() => {
                                        if (!imageFileRef.current) return;
                                        imageFileRef.current.click()
                                    }}>
                                    Change image
                                </AlertDialogAction>

                            </div>

                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

                {/* Display image */}

                <div className="flex justify-center">
                    <div className="relative h-24 w-24 rounded-full border-4 border-background shadow-xl overflow-hidden bg-secondary">
                        <Image
                            src={getValues('hotelImage') || "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200"}
                            alt="Manager"
                            fill
                            className="object-cover"
                            onClick={() => {
                                if (!displayImageAlertDialogRef.current) return;
                                displayImageAlertDialogRef.current.click()
                            }}
                        />
                        <input
                            ref={imageFileRef}
                            type="file"
                            accept="image/png, image/jpg, image/jpeg"
                            onChange={uploadImage}
                            className="opacity-0 hidden"
                        />
                    </div>
                </div>

                {/* Other inputs */}

                <div className="grid gap-6">
                    <FormField label="Official Hotel Name" error={errors.hotelName}>
                        <Input type="text" {...register('hotelName')} placeholder="People Hotel in Lagos" className="h-14 rounded-2xl" />
                    </FormField>

                    <FormField label="Tell use about your hotel" error={errors.describtion}>
                        <textarea {...register('describtion')} className="border p-2 h-24 w-full rounded-xl resize-none" placeholder="Best Hotel in town" />
                    </FormField>

                    <FormField label="CAC Registration Number" error={errors.cacNumber}>
                        <Input type="text" {...register('cacNumber')} placeholder="RC-1234567" className="h-14 rounded-2xl" />
                    </FormField>

                    <div className="flex justify-between gap-10">
                        <FormField label="City" error={errors.city}>
                            <Input type="text" {...register('city')} placeholder="Ikeja" className="h-14 rounded-2xl" />
                        </FormField>
                        <FormField label="State" error={errors.state}>
                            <Input type="text" {...register('state')} placeholder="Lagos" className="h-14 rounded-2xl" />
                        </FormField>
                    </div>

                    <FormField label="Full Address" error={errors.address}>
                        <Input type="text" {...register('address')} placeholder="123 Adetokunbo Ademola St, VI, Lagos" className="h-14 rounded-2xl" />
                    </FormField>

                    <FormField label="Email" error={errors.email}>
                        <Input
                            onClick={() => router.push('./change-email')}
                            type="email"
                            readOnly
                            {...register('email')}
                            placeholder="support@peopleshotels.com"
                            className="h-14 rounded-2xl"
                        />
                    </FormField>

                    <FormField label="Support Contact (Front Desk)" error={errors.supportPhone}>
                        <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                            <Input type='tel' {...register('supportPhone')} placeholder="0800-HOTEL-HELP" className="h-14 pl-12 rounded-2xl" />
                        </div>
                    </FormField>

                    <div className="space-y-4 pt-4">
                        <Text className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Default Hotel Amenities</Text>
                        <div className="grid grid-cols-2 gap-4">
                            {AMENITIES.map((amenity) => (
                                <div
                                    key={amenity}
                                    className="flex items-center gap-3 p-4 rounded-xl border border-border hover:bg-secondary/50 cursor-pointer transition-colors"
                                >
                                    <Checkbox
                                        id={amenity}
                                        onClick={() => selectAmenity(amenity)}
                                    />
                                    <Text className="text-sm font-medium">{amenity}</Text>
                                </div>
                            ))}
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
}

function FormField({ label, children, error }: { label: string; children: React.ReactNode, error: FieldError | undefined }) {
    return (
        <div className="space-y-2">
            <Text className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/80 ml-1">{label}</Text>
            {children}
            {error && (
                <>
                    <div />
                    <Text className="text-xs text-red-500 font-bold pl-1">
                        {error.message}
                    </Text>
                </>
            )}
        </div>
    );
};



export function DisplayAlertDialog() {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline">Show Dialog</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

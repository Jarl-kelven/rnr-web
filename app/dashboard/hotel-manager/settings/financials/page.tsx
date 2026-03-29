"use client";


import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import z from "zod";
import { FieldError, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

const financialSchema = z.object({
    bankName: z.string().min(2, "Please select your bank"),
    accountNumber: z.string().length(10, "NUBAN Account number must be exactly 10 digits"),
    accountName: z.string().min(3, "Account name must match bank records"),
    tin: z.string().optional(),
});

export type financialValues = z.infer<typeof financialSchema>;

export default function Financials() {
    const { handleSubmit, register, reset, formState: { errors, isDirty } } = useForm({
        resolver: zodResolver(financialSchema),
        defaultValues: {
            bankName: '',
            accountName: '',
            accountNumber: '',
            tin: '',
        }
    });

    useEffect(() => { 
        // Update ui with api data
        // reset()        
    }, []);


    const submit = (data: financialValues) => {
        console.log(data);
    };


    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <header className="flex items-center gap-4">
                <Link href="/dashboard/hotel-manager/settings" className="flex items-center gap-2 text-muted-foreground">
                    <ChevronLeft size={20} /> <Text className="font-bold">Back</Text>
                </Link>
                <div>
                    <Text variant="h3" className="text-2xl font-black">Payout & Tax Info</Text>
                </div>
            </header>


            <form onSubmit={handleSubmit(submit)} className="p-8 rounded-[2.5rem] bg-primary/3] border border-primary/10 space-y-8">
                <div className="grid gap-8">
                    <FormField label="Tax Identification Number (TIN)" error={errors.tin} >
                        <Input type="text" {...register('tin')} placeholder="12345678-0001" className="h-14 rounded-2xl font-mono" />
                        <Text className="text-[10px] text-muted-foreground italic">Required for VAT compliance in Nigeria.</Text>
                    </FormField>

                    <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-border/50">
                        <FormField label="Account Number" error={errors.accountNumber}>
                            <Input type="text" {...register('accountNumber')} placeholder="1012345678" className="h-14 rounded-2xl" />
                        </FormField>
                        <FormField label="Bank Name" error={errors.bankName}>
                            <Input type="text" {...register('bankName')} placeholder="Access Bank" className="h-14 rounded-2xl" />
                        </FormField>
                        <div className="col-span-2">
                            <FormField label=">Account Name" error={errors.accountName} >
                                <Input type="text" {...register('accountName')} placeholder="Access Bank" className="h-14 rounded-2xl" />
                            </FormField>
                        </div>
                    </div>
                </div>

                <Button disabled={!isDirty} className="w-full h-16 rounded-2xl font-black text-lg">Update Financial Records</Button>
            </form>
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
"use client";

import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ShieldAlert } from "lucide-react";
import Link from "next/link";
import z from "zod";
import { useState } from "react";
import { FieldError, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const changePasswordSchema = z.object({
    currentPassword: z.string().min(6, 'Please input your current password.'),
    newPassword: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .regex(/[A-Z]/, "Must contain at least one uppercase letter")
        .regex(/[0-9]/, "Must contain at least one number"),
})

export default function SecurityEditor() {
    const { handleSubmit, register, formState: { errors, isDirty } } = useForm({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            currentPassword: '',
            newPassword: '',
        }
    });
    const [passwordSuccefullyChange, setPasswordSuccefullyChange] = useState(false);

    const submit = (data: {
        currentPassword: string;
        newPassword: string;
    }) => {
        console.log(data);

        setPasswordSuccefullyChange(true);
    };
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <header className="flex">
                <Link href="/dashboard/hotel-manager/settings" className="flex items-center gap-2">
                    <ChevronLeft size={20} /> <Text className="font-bold">Back</Text>
                </Link>
            </header>

            <div className="space-y-6">
                {
                    !passwordSuccefullyChange ?
                        <>
                            <div className="p-6 rounded-[2rem] bg-red-500/5 border border-red-500/10 flex gap-4">
                                <ShieldAlert className="text-red-500 shrink-0" />
                                <Text className="text-sm text-red-700 font-medium">Protect your account. Add a secure password.</Text>
                            </div>
                            <form onSubmit={handleSubmit(submit)} className="grid gap-6">
                                <FormField label="Current Password" error={errors.currentPassword}>
                                    <Input {...register('currentPassword')} type="password" placeholder="••••••••" className="h-14 rounded-2xl" />
                                </FormField>
                                <FormField label="New Password" error={errors.newPassword}>
                                    <Input {...register('newPassword')} type="password" placeholder="••••••••" className="h-14 rounded-2xl" />
                                </FormField>
                                <Button
                                    className="h-14 rounded-2xl font-black bg-foreground text-background"
                                    disabled={!isDirty}
                                >
                                    Update password
                                </Button>
                            </form>
                        </> :
                        <section className="flex-1 flex justify-center items-center">
                            {/* Page title */}
                            <div className="flex-1 flex flex-col items-center justify-center min-w-[320px] max-w-[320px] lg:max-w-120">
                                <Text variant='h2' className="text-center font-semibold text-gray-900 mb-2">
                                    🎉 <br />
                                    Your Password Has Been <br />
                                    Successfully Updated!
                                </Text>

                            </div>
                        </section>
                }

            </div>
        </div>
    );
};

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
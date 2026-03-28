"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
    User,
    Building2,
    CreditCard,
    Bell,
    ShieldCheck,
    MapPin,
    CheckCircle2,
    Timer,
} from "lucide-react";
import {hotelSettingsSchema, type HotelSettingsValues} from "@/lib/validations/settings";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
    const {
        getValues,
        setValue,
        handleSubmit,
        formState: { errors, isDirty },
    } = useForm<HotelSettingsValues>({
        resolver: zodResolver(hotelSettingsSchema),
        defaultValues: {
            checkInTime: "14:00",
            checkOutTime: "11:00",
        },
    });

    const onSubmit = (data: HotelSettingsValues) => {
        console.log("Saving Settings:", data);
        // Integration point for your backend API
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-5xl mx-auto space-y-10 pb-20"
        >
            {/* Header with Verification Status */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-card p-6 rounded-[2rem] border border-border/50">
                <div>
                    <Text variant="h1" className="text-3xl font-black tracking-tighter">
                        Account Settings
                    </Text>
                    <Text variant="muted">
                        Update your identity and hotel business operations.
                    </Text>
                </div>

                {/* Verification Status Badge */}
                <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-secondary/50 border border-border">
                    <div className="h-10 w-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-600">
                        <Timer size={22} className="animate-pulse" />
                    </div>
                    <div>
                        <Text className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                            Status
                        </Text>
                        <Text className="font-bold text-amber-600">
                            Verification Pending
                        </Text>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-[240px_1fr] gap-12">
                {/* Left Sidebar Nav */}
                <aside className="hidden lg:flex flex-col gap-2 sticky top-28 h-fit">
                    <SettingsTab icon={User} label="Personal Profile" active />
                    <SettingsTab icon={Building2} label="Hotel Identity" />
                    <SettingsTab icon={CreditCard} label="Bank & Payouts" />
                    <SettingsTab icon={Bell} label="Operations" />
                </aside>

                {/* Main Sections */}
                <div className="space-y-16">
                    {/* 1. Profile & Identity */}
                    <section className="space-y-6">
                        <SectionHeader
                            title="Personal Profile"
                            description="Your information for platform communication."
                        />
                        <div className="grid md:grid-cols-2 gap-6">
                            <FormField label="Full Name" error={errors.fullName}>
                                <Input
                                    {...register("fullName")}
                                    placeholder="e.g. Chinedu Okafor"
                                    className="h-14 rounded-2xl"
                                />
                            </FormField>
                            <FormField label="Direct Email" error={errors.email}>
                                <Input
                                    {...register("email")}
                                    placeholder="manager@hotel.com"
                                    className="h-14 rounded-2xl"
                                />
                            </FormField>
                            <FormField label="Phone Number (11 Digits)" error={errors.phone}>
                                <Input
                                    {...register("phone")}
                                    placeholder="08012345678"
                                    className="h-14 rounded-2xl"
                                />

                            </FormField>
                        </div>
                    </section>

                    {/* 2. Hotel/Business Profile */}
                    <section className="space-y-6">
                        <SectionHeader
                            title="Hotel Identity"
                            description="Legal and display details for your property."
                        />
                        <div className="grid md:grid-cols-2 gap-6">
                            <FormField label="Official Hotel Name" error={errors.hotelName}>
                                <Input
                                    {...register("hotelName")}
                                    placeholder="RNR Regency Lagos"
                                    className="h-14 rounded-2xl"
                                />
                            </FormField>
                            <FormField label="CAC RC Number" error={errors.cacNumber}>
                                <Input
                                    {...register("cacNumber")}
                                    placeholder="RC1234567"
                                    className="h-14 rounded-2xl"
                                />
                            </FormField>
                            <div className="md:col-span-2">
                                <FormField label="Physical Address" error={errors.address}>
                                    <Input
                                        {...register("address")}
                                        placeholder="Plot 12, Victoria Island..."
                                        className="h-14 rounded-2xl"
                                    />
                                </FormField>
                            </div>
                        </div>
                    </section>

                    {/* 3. Financials & Payouts */}
                    <section className="space-y-6">
                        <SectionHeader
                            title="Bank & Payouts"
                            description="Ensure your NUBAN details are correct for settlements."
                        />
                        <Card className="p-8 border-primary/10 bg-primary/2 rounded-[2.5rem]">
                            <div className="grid md:grid-cols-2 gap-6">
                                <FormField label="Settlement Bank" error={errors.bankName}>
                                    <select
                                        {...register("bankName")}
                                        className="w-full h-14 rounded-2xl border border-border bg-background px-4"
                                    >
                                        <option value="">Select Bank</option>
                                        <option value="zenith">Zenith Bank</option>
                                        <option value="access">Access Bank</option>
                                        <option value="gtb">GTCO</option>
                                    </select>
                                </FormField>
                                <FormField
                                    label="Account Number (10 Digits)"
                                    error={errors.accountNumber}
                                >
                                    <Input
                                        {...register("accountNumber")}
                                        placeholder="1012345678"
                                        className="h-14 rounded-2xl font-mono text-lg"
                                    />
                                </FormField>
                                <div className="md:col-span-2">
                                    <FormField
                                        label="Account Name (Must Match Bank)"
                                        error={errors.accountName}
                                    >
                                        <Input
                                            {...register("accountName")}
                                            placeholder="RNR REGENCY HOTELS LTD"
                                            className="h-14 rounded-2xl uppercase"
                                        />
                                    </FormField>
                                </div>
                            </div>
                        </Card>
                    </section>

                    {/* 4. Operational Preferences */}
                    <section className="space-y-6">
                        <SectionHeader
                            title="Operations"
                            description="Set your default stay policies."
                        />
                        <div className="grid grid-cols-2 gap-6">
                            <FormField label="Check-in Time" error={errors.checkInTime}>
                                <Input
                                    type="time"
                                    {...register("checkInTime")}
                                    className="h-14 rounded-2xl"
                                />
                            </FormField>
                            <FormField label="Check-out Time" error={errors.checkOutTime}>
                                <Input
                                    type="time"
                                    {...register("checkOutTime")}
                                    className="h-14 rounded-2xl"
                                />
                            </FormField>
                        </div>
                    </section>

                    {/* Floating Save Button */}
                    <div className="sticky bottom-8 left-0 w-full flex justify-end animate-in slide-in-from-bottom-4">
                        <Button
                            disabled={!isDirty}
                            type="submit"
                            className="h-16 px-12 rounded-2xl font-black text-lg shadow-2xl shadow-primary/30 gap-2"
                        >
                            <CheckCircle2 size={20} />
                            Save All Changes
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    );
}

// Helper Components
function SectionHeader({
    title,
    description,
}: {
    title: string;
    description: string;
}) {
    return (
        <div className="border-b border-border pb-4">
            <Text className="text-xl font-black tracking-tight">{title}</Text>
            <Text variant="muted" className="text-sm">
                {description}
            </Text>
        </div>
    );
}


function FormField({ label, children, error }: any) {
    return (
        <div className="space-y-2">
            <Text className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/80 pl-1">
                {label}
            </Text>
            {children}
            {error && (
                <Text className="text-xs text-red-500 font-bold pl-1">
                    {error.message}
                </Text>
            )}
        </div>
    );
}

function SettingsTab({ icon: Icon, label, active }: any) {
    return (
        <button
            type="button"
            className={cn(
                "flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold transition-all",
                active
                    ? "bg-primary text-background shadow-lg shadow-primary/20"
                    : "text-muted-foreground hover:bg-secondary",
            )}
        >
            <Icon size={20} />
            {label}
        </button>
    );
}

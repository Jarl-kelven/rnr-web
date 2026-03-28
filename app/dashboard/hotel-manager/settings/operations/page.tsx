"use client";

import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const cancellationPolicySchema = z.object({
    type: z.string().optional(),
    details: z.string().optional()
});


export default function Page() {
    const [notificationSettings, setNotificationSettings] = useState({
        pushNotifications: false,
        emailAlerts: false,
        SMSAlerts: false
    });

    const [stayTimePolicy, setStayTimePolicy] = useState({ checkIn: '14:00', checkOut: "11:00" });

    const { handleSubmit, register, formState: { isDirty } } = useForm({
        resolver: zodResolver(cancellationPolicySchema),
        defaultValues: {
            type: 'Custom Policy...',
            details: ''
        }
    })


    const submitNotificationSettings = (data: {
        pushNotifications: boolean;
        emailAlerts: boolean;
        SMSAlerts: boolean;
    }) => { 
        console.log(data);
    };

    const submitStayTimePolicy = (data: {
        checkIn: string;
        checkOut: string;
    }) => { 
        console.log(data);
    };

    const submitCancellationPolicy = (data: { type?: string, details?: string }) => {
        console.log(data);
    };




    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-20">
            <header className="flex items-center gap-4">
                <Link href="/dashboard/hotel-manager/settings" className="flex items-center gap-2 text-muted-foreground">
                    <ChevronLeft size={20} /> <Text className="font-bold">Back</Text>
                </Link>
            </header>

            <div className="space-y-12">
                {/* Notification Toggles */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3">
                        <Text className="text-xl font-black">New Booking Alerts</Text>
                    </div>
                    <div className="grid gap-3">
                        <ToggleItem
                            enabled={notificationSettings['pushNotifications']}
                            setEnabled={(e) => setNotificationSettings(n => ({ ...n, pushNotifications: e }))}
                            label="Push Notifications"
                            description="Instant alert on your mobile device"
                        />
                        <ToggleItem
                            enabled={notificationSettings['emailAlerts']}
                            setEnabled={(e) => setNotificationSettings((n) => ({ ...n, emailAlerts: e }))}
                            label="Email Alerts"
                            description="Daily summary and instant booking confirmation"
                        />
                        <ToggleItem
                            enabled={notificationSettings['SMSAlerts']}
                            setEnabled={(e) => setNotificationSettings((n) => ({ ...n, SMSAlerts: e }))}
                            label="SMS Alerts" description="Direct text for high-priority bookings"
                        />
                    </div>
                </section>

                {/* Check-in Logic */}
                <section className="space-y-4">
                    <Text className="text-xl font-black">Standard Stay Policy</Text>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Text className="text-[10px] font-black uppercase">Check-in (AM/PM)</Text>
                            <Input
                                type="time"
                                // defaultValue="14:00"
                                className="h-14 rounded-2xl"
                                value={stayTimePolicy['checkIn']}
                                onChange={(e) => setStayTimePolicy(s => ({ ...s, checkIn: e.target.value }))}
                            />
                        </div>
                        <div className="space-y-2">
                            <Text className="text-[10px] font-black uppercase">Check-out (AM/PM)</Text>
                            <Input
                                type="time"
                                // defaultValue="11:00"
                                className="h-14 rounded-2xl"
                                value={stayTimePolicy['checkOut']}
                                onChange={(e) => setStayTimePolicy(s => ({ ...s, checkOut: e.target.value }))}
                            />
                        </div>
                    </div>
                </section>

                {/* Cancellation Policy */}
                <section className="space-y-4">
                    <Text className="text-[10px] font-black uppercase tracking-widest">Cancellation Policy</Text>
                    <select
                        className="w-full h-14 rounded-2xl border border-border bg-background px-4 font-bold"
                        {...register('type')}                                                
                    >
                        <option>Flexible (Full refund 24h before)</option>
                        <option>Moderate (Full refund 5 days before)</option>
                        <option>Strict (Non-refundable)</option>
                        <option>Custom Policy...</option>
                    </select>
                    <textarea
                        placeholder="Add specific details about your cancellation terms here..."
                        className="w-full min-h-25 rounded-2xl border border-border p-4 bg-transparent text-sm resize-none"
                        {...register('details')}
                    />
                    <Button
                        className="w-full h-16 rounded-2xl font-black shadow-lg shadow-primary/20"
                        disabled={!isDirty}
                        onClick={handleSubmit(submitCancellationPolicy)}
                    >
                        Cancellation Policy
                    </Button>
                </section>

            </div>
        </div>
    );
}

function ToggleItem({ enabled, setEnabled, label, description }: { enabled: boolean, setEnabled: (e: boolean) => void, label: string; description: string }) {
    return (
        <div className="flex items-center justify-between py-3 px-4  rounded-2xl border border-border/60 bg-card">
            <div>
                <Text className="font-bold text-sm">{label}</Text>
                <div />
                <Text variant="muted" className="text-xs">{description}</Text>
            </div>
            <Switch
                checked={enabled}
                onCheckedChange={setEnabled}
            />
        </div>
    );
}
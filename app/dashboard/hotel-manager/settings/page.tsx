"use client";
import Link from "next/link";
import { Text } from "@/components/ui/text";
import {
    Building2, CreditCard, Bell,
    ShieldCheck, FileText, ChevronRight, CheckCircle, Handshake,
    LucideProps
} from "lucide-react";
import Image from "next/image";
import { ForwardRefExoticComponent, RefAttributes } from "react";


export default function SettingsOverviewPage() {
    const isVerified = true;

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <Text variant="h1" className="text-3xl font-black tracking-tighter">Setttings</Text>
                    <div />
                    <Text variant="muted">Update your account</Text>
                </div>
            </div>


            {/* 1. MANAGER PROFILE CARD */}
            <section className="relative overflow-hidden rounded-[2.5rem] p-8">
                <div className="flex flex-col items-center text-center space-y-4">
                    <div className="relative h-24 w-24 rounded-full border-4 border-background shadow-xl overflow-hidden bg-secondary">
                        <Image
                            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200"
                            alt="Manager"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <Text className="text-xl tracking-tight">Chinedu Okafor People Hotels</Text>
                        <div />
                        <Text variant="muted" className="text-sm font-medium">A lovely hotel you can not found any way elss other than this great place where we treat out client like kings and queens</Text>
                    </div>

                    {/* Account Status Badge */}
                    <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
                        {isVerified ?
                            <CheckCircle size={14} className="text-green-500" /> :
                            <div>pending</div>
                        }
                        <Text className="text-[10px] font-black uppercase tracking-widest text-green-600">Verified Account</Text>
                    </div>
                </div>
            </section>

            {/* 2. SETTINGS NAVIGATION MENU */}
            <div className="space-y-3">
                <div className="grid gap-2">
                    <SettingsMenuLink
                        href="/dashboard/hotel-manager/settings/business"
                        icon={Building2}
                        title="Hotel/Business Profile"
                        description="Legal name, address, and CAC details"
                    />
                    <SettingsMenuLink
                        href="/dashboard/hotel-manager/settings/financials"
                        icon={CreditCard}
                        title="Financials & Payouts"
                        description="Bank accounts and settlement info"
                    />
                    <SettingsMenuLink
                        href="/dashboard/hotel-manager/settings/operations"
                        icon={Bell}
                        title="Operational Preferences"
                        description="Check-in times and stay policies"
                    />
                </div>
            </div>

            {/* 3. SECURITY & LEGAL */}
            <div className="space-y-3">
                <div className="grid gap-2">
                    <SettingsMenuLink
                        href="/dashboard/hotel-manager/settings/security"
                        icon={ShieldCheck}
                        title="Security"
                        description="Password and 2FA settings"
                    />
                    <SettingsMenuLink
                        href="/dashboard/hotel-manager/settings/legal"
                        icon={Handshake}
                        title="Terms of Service"
                        description="Terms of service"
                    />
                    <SettingsMenuLink
                        href="/dashboard/hotel-manager/settings/legal"
                        icon={FileText}
                        title="Privacy Policy"
                        description="Privacy policy"
                    />
                </div>
            </div>
        </div>
    );
}

type SettingsMenusLinkProps = {
    href: string;
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
    title: string;
    description: string,
}
function SettingsMenuLink({ href, icon: Icon, title, description }: SettingsMenusLinkProps) {
    return (
        <Link href={href}>
            <div className="flex items-center justify-between p-5 rounded-3xl border-border/40 hover:border-primary/30 hover:bg-primary/2 transition-all group active:scale-[0.98]">
                <div className="flex items-center gap-5">
                    <div className="h-12 w-12 rounded-2xl bg-secondary flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-background transition-colors">
                        <Icon size={22} />
                    </div>
                    <div className="flex flex-col">
                        <Text className="font-bold text-base leading-tight">{title}</Text>
                        <Text variant="muted" className="text-xs">{description}</Text>
                    </div>
                </div>
                <ChevronRight size={18} className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </div>
        </Link>
    );
}
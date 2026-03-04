import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "./Sidebar";
import { Button } from "@/components/ui/button";

export function MobileNav() {
    return (
        <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-2">
                <div className="h-6 w-6 bg-primary rounded flex items-center justify-center text-background text-xs font-black">R</div>
                <span className="font-bold tracking-tighter">RNR Manager</span>
            </div>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Menu size={24} />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-72">
                    <Sidebar role="Hotel Manager" />
                </SheetContent>
            </Sheet>
        </div>
    );
}
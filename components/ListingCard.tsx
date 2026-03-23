import Image from "next/image";
import { Text } from "./ui/text";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { ArrowDownCircle, ArrowUpCircle, Edit3, MoreVertical, Trash2, Undo2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { ListingDataTypes, RoomStatus } from "@/types/listings";
import Link from "next/link";

type Props = {
    room: ListingDataTypes;
    onStatusChange: (id: string, status: RoomStatus) => void;
    onTabChange: (id: string, status: ListingDataTypes['tab']) => void;
    onEditChange: (id: string) => void;
    onDeleteChange: (id: string) => void;
    onRestoreChange: (id: string) => void;
    onDraftChange: (id: string) => void;
    updateStock: (id: string, mathType: 'plus' | 'minus') => void;
}

export default function ListingCard({ room, onDraftChange, onStatusChange, onEditChange, onTabChange, onDeleteChange, onRestoreChange, updateStock }: Props) {

    return (
        <div className="group flex flex-col md:flex-row items-center gap-6 p-5 rounded-[24px] bg-card border border-border/40 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
            <div className="relative h-28 w-44 rounded-2xl overflow-hidden bg-muted shrink-0">
                <Image
                    src={room.images[0]?.url || "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=400"}
                    alt={room.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-2 left-2">
                    <StatusBadge status={room.status as RoomStatus} />
                </div>
            </div>

            <div className="flex-1 space-y-1">
                <div className="flex flex-col">
                    <Link href={'./listings/' + room.id}>
                        <Text className="font-black text-xl tracking-tight hover:underline">{room.name}</Text>
                    </Link>
                    <Text variant="muted" className="text-xs uppercase font-bold tracking-widest text-primary/80">
                        {room.type} • ₦{room.price} / night
                    </Text>
                </div>
            </div>

            {/* Manual Inventory Toggle */}
            <div className="flex items-center gap-4 bg-secondary/40 p-2 rounded-2xl border border-border/50">
                <button
                    onClick={() => updateStock(room.id, 'minus')}
                    className="h-10 w-10 rounded-xl bg-background border border-border flex items-center justify-center hover:text-primary transition-colors shadow-sm"
                >
                    -
                </button>
                <div className="flex flex-col items-center min-w-10">
                    <Text className="text-xl font-black">{room.inventory}</Text>
                    <Text className="text-[8px] font-bold uppercase text-muted-foreground tracking-tighter">Stock</Text>
                </div>
                <button
                    onClick={() => updateStock(room.id, 'plus')}
                    className="h-10 w-10 rounded-xl bg-background border border-border flex items-center justify-center hover:text-primary transition-colors shadow-sm"
                >
                    +
                </button>
            </div>

            {/* ACTION MENU */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-12 w-12 rounded-xl">
                        <MoreVertical size={20} />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 rounded-xl p-2">
                    <DropdownMenuLabel className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                        className="rounded-lg gap-2 cursor-pointer"
                        onClick={() => {
                            if (room.tab === "Draft") {
                                onDraftChange(room.id)
                                return;
                            }
                            onEditChange(room.id)
                        }}
                    >
                        <Edit3 size={16} /> {room.tab === "Draft" ? "Continue writing" : "Edit Listing"}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />

                    {/* Functional Go Live / Bring Down */}
                    {room.tab === "Home" ?
                        <>
                            {room.status !== "Live" && (
                                <DropdownMenuItem
                                    onClick={() => onStatusChange(room.id, "Live")}
                                    className="rounded-lg gap-2 text-green-600 cursor-pointer focus:bg-green-50"
                                >
                                    <ArrowUpCircle size={16} /> Go Live
                                </DropdownMenuItem>
                            )}
                            {room.status === "Live" && (
                                <DropdownMenuItem
                                    onClick={() => onStatusChange(room.id, "Down")}
                                    className="rounded-lg gap-2 text-amber-600 cursor-pointer focus:bg-amber-50"
                                >
                                    <ArrowDownCircle size={16} /> Bring Down
                                </DropdownMenuItem>
                            )}
                        </> :
                        <>
                            {room.tab !== "Draft" &&
                                <DropdownMenuItem
                                    onClick={() => onRestoreChange(room.id)}
                                    className="rounded-lg gap-2 text-amber-600 cursor-pointer focus:bg-amber-50"
                                >
                                    <Undo2 size={16} /> Restore
                                </DropdownMenuItem>
                            }
                        </>
                    }
                    {
                        room.tab === "Draft" ||
                            room.tab === "Trash" ?
                            <DropdownMenuItem
                                className="rounded-lg gap-2 text-destructive cursor-pointer focus:bg-destructive/5"
                                onClick={() => onDeleteChange(room.id)}
                            >
                                <Trash2 size={16} />Delete
                            </DropdownMenuItem> :
                            <DropdownMenuItem
                                className="rounded-lg gap-2 text-destructive cursor-pointer focus:bg-destructive/5"
                                onClick={() => {
                                    onTabChange(room.id, "Trash")
                                }}
                            >
                                <Trash2 size={16} /> Move to Trash
                            </DropdownMenuItem>
                    }

                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}




function StatusBadge({ status }: { status: RoomStatus }) {
    const StatusStyles = {
        Live: "bg-green-500 text-white border-transparent",
        Down: "bg-gray-100 text-gray-600 border-gray-200",
        Pending: "bg-amber-100 text-amber-700 border-amber-200",
        Rejected: "bg-red-100 text-red-700 border-red-200",
    };

    return (
        <span className={cn(
            "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border shadow-sm",
            StatusStyles[status]
        )}>
            {status}
        </span>
    );
};
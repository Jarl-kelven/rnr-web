// import React from 'react';
// import Link from 'next/link';

// export default function GooglePlayBadge() {
//     return (
//         <Link
//             href="#"
//             className="flex h-12 w-auto items-center gap-3 rounded-xl bg-black px-4 text-white transition-transform hover:scale-105 active:scale-95"
//         >
//             <svg viewBox="0 0 512 512" width="24" height="24">
//                 <path fill="#fbc02d" d="M7 29l213 227L7 483V29z" />
//                 <path fill="#e53935" d="M7 483l337-185-124-42-213 227z" />
//                 <path fill="#4caf50" d="M409 256l-65 35-124-42L409 256z" />
//                 <path fill="#1e88e5" d="M7 29l213 227 124-42L7 29z" />
//             </svg>
//             <div className="flex flex-col items-start leading-tight">
//                 <span className="text-[10px] font-bold uppercase tracking-tight">Get it on</span>
//                 <span className="text-sm font-black">Google Play</span>
//             </div>
//         </Link>
//     );
// }

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function GooglePlayBadge({ theme = 'dark' }: { theme?: 'dark' | 'light' }) {
    return (
        <Link
            href="#"
            className={cn(
                "flex h-14 items-center gap-3 rounded-xl px-10 transition-transform hover:scale-[1.03] active:scale-95",
                theme === 'dark' ? "bg-primary text-white" : "bg-white text-black border border-border"
            )}
        >
            <svg viewBox="0 0 512 512" width="24" height="24">
                <path fill="#fbc02d" d="M7 29l213 227L7 483V29z" /><path fill="#e53935" d="M7 483l337-185-124-42-213 227z" /><path fill="#4caf50" d="M409 256l-65 35-124-42L409 256z" /><path fill="#1e88e5" d="M7 29l213 227 124-42L7 29z" />
            </svg>
            <div className="flex flex-col items-start leading-none">
                <span className="text-[9px] uppercase font-bold tracking-tighter opacity-70">Get it on</span>
                <span className="text-sm font-black tracking-tight">Google Play</span>
            </div>
        </Link>
    );
}
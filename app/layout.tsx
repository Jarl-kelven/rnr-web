import type { Metadata } from "next";

import { Providers } from "./providers";
import "./globals.css";
import { Urbanist } from 'next/font/google';

const urbanist = Urbanist({
  subsets: ['latin'],
  weight: ['300','400', '500', '700'],
});

export const metadata: Metadata = {
  title: "RideAndRest - Ride Safely. Rest Comfortably.",
  description: "Book trusted rides and affordable hotels in one app – Nigeria's journey companion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${urbanist.className} antialiased bg-background text-foreground`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthProvider } from "@/context/AuthContext";
import { useState } from "react";
import { Toaster } from "sonner";


export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
      <Toaster richColors closeButton position="top-right" duration={5000} />         
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

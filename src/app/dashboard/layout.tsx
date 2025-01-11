'use client';
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

import { Toaster } from "@/components/ui/Toaster";
import { ThemeProvider } from "@/components/ThemeProvider";

export default function DashboardLayout({ children } : Readonly<{children: ReactNode}>) {
  return (
    <SessionProvider>
      <ThemeProvider>
        {children}
        <Toaster />
      </ThemeProvider>
    </SessionProvider>
  );
}

'use client';
import { ThemeProvider } from "@/components/ThemeProvider";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export default function DashboardLayout({ children } : Readonly<{children: ReactNode}>) {
  return (
    <SessionProvider>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}

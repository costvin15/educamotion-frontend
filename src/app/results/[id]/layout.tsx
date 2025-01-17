'use client';
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/Toaster";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export default function ResultsLayout({ children } : Readonly<{children: ReactNode}>) {
  return (
    <SessionProvider>
      <ThemeProvider>
        {children}
        <Toaster />
      </ThemeProvider>
    </SessionProvider>
  );
};

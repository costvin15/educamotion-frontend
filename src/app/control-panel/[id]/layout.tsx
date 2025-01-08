'use client';
import { ReactNode } from 'react';
import { SessionProvider } from "next-auth/react";

import { ThemeProvider } from "@/components/ThemeProvider";

export default function ControlPanelLayout({ children } : Readonly<{ children : ReactNode}>) {
  return (
    <SessionProvider>
      <ThemeProvider>
        { children }
      </ThemeProvider>
    </SessionProvider>
  );
}

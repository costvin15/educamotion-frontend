'use client';
import { ReactNode } from 'react';

import { ThemeProvider } from '@/components/ThemeProvider';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from '@/components/ui/Toaster';

export default function WatchLayout({ children } : Readonly<{ children : ReactNode }>) {
  return (
    <SessionProvider>
      <ThemeProvider>
        { children }
        <Toaster />
      </ThemeProvider>
    </SessionProvider>
  );
}

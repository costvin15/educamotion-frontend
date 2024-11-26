import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { ThemeProvider } from '@/components/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'EducaMotion - Apresentações Educacionais Interativas',
  description: 'Crie apresentações educacionais envolventes com nosso intuitivo editor de slides',
};

export default function RootLayout({ children } : { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          { children }
        </ThemeProvider>
      </body>
    </html>
  )
};

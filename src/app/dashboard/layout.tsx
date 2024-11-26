import { ThemeProvider } from "@/components/ThemeProvider";
import { ReactNode } from "react";

export default function DashboardLayout({ children } : Readonly<{children: ReactNode}>) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
}

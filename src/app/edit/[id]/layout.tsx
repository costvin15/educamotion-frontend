import { ReactNode } from "react";

import { ThemeProvider } from "@/components/ThemeProvider";

export default function EditLayout({ children } : Readonly<{children: ReactNode}>) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
}

// src/app/layout.tsx

import type { Metadata } from "next";
import AppWrapper from "@/design-system/layout/AppWrapper";
import "./globals.css";

export const metadata: Metadata = {
  title: "FLOW | Demo",
  description: "FLOW | UI App wrAPPer Demo",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <AppWrapper>
          {children}
        </AppWrapper>
      </body>
    </html>
  );
}
// src/app/layout.tsx

import type { Metadata } from "next";
import AppWrapper from "../design-system/layout/AppWrapper";
import "./globals.css";

// Define system UI font variables
const systemUIHeading = {
  variable: '--font-heading',
};

const systemUIBody = {
  variable: '--font-body',
};

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
      <body
        className={`${systemUIHeading.variable} ${systemUIBody.variable} antialiased`}
      >
        <AppWrapper>
          {children}
        </AppWrapper>
      </body>
    </html>
  );
}
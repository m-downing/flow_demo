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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Check localStorage first
                const savedTheme = localStorage.getItem('theme');
                
                if (savedTheme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else if (savedTheme === 'light') {
                  document.documentElement.classList.remove('dark');
                } else {
                  // No saved preference, check system preference
                  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    document.documentElement.classList.add('dark');
                    localStorage.setItem('theme', 'dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                    localStorage.setItem('theme', 'light');
                  }
                }
              })();
            `,
          }}
        />
      </head>
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
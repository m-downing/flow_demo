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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const savedTheme = localStorage.getItem('theme');
                  if (savedTheme === 'dark') {
                    document.documentElement.classList.add('dark');
                    document.documentElement.style.setProperty('--sidebar-bg', 'rgb(38 38 38)');
                  } else if (savedTheme === 'light') {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.style.setProperty('--sidebar-bg', 'rgba(30, 58, 138, 0.9)');
                  } else {
                    // No saved preference, check system preference
                    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                      document.documentElement.classList.add('dark');
                      document.documentElement.style.setProperty('--sidebar-bg', 'rgb(38 38 38)');
                    } else {
                      document.documentElement.style.setProperty('--sidebar-bg', 'rgba(30, 58, 138, 0.9)');
                    }
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased">
        <AppWrapper>
          {children}
        </AppWrapper>
      </body>
    </html>
  );
}
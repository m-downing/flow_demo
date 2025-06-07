// src/app/layout.tsx

import type { Metadata } from "next";
import AppWrapper from "@/design-system/layout/AppWrapper";
import "./globals.css";

export const metadata: Metadata = {
  title: "Flow | IP Supply Chain",
  description: "FLOW | UI App wrAPPer Demo",
  icons: {
    icon: '/icons/favicons/flow.ico',
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
                    document.documentElement.style.setProperty('--sidebar-bg', '#262626'); // neutral.800
                  } else if (savedTheme === 'light') {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.style.setProperty('--sidebar-bg', '#17314ae6'); // primary.600 with 90% opacity
                  } else {
                    // No saved preference, check system preference
                    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                      document.documentElement.classList.add('dark');
                      document.documentElement.style.setProperty('--sidebar-bg', '#262626'); // neutral.800
                    } else {
                      document.documentElement.style.setProperty('--sidebar-bg', '#17314ae6'); // primary.600 with 90% opacity
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
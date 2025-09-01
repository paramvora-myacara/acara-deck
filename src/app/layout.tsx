import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'CapMatch Pitch Deck',
  description: 'CapMatch - Real estate lending platform and investment opportunities',
  icons: [
    { rel: 'icon', url: '/CapMatchLogo.png' },
    { rel: 'apple-touch-icon', url: '/CapMatchLogo.png' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " relative overflow-x-hidden"}>
        {/* Global Blueprint Grid Background */}
        <div className="pointer-events-none fixed inset-0 -z-10 opacity-40">
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id="global-blueprint-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#60a5fa" strokeWidth="0.8" opacity="0.8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#global-blueprint-grid)" />
          </svg>
        </div>
        {children}
      </body>
    </html>
  );
}

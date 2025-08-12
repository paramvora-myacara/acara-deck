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
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}

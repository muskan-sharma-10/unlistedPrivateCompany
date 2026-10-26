import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "../style/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Unlisted Pond — Discover India's Unlisted & Pre-IPO Shares",
  description:
    "India's trusted platform for unlisted, pre-IPO and ESOP shares. Research-led insights and indicative prices for unlisted companies. Connect buyers and sellers safely.",
  keywords: [
    "unlisted pond",
    "unlisted shares",
    "pre-IPO shares",
    "ESOP shares",
    "NSE unlisted share price",
    "unlisted share prices india",
    "unlisted pond india",
    "DRHP filed companies"
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-96.png", sizes: "96x96", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

import { AuthProvider } from "@/lib/supabase/auth-context";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable}`}>
      <body className="min-h-screen bg-background text-foreground font-sans antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

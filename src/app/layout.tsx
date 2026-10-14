import type { Metadata, Viewport } from "next";
import "../style/globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Private Market — Discover India's Unlisted & Pre-IPO Shares",
  description:
    "India's trusted platform for unlisted, pre-IPO and ESOP shares. Research-led insights and indicative prices for unlisted companies. Connect buyers and sellers safely.",
  keywords: [
    "unlisted shares",
    "pre-IPO shares",
    "ESOP shares",
    "NSE unlisted share price",
    "unlisted share prices india",
    "unlistedzone",
    "private market india",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className="min-h-screen bg-[#f3f8f7] text-[#111827] antialiased">
        {children}
      </body>
    </html>
  );
}

// import type { Metadata, Viewport } from "next";
// import { Inter } from "next/font/google";
// import "../style/globals.css";

// const inter = Inter({
//   subsets: ["latin"],
//   variable: "--font-inter",
//   display: "swap",
// });

// export const viewport: Viewport = {
//   width: "device-width",
//   initialScale: 1,
// };

// export const metadata: Metadata = {
//   title: "Unlisted Pond — Discover India's Unlisted & Pre-IPO Shares",
//   description:
//     "India's trusted platform for unlisted, pre-IPO and ESOP shares. Research-led insights and indicative prices for unlisted companies. Connect buyers and sellers safely.",
//   keywords: [
//     "unlisted pond",
//     "unlisted shares",
//     "pre-IPO shares",
//     "ESOP shares",
//     "NSE unlisted share price",
//     "unlisted share prices india",
//     "unlisted pond india",
//     "DRHP filed companies"
//   ],
//   icons: {
//     icon: [
//       { url: "/favicon.ico", sizes: "any" },
//       { url: "/icon-96.png", sizes: "96x96", type: "image/png" },
//       { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
//     ],
//     shortcut: "/favicon.ico",
//     apple: "/apple-touch-icon.png",
//   },
// };

// import { AuthProvider } from "@/lib/supabase/auth-context";

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en" className={`scroll-smooth ${inter.variable}`}>
//       <body className="min-h-screen bg-background text-foreground font-sans antialiased">
//         <AuthProvider>
//           {children}
//         </AuthProvider>
//       </body>
//     </html>
//   );
// }


import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "../style/globals.css";
import { AuthProvider } from "@/lib/supabase/auth-context";

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
  metadataBase: new URL("https://www.unlistedpond.com"),

  title: {
    default: "Unlisted Pond | Unlisted & Pre-IPO Shares in India",
    template: "%s | Unlisted Pond",
  },

  description:
    "Explore unlisted shares, pre-IPO companies, indicative share prices, DRHP filings, and research insights in India on Unlisted Pond.",

  keywords: [
    "Unlisted Pond",
    "unlisted shares",
    "unlisted share prices India",
    "pre-IPO shares",
    "ESOP shares",
    "NSE unlisted share price",
    "DRHP filed companies",
    "unlisted companies in India",
  ],

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  openGraph: {
    type: "website",
    siteName: "Unlisted Pond",
    title: "Unlisted Pond | Unlisted & Pre-IPO Shares in India",
    description:
      "Explore unlisted shares, pre-IPO companies, indicative prices, DRHP filings, and research insights in India.",
    url: "https://www.unlistedpond.com/",
  },

  twitter: {
    card: "summary",
    title: "Unlisted Pond | Unlisted & Pre-IPO Shares in India",
    description:
      "Explore unlisted shares, pre-IPO companies, indicative prices, and research insights in India.",
  },

  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
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
    <html lang="en" className={`scroll-smooth ${inter.variable}`}>
      <body className="min-h-screen bg-background text-foreground font-sans antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

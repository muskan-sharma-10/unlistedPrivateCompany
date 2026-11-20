import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: {
    absolute: 'Investor Portfolio & Enquiries | Unlisted Pond',
  },
  description: 'View and manage your unlisted equity enquiries, active interests, and portfolio allocations on Unlisted Pond.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'none',
      'max-snippet': -1,
    },
  },
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

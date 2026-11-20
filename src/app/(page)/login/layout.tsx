import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: {
    absolute: 'Investor Portal Sign In | Unlisted Pond',
  },
  description: 'Sign in or register for your Unlisted Pond investor account to track unlisted share orders and enquiries.',
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

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

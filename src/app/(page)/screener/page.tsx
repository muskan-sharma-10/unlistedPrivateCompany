import type { Metadata } from 'next';
import ScreenerClient from '@/components/screener/screener-client';

export const metadata: Metadata = {
  title: 'Unlisted Company Screener | Filter Private Companies & Shares – Unlisted Pond',
  description:
    'Use our interactive unlisted company screener to filter pre-IPO stocks and unlisted shares by sector, price range, and valuation in India.',
  keywords: [
    'Unlisted Company Screener',
    'Unlisted Company List',
    'Unlisted Shares List',
    'Private Companies in India',
    'Unlisted Stock Screener',
    'Pre IPO Screener',
    'Unlisted Equity Filter',
  ],
  alternates: {
    canonical: 'https://www.unlistedpond.com/screener',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.unlistedpond.com/screener',
    siteName: 'Unlisted Pond',
    title: 'Unlisted Company Screener | Filter Private Companies & Shares – Unlisted Pond',
    description:
      'Filter and screen private companies and unlisted shares across sectors, price ranges, and market categories in India.',
    images: [
      {
        url: 'https://www.unlistedpond.com/icon-192.png',
        width: 192,
        height: 192,
        alt: 'Unlisted Company Screener – Unlisted Pond',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Unlisted Company Screener | Filter Private Companies & Shares – Unlisted Pond',
    description:
      'Filter and screen private companies and unlisted shares across sectors, price ranges, and market categories in India.',
    images: ['https://www.unlistedpond.com/icon-192.png'],
  },
};

export default function ScreenerPage() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://www.unlistedpond.com/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Screener',
          item: 'https://www.unlistedpond.com/screener',
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Unlisted Company Screener',
      url: 'https://www.unlistedpond.com/screener',
      description:
        'Interactive filtering platform for screening unlisted equities, pre-IPO enterprises, and private company shares in India.',
      isPartOf: {
        '@type': 'WebSite',
        '@id': 'https://www.unlistedpond.com/#website',
        name: 'Unlisted Pond',
        url: 'https://www.unlistedpond.com/',
      },
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ScreenerClient />
    </>
  );
}

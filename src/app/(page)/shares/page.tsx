import type { Metadata } from 'next';
import SharesListingClient from '@/components/shares/shares-listing-client';

export const metadata: Metadata = {
  title: 'Buy Unlisted Shares in India | Latest Unlisted Share Prices – Unlisted Pond',
  description:
    'Explore and enquire to buy unlisted shares and pre-IPO stocks in India. Check latest indicative unlisted share prices, lot sizes, valuations, and company financials on Unlisted Pond.',
  keywords: [
    'Buy Unlisted Shares',
    'Unlisted Share Price',
    'Unlisted Company Shares',
    'Buy Shares of Private Company',
    'Buy Shares of Unlisted Company',
    'Pre IPO Shares India',
    'Unlisted Shares List',
    'Unlisted Shares Directory'
  ],
  alternates: {
    canonical: 'https://www.unlistedpond.com/shares',
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
    url: 'https://www.unlistedpond.com/shares',
    siteName: 'Unlisted Pond',
    title: 'Buy Unlisted Shares in India | Latest Unlisted Share Prices – Unlisted Pond',
    description:
      'Explore and enquire to buy unlisted shares and pre-IPO stocks in India. Check latest indicative unlisted share prices, lot sizes, valuations, and company financials on Unlisted Pond.',
    images: [
      {
        url: 'https://www.unlistedpond.com/icon-192.png',
        width: 192,
        height: 192,
        alt: 'Buy Unlisted Shares – Unlisted Pond',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Buy Unlisted Shares in India | Latest Unlisted Share Prices – Unlisted Pond',
    description:
      'Explore and enquire to buy unlisted shares and pre-IPO stocks in India. Check latest indicative unlisted share prices and valuations on Unlisted Pond.',
    images: ['https://www.unlistedpond.com/icon-192.png'],
  },
};

export default function AllSharesPage() {
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
          name: 'Unlisted Shares',
          item: 'https://www.unlistedpond.com/shares',
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Unlisted Shares Directory India',
      url: 'https://www.unlistedpond.com/shares',
      description:
        'Comprehensive directory of verified unlisted shares, pre-IPO equities, indicative prices, and company financials in India.',
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
      <SharesListingClient />
    </>
  );
}

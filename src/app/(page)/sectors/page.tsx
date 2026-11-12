import type { Metadata } from 'next';
import SectorsClient from '@/components/sectors/sectors-client';

export const metadata: Metadata = {
  title: 'Unlisted Companies by Sector | Private Shares Directory – Unlisted Pond',
  description:
    'Explore unlisted companies in India categorized by sector. Discover private equities and pre-IPO opportunities across financial services, technology, renewable energy, and more.',
  keywords: [
    'Unlisted Companies by Sector',
    'Private Companies in India',
    'Unlisted Shares List',
    'Unlisted Market Sectors',
    'Pre IPO Shares India',
    'Financial Services Unlisted Shares',
    'Renewable Energy Unlisted Shares',
  ],
  alternates: {
    canonical: 'https://www.unlistedpond.com/sectors',
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
    url: 'https://www.unlistedpond.com/sectors',
    siteName: 'Unlisted Pond',
    title: 'Unlisted Companies by Sector | Private Shares Directory – Unlisted Pond',
    description:
      'Explore unlisted companies in India categorized by sector. Discover private equities and pre-IPO opportunities across financial services, technology, renewable energy, and more.',
    images: [
      {
        url: 'https://www.unlistedpond.com/icon-192.png',
        width: 192,
        height: 192,
        alt: 'Unlisted Pond – Sector Directory',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Unlisted Companies by Sector | Private Shares Directory – Unlisted Pond',
    description:
      'Explore unlisted companies in India categorized by sector. Discover private equities and pre-IPO opportunities across financial services, technology, renewable energy, and more.',
  },
};

export default function SectorsPage() {
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Unlisted Companies by Sector',
    description:
      'Directory of Indian unlisted companies and pre-IPO equities categorized by industry sector.',
    url: 'https://www.unlistedpond.com/sectors',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Unlisted Pond',
      url: 'https://www.unlistedpond.com/',
    },
  };

  const breadcrumbSchema = {
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
        name: 'Sectors',
        item: 'https://www.unlistedpond.com/sectors',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <SectorsClient />
    </>
  );
}

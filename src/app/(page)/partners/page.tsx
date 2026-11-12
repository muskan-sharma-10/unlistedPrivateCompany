import type { Metadata } from 'next';
import PartnersClient from '@/components/partners/partners-client';

export const metadata: Metadata = {
  title: 'Partner with Unlisted Pond | Sub-Broker & Wealth Partner Program',
  description:
    'Join over 250+ active sub-brokers, IFAs, wealth managers, and fintech partners across India. Offer verified unlisted and pre-IPO shares with institutional dealing desk backing.',
  keywords: [
    'Partner with Unlisted Pond',
    'Unlisted Shares Sub Broker',
    'Pre IPO Franchise India',
    'Wealth Manager Unlisted Shares',
    'ESOP Liquidity Partner',
  ],
  alternates: {
    canonical: 'https://www.unlistedpond.com/partners',
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
    url: 'https://www.unlistedpond.com/partners',
    siteName: 'Unlisted Pond',
    title: 'Partner with Unlisted Pond | Sub-Broker & Wealth Partner Program',
    description:
      'Join over 250+ active sub-brokers, IFAs, wealth managers, and fintech partners across India. Offer verified unlisted and pre-IPO shares with institutional dealing desk backing.',
    images: [
      {
        url: 'https://www.unlistedpond.com/icon-192.png',
        width: 192,
        height: 192,
        alt: 'Unlisted Pond – Partner Program',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Partner with Unlisted Pond | Sub-Broker & Wealth Partner Program',
    description:
      'Join 250+ active sub-brokers, IFAs, and wealth institutions offering verified unlisted shares in India.',
  },
};

export default function PartnersPage() {
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Partner with Unlisted Pond',
    description:
      'Partner programs for sub-brokers, IFAs, wealth managers, and corporate founders seeking unlisted share access or ESOP liquidity.',
    url: 'https://www.unlistedpond.com/partners',
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
        name: 'Partners',
        item: 'https://www.unlistedpond.com/partners',
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
      <PartnersClient />
    </>
  );
}

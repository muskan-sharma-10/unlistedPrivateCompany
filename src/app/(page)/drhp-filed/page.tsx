import type { Metadata } from 'next';
import DrhpClient from '@/components/drhp/drhp-client';

export const metadata: Metadata = {
  title: 'DRHP Filed Companies in India | Upcoming IPOs & Pre-IPO Shares – Unlisted Pond',
  description:
    'Track companies that have filed Draft Red Herring Prospectus (DRHP) with SEBI. Analyze issue sizes, indicative unlisted prices, and upcoming Indian IPO timelines.',
  keywords: [
    'DRHP Filed Companies',
    'Pre IPO Shares India',
    'Upcoming IPOs India',
    'SEBI DRHP Status',
    'Unlisted Shares India',
    'Buy Pre IPO Shares',
    'Draft Red Herring Prospectus',
  ],
  alternates: {
    canonical: 'https://www.unlistedpond.com/drhp-filed',
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
    url: 'https://www.unlistedpond.com/drhp-filed',
    siteName: 'Unlisted Pond',
    title: 'DRHP Filed Companies in India | Upcoming IPOs & Pre-IPO Shares – Unlisted Pond',
    description:
      'Track companies that have filed Draft Red Herring Prospectus (DRHP) with SEBI. Analyze issue sizes, indicative unlisted prices, and upcoming Indian IPO timelines.',
    images: [
      {
        url: 'https://www.unlistedpond.com/icon-192.png',
        width: 192,
        height: 192,
        alt: 'Unlisted Pond – DRHP Filed Companies',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DRHP Filed Companies in India | Upcoming IPOs & Pre-IPO Shares – Unlisted Pond',
    description:
      'Track companies that have filed Draft Red Herring Prospectus (DRHP) with SEBI. Analyze issue sizes, indicative unlisted prices, and upcoming Indian IPO timelines.',
  },
};

export default function DrhpFiledPage() {
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'DRHP Filed Companies in India',
    description:
      'Track companies that have officially filed their Draft Red Herring Prospectus (DRHP) with SEBI for upcoming initial public offerings.',
    url: 'https://www.unlistedpond.com/drhp-filed',
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
        name: 'DRHP Filed',
        item: 'https://www.unlistedpond.com/drhp-filed',
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
      <DrhpClient />
    </>
  );
}

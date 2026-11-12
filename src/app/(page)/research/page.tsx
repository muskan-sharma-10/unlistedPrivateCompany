import type { Metadata } from 'next';
import ResearchClient from '@/components/research/research-client';

export const metadata: Metadata = {
  title: 'Company Research & Valuation Reports | Unlisted Pond',
  description:
    'Institutional-grade research notes, DRHP draft prospectus breakdowns, and pre-IPO valuation models on India’s leading unlisted companies.',
  keywords: [
    'Unlisted Company Research',
    'Pre IPO Valuation Reports',
    'DRHP Analysis India',
    'NSE Share Analysis',
    'MSEI Research Note',
    'Unlisted Pond Research',
  ],
  alternates: {
    canonical: 'https://www.unlistedpond.com/research',
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
    url: 'https://www.unlistedpond.com/research',
    siteName: 'Unlisted Pond',
    title: 'Company Research & Valuation Reports | Unlisted Pond',
    description:
      'Institutional-grade research notes, DRHP draft prospectus breakdowns, and pre-IPO valuation models on India’s leading unlisted companies.',
    images: [
      {
        url: 'https://www.unlistedpond.com/icon-192.png',
        width: 192,
        height: 192,
        alt: 'Unlisted Pond – Research Reports',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Company Research & Valuation Reports | Unlisted Pond',
    description:
      'Institutional-grade research notes, DRHP draft prospectus breakdowns, and pre-IPO valuation models on India’s leading unlisted companies.',
  },
};

export default function ResearchPage() {
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Company Research & Valuation Reports',
    description:
      'Institutional-grade breakdowns of unlisted balance sheets, DRHP draft prospectuses, and private-market valuations.',
    url: 'https://www.unlistedpond.com/research',
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
        name: 'Research Reports',
        item: 'https://www.unlistedpond.com/research',
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
      <ResearchClient />
    </>
  );
}

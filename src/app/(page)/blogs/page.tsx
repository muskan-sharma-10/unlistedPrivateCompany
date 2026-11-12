import type { Metadata } from 'next';
import BlogsClient from '@/components/blogs/blogs-client';

export const metadata: Metadata = {
  title: 'Unlisted Share Market Guides & Insights | Unlisted Pond',
  description:
    'Comprehensive guides, SEBI regulatory updates, capital gains tax explainers, and valuation frameworks for unlisted shares and pre-IPO investing in India.',
  keywords: [
    'Unlisted Shares India',
    'Unlisted Market Guides',
    'How to Buy Unlisted Shares',
    'Pre IPO Shares India',
    'Unlisted Share Taxation',
    'Unlisted Pond Blog',
  ],
  alternates: {
    canonical: 'https://www.unlistedpond.com/blogs',
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
    url: 'https://www.unlistedpond.com/blogs',
    siteName: 'Unlisted Pond',
    title: 'Unlisted Share Market Guides & Insights | Unlisted Pond',
    description:
      'Comprehensive guides, SEBI regulatory updates, capital gains tax explainers, and valuation frameworks for unlisted shares and pre-IPO investing in India.',
    images: [
      {
        url: 'https://www.unlistedpond.com/icon-192.png',
        width: 192,
        height: 192,
        alt: 'Unlisted Pond – Blog & Insights',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Unlisted Share Market Guides & Insights | Unlisted Pond',
    description:
      'Comprehensive guides, SEBI regulatory updates, capital gains tax explainers, and valuation frameworks for unlisted shares and pre-IPO investing in India.',
  },
};

export default function BlogsPage() {
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Unlisted Share Market Guides & Insights',
    description:
      'Curated market guides, SEBI regulatory updates, capital gains tax explainers, and insights into unlisted shares in India.',
    url: 'https://www.unlistedpond.com/blogs',
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
        name: 'Blogs & Insights',
        item: 'https://www.unlistedpond.com/blogs',
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
      <BlogsClient />
    </>
  );
}

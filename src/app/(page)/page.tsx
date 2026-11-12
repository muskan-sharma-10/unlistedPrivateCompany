import type { Metadata } from 'next';
import HomePageClient from '@/components/home/home-page-client';
import { HOME_FAQS } from '@/data/home-faqs';

export const metadata: Metadata = {
  title: 'Unlisted Shares in India | Buy & Explore Pre-IPO Shares – Unlisted Pond',
  description:
    'Explore unlisted shares in India with Unlisted Pond. Discover private companies, pre-IPO shares, indicative share prices and company information.',
  keywords: [
    'Unlisted Shares India',
    'Unlisted Shares',
    'Unlisted Market',
    'Private Share Trading',
    'Buy Unlisted Shares',
    'Buy Shares of Private Company',
    'Buy Shares of Unlisted Company',
    'Unlisted Share Price',
    'Pre IPO Shares India',
    'Unlisted Company Shares',
    'Private Company Shares',
  ],
  alternates: {
    canonical: 'https://www.unlistedpond.com/',
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
    url: 'https://www.unlistedpond.com/',
    siteName: 'Unlisted Pond',
    title: 'Unlisted Shares in India | Buy & Explore Pre-IPO Shares – Unlisted Pond',
    description:
      'Explore unlisted shares in India with Unlisted Pond. Discover private companies, pre-IPO shares, indicative share prices and company information.',
    images: [
      {
        url: 'https://www.unlistedpond.com/icon-192.png',
        width: 192,
        height: 192,
        alt: 'Unlisted Pond – Unlisted & Pre-IPO Shares in India',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Unlisted Shares in India | Buy & Explore Pre-IPO Shares – Unlisted Pond',
    description:
      'Explore unlisted shares in India with Unlisted Pond. Discover private companies, pre-IPO shares, indicative share prices and company information.',
    images: ['https://www.unlistedpond.com/icon-192.png'],
  },
};

export default function HomePage() {
  const homeJsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': 'https://www.unlistedpond.com/#website',
      url: 'https://www.unlistedpond.com/',
      name: 'Unlisted Pond',
      description:
        'India’s institutional research and information platform for unlisted, pre-IPO and ESOP shares.',
      inLanguage: 'en-IN',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://www.unlistedpond.com/shares?q={search_term_string}',
        },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': 'https://www.unlistedpond.com/#organization',
      name: 'Unlisted Pond',
      url: 'https://www.unlistedpond.com/',
      logo: 'https://www.unlistedpond.com/icon-192.png',
      description:
        'Information and dealing desk platform for unlisted equities, pre-IPO opportunities, and ESOP liquidity in India.',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '1017, Gate No. 1, New Delhi YMCA Jai Singh Road, Connaught Place',
        addressLocality: 'New Delhi',
        postalCode: '110001',
        addressCountry: 'IN',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+919220451030',
        contactType: 'customer service',
        availableLanguage: ['en', 'hi'],
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': 'https://www.unlistedpond.com/#faq',
      mainEntity: HOME_FAQS.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />
      <HomePageClient />
    </>
  );
}

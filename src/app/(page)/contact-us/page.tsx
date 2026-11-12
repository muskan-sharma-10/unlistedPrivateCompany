import type { Metadata } from 'next';
import ContactClient from '@/components/contact/contact-client';

export const metadata: Metadata = {
  title: 'Contact Institutional Dealing Desk | Unlisted Pond',
  description:
    'Contact the Unlisted Pond institutional dealing desk to inquire about unlisted share prices, confirm lot availability, sell ESOPs, or visit our Connaught Place, New Delhi office.',
  keywords: [
    'Contact Unlisted Pond',
    'Unlisted Shares Dealing Desk',
    'Sell ESOP Shares India',
    'Buy Unlisted Shares Inquiry',
    'Unlisted Shares Connaught Place New Delhi',
  ],
  alternates: {
    canonical: 'https://www.unlistedpond.com/contact-us',
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
    url: 'https://www.unlistedpond.com/contact-us',
    siteName: 'Unlisted Pond',
    title: 'Contact Institutional Dealing Desk | Unlisted Pond',
    description:
      'Contact the Unlisted Pond institutional dealing desk to inquire about unlisted share prices, confirm lot availability, sell ESOPs, or visit our Connaught Place, New Delhi office.',
    images: [
      {
        url: 'https://www.unlistedpond.com/icon-192.png',
        width: 192,
        height: 192,
        alt: 'Unlisted Pond – Contact Dealing Desk',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Institutional Dealing Desk | Unlisted Pond',
    description:
      'Contact the Unlisted Pond institutional dealing desk to inquire about unlisted share prices, confirm lot availability, or sell ESOPs.',
  },
};

export default function ContactUsPage() {
  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Unlisted Pond',
    url: 'https://www.unlistedpond.com/contact-us',
    description:
      'Institutional dealing desk contact page for unlisted shares, pre-IPO equities, and ESOP solutions in India.',
    mainEntity: {
      '@type': 'Organization',
      name: 'Unlisted Pond',
      url: 'https://www.unlistedpond.com/',
      telephone: '+91-9220451030',
      email: 'info@unlistedpond.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '1017, Gate No. 1, New Delhi YMCA Jai Singh Road, Connaught Place',
        addressLocality: 'New Delhi',
        postalCode: '110001',
        addressCountry: 'IN',
      },
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
        name: 'Contact Us',
        item: 'https://www.unlistedpond.com/contact-us',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ContactClient />
    </>
  );
}

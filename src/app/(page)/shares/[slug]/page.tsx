import type { Metadata } from 'next';
import StockDetailClient from './stock-detail-client';
import { getPortalShareBySlug } from '@/lib/supabase/queries';
import { STOCKS_DATA } from '@/data/unlisted-data';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const normalizedSlug = params.slug?.toLowerCase();
  const isMsei = normalizedSlug === 'msei' || normalizedSlug === 'msei-unlisted-shares';

  if (isMsei) {
    return {
      title: 'MSEI Share Price | Metropolitan Stock Exchange Unlisted Stock Price & Details',
      description:
        'Check live indicative MSEI unlisted share price, lot size, financials, shareholding & valuation. Track Metropolitan Stock Exchange unlisted shares on Unlisted Pond.',
      keywords: [
        'MSEI stock price unlisted',
        'MSEI unlisted price',
        'MSEI share price',
        'Metropolitan Stock Exchange',
        'Metropolitan Stock Exchange unlisted shares',
        'MSEI unlisted shares',
        'MSEI pre IPO price',
        'Metropolitan Stock Exchange share price',
      ],
      alternates: {
        canonical: 'https://www.unlistedpond.com/shares/msei',
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
        url: 'https://www.unlistedpond.com/shares/msei',
        siteName: 'Unlisted Pond',
        title: 'MSEI Share Price (Unlisted) | Metropolitan Stock Exchange Stock Price & Details',
        description:
          'Check latest indicative MSEI unlisted price, fundamentals, multi-year audited financials & Metropolitan Stock Exchange unlisted shares on Unlisted Pond.',
        images: [
          {
            url: 'https://www.unlistedpond.com/icon-192.png',
            width: 192,
            height: 192,
            alt: 'Metropolitan Stock Exchange MSEI Unlisted Shares Logo',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'MSEI Share Price (Unlisted) | Metropolitan Stock Exchange Stock Price & Details',
        description:
          'Check latest indicative MSEI unlisted price, fundamentals, multi-year audited financials & Metropolitan Stock Exchange unlisted shares on Unlisted Pond.',
        images: ['https://www.unlistedpond.com/icon-192.png'],
      },
    };
  }

  // Dynamic SEO logic for all company pages based on real data
  try {
    const live = await getPortalShareBySlug(params.slug);
    const staticItem = STOCKS_DATA.find(
      (s) => s.id.toLowerCase() === normalizedSlug || s.ticker?.toLowerCase() === normalizedSlug
    );
    const stock = live || staticItem;
    const name = stock?.name || params.slug.toUpperCase();
    const tickerStr = stock?.ticker ? `(${stock.ticker}) ` : '';
    const priceStr = stock?.price ? `₹${stock.price.toLocaleString('en-IN')}` : 'Indicative Price';
    const sectorStr = stock?.sector ? ` in ${stock.sector}` : '';

    return {
      title: `${name} ${tickerStr}Share Price | Unlisted Pre-IPO Shares – Unlisted Pond`,
      description: `Track indicative ${name} unlisted share price (${priceStr}), lot size, financial metrics, and sector details${sectorStr} on Unlisted Pond. Secure off-market Demat transfer.`,
      keywords: [
        `${name} share price`,
        `${name} unlisted share price`,
        `${name} unlisted shares`,
        `${name} pre IPO price`,
        'Unlisted Shares India',
        'Buy Unlisted Shares',
        'Private Share Trading',
        'Unlisted Pond',
      ],
      alternates: {
        canonical: `https://www.unlistedpond.com/shares/${params.slug}`,
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
        url: `https://www.unlistedpond.com/shares/${params.slug}`,
        siteName: 'Unlisted Pond',
        title: `${name} ${tickerStr}Share Price | Unlisted Pre-IPO Shares – Unlisted Pond`,
        description: `Track indicative ${name} unlisted share price (${priceStr}), lot size, financial metrics, and sector details${sectorStr} on Unlisted Pond.`,
        images: [
          {
            url: 'https://www.unlistedpond.com/icon-192.png',
            width: 192,
            height: 192,
            alt: `${name} Unlisted Shares`,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${name} ${tickerStr}Share Price | Unlisted Pre-IPO Shares – Unlisted Pond`,
        description: `Track indicative ${name} unlisted share price (${priceStr}), lot size, financial metrics, and sector details on Unlisted Pond.`,
      },
    };
  } catch {
    return {
      title: 'Unlisted Shares in India | Unlisted Pond',
      description: 'Explore live indicative prices, financials, and company details for unlisted and pre-IPO shares in India.',
    };
  }
}

export default async function StockDetailPage({ params }: PageProps) {
  const normalizedSlug = params.slug?.toLowerCase();
  const isMsei = normalizedSlug === 'msei' || normalizedSlug === 'msei-unlisted-shares';

  if (isMsei) {
    const mseiJsonLd = [
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        '@id': 'https://www.unlistedpond.com/shares/msei#breadcrumb',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://www.unlistedpond.com',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Unlisted Shares',
            item: 'https://www.unlistedpond.com/shares',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Metropolitan Stock Exchange (MSEI)',
            item: 'https://www.unlistedpond.com/shares/msei',
          },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': 'https://www.unlistedpond.com/shares/msei#webpage',
        url: 'https://www.unlistedpond.com/shares/msei',
        name: 'MSEI Share Price (Unlisted) | Metropolitan Stock Exchange Stock Price & Details',
        description:
          'Check latest indicative MSEI unlisted share price, lot size, financials, shareholding & valuation. Track Metropolitan Stock Exchange unlisted shares on Unlisted Pond.',
        breadcrumb: {
          '@id': 'https://www.unlistedpond.com/shares/msei#breadcrumb',
        },
        isPartOf: {
          '@type': 'WebSite',
          '@id': 'https://www.unlistedpond.com/#website',
          name: 'Unlisted Pond',
          url: 'https://www.unlistedpond.com',
        },
        inLanguage: 'en-IN',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Corporation',
        '@id': 'https://www.unlistedpond.com/shares/msei#organization',
        name: 'Metropolitan Stock Exchange of India Limited',
        alternateName: ['MSEI', 'MSEIL', 'Metropolitan Stock Exchange'],
        tickerSymbol: 'MSEI',
        identifier: 'U65999MH2008PLC185856',
        legalName: 'Metropolitan Stock Exchange of India Limited',
        foundingDate: '2008',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Mumbai',
          addressRegion: 'Maharashtra',
          addressCountry: 'IN',
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FinancialProduct',
        '@id': 'https://www.unlistedpond.com/shares/msei#product',
        name: 'Metropolitan Stock Exchange (MSEI) Unlisted Shares',
        alternateName: 'MSEI Unlisted Shares',
        description:
          'Indicative unlisted equity shares of Metropolitan Stock Exchange of India Limited (MSEI). Available for verified off-market Demat transfer via CDSL and NSDL.',
        category: 'Unlisted Equity Shares',
        provider: {
          '@type': 'Organization',
          name: 'Unlisted Pond',
          url: 'https://www.unlistedpond.com',
        },
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'INR',
          lowPrice: '5.45',
          highPrice: '7.75',
          price: '6.95',
          priceValidUntil: '2027-12-31',
          availability: 'https://schema.org/InStock',
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        '@id': 'https://www.unlistedpond.com/shares/msei#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is the current MSEI unlisted share price and how is it determined?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "The indicative MSEI unlisted share price is determined through over-the-counter (OTC) demand and supply across verified institutional brokers, HNIs, and private market participants. As an unlisted entity, MSEI share price reflects its capital reorganization, strategic fundraising from marquee investors (Peak XV, Groww, Zerodha's Rainmatter), and financial infrastructure valuation. On Unlisted Pond, you can track live indicative MSEI prices and verified historical trends.",
            },
          },
          {
            '@type': 'Question',
            name: 'How to buy and sell MSEI Unlisted Shares on Unlisted Pond?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'You can buy or sell Metropolitan Stock Exchange (MSEI) unlisted shares through Unlisted Pond in 5 simple steps: (1) Review the live indicative MSEI unlisted price and minimum lot size. (2) Connect with our dealing desk to confirm rates and lock in your order. (3) Submit your Client Master Report (CMR) and PAN card for Demat verification. (4) Transfer funds securely via official banking channels (RTGS/NEFT). (5) Receive MSEI shares directly credited to your CDSL or NSDL Demat account within 24 hours of settlement.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the lot size and minimum investment for MSEI unlisted shares?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The standard trading lot size for Metropolitan Stock Exchange (MSEI) unlisted shares is typically 10,000 shares. Based on the prevailing indicative unit rate, the minimum ticket size ranges between ₹60,000 to ₹70,000. Institutional investors and retail buyers can also discuss customized parcel sizes with our institutional dealing desk.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the ISIN and legal status of Metropolitan Stock Exchange unlisted shares?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Metropolitan Stock Exchange of India Limited has the verified ISIN INE312K01010 and CIN U65999MH2008PLC185856. Buying and selling MSEI unlisted shares in India is 100% legal under SEBI regulations and Depository Acts. All transfers occur through legal off-market Demat transactions (DIS / CDSL Easiest / NSDL Speed-e).',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the SEBI lock-in period for MSEI shares upon an IPO listing?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Under SEBI (Issue of Capital and Disclosure Requirements) guidelines revised in August 2021, pre-IPO equity shares held by non-promoters are subject to a mandatory 6-month lock-in period from the date of IPO listing on recognized stock exchanges (reduced from 1 year earlier).',
            },
          },
          {
            '@type': 'Question',
            name: 'How are capital gains taxed on MSEI unlisted shares?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Under the revised Budget 2024 taxation framework: (1) Long-Term Capital Gains (LTCG) on unlisted shares held for over 24 months are taxed at a flat rate of 12.5% without indexation. (2) Short-Term Capital Gains (STCG) on shares held for 24 months or less are taxed as per your applicable income tax slab rate.',
            },
          },
        ],
      },
    ];

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(mseiJsonLd) }}
        />
        <StockDetailClient params={params} />
      </>
    );
  }

  // Dynamic JSON-LD structured data for every other company
  let stock = null;
  try {
    const live = await getPortalShareBySlug(params.slug);
    const staticItem = STOCKS_DATA.find(
      (s) => s.id.toLowerCase() === normalizedSlug || s.ticker?.toLowerCase() === normalizedSlug
    );
    stock = live || staticItem;
  } catch {
    // fallback
  }

  const name = stock?.name || params.slug.toUpperCase();
  const price = stock?.price || 0;
  const canonicalUrl = `https://www.unlistedpond.com/shares/${params.slug}`;

  const dynamicJsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://www.unlistedpond.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Unlisted Shares',
          item: 'https://www.unlistedpond.com/shares',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name,
          item: canonicalUrl,
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      url: canonicalUrl,
      name: `${name} Share Price | Unlisted Shares India – Unlisted Pond`,
      description: `Track indicative ${name} unlisted share price, lot size, financials, and company details on Unlisted Pond.`,
      isPartOf: {
        '@type': 'WebSite',
        name: 'Unlisted Pond',
        url: 'https://www.unlistedpond.com',
      },
      inLanguage: 'en-IN',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Corporation',
      name,
      ...(stock?.ticker ? { tickerSymbol: stock.ticker } : {}),
      ...(stock?.cin ? { identifier: stock.cin } : {}),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FinancialProduct',
      name: `${name} Unlisted Shares`,
      description: `Indicative unlisted equity shares of ${name}. Available for verified off-market Demat transfer via CDSL and NSDL.`,
      category: 'Unlisted Equity Shares',
      provider: {
        '@type': 'Organization',
        name: 'Unlisted Pond',
        url: 'https://www.unlistedpond.com',
      },
      ...(price > 0
        ? {
            offers: {
              '@type': 'Offer',
              priceCurrency: 'INR',
              price: String(price),
              availability: 'https://schema.org/InStock',
            },
          }
        : {}),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: `What is the indicative share price of ${name} unlisted shares?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: price > 0
              ? `The indicative unlisted share price for ${name} is ₹${price.toLocaleString('en-IN')}. In the unlisted market, prices are determined by supply and demand, institutional transactions, and company developments.`
              : `The unlisted share price for ${name} is indicative and determined based on peer valuations, recent off-market transactions, and supply-demand on Unlisted Pond.`,
          },
        },
        {
          '@type': 'Question',
          name: `How can I trade or invest in ${name} unlisted shares?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `You can explore and acquire ${name} unlisted shares through Unlisted Pond. Our dealing desk confirms real-time lot availability and coordinates secure off-market Demat transfer to your NSDL/CDSL account.`,
          },
        },
        {
          '@type': 'Question',
          name: `Is it legal to buy ${name} unlisted shares in India?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `Yes, buying and selling unlisted equity shares of Indian companies like ${name} is completely legal under SEBI and Depository regulations, executed via off-market Demat settlement (DIS / CDSL Easiest / NSDL Speed-e).`,
          },
        },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dynamicJsonLd) }}
      />
      <StockDetailClient params={params} />
    </>
  );
}

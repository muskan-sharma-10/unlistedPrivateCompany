import type { Metadata } from 'next';
import ResearchDetailClient from '@/components/research/research-detail-client';
import { getPortalResearchReports } from '@/lib/supabase/queries';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const reports = await getPortalResearchReports();
    const report = reports.find(
      (r) =>
        r.slug.toLowerCase() === params.slug.toLowerCase() ||
        r.id.toLowerCase() === params.slug.toLowerCase()
    );

    if (report) {
      return {
        title: `${report.title} | Unlisted Pond Research`,
        description: report.summary,
        keywords: [
          report.tag,
          'Unlisted Stock Research',
          'Pre IPO Valuation',
          'Unlisted Pond',
        ],
        alternates: {
          canonical: `https://www.unlistedpond.com/research/${params.slug}`,
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
          type: 'article',
          locale: 'en_IN',
          url: `https://www.unlistedpond.com/research/${params.slug}`,
          siteName: 'Unlisted Pond',
          title: `${report.title} | Unlisted Pond Research`,
          description: report.summary,
          images: [
            {
              url: 'https://www.unlistedpond.com/icon-192.png',
              width: 192,
              height: 192,
              alt: report.title,
            },
          ],
        },
        twitter: {
          card: 'summary_large_image',
          title: `${report.title} | Unlisted Pond Research`,
          description: report.summary,
        },
      };
    }
  } catch {
    // fallback
  }

  return {
    title: 'Company Research Note | Unlisted Pond',
    description: 'Institutional-grade research and financial analysis of unlisted and pre-IPO companies.',
    alternates: {
      canonical: `https://www.unlistedpond.com/research/${params.slug}`,
    },
  };
}

export default async function ResearchDetailPage({ params }: PageProps) {
  let report = null;
  try {
    const reports = await getPortalResearchReports();
    report = reports.find(
      (r) =>
        r.slug.toLowerCase() === params.slug.toLowerCase() ||
        r.id.toLowerCase() === params.slug.toLowerCase()
    );
  } catch {
    // fallback
  }

  const canonicalUrl = `https://www.unlistedpond.com/research/${params.slug}`;

  const reportJsonLd = report
    ? [
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
              name: 'Research Reports',
              item: 'https://www.unlistedpond.com/research',
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: report.title,
              item: canonicalUrl,
            },
          ],
        },
        {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: report.title,
          description: report.summary,
          url: canonicalUrl,
          author: {
            '@type': 'Organization',
            name: report.analyst || 'Unlisted Pond Research Desk',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Unlisted Pond',
            url: 'https://www.unlistedpond.com',
            logo: {
              '@type': 'ImageObject',
              url: 'https://www.unlistedpond.com/icon-192.png',
            },
          },
          datePublished: report.date,
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': canonicalUrl,
          },
        },
      ]
    : null;

  return (
    <>
      {reportJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(reportJsonLd) }}
        />
      )}
      <ResearchDetailClient params={params} />
    </>
  );
}

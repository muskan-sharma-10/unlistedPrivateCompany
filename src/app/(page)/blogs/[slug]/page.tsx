import type { Metadata } from 'next';
import BlogDetailClient from '@/components/blogs/blog-detail-client';
import { getPortalBlogs } from '@/lib/supabase/queries';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const blogs = await getPortalBlogs();
    const article = blogs.find(
      (b) =>
        b.slug.toLowerCase() === params.slug.toLowerCase() ||
        b.id.toLowerCase() === params.slug.toLowerCase()
    );

    if (article) {
      return {
        title: `${article.title} | Unlisted Pond Blog`,
        description: article.summary,
        keywords: [
          article.category,
          'Unlisted Shares India',
          'Pre IPO Investing',
          'Unlisted Pond',
        ],
        alternates: {
          canonical: `https://www.unlistedpond.com/blogs/${params.slug}`,
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
          url: `https://www.unlistedpond.com/blogs/${params.slug}`,
          siteName: 'Unlisted Pond',
          title: `${article.title} | Unlisted Pond`,
          description: article.summary,
          images: [
            {
              url: 'https://www.unlistedpond.com/icon-192.png',
              width: 192,
              height: 192,
              alt: article.title,
            },
          ],
        },
        twitter: {
          card: 'summary_large_image',
          title: `${article.title} | Unlisted Pond`,
          description: article.summary,
        },
      };
    }
  } catch {
    // fallback
  }

  return {
    title: 'Market Insights & Knowledge Centre | Unlisted Pond',
    description: 'Expert research notes, tax guides, and regulatory updates on unlisted shares in India.',
    alternates: {
      canonical: `https://www.unlistedpond.com/blogs/${params.slug}`,
    },
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  let article = null;
  try {
    const blogs = await getPortalBlogs();
    article = blogs.find(
      (b) =>
        b.slug.toLowerCase() === params.slug.toLowerCase() ||
        b.id.toLowerCase() === params.slug.toLowerCase()
    );
  } catch {
    // fallback
  }

  const canonicalUrl = `https://www.unlistedpond.com/blogs/${params.slug}`;

  const articleJsonLd = article
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
              name: 'Blogs & Insights',
              item: 'https://www.unlistedpond.com/blogs',
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: article.title,
              item: canonicalUrl,
            },
          ],
        },
        {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: article.title,
          description: article.summary,
          url: canonicalUrl,
          author: {
            '@type': 'Person',
            name: article.author || 'Unlisted Pond Research Desk',
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
          datePublished: article.date,
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': canonicalUrl,
          },
        },
      ]
    : null;

  return (
    <>
      {articleJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
      )}
      <BlogDetailClient params={params} />
    </>
  );
}

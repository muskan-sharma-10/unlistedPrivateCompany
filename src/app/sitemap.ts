import type { MetadataRoute } from 'next';
import { STOCKS_DATA } from '@/data/unlisted-data';
import { getPortalShares, getPortalBlogs, getPortalResearchReports } from '@/lib/supabase/queries';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.unlistedpond.com';

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      changeFrequency: 'daily',
      priority: 1.0,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/shares`,
      changeFrequency: 'daily',
      priority: 0.95,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/screener`,
      changeFrequency: 'daily',
      priority: 0.9,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/sectors`,
      changeFrequency: 'weekly',
      priority: 0.85,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/drhp-filed`,
      changeFrequency: 'daily',
      priority: 0.85,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/research`,
      changeFrequency: 'weekly',
      priority: 0.8,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/blogs`,
      changeFrequency: 'weekly',
      priority: 0.8,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/about-us`,
      changeFrequency: 'monthly',
      priority: 0.6,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/our-team`,
      changeFrequency: 'monthly',
      priority: 0.6,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/partners`,
      changeFrequency: 'monthly',
      priority: 0.6,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/contact-us`,
      changeFrequency: 'monthly',
      priority: 0.6,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/sebi-compliance`,
      changeFrequency: 'monthly',
      priority: 0.5,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/risk-disclosures`,
      changeFrequency: 'monthly',
      priority: 0.5,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/terms-of-information`,
      changeFrequency: 'monthly',
      priority: 0.5,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/privacy-policy`,
      changeFrequency: 'monthly',
      priority: 0.5,
      lastModified: new Date(),
    },
  ];

  // Dynamic Stock Detail Pages
  let stocks = STOCKS_DATA;
  try {
    const liveShares = await getPortalShares();
    if (liveShares && liveShares.length > 0) {
      const mergedMap = new Map();
      STOCKS_DATA.forEach((s) => mergedMap.set(s.id.toLowerCase(), s));
      liveShares.forEach((s) => mergedMap.set(s.id.toLowerCase(), s));
      stocks = Array.from(mergedMap.values());
    }
  } catch {
    // fallback to static
  }

  const stockRoutes: MetadataRoute.Sitemap = stocks.map((s) => ({
    url: `${baseUrl}/shares/${s.id}`,
    changeFrequency: 'daily',
    priority: s.id.toLowerCase() === 'msei' ? 0.9 : 0.8,
    lastModified: s.updatedAt || s.lastUpdated ? new Date() : undefined,
  }));

  // Dynamic Blog Articles
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const blogs = await getPortalBlogs();
    if (blogs && blogs.length > 0) {
      blogRoutes = blogs.map((b) => ({
        url: `${baseUrl}/blogs/${b.slug || b.id}`,
        changeFrequency: 'weekly',
        priority: 0.7,
        lastModified: new Date(),
      }));
    }
  } catch {
    // fallback
  }

  // Dynamic Research Reports
  let researchRoutes: MetadataRoute.Sitemap = [];
  try {
    const reports = await getPortalResearchReports();
    if (reports && reports.length > 0) {
      researchRoutes = reports.map((r) => ({
        url: `${baseUrl}/research/${r.slug || r.id}`,
        changeFrequency: 'weekly',
        priority: 0.7,
        lastModified: new Date(),
      }));
    }
  } catch {
    // fallback
  }

  return [...staticRoutes, ...stockRoutes, ...blogRoutes, ...researchRoutes];
}

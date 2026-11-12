import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.unlistedpond.com";

  return [
    {
      url: baseUrl,
      changeFrequency: "daily",
      priority: 1,
    },
    { url: `${baseUrl}/shares`, changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/shares/msei`, changeFrequency: "daily", priority: 0.85 },
    {
      url: `${baseUrl}/drhp-filed`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/research`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blogs`,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    { url: `${baseUrl}/about-us`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/our-team`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/partners`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/contact-us`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/sebi-compliance`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/risk-disclosures`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/terms-of-information`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/privacy-policy`, changeFrequency: "monthly", priority: 0.5 },
  ];
}

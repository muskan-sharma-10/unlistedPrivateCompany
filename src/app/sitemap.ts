
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.unlistedpond.com";

  return [
    {
      url: baseUrl,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/all-shares`,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/drhp`,
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
  ];
}

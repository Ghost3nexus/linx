import { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

const INDUSTRIES = [
  "gym",
  "yoga",
  "pilates",
  "clinic",
  "sauna",
  "studio",
  "pickleball",
  "salon",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE.url;
  const now = new Date().toISOString();

  return [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/documents`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    ...INDUSTRIES.map((slug) => ({
      url: `${baseUrl}/solutions/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${baseUrl}/login`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/tokushoho`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/ai-disclaimer`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}

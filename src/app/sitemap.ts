import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://linx-rouge.vercel.app";
  const now = new Date().toISOString();

  return [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/login`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/documents`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    // Industry pages
    { url: `${baseUrl}/solutions/gym`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/solutions/yoga`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/solutions/pilates`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/solutions/clinic`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/solutions/sauna`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/solutions/pickleball`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/solutions/studio`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];
}

import { MetadataRoute } from "next";
import { SITE, INDEXABLE } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: INDEXABLE
      ? [{ userAgent: "*", allow: "/", disallow: ["/dashboard/", "/login", "/api/", "/demo"] }]
      : [{ userAgent: "*", disallow: "/" }],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}

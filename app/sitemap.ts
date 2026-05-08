import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";

const STATIC_ROUTES = ["/", "/about", "/designs"] as const;
const LIVE_CASE_ROUTES = ["/designs/case/personal"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: now,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.8,
  }));

  const caseStudyEntries: MetadataRoute.Sitemap = LIVE_CASE_ROUTES.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...caseStudyEntries];
}

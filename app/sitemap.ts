import type { MetadataRoute } from "next";
import { CASE_NAV_ORDER } from "@/lib/case-designs";
import { siteConfig } from "@/lib/seo";

/** Primary routes requested for indexing foundation. */
const PRIMARY_ROUTES = ["/", "/about"] as const;

/** Additional public portfolio routes. */
const SECONDARY_ROUTES = ["/designs"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const primaryEntries: MetadataRoute.Sitemap = PRIMARY_ROUTES.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: now,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.9,
  }));

  const secondaryEntries: MetadataRoute.Sitemap = SECONDARY_ROUTES.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const caseStudyEntries: MetadataRoute.Sitemap = CASE_NAV_ORDER.map((slug) => ({
    url: `${siteConfig.url}/designs/case/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...primaryEntries, ...secondaryEntries, ...caseStudyEntries];
}

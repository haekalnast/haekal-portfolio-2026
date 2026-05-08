import type { MetadataRoute } from "next";
import { CASE_DESIGNS } from "@/lib/case-designs";
import { siteConfig } from "@/lib/seo";

const STATIC_ROUTES = ["/", "/about", "/designs"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: now,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.8,
  }));

  const caseStudyEntries: MetadataRoute.Sitemap = Object.values(CASE_DESIGNS).map((caseDesign) => ({
    url: `${siteConfig.url}${caseDesign.detailHref}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...caseStudyEntries];
}

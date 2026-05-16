import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseDetailPage } from "@/components/designs/case-detail-page";
import { CASE_DESIGNS, isCaseSlug, type CaseSlug } from "@/lib/case-designs";
import { buildPageMetadata, siteConfig } from "@/lib/seo";

type CaseDetailRouteProps = {
  params: { slug: string } | Promise<{ slug: string }>;
};

/** Per-slug OG rasters under `public/`; others fall back to site default. */
const CASE_OG_IMAGE: Partial<Record<CaseSlug, string>> = {
  personal: "/og-case-personal.png",
};

async function resolveCaseSlug(params: CaseDetailRouteProps["params"]): Promise<string> {
  const resolvedParams = await Promise.resolve(params);
  return decodeURIComponent((resolvedParams.slug ?? "").trim()).toLowerCase();
}

export async function generateMetadata({ params }: CaseDetailRouteProps): Promise<Metadata> {
  const slug = await resolveCaseSlug(params);

  if (!isCaseSlug(slug)) {
    return {};
  }

  const caseDesign = CASE_DESIGNS[slug];

  return buildPageMetadata({
    title: `${caseDesign.title} | Case Study`,
    description: caseDesign.summary,
    canonicalPath: caseDesign.detailHref,
    ogImage: CASE_OG_IMAGE[slug] ?? siteConfig.ogImage,
    ogType: "article",
  });
}

export default async function CaseDetailRoute({ params }: CaseDetailRouteProps) {
  const slug = await resolveCaseSlug(params);

  if (!isCaseSlug(slug)) {
    notFound();
  }

  return <CaseDetailPage slug={slug} />;
}

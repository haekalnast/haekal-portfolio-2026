import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseDetailPage } from "@/components/designs/case-detail-page";
import { isCaseSlug } from "@/lib/case-designs";
import { siteConfig } from "@/lib/seo";

type CaseDetailRouteProps = {
  params: { slug: string } | Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: CaseDetailRouteProps): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const slug = decodeURIComponent((resolvedParams.slug ?? "").trim()).toLowerCase();

  if (!isCaseSlug(slug)) {
    return {};
  }

  if (slug === "personal") {
    return {
      title: "Personal Portfolio Case Study",
      alternates: {
        canonical: "/designs/case/personal",
      },
      openGraph: {
        title: "Personal Portfolio Case Study",
        description: siteConfig.description,
        url: "/designs/case/personal",
        images: ["/og-case-personal.png"],
      },
      twitter: {
        card: "summary_large_image",
        title: "Personal Portfolio Case Study",
        description: siteConfig.description,
        images: ["/og-case-personal.png"],
      },
    };
  }

  return {};
}

export default async function CaseDetailRoute({ params }: CaseDetailRouteProps) {
  const resolvedParams = await Promise.resolve(params);
  const slug = decodeURIComponent((resolvedParams.slug ?? "").trim()).toLowerCase();

  if (!isCaseSlug(slug)) {
    notFound();
  }

  return <CaseDetailPage slug={slug} />;
}

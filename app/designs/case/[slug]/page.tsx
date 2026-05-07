import { notFound } from "next/navigation";
import { CaseDetailPage } from "@/components/designs/case-detail-page";
import { isCaseSlug } from "@/lib/case-designs";

type CaseDetailRouteProps = {
  params: { slug: string } | Promise<{ slug: string }>;
};

function normalizeSlug(value: string) {
  try {
    return decodeURIComponent(value.trim()).toLowerCase();
  } catch {
    return null;
  }
}

export default async function CaseDetailRoute({ params }: CaseDetailRouteProps) {
  const resolvedParams = await Promise.resolve(params);
  const slug = normalizeSlug(resolvedParams.slug ?? "");

  if (slug === null || !isCaseSlug(slug)) {
    notFound();
  }

  return <CaseDetailPage slug={slug} />;
}

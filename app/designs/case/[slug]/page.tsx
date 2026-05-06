import { notFound } from "next/navigation";
import { CaseDetailPage } from "@/components/designs/case-detail-page";
import { isCaseSlug } from "@/lib/case-designs";

type CaseDetailRouteProps = {
  params: { slug: string } | Promise<{ slug: string }>;
};

export default async function CaseDetailRoute({ params }: CaseDetailRouteProps) {
  const resolvedParams = await Promise.resolve(params);
  const slug = decodeURIComponent((resolvedParams.slug ?? "").trim()).toLowerCase();

  if (!isCaseSlug(slug)) {
    notFound();
  }

  return <CaseDetailPage slug={slug} />;
}

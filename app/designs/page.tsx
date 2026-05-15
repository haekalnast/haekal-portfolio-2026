import type { Metadata } from "next";
import { DesignsPage } from "@/components/designs/designs-page";
import { buildPageMetadata } from "@/lib/seo";

const designsDescription =
  "Shipped products, live builds, and selected previews across web, mobile, and internal systems.";

export const metadata: Metadata = buildPageMetadata({
  title: "Selected Works",
  description: designsDescription,
  canonicalPath: "/designs",
  ogImage: "/og-designs.png",
});

export default function Designs() {
  return <DesignsPage />;
}

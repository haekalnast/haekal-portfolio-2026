import type { Metadata } from "next";
import { DesignsPage } from "@/components/designs/designs-page";

const designsDescription =
  "Shipped products, live builds, and selected previews across web, mobile, and internal systems.";

export const metadata: Metadata = {
  title: "Selected Works",
  description: designsDescription,
  alternates: {
    canonical: "/designs",
  },
  openGraph: {
    title: "Selected Works",
    description: designsDescription,
    url: "/designs",
    images: ["/og-designs.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Selected Works",
    description: designsDescription,
    images: ["/og-designs.png"],
  },
};

export default function Designs() {
  return <DesignsPage />;
}

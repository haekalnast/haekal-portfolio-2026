import type { Metadata } from "next";
import { DesignsPage } from "@/components/designs/designs-page";

export const metadata: Metadata = {
  title: "Selected Works",
  description:
    "Shipped products, live builds, and selected previews across web, mobile, and internal systems.",
  alternates: {
    canonical: "/designs",
  },
};

export default function Designs() {
  return <DesignsPage />;
}

import type { Metadata } from "next";
import { DesignsPage } from "@/components/designs/designs-page";

export const metadata: Metadata = {
  title: "All Designs — Bagas Al Haekal Nasution",
  description:
    "Shipped products, live builds, and selected previews across web, mobile, and internal systems.",
};

export default function Designs() {
  return <DesignsPage />;
}

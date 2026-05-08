import type { Metadata } from "next";
import { siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About",
    description: siteConfig.description,
    url: "/about",
    images: ["/og-about.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "About",
    description: siteConfig.description,
    images: ["/og-about.png"],
  },
};

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

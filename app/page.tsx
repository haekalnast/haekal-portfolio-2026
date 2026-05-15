import type { Metadata } from "next";
import { Homepage } from "@/components/home/homepage";
import { siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: siteConfig.title,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: "/",
    type: "website",
    images: [
      {
        url: siteConfig.ogImage,
        alt: `${siteConfig.siteName} — Product Designer`,
      },
    ],
  },
  twitter: {
    card: siteConfig.twitterCard,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
};

export default function Home() {
  return <Homepage />;
}

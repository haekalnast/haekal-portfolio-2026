import type { Metadata } from "next";

export const siteConfig = {
  name: "Bagas Al Haekal Nasution",
  alternateName: "Haekal",
  siteName: "Haekal",
  title: "Haekal | Product Designer",
  titleTemplate: "%s | Haekal",
  description:
    "Haekal is a product designer building financial, payment, and business products with a focus on clarity and usability.",
  personDescription: "Product designer building financial, payment, and business products.",
  url: "https://haekal.site",
  ogImage: "/og-image.png",
  locale: "en_US",
  twitterCard: "summary_large_image" as const,
  keywords: [
    "haekal",
    "haekal.site",
    "product designer",
    "fintech product designer",
    "payment systems",
    "financial products",
    "business systems",
  ],
  sameAs: [
    "https://www.linkedin.com/in/haekalnast/",
    "https://github.com/haekalnast",
  ] as const,
};

export function getPersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    alternateName: siteConfig.alternateName,
    url: siteConfig.url,
    jobTitle: "Product Designer",
    description: siteConfig.personDescription,
    sameAs: [...siteConfig.sameAs],
  };
}

type PageMetadataOptions = {
  title: string;
  description?: string;
  canonicalPath: string;
  ogImage?: string;
  ogType?: "website" | "article";
};

/** Shared Open Graph / Twitter fields for route-level metadata. */
export function buildPageMetadata({
  title,
  description = siteConfig.description,
  canonicalPath,
  ogImage = siteConfig.ogImage,
  ogType = "website",
}: PageMetadataOptions): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title,
      description,
      url: canonicalPath,
      siteName: siteConfig.siteName,
      locale: siteConfig.locale,
      type: ogType,
      images: [
        {
          url: ogImage,
          alt: `${title} | ${siteConfig.siteName}`,
        },
      ],
    },
    twitter: {
      card: siteConfig.twitterCard,
      title,
      description,
      images: [ogImage],
    },
  };
}

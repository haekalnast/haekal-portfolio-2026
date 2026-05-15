export type CaseSlug = "personal" | "b2b" | "sfc" | "octo";
export type CaseRevealStatus = "live" | "preview";

type CaseDesignConfig = {
  slug: CaseSlug;
  title: string;
  subtitle: string;
  cardKey: CaseSlug;
  detailHref: string;
  liveHref: string;
  /** Optional second store link (e.g. App Store) for mobile case studies. */
  appStoreHref?: string;
  summary: string;
  platform: string;
  domain: string;
};

export const CASE_DESIGNS: Record<CaseSlug, CaseDesignConfig> = {
  personal: {
    slug: "personal",
    title: "Dipay Personal",
    subtitle: "Mobile | E-Wallet",
    cardKey: "personal",
    detailHref: "/designs/case/personal",
    liveHref: "https://apps.apple.com/us/app/dipay/id1497076024",
    summary: "Mobile wallet experience focused on fast daily payments, bill handling, and transaction clarity.",
    platform: "iOS / Android",
    domain: "E-Wallet",
  },
  b2b: {
    slug: "b2b",
    title: "enterprise.dipay.id",
    subtitle: "Web | Fintech",
    cardKey: "b2b",
    detailHref: "/designs/case/b2b",
    liveHref: "https://enterprise.dipay.id/login",
    summary: "Enterprise dashboard flow for operational finance teams with simplified disbursement and monitoring.",
    platform: "Web",
    domain: "Fintech B2B",
  },
  sfc: {
    slug: "sfc",
    title: "sfcapital.co.id",
    subtitle: "Web | Fintech",
    cardKey: "sfc",
    detailHref: "/designs/case/sfc",
    liveHref: "https://sfcapital.co.id/",
    summary: "Company and product-facing web case with strong information hierarchy for financial products.",
    platform: "Web",
    domain: "Fintech",
  },
  octo: {
    slug: "octo",
    title: "OCTO Merchant",
    subtitle: "Mobile | Fintech",
    cardKey: "octo",
    detailHref: "/designs/case/octo",
    liveHref: "https://play.google.com/store/apps/details?id=com.cimbedc&hl=id",
    appStoreHref: "https://apps.apple.com/id/app/octo-merchant/id1635709937",
    summary: "Merchant-facing mobile experience designed for quick transaction handling and day-to-day operations.",
    platform: "Mobile",
    domain: "Fintech",
  },
};

export const CASE_RELATED_MAPPING: Record<CaseSlug, [CaseSlug, CaseSlug]> = {
  personal: ["sfc", "b2b"],
  octo: ["sfc", "b2b"],
  /** B2B case featured row: OCTO (left), Personal (right); card widths match Figma desktop layout. */
  b2b: ["octo", "personal"],
  /** SFC case featured row: OCTO (left), Personal (right); matches B2B case detail layout. */
  sfc: ["octo", "personal"],
};

const CASE_STATUS_DRAFT: Record<CaseSlug, CaseRevealStatus> = {
  personal: "preview",
  b2b: "live",
  sfc: "live",
  octo: "preview",
};

const CASE_STATUS_ORDER: CaseSlug[] = ["personal", "b2b", "sfc", "octo"];
const CASE_DEFAULT_PREVIEW_ORDER: CaseSlug[] = ["personal", "octo"];

export function getCaseStatusMap(): Record<CaseSlug, CaseRevealStatus> {
  const draftPreviewCount = CASE_STATUS_ORDER.reduce((count, slug) => {
    return CASE_STATUS_DRAFT[slug] === "preview" ? count + 1 : count;
  }, 0);

  if (draftPreviewCount === 2) {
    return CASE_STATUS_DRAFT;
  }

  const normalized = {} as Record<CaseSlug, CaseRevealStatus>;
  for (const slug of CASE_STATUS_ORDER) {
    normalized[slug] = "live";
  }

  for (const slug of CASE_DEFAULT_PREVIEW_ORDER) {
    normalized[slug] = "preview";
  }

  return normalized;
}

export function isCaseSlug(value: string): value is CaseSlug {
  return value in CASE_DESIGNS;
}

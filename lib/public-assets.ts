import { CREATIVE_JOURNAL_PNG_NAMES } from "@/lib/creative-journal-png-names";

/** Central paths for files under `public/` — match folder-per-card layout. */
const withAssetVersion = (path: string) => `${path}?v=20260514-hq`;

/** B2B case study rasters only — bump independently so global `withAssetVersion` stays stable. */
const withB2bCaseAssetVersion = (path: string) => `${path}?v=20260516-b2b-case`;

/** SFC case study rasters only — bump independently so global `withAssetVersion` stays stable. */
const withSfcCaseAssetVersion = (path: string) => `${path}?v=20260516-sfc-case`;

export const PUBLIC_BRAND = {
  logoDefault: "/brand/logo-haekal-default.svg",
  logoHover: "/brand/logo-haekal-hover.svg",
} as const;

/** SFAST featured / designs cards — App Store listing. */
export const SFAST_APP_STORE_HREF = "https://apps.apple.com/us/app/sfast/id1581067563";

export const PUBLIC_ABOUT = {
  resumeSheet: "/about/resume/sheet.png",
  thisIsHaekalPhotos: [
    "/about/this-is-haekal/photo-01.png",
    "/about/this-is-haekal/photo-02.png",
    "/about/this-is-haekal/photo-03.png",
    "/about/this-is-haekal/photo-04.png",
  ],
} as const;

/** Experience row logos — PNGs under `public/about/experience/`. */
export const PUBLIC_ABOUT_EXPERIENCE = {
  sfSekuritas: "/about/experience/sf-sekuritas.png",
  cimbNiaga: "/about/experience/cimb-niaga.png",
  ristekBrin: "/about/experience/ristek-brin.png",
} as const;

/** Certification logos — PNGs under `public/about/certifications/`. */
export const PUBLIC_ABOUT_CERTIFICATION = {
  freecodecamp: "/about/certifications/freecodecamp.png",
  progate: "/about/certifications/progate.png",
  efset: "/about/certifications/efset.png",
  iso: "/about/certifications/iso.png",
  protopie: "/about/certifications/protopie.png",
  ibm: "/about/certifications/ibm.png",
} as const;

/** Homepage hero marquee mockups — `public/home/marquee/*.png` */
export const PUBLIC_HOME_MARQUEE = {
  b2bMockup: withAssetVersion("/home/marquee/b2b-mockup.png"),
  comproMockup: withAssetVersion("/home/marquee/compro-mockup.png"),
  tradingMockup: withAssetVersion("/home/marquee/trading-mockup.png"),
  ewalletMockup: withAssetVersion("/home/marquee/ewallet-mockup.png"),
} as const;

/** Tools dock icons — `public/home/dock/*.png` */
export const PUBLIC_HOME_DOCK = {
  figma: withAssetVersion("/home/dock/figma.png"),
  cursor: withAssetVersion("/home/dock/cursor.png"),
  affinity: withAssetVersion("/home/dock/affinity.png"),
  githubDesktop: withAssetVersion("/home/dock/github-desktop.png"),
  notion: withAssetVersion("/home/dock/notion.png"),
  framer: withAssetVersion("/home/dock/framer.png"),
  spotify: withAssetVersion("/home/dock/spotify.png"),
  whatsapp: withAssetVersion("/home/dock/whatsapp.png"),
  finder: withAssetVersion("/home/dock/finder.png"),
  trash: withAssetVersion("/home/dock/trash.png"),
} as const;

/** Featured card shell rasters (replaces expired Figma MCP URLs). */
export const PUBLIC_HOME_FEATURED_CARD = {
  bprLaptopShell: withAssetVersion("/home/featured/bpr-laptop-shell.png"),
  sfastCardHero: withAssetVersion("/home/featured/sfast-card-hero.png"),
  personalPhoneFrame: withAssetVersion("/home/featured/personal-phone-frame.png"),
} as const;

/** SFAST dual-phone mockup — masks + screens + shells */
export const PUBLIC_HOME_SFAST_MOCKUP = {
  leftShell: withAssetVersion("/home/featured/sfast/left-shell.png"),
  rightShell: withAssetVersion("/home/featured/sfast/right-shell.png"),
  leftScreenDefault: withAssetVersion("/home/featured/sfast/left-screen-default.png"),
  leftScreenHover: withAssetVersion("/home/featured/sfast/left-screen-hover.png"),
  rightScreenDefault: withAssetVersion("/home/featured/sfast/right-screen-default.png"),
  rightScreenHover: withAssetVersion("/home/featured/sfast/right-screen-hover.png"),
  /** SVG masks (must stay SVG — raster PNG MIME broke `-webkit-mask-image` in some browsers). */
  lightScreenMask: "/home/featured/sfast/light-screen-mask.svg",
  darkScreenMask: "/home/featured/sfast/dark-screen-mask.svg",
} as const;

/** Designs page Variant 1 logos — centered logo cards. */
export const PUBLIC_DESIGNS_CARDS_VARIANT1 = {
  octoAppIcon: withAssetVersion("/designs/cards-variant1/octo-app-icon.png"),
  desaSeminyakLogo: withAssetVersion("/designs/cards-variant1/desa-seminyak-logo.png"),
  sfsLogo: withAssetVersion("/designs/cards-variant1/sfs-logo.png"),
} as const;

/** Case detail — Dipay Personal hero + body images. */
export const PUBLIC_CASE_PERSONAL = {
  heroMockup: withAssetVersion("/designs/case/personal/hero-mockup.png"),
  oldDesign: withAssetVersion("/designs/case/personal/old-design.png"),
  benchmarking: withAssetVersion("/designs/case/personal/benchmarking.png"),
  competitorTable: withAssetVersion("/designs/case/personal/competitor-table.png"),
  spendingCategoryCards: withAssetVersion("/designs/case/personal/spending-category-cards.png"),
  newCardHomepage: withAssetVersion("/designs/case/personal/new-card-homepage.png"),
  newStatisticPage: withAssetVersion("/designs/case/personal/new-statistic-page.png"),
  newQrisPayment: withAssetVersion("/designs/case/personal/new-qris-payment.png"),
  newTransferPayment: withAssetVersion("/designs/case/personal/new-transfer-payment.png"),
  ppobPayment: withAssetVersion("/designs/case/personal/ppob-payment.png"),
} as const;

/** Case detail — OCTO Merchant hero + body images (`public/designs/case/octo/`). */
export const PUBLIC_CASE_OCTO = {
  heroMockup: withAssetVersion("/designs/case/octo/hero-mockup.png"),
  benchmarking: withAssetVersion("/designs/case/octo/benchmarking.png"),
  featureAspectTable: withAssetVersion("/designs/case/octo/feature-aspect-table.png"),
  flowNtb: withAssetVersion("/designs/case/octo/flow-ntb.png"),
  flowEtb: withAssetVersion("/designs/case/octo/flow-etb.png"),
  welcomeKit: withAssetVersion("/designs/case/octo/welcome-kit.png"),
  mobileUiPreview: withAssetVersion("/designs/case/octo/mobile-ui-preview.png"),
} as const;

/** Case detail — Dipay Disbursement (B2B) — `public/designs/case/b2b/`. */
export const PUBLIC_CASE_B2B = {
  heroMockup: withB2bCaseAssetVersion("/designs/case/b2b/hero-mockup.png"),
  oldLoginWireframe: withB2bCaseAssetVersion("/designs/case/b2b/old-login-wireframe.png"),
  oldDashboardWireframe: withB2bCaseAssetVersion("/designs/case/b2b/old-dashboard-wireframe.png"),
  benchmarkingFlip: withB2bCaseAssetVersion("/designs/case/b2b/benchmarking-flip.png"),
  benchmarkingMekari: withB2bCaseAssetVersion("/designs/case/b2b/benchmarking-mekari.png"),
  featureAspectTable: withB2bCaseAssetVersion("/designs/case/b2b/feature-aspect-table.png"),
  newLogin: withB2bCaseAssetVersion("/designs/case/b2b/new-login.png"),
  newHomepage: withB2bCaseAssetVersion("/designs/case/b2b/new-homepage.png"),
  newTransactions: withB2bCaseAssetVersion("/designs/case/b2b/new-transactions.png"),
  newHistoryTransactions: withB2bCaseAssetVersion("/designs/case/b2b/new-history-transactions.png"),
  newDeposit: withB2bCaseAssetVersion("/designs/case/b2b/new-deposit.png"),
  newTopUp: withB2bCaseAssetVersion("/designs/case/b2b/new-top-up.png"),
  newProfile: withB2bCaseAssetVersion("/designs/case/b2b/new-profile.png"),
  newMultiAccount: withB2bCaseAssetVersion("/designs/case/b2b/new-multi-account.png"),
} as const;

/** Case detail — SF Capital (SFC) — `public/designs/case/sfc/`. */
export const PUBLIC_CASE_SFC = {
  heroMockup: withSfcCaseAssetVersion("/designs/case/sfc/hero-mockup.png"),
  oldWebsiteDesign: withSfcCaseAssetVersion("/designs/case/sfc/old-website-design.png"),
  benchmarkingSaratoga: withSfcCaseAssetVersion("/designs/case/sfc/benchmarking-saratoga.png"),
  benchmarkingNorthstar: withSfcCaseAssetVersion("/designs/case/sfc/benchmarking-northstar.png"),
  featureAspectTable: withSfcCaseAssetVersion("/designs/case/sfc/feature-aspect-table.png"),
  newHomepage: withSfcCaseAssetVersion("/designs/case/sfc/new-homepage.png"),
  newPortfolioSection: withSfcCaseAssetVersion("/designs/case/sfc/new-portfolio-section.png"),
  newIrPage: withSfcCaseAssetVersion("/designs/case/sfc/new-ir-page.png"),
  responsiveViews: withSfcCaseAssetVersion("/designs/case/sfc/responsive-views.png"),
  designSystemPreview: withSfcCaseAssetVersion("/designs/case/sfc/design-system-preview.png"),
} as const;

/** Homepage Featured Designs — local mockup slices */
export const PUBLIC_HOME_FEATURED = {
  bpr: {
    navbarHq: withAssetVersion("/home/featured-bpr/navbar-hq.png"),
    sectionsHq: withAssetVersion("/home/featured-bpr/sections-hq.png"),
    /** Optional / alternate exports — not wired in UI until referenced */
    navbarUser: withAssetVersion("/home/featured-bpr/navbar-user.png"),
    sectionsUser: withAssetVersion("/home/featured-bpr/sections-user.png"),
    sectionsUser512: withAssetVersion("/home/featured-bpr/sections-user-512x2008.png"),
  },
  personal: {
    topbar: withAssetVersion("/home/featured-personal/topbar.png"),
    content: withAssetVersion("/home/featured-personal/content.png"),
    bottombar: withAssetVersion("/home/featured-personal/bottombar.png"),
  },
} as const;

/** Designs page — BPR-shell mockups (drop `navbar.png` + `content.png` into each folder). */
export const PUBLIC_DESIGNS_MOCKUPS = {
  /** Navbar: Figma frame ~396.8×28.44px in inset; PNG with alpha (e.g. 2048×160) — see `BPRFrameMockup` on designs page. Content 512×1927. */
  sfc: {
    navbar: withAssetVersion("/designs/mockups/sfc/navbar.png"),
    content: withAssetVersion("/designs/mockups/sfc/content.png"),
  },
  /** Navbar ~512×38.16 (or 1024×76 @2×); content 512×2733. */
  nuho: {
    navbar: withAssetVersion("/designs/mockups/nuho/navbar.png"),
    content: withAssetVersion("/designs/mockups/nuho/content.png"),
  },
  /** Dashboard — single full-bleed `content.png` in the laptop inset (no navbar strip, no scroll). */
  b2b: {
    content: withAssetVersion("/designs/mockups/b2b/content.png"),
  },
} as const;

/** Creative Journal raster paths under `public/creative-journal/` (filenames from `creative-journal-png-names.ts`). */
export const PUBLIC_CREATIVE_JOURNAL = {
  campaign: CREATIVE_JOURNAL_PNG_NAMES.campaign.map((name) => `/creative-journal/${name}`),
  publication: CREATIVE_JOURNAL_PNG_NAMES.publication.map((name) => `/creative-journal/${name}`),
  collateral: {
    front: `/creative-journal/${CREATIVE_JOURNAL_PNG_NAMES.collateral.front}`,
    back: `/creative-journal/${CREATIVE_JOURNAL_PNG_NAMES.collateral.back}`,
  },
  packaging: {
    front: `/creative-journal/${CREATIVE_JOURNAL_PNG_NAMES.packaging.front}`,
    back: `/creative-journal/${CREATIVE_JOURNAL_PNG_NAMES.packaging.back}`,
  },
  /** Ordered slides for `ArrowAdvanceGalleryCard` */
  collateralSlides: [
    `/creative-journal/${CREATIVE_JOURNAL_PNG_NAMES.collateral.front}`,
    `/creative-journal/${CREATIVE_JOURNAL_PNG_NAMES.collateral.back}`,
  ],
  packagingSlides: [
    `/creative-journal/${CREATIVE_JOURNAL_PNG_NAMES.packaging.front}`,
    `/creative-journal/${CREATIVE_JOURNAL_PNG_NAMES.packaging.back}`,
  ],
} as const;

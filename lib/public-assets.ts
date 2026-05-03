import { CREATIVE_JOURNAL_PNG_NAMES } from "@/lib/creative-journal-png-names";

/** Central paths for files under `public/` — match folder-per-card layout. */
export const PUBLIC_BRAND = {
  logoDefault: "/brand/logo-haekal-default.svg",
  logoHover: "/brand/logo-haekal-hover.svg",
} as const;

export const PUBLIC_ABOUT = {
  resumeSheet: "/about/resume/sheet.png",
  thisIsHaekalPhotos: [
    "/about/this-is-haekal/photo-01.png",
    "/about/this-is-haekal/photo-02.png",
    "/about/this-is-haekal/photo-03.png",
    "/about/this-is-haekal/photo-04.png",
  ],
} as const;

/** Homepage Featured Designs — local mockup slices */
export const PUBLIC_HOME_FEATURED = {
  bpr: {
    navbarHq: "/home/featured-bpr/navbar-hq.png",
    sectionsHq: "/home/featured-bpr/sections-hq.png",
    /** Optional / alternate exports — not wired in UI until referenced */
    navbarUser: "/home/featured-bpr/navbar-user.png",
    sectionsUser: "/home/featured-bpr/sections-user.png",
    sectionsUser512: "/home/featured-bpr/sections-user-512x2008.png",
  },
  personal: {
    topbar: "/home/featured-personal/topbar.png",
    content: "/home/featured-personal/content.png",
    bottombar: "/home/featured-personal/bottombar.png",
  },
} as const;

/** Designs page — BPR-shell mockups (drop `navbar.png` + `content.png` into each folder). */
export const PUBLIC_DESIGNS_MOCKUPS = {
  /** Navbar: Figma frame ~396.8×28.44px in inset; PNG with alpha (e.g. 2048×160) — see `BPRFrameMockup` on designs page. Content 512×1927. */
  sfc: {
    navbar: "/designs/mockups/sfc/navbar.png",
    content: "/designs/mockups/sfc/content.png",
  },
  /** Navbar ~512×38.16 (or 1024×76 @2×); content 512×2733. */
  nuho: {
    navbar: "/designs/mockups/nuho/navbar.png",
    content: "/designs/mockups/nuho/content.png",
  },
  /** Dashboard — single full-bleed `content.png` in the laptop inset (no navbar strip, no scroll). */
  b2b: {
    content: "/designs/mockups/b2b/content.png",
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

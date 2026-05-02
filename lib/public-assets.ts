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

/** Creative Journal raster paths under `public/creative-journal/` (filenames from `creative-journal-png-names.ts`). */
export const PUBLIC_CREATIVE_JOURNAL = {
  campaign: CREATIVE_JOURNAL_PNG_NAMES.campaign.map((name) => `/creative-journal/${name}`),
  collateral: {
    front: `/creative-journal/${CREATIVE_JOURNAL_PNG_NAMES.collateral.front}`,
    back: `/creative-journal/${CREATIVE_JOURNAL_PNG_NAMES.collateral.back}`,
  },
  packaging: {
    front: `/creative-journal/${CREATIVE_JOURNAL_PNG_NAMES.packaging.front}`,
    back: `/creative-journal/${CREATIVE_JOURNAL_PNG_NAMES.packaging.back}`,
  },
} as const;

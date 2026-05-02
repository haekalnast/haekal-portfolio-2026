/**
 * Filename-only reference for Creative Journal exports.
 * When your PNGs are ready, place them under `public/creative-journal/` using these exact names,
 * then point `JOURNAL_ASSETS` in `app/about/page.tsx` at `/creative-journal/<filename>`.
 */
export const CREATIVE_JOURNAL_PNG_NAMES = {
  publicationBooks: ["publication-book-01.png", "publication-book-02.png", "publication-book-03.png"],
  collateral: { front: "collateral-front.png", back: "collateral-back.png" },
  packaging: { front: "packaging-front.png", back: "packaging-back.png" },
  campaign: ["campaign-01.png", "campaign-02.png", "campaign-03.png", "campaign-04.png"],
} as const;

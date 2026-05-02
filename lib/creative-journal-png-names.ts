/**
 * Filename-only reference for Creative Journal exports under `public/creative-journal/`.
 * Paths are composed in `lib/public-assets.ts` (`PUBLIC_CREATIVE_JOURNAL`).
 */
export const CREATIVE_JOURNAL_PNG_NAMES = {
  publicationBooks: ["publication-book-01.png", "publication-book-02.png", "publication-book-03.png"],
  collateral: { front: "collateral-front.png", back: "collateral-back.png" },
  packaging: { front: "packaging-front.png", back: "packaging-back.png" },
  /** Campaign Design mockups — matches Figma `CampaignCard` variants (`imgVariant1` … `imgVariant4`). Node ref: 40568:38445 */
  campaign: ["campaign-01.png", "campaign-02.png", "campaign-03.png", "campaign-04.png"],
} as const;

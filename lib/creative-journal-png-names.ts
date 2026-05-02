/**
 * Filename-only reference for Creative Journal exports under `public/creative-journal/`.
 * Paths are composed in `lib/public-assets.ts` (`PUBLIC_CREATIVE_JOURNAL`).
 */
export const CREATIVE_JOURNAL_PNG_NAMES = {
  /**
   * Publication Design — satu file per varian kartu (komposit full bleed area mockup).
   * Align dengan component set Figma node `40568:33246`: slide 1–2 full scene, slide 3 crop/zoom.
   */
  publication: ["publication-01.png", "publication-02.png", "publication-03.png"],
  /** Collateral — slide 1 default, slide 2 alternate (arrow / tap, sama seperti Campaign) */
  collateral: { front: "collateral-front.png", back: "collateral-back.png" },
  /** Packaging — sama */
  packaging: { front: "packaging-front.png", back: "packaging-back.png" },
  /** Campaign Design mockups — matches Figma `CampaignCard` variants (`imgVariant1` … `imgVariant4`). Node ref: 40568:38445 */
  campaign: ["campaign-01.png", "campaign-02.png", "campaign-03.png", "campaign-04.png"],
} as const;

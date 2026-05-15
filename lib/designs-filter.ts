import type { FeaturedCardShellLayoutOverrides } from "@/components/shared/featured-design-card";

export type DesignsFilterId = "all" | "case" | "web" | "mobile" | "fintech" | "others";

export type DesignsCardKey =
  | "bpr"
  | "octo"
  | "ds"
  | "sfs"
  | "b2b"
  | "sfast"
  | "personal"
  | "nuho"
  | "sfc";

export type DesignsCardPlacement = {
  cardKey: DesignsCardKey;
  column: "left" | "right";
  width: "full" | "half";
};

export const DESIGNS_FILTER_TABS: { id: DesignsFilterId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "case", label: "Case" },
  { id: "web", label: "Web" },
  { id: "mobile", label: "Mobile" },
  { id: "fintech", label: "Fintech" },
  { id: "others", label: "Others" },
];

/** Laptop row height on `md+` — matches `DEFAULT_FEATURED_CARD_SHELL_LAYOUT`; title at `top-[460px]` overlays the 24px grid gap (opacity-only reveal). */
const DESIGNS_ARTICLE_LAPTOP_ROW =
  "h-[548px] md:h-[444px] md:min-h-[444px] lg:h-[444px] lg:min-h-[444px] lg:flex-none lg:shrink-0";

/** Half logo row on `md+` — mockup 210px; title at `top-[234px]` overlays below (opacity-only reveal). */
const DESIGNS_ARTICLE_LOGO_HALF_ROW =
  "h-[210px] md:h-[210px] md:min-h-[210px] lg:h-[210px] lg:min-h-[210px] lg:flex-none lg:shrink-0";

/** Logo / variant-1 cards at full column width (444px mockup). */
export const DESIGNS_LOGO_CARD_EXPANDED_SHELL: FeaturedCardShellLayoutOverrides = {
  mockupInnerClassName: "h-[444px]",
  titleBlockClassName:
    "mt-4 max-md:pointer-events-auto md:pointer-events-none md:absolute md:left-0 md:mt-0 md:top-[460px]",
  articleCollapsed: DESIGNS_ARTICLE_LAPTOP_ROW,
  articleRevealed: DESIGNS_ARTICLE_LAPTOP_ROW,
};

/** SF Sekuritas at full column width without the `lg` 210px shrink used on the All grid. */
export const DESIGNS_SFS_EXPANDED_SHELL: FeaturedCardShellLayoutOverrides = {
  mockupInnerClassName: "h-[444px]",
  titleBlockClassName:
    "mt-4 max-md:pointer-events-auto md:pointer-events-none md:absolute md:left-0 md:mt-0 md:top-[460px]",
  articleCollapsed: DESIGNS_ARTICLE_LAPTOP_ROW,
  articleRevealed: DESIGNS_ARTICLE_LAPTOP_ROW,
};

/** Tablet Mobile tab — SFAST + Personal row, then OCTO full width (Figma `42609:76424`). */
export const MOBILE_FILTER_TABLET_LAYOUT: DesignsCardPlacement[] = [
  { cardKey: "sfast", column: "left", width: "half" },
  { cardKey: "personal", column: "left", width: "half" },
  { cardKey: "octo", column: "left", width: "full" },
];

const ALL_LAYOUT: DesignsCardPlacement[] = [
  { cardKey: "bpr", column: "left", width: "full" },
  { cardKey: "octo", column: "left", width: "half" },
  { cardKey: "ds", column: "left", width: "half" },
  { cardKey: "sfs", column: "left", width: "full" },
  { cardKey: "b2b", column: "left", width: "full" },
  { cardKey: "sfast", column: "right", width: "half" },
  { cardKey: "personal", column: "right", width: "half" },
  { cardKey: "nuho", column: "right", width: "full" },
  { cardKey: "sfc", column: "right", width: "full" },
];

const CASE_LAYOUT: DesignsCardPlacement[] = [
  { cardKey: "octo", column: "left", width: "full" },
  { cardKey: "b2b", column: "left", width: "full" },
  { cardKey: "personal", column: "right", width: "full" },
  { cardKey: "sfc", column: "right", width: "full" },
];

const WEB_LAYOUT: DesignsCardPlacement[] = [
  { cardKey: "bpr", column: "left", width: "full" },
  { cardKey: "ds", column: "left", width: "full" },
  { cardKey: "b2b", column: "left", width: "full" },
  { cardKey: "nuho", column: "right", width: "full" },
  { cardKey: "sfs", column: "right", width: "full" },
  { cardKey: "sfc", column: "right", width: "full" },
];

const MOBILE_LAYOUT: DesignsCardPlacement[] = [
  { cardKey: "octo", column: "left", width: "full" },
  { cardKey: "sfast", column: "right", width: "half" },
  { cardKey: "personal", column: "right", width: "half" },
];

const FINTECH_LAYOUT: DesignsCardPlacement[] = [
  { cardKey: "bpr", column: "left", width: "full" },
  { cardKey: "octo", column: "left", width: "full" },
  { cardKey: "b2b", column: "left", width: "full" },
  { cardKey: "sfast", column: "right", width: "half" },
  { cardKey: "personal", column: "right", width: "half" },
  { cardKey: "sfs", column: "right", width: "full" },
  { cardKey: "sfc", column: "right", width: "full" },
];

const OTHERS_LAYOUT: DesignsCardPlacement[] = [
  { cardKey: "ds", column: "left", width: "full" },
  { cardKey: "nuho", column: "right", width: "full" },
];

export const DESIGNS_FILTER_LAYOUTS: Record<DesignsFilterId, DesignsCardPlacement[]> = {
  all: ALL_LAYOUT,
  case: CASE_LAYOUT,
  web: WEB_LAYOUT,
  mobile: MOBILE_LAYOUT,
  fintech: FINTECH_LAYOUT,
  others: OTHERS_LAYOUT,
};

export function parseDesignCardSubtitle(subtitle: string) {
  const [platform = "", category = ""] = subtitle.split("|").map((part) => part.trim().toLowerCase());
  return { platform, category };
}

/** Filter cards by Case chip and `Platform | Category` subtitle copy on each card. */
export function matchesDesignsFilter(
  filter: DesignsFilterId,
  card: { subtitle: string; caseChip?: string },
): boolean {
  if (filter === "all") return true;
  if (filter === "case") return card.caseChip === "Case";

  const { platform, category } = parseDesignCardSubtitle(card.subtitle);
  if (filter === "web") return platform === "web";
  if (filter === "mobile") return platform === "mobile";
  if (filter === "fintech") return category === "fintech";
  if (filter === "others") return category === "others";
  return true;
}

export function getDesignsFilterLayout(filter: DesignsFilterId): DesignsCardPlacement[] {
  return DESIGNS_FILTER_LAYOUTS[filter].filter((placement) =>
    matchesDesignsFilter(filter, DESIGNS_CARD_FILTER_META[placement.cardKey]),
  );
}

/** Stable filter metadata per card — must stay in sync with card subtitles / chips in `designs-page`. */
export const DESIGNS_CARD_FILTER_META: Record<
  DesignsCardKey,
  { subtitle: string; caseChip?: string }
> = {
  bpr: { subtitle: "Web | Fintech" },
  octo: { subtitle: "Mobile | Fintech", caseChip: "Case" },
  ds: { subtitle: "Web | Others" },
  sfs: { subtitle: "Web | Fintech" },
  b2b: { subtitle: "Web | Fintech", caseChip: "Case" },
  sfast: { subtitle: "Mobile | Fintech" },
  personal: { subtitle: "Mobile | E-Wallet", caseChip: "Case" },
  nuho: { subtitle: "Web | Others" },
  sfc: { subtitle: "Web | Fintech", caseChip: "Case" },
};

export function groupColumnPlacements(placements: DesignsCardPlacement[]) {
  const left: DesignsCardPlacement[][] = [];
  const right: DesignsCardPlacement[][] = [];

  for (const column of ["left", "right"] as const) {
    const target = column === "left" ? left : right;
    const columnPlacements = placements.filter((p) => p.column === column);

    let halfBatch: DesignsCardPlacement[] = [];
    const flushHalf = () => {
      if (halfBatch.length > 0) {
        target.push(halfBatch);
        halfBatch = [];
      }
    };

    for (const placement of columnPlacements) {
      if (placement.width === "half") {
        halfBatch.push(placement);
        if (halfBatch.length === 2) flushHalf();
      } else {
        flushHalf();
        target.push([placement]);
      }
    }
    flushHalf();
  }

  return { left, right };
}

import { cn } from "@/lib/cn";

/** Horizontal gutter shared by case detail `main`, footer, and featured sections. */
export const CASE_DETAIL_PAGE_GUTTER = "px-4 sm:px-10 lg:px-[60px]";

/**
 * Featured Designs Case block inside padded `<main>`.
 * Breaks out of `main` gutters then re-applies them so spacing matches homepage
 * `Featured Designs` (`px-4 sm:px-10 lg:px-[60px]` on the section).
 */
export const CASE_DETAIL_FEATURED_SECTION_CLASS = cn(
  "relative left-1/2 w-screen max-w-[1440px] -translate-x-1/2 bg-[#FAFAFA]",
  "py-20 sm:py-[108px] lg:py-[124px]",
  CASE_DETAIL_PAGE_GUTTER,
);

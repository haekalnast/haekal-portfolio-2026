"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { getGlobalFocusMotionAnimate, getGlobalFocusStyle } from "@/components/shared/arrow-reveal";

const PREMIUM_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const PREMIUM_DURATION = 0.32;

/** Shared layout for Featured Designs (home) and Creative Journal (about) section titles + desktop CTA. */
export const SECTION_FEATURE_HEADER_ROW_CLASS =
  "mb-12 flex w-full min-w-0 flex-col gap-6 lg:mb-12 lg:flex-row lg:items-start lg:justify-between";

export function SectionFeatureHeaderTitleBlock({ title, description }: { title: string; description: string }) {
  return (
    <div className="min-w-0 flex-1 space-y-2">
      <h2 className="text-[32px] leading-[40px] tracking-[-1px] text-black lg:text-[40px] lg:leading-[56px]">{title}</h2>
      <p className="max-w-[640px] text-base leading-6 text-[#707070]">{description}</p>
    </div>
  );
}

export function SectionFeatureHeaderDesktopCta({
  href,
  children,
  target,
}: {
  href: string;
  children: ReactNode;
  target?: string;
}) {
  return (
    <Link
      href={href}
      target={target}
      rel={target === "_blank" ? "noreferrer noopener" : undefined}
      className="hidden h-[46px] w-fit shrink-0 items-center rounded-[230px] bg-[#F2F2F2] px-6 text-base leading-[21px] text-[#707070] transition-colors hover:text-black lg:inline-flex"
    >
      {children}
    </Link>
  );
}

/** Homepage Featured Designs — motion dimming when an arrow has global focus. */
export function SectionFeatureHeaderMotionRow({
  isDimmed,
  children,
}: {
  isDimmed: boolean;
  children: ReactNode;
}) {
  return (
    <motion.div
      className={SECTION_FEATURE_HEADER_ROW_CLASS}
      initial={false}
      animate={getGlobalFocusMotionAnimate(isDimmed)}
      transition={{ duration: PREMIUM_DURATION, ease: PREMIUM_EASE }}
    >
      {children}
    </motion.div>
  );
}

/** About Creative Journal — CSS dimming to match rest of About arrow-focus behaviour. */
export function SectionFeatureHeaderStaticRow({ dimmed, children }: { dimmed: boolean; children: ReactNode }) {
  return (
    <div
      className={cn(SECTION_FEATURE_HEADER_ROW_CLASS, "transition-all duration-300")}
      style={getGlobalFocusStyle(dimmed)}
    >
      {children}
    </div>
  );
}

export function SectionFeatureHeaderMobileCta({
  href,
  children,
  target,
}: {
  href: string;
  children: ReactNode;
  target?: string;
}) {
  return (
    <div className="mt-12 flex justify-center lg:hidden">
      <Link
        href={href}
        target={target}
        rel={target === "_blank" ? "noreferrer noopener" : undefined}
        className="inline-flex h-[46px] w-fit items-center rounded-[230px] bg-[#F2F2F2] px-6 text-base leading-[21px] text-[#707070] transition-colors hover:text-black"
      >
        {children}
      </Link>
    </div>
  );
}

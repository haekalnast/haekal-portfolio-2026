"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { ReactNode, RefObject } from "react";
import { cn } from "@/lib/cn";
import { PUBLIC_HOME_FEATURED, PUBLIC_HOME_FEATURED_CARD, PUBLIC_HOME_SFAST_MOCKUP } from "@/lib/public-assets";
import { ArrowIcon, getGlobalFocusMotionAnimate } from "@/components/shared/arrow-reveal";
import { useScrollRevealActive } from "@/lib/use-scroll-reveal-active";

const PREMIUM_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const PREMIUM_DURATION = 0.32;

/** Optional overrides for `FeaturedDesignCardShell` (designs page + home). */
export type FeaturedCardShellLayoutOverrides = Partial<{
  mockupInnerClassName: string;
  titleBlockClassName: string;
  articleCollapsed: string;
  articleRevealed: string;
  /** Replaces default title typography when present (merged via `cn`, Tailwind-merge resolves conflicts). */
  titleHeadingClassName: string;
}>;

const DEFAULT_FEATURED_CARD_SHELL_LAYOUT = {
  mockupInnerClassName: "h-[444px]",
  titleBlockClassName: "pointer-events-none mt-4 lg:absolute lg:left-0 lg:top-[460px] lg:mt-0",
  articleCollapsed: "h-[444px] lg:h-[444px]",
  articleRevealed: "h-[512px] lg:h-[444px]",
} as const;

export type HomeFeaturedCardId = "bpr" | "sfast" | "personal";

export type HomeFeaturedCard = {
  id: HomeFeaturedCardId;
  title: string;
  subtitle: string;
  href: string;
};

export const HOME_FEATURED_CARDS: HomeFeaturedCard[] = [
  {
    id: "bpr",
    title: "bprqaya.co.id",
    subtitle: "Web | Fintech",
    href: "https://bprqaya.id/",
  },
  {
    id: "sfast",
    title: "SFAST Mobile App",
    subtitle: "Mobile | Fintech",
    href: "/not-found",
  },
  {
    id: "personal",
    title: "Dipay Personal",
    subtitle: "Mobile | E-Wallet",
    href: "/designs/case/personal",
  },
];

const FEATURED_ASSETS = {
  bpr: PUBLIC_HOME_FEATURED_CARD.bprLaptopShell,
  sfast: PUBLIC_HOME_FEATURED_CARD.sfastCardHero,
  personal: PUBLIC_HOME_FEATURED_CARD.personalPhoneFrame,
} as const;

const BPR_SCREEN_ASSETS = {
  navbar: PUBLIC_HOME_FEATURED.bpr.navbarHq,
  sections: PUBLIC_HOME_FEATURED.bpr.sectionsHq,
} as const;

const PERSONAL_SCREEN_ASSETS = {
  topbar: PUBLIC_HOME_FEATURED.personal.topbar,
  content: PUBLIC_HOME_FEATURED.personal.content,
  bottombar: PUBLIC_HOME_FEATURED.personal.bottombar,
} as const;

const SFAST_MOCKUP_ASSETS = PUBLIC_HOME_SFAST_MOCKUP;

export function BPRMockup({ hovered }: { hovered: boolean }) {
  return (
    <div className="relative h-full w-full">
      <motion.div
        className="absolute left-[-22px] top-4 h-[412px] w-[692px] overflow-hidden transition-transform duration-500 ease-out"
        style={{
          transform: hovered ? "scale(1.02)" : "scale(1)",
          transformOrigin: "50% 50%",
        }}
      >
        <Image
          src={FEATURED_ASSETS.bpr}
          alt="bprqaya.co.id"
          fill
          unoptimized
          className="object-cover"
          sizes="692px"
        />
        <div className="absolute left-[90px] top-[46px] z-10 h-[320px] w-[512px] overflow-hidden rounded-[2px] bg-white">
          <div className="absolute inset-0 z-10 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <div className="w-[512px]">
              <img
                src={BPR_SCREEN_ASSETS.sections}
                alt="BPR sections content"
                width={512}
                height={2008}
                className="block h-[2008px] w-[512px] max-w-none"
              />
            </div>
          </div>
          <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[26px] overflow-hidden bg-white">
            <img
              src={BPR_SCREEN_ASSETS.navbar}
              alt="BPR mockup navbar"
              width={1024}
              height={52}
              className="block h-[26px] w-[512px] max-w-none"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/** Same laptop shell and inset as BPR; swap navbar + scrolling content PNGs (paths under `public/designs/mockups/`). */
export function BPRFrameMockup({
  hovered,
  navbarSrc,
  contentSrc,
  contentAlt,
  /** Navbar strip height inside the 512×320 inset — BPR template 26px; match Figma per project (e.g. SFC ~28.44px, Nuho ~38.16px). */
  navbarDisplayPx = 26,
  /**
   * When set, navbar image is this wide and horizontally centered in the 512px inset (Figma frame width).
   * Omit for full-bleed strip (BPR, Nuho).
   */
  navbarDisplayWidthPx,
  /** Pixel height of exported content PNG at 512px width (scroll length). */
  contentHeightPx = 2008,
  /**
   * Navbar asset pixel size at export. BPR uses 2× (1024×52) scaled to 512×26.
   * For 1× exports (512 wide), pass 512 and the same value as `navbarDisplayPx` (or 2× height).
   */
  navbarIntrinsicWidth = 1024,
  navbarIntrinsicHeight = 52,
}: {
  hovered: boolean;
  navbarSrc: string;
  contentSrc: string;
  contentAlt: string;
  navbarDisplayPx?: number;
  navbarDisplayWidthPx?: number;
  contentHeightPx?: number;
  navbarIntrinsicWidth?: number;
  navbarIntrinsicHeight?: number;
}) {
  return (
    <div className="relative h-full w-full">
      <motion.div
        className="absolute left-[-22px] top-4 h-[412px] w-[692px] overflow-hidden transition-transform duration-500 ease-out"
        style={{
          transform: hovered ? "scale(1.02)" : "scale(1)",
          transformOrigin: "50% 50%",
        }}
      >
        <Image
          src={FEATURED_ASSETS.bpr}
          alt=""
          fill
          unoptimized
          className="object-cover"
          sizes="692px"
        />
        <div className="absolute left-[90px] top-[46px] z-10 h-[320px] w-[512px] overflow-hidden rounded-[2px] bg-white">
          <div className="absolute inset-0 z-10 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <div className="w-[512px]">
              <img
                src={contentSrc}
                alt={contentAlt}
                width={512}
                height={contentHeightPx}
                className="block max-w-none"
                style={{ width: 512, height: contentHeightPx }}
                draggable={false}
              />
            </div>
          </div>
          <div
            className={cn(
              "pointer-events-none absolute inset-x-0 top-0 z-20 overflow-hidden bg-transparent",
              navbarDisplayWidthPx == null ? "w-full" : "flex justify-center",
            )}
            style={{ height: navbarDisplayPx }}
          >
            <img
              src={navbarSrc}
              alt=""
              width={navbarIntrinsicWidth}
              height={navbarIntrinsicHeight}
              className={cn(
                "block max-w-none object-cover object-top",
                navbarDisplayWidthPx == null ? "h-full w-full" : "shrink-0",
              )}
              style={
                navbarDisplayWidthPx == null
                  ? undefined
                  : { width: navbarDisplayWidthPx, height: navbarDisplayPx }
              }
              draggable={false}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/** Laptop shell + 512×320 inset; one static dashboard image (no navbar, no scroll). */
export function BPRDashboardFrameMockup({
  hovered,
  contentSrc,
  contentAlt,
}: {
  hovered: boolean;
  contentSrc: string;
  contentAlt: string;
}) {
  return (
    <div className="relative h-full w-full">
      <motion.div
        className="absolute left-[-22px] top-4 h-[412px] w-[692px] overflow-hidden transition-transform duration-500 ease-out"
        style={{
          transform: hovered ? "scale(1.02)" : "scale(1)",
          transformOrigin: "50% 50%",
        }}
      >
        <Image
          src={FEATURED_ASSETS.bpr}
          alt=""
          fill
          unoptimized
          className="object-cover"
          sizes="692px"
        />
        <div className="absolute left-[90px] top-[46px] z-10 h-[320px] w-[512px] overflow-hidden rounded-[2px] bg-white">
          <img
            src={contentSrc}
            alt={contentAlt}
            width={512}
            height={320}
            className="pointer-events-none block h-full w-full object-cover object-top"
            draggable={false}
          />
        </div>
      </motion.div>
    </div>
  );
}

export function SFASTMockup({ hovered }: { hovered: boolean }) {
  const darkPhoneTop = hovered ? 45.12 : 0;
  const lightPhoneTop = hovered ? 0 : 45.12;
  const lightScreenMaskStyle = {
    WebkitMaskImage: `url(${SFAST_MOCKUP_ASSETS.lightScreenMask})`,
    WebkitMaskRepeat: "no-repeat",
    WebkitMaskPosition: "0.699px 1.93px",
    WebkitMaskSize: "85.505px 273.219px",
    maskImage: `url(${SFAST_MOCKUP_ASSETS.lightScreenMask})`,
    maskRepeat: "no-repeat",
    maskPosition: "0.699px 1.93px",
    maskSize: "85.505px 273.219px",
  } as const;
  const darkScreenMaskStyle = {
    WebkitMaskImage: `url(${SFAST_MOCKUP_ASSETS.darkScreenMask})`,
    WebkitMaskRepeat: "no-repeat",
    WebkitMaskPosition: "2.082px 1.379px",
    WebkitMaskSize: "93.012px 269.067px",
    maskImage: `url(${SFAST_MOCKUP_ASSETS.darkScreenMask})`,
    maskRepeat: "no-repeat",
    maskPosition: "2.082px 1.379px",
    maskSize: "93.012px 269.067px",
  } as const;

  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 p-10">
        <div className="relative flex h-full w-full items-center justify-center rounded-[20px] bg-[#F2F2F2]">
          <div className="relative h-[356px] w-[221px] shrink-0">
            <div className="absolute left-1/2 top-1/2 h-[332px] w-[206px] -translate-x-1/2 -translate-y-1/2 scale-[1.0728]">
              <div
                className="absolute left-[94.55px] transition-[top] duration-500 ease-out"
                style={{ top: `${darkPhoneTop}px` }}
              >
                <div className="relative h-[282.482px] w-[111.449px]">
                  <Image src={SFAST_MOCKUP_ASSETS.leftShell} alt="" fill unoptimized className="object-contain" sizes="111px" />
                  <div
                    className="absolute left-[4.26px] top-[6.37px] h-[271.241px] w-[95.987px] overflow-hidden"
                    style={darkScreenMaskStyle}
                  >
                    <Image
                      src={hovered ? SFAST_MOCKUP_ASSETS.leftScreenHover : SFAST_MOCKUP_ASSETS.leftScreenDefault}
                      alt="SFAST dark mode"
                      fill
                      unoptimized
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>
                </div>
              </div>

              <div
                className="absolute left-0 transition-[top] duration-500 ease-out"
                style={{ top: `${lightPhoneTop}px` }}
              >
                <div className="relative h-[286.877px] w-[104.416px]">
                  <Image src={SFAST_MOCKUP_ASSETS.rightShell} alt="" fill unoptimized className="object-contain" sizes="104px" />
                  <div
                    className="absolute left-[15.01px] top-[6.66px] h-[276.031px] w-[86.62px] overflow-hidden"
                    style={lightScreenMaskStyle}
                  >
                    <Image
                      src={hovered ? SFAST_MOCKUP_ASSETS.rightScreenHover : SFAST_MOCKUP_ASSETS.rightScreenDefault}
                      alt="SFAST light mode"
                      fill
                      unoptimized
                      className="object-cover"
                      sizes="87px"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PersonalMockup({ hovered }: { hovered: boolean }) {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="relative h-[351px] w-[174px] transition-transform duration-500 ease-out"
          style={{
            transformOrigin: "50% 50%",
            transform: hovered ? "rotate(0deg)" : "rotate(-12deg)",
          }}
        >
          <div className="absolute left-[9.55px] top-[7.55px] h-[336.06px] w-[155.29px] overflow-hidden rounded-[12px] bg-[#F6F6F6]">
            <div className="absolute inset-x-0 top-0 z-20 h-[55.74px] overflow-hidden">
              <Image
                src={PERSONAL_SCREEN_ASSETS.topbar}
                alt="Personal top app bar"
                width={155}
                height={56}
                unoptimized
                className="h-[55.74px] w-[155.29px] object-cover"
              />
            </div>

            <div className="absolute inset-x-0 top-[55.74px] bottom-[33.05px] z-10 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              <Image
                src={PERSONAL_SCREEN_ASSETS.content}
                alt="Personal statistics content"
                width={155}
                height={1200}
                unoptimized
                className="block h-auto w-[155.29px] max-w-none"
              />
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[33.05px] overflow-hidden">
              <Image
                src={PERSONAL_SCREEN_ASSETS.bottombar}
                alt="Personal bottom navigation"
                width={155}
                height={33}
                unoptimized
                className="h-[33.05px] w-[155.29px] object-cover"
              />
            </div>
          </div>

          <Image
            src={FEATURED_ASSETS.personal}
            alt="Dipay Personal phone mockup"
            width={174}
            height={351}
            unoptimized
            className="pointer-events-none absolute inset-0 z-30 h-full w-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export function HomeFeaturedDesignCard({
  card,
  activeArrowId,
  onArrowHoverStart,
  onArrowHoverEnd,
  revealedId,
  setRevealedId,
  hoveredCardId,
  setHoveredCardId,
}: {
  card: HomeFeaturedCard;
  activeArrowId: string | null;
  onArrowHoverStart: (id: string) => void;
  onArrowHoverEnd: (id: string) => void;
  revealedId: HomeFeaturedCardId | null;
  setRevealedId: (id: HomeFeaturedCardId | null) => void;
  hoveredCardId: HomeFeaturedCardId | null;
  setHoveredCardId: (id: HomeFeaturedCardId | null) => void;
}) {
  const isRevealed = revealedId === card.id;
  const isMockupHovered = hoveredCardId === card.id;
  const { ref: cardRef, isActive: isMobileRevealActive } = useScrollRevealActive<HTMLElement>(0.45);
  const isHoverState = isMockupHovered || isMobileRevealActive;
  const isRevealState = isRevealed || isMobileRevealActive;
  const cardArrowId = `design-${card.id}`;
  const isGlobalDimmed = activeArrowId !== null && activeArrowId !== cardArrowId;

  let mockup: ReactNode;
  if (card.id === "bpr") mockup = <BPRMockup hovered={isHoverState} />;
  else if (card.id === "sfast") mockup = <SFASTMockup hovered={isHoverState} />;
  else mockup = <PersonalMockup hovered={isHoverState} />;

  return (
    <FeaturedDesignCardShell
      cardRef={cardRef}
      cardArrowId={cardArrowId}
      title={card.title}
      subtitle={card.subtitle}
      href={card.href}
      caseChip={card.id === "personal" ? "Case" : undefined}
      revealStatus="live"
      isGlobalDimmed={isGlobalDimmed}
      isHoverState={isHoverState}
      isRevealState={isRevealState}
      mockupPaddingClass={card.id === "bpr" || card.id === "sfast" ? "px-0 py-0" : "px-10 py-6"}
      mockup={mockup}
      onMouseEnter={() => setHoveredCardId(card.id)}
      onMouseLeave={() => {
        setHoveredCardId(null);
        setRevealedId(null);
      }}
      onRevealHoverStart={() => {
        setRevealedId(card.id);
        onArrowHoverStart(cardArrowId);
      }}
      onRevealHoverEnd={() => {
        setRevealedId(null);
        onArrowHoverEnd(cardArrowId);
      }}
    />
  );
}

export function DesignsFeaturedDesignCard({
  cardKey,
  title,
  subtitle,
  href,
  caseChip,
  revealStatus = "live",
  activeArrowId,
  onArrowHoverStart,
  onArrowHoverEnd,
  revealedKey,
  setRevealedKey,
  hoveredKey,
  setHoveredKey,
  mockupPaddingClass,
  renderMockup,
  shellLayout,
}: {
  cardKey: string;
  title: string;
  subtitle: string;
  href: string;
  caseChip?: string;
  revealStatus?: "live" | "preview";
  activeArrowId: string | null;
  onArrowHoverStart: (id: string) => void;
  onArrowHoverEnd: (id: string) => void;
  revealedKey: string | null;
  setRevealedKey: (id: string | null) => void;
  hoveredKey: string | null;
  setHoveredKey: (id: string | null) => void;
  mockupPaddingClass: string;
  renderMockup: (hovered: boolean) => ReactNode;
  shellLayout?: FeaturedCardShellLayoutOverrides;
}) {
  const isRevealed = revealedKey === cardKey;
  const isMockupHovered = hoveredKey === cardKey;
  const { ref: cardRef, isActive: isMobileRevealActive } = useScrollRevealActive<HTMLElement>(0.45);
  const isHoverState = isMockupHovered || isMobileRevealActive;
  const isRevealState = isRevealed || isMobileRevealActive;
  const cardArrowId = `design-${cardKey}`;
  const isGlobalDimmed = activeArrowId !== null && activeArrowId !== cardArrowId;

  return (
    <FeaturedDesignCardShell
      cardRef={cardRef}
      cardArrowId={cardArrowId}
      title={title}
      subtitle={subtitle}
      href={href}
      caseChip={caseChip}
      revealStatus={revealStatus}
      isGlobalDimmed={isGlobalDimmed}
      isHoverState={isHoverState}
      isRevealState={isRevealState}
      mockupPaddingClass={mockupPaddingClass}
      mockup={renderMockup(isHoverState)}
      shellLayout={shellLayout}
      onMouseEnter={() => setHoveredKey(cardKey)}
      onMouseLeave={() => {
        setHoveredKey(null);
        setRevealedKey(null);
      }}
      onRevealHoverStart={() => {
        setRevealedKey(cardKey);
        onArrowHoverStart(cardArrowId);
      }}
      onRevealHoverEnd={() => {
        setRevealedKey(null);
        onArrowHoverEnd(cardArrowId);
      }}
    />
  );
}

function FeaturedDesignCardShell({
  cardRef,
  cardArrowId,
  title,
  subtitle,
  href,
  caseChip,
  revealStatus = "live",
  isGlobalDimmed,
  isHoverState,
  isRevealState,
  mockupPaddingClass,
  mockup,
  shellLayout,
  onMouseEnter,
  onMouseLeave,
  onRevealHoverStart,
  onRevealHoverEnd,
}: {
  cardRef: RefObject<HTMLElement | null>;
  cardArrowId: string;
  title: string;
  subtitle: string;
  href: string;
  caseChip?: string;
  revealStatus?: "live" | "preview";
  isGlobalDimmed: boolean;
  isHoverState: boolean;
  isRevealState: boolean;
  mockupPaddingClass: string;
  mockup: ReactNode;
  shellLayout?: FeaturedCardShellLayoutOverrides;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onRevealHoverStart: () => void;
  onRevealHoverEnd: () => void;
}) {
  const isPreviewStatus = revealStatus === "preview";
  const layout = { ...DEFAULT_FEATURED_CARD_SHELL_LAYOUT, ...shellLayout };
  return (
    <motion.article
      ref={cardRef}
      className={cn("relative", isRevealState ? layout.articleRevealed : layout.articleCollapsed)}
      initial={false}
      animate={getGlobalFocusMotionAnimate(isGlobalDimmed)}
      transition={{ duration: PREMIUM_DURATION, ease: PREMIUM_EASE }}
      style={{ zIndex: isRevealState ? 30 : 20 }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-[20px] bg-[#F2F2F2]",
          layout.mockupInnerClassName,
        )}
      >
        <motion.div
          className={cn("relative h-full w-full", mockupPaddingClass)}
          initial={false}
          animate={{
            scale: isHoverState ? 1.012 : 1,
            y: isHoverState ? -2 : 0,
          }}
          transition={{ duration: 0.44, ease: PREMIUM_EASE }}
        >
          {mockup}
        </motion.div>

        <button
          type="button"
          aria-label={`${title} details`}
          className="absolute bottom-4 left-4 z-30 flex h-8 w-8 items-center justify-center rounded-full bg-[#FAFAFA] shadow-[0_0_0_1px_rgba(0,0,0,0.06)] transition-shadow duration-300 hover:shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_0_50px_rgba(0,0,0,0.1)]"
          style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
          onMouseEnter={onRevealHoverStart}
          onMouseLeave={onRevealHoverEnd}
          onFocus={onRevealHoverStart}
          onBlur={onRevealHoverEnd}
          onClick={(event) => {
            event.stopPropagation();
            if (href.startsWith("/")) {
              window.location.assign(href);
              return;
            }
            window.open(href, "_blank", "noopener,noreferrer");
          }}
        >
          <ArrowIcon hover={isRevealState} />
        </button>
      </div>

      <motion.div
        className={layout.titleBlockClassName}
        initial={false}
        animate={{ opacity: isRevealState ? 1 : 0, y: isRevealState ? 0 : 8 }}
        transition={{ duration: 0.36, ease: PREMIUM_EASE, delay: isRevealState ? 0.2 : 0 }}
      >
        <div className="mb-[6px] flex flex-wrap items-center gap-2">
          <h3
            className={cn(
              "text-[20px] leading-[30px] tracking-[-1px] text-black",
              shellLayout?.titleHeadingClassName,
            )}
          >
            {title}
          </h3>
          <span className="inline-flex items-center gap-2 rounded-[8px] border border-[#DEDEE0] bg-[#F2F2F2] px-3 py-[3px] text-base leading-6 text-black">
            <motion.span
              className={cn("inline-block h-2 w-2 rounded-full", isPreviewStatus ? "bg-[#FF9A3D]" : "bg-[#14C95D]")}
              animate={{ opacity: [0.35, 1, 0.35], scale: [0.92, 1.08, 0.92] }}
              transition={{ duration: 1.9, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
            {isPreviewStatus ? "Preview" : "Live"}
          </span>
          {caseChip ? (
            <span className="inline-flex items-center rounded-[8px] border border-[#DEDEE0] bg-[#F2F2F2] px-3 py-[3px] text-base leading-6 text-black">
              {caseChip}
            </span>
          ) : null}
        </div>
        <p className="text-base leading-6 text-[#707070]">{subtitle}</p>
      </motion.div>
    </motion.article>
  );
}

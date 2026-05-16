"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { DesignsFilteredGrid } from "@/components/designs/designs-filtered-grid";
import { DesignsFilterTabs } from "@/components/designs/designs-filter-tabs";
import {
  DESIGNS_LOGO_CARD_EXPANDED_SHELL,
  DESIGNS_SFS_EXPANDED_SHELL,
  getDesignsFilterLayout,
  MOBILE_FILTER_TABLET_LAYOUT,
  type DesignsCardKey,
  type DesignsCardPlacement,
  type DesignsFilterId,
} from "@/lib/designs-filter";
import {
  BPRDashboardFrameMockup,
  BPRFrameMockup,
  BPRMockup,
  DesignsFeaturedDesignCard,
  PersonalMockup,
  SFASTMockup,
  type FeaturedCardShellLayoutOverrides,
} from "@/components/shared/featured-design-card";
import { ExternalUnderlineLink } from "@/components/shared/external-underline-link";
import { MobileSiteBottomNav } from "@/components/shared/mobile-bottom-nav";
import { getGlobalFocusMotionAnimate } from "@/components/shared/arrow-reveal";
import { CASE_DESIGNS } from "@/lib/case-designs";
import {
  PUBLIC_BRAND,
  PUBLIC_DESIGNS_CARDS_VARIANT1,
  PUBLIC_DESIGNS_MOCKUPS,
  SFAST_APP_STORE_HREF,
} from "@/lib/public-assets";

const PREMIUM_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const PREMIUM_DURATION = 0.32;
const FALLBACK = "/not-found";
const DS_HREF = "https://desa-seminyak.vercel.app/";
const SFS_HREF = "https://www.sfsekuritas.co.id/";

const DESIGNS_ARTICLE_LAPTOP_ROW =
  "h-[548px] md:h-[444px] md:min-h-[444px] lg:h-[444px] lg:min-h-[444px] lg:flex-none lg:shrink-0";

/** Mobile: room for mockup + in-flow title; `md+`: fixed 210px row (title overlays 24px grid gap at `top-[234px]`). */
const DESIGNS_ARTICLE_LOGO_HALF_ROW =
  "relative w-full overflow-visible min-h-[280px] max-md:min-h-[280px] md:h-[210px] md:min-h-[210px] lg:h-[210px] lg:min-h-[210px] lg:flex-none lg:shrink-0";

const VARIANT1_LOGO_CARD_SHELL: FeaturedCardShellLayoutOverrides = {
  mockupInnerClassName: "h-[210px]",
  titleBlockClassName:
    "relative z-10 mt-6 w-full max-md:pointer-events-auto md:pointer-events-none md:absolute md:left-0 md:mt-0 md:top-[234px]",
  articleCollapsed: DESIGNS_ARTICLE_LOGO_HALF_ROW,
  articleRevealed: DESIGNS_ARTICLE_LOGO_HALF_ROW,
};

/** Laptop / phone-frame cards — 444px mockup row; title overlays grid gap on reveal (opacity-only). */
const DESIGNS_LAPTOP_CARD_SHELL: FeaturedCardShellLayoutOverrides = {
  mockupInnerClassName: "h-[444px]",
  titleBlockClassName:
    "mt-4 max-md:pointer-events-auto md:pointer-events-none md:absolute md:left-0 md:mt-0 md:top-[460px]",
  articleCollapsed: DESIGNS_ARTICLE_LAPTOP_ROW,
  articleRevealed: DESIGNS_ARTICLE_LAPTOP_ROW,
};

const OCTO_VARIANT1_CARD_SHELL: FeaturedCardShellLayoutOverrides = {
  ...VARIANT1_LOGO_CARD_SHELL,
  titleHeadingClassName: "text-[18px] leading-[20px] tracking-[-1px] text-black",
};

/**
 * SF Sekuritas — Tab All only. Tablet (`md`–`lg-1`): 444px row like laptop cards.
 * Desktop (`lg+`): **210px** logo chrome (same height as OCTO/DESA half cards) — do not swap to `DESIGNS_LAPTOP_CARD_SHELL`.
 * Title gap on `lg+`: `top-[234px]` only (same as half-logo); fix spacing via `titleBlockClassName`, not mockup height.
 */
const VARIANT1_SFS_CARD_SHELL: FeaturedCardShellLayoutOverrides = {
  mockupInnerClassName: "h-[444px] lg:h-[210px] lg:max-h-[210px]",
  titleBlockClassName:
    "relative z-10 mt-6 w-full max-md:pointer-events-auto md:pointer-events-none md:absolute md:left-0 md:mt-0 md:top-[460px] lg:top-[234px]",
  articleCollapsed:
    "h-[548px] md:h-[444px] md:min-h-[444px] lg:h-[210px] lg:max-h-[210px] lg:min-h-[210px] lg:flex-none lg:shrink-0",
  articleRevealed:
    "h-[548px] md:h-[444px] md:min-h-[444px] lg:h-[210px] lg:max-h-[210px] lg:min-h-[210px] lg:flex-none lg:shrink-0",
};

function LogoMark() {
  return (
    <Link href="/" aria-label="Go to home" className="group relative block h-[27px] w-[124px]">
      <Image
        src={PUBLIC_BRAND.logoDefault}
        alt="Haekal"
        width={124}
        height={27}
        className="absolute inset-0 h-full w-full opacity-100 transition-opacity duration-200 group-hover:opacity-0"
      />
      <Image
        src={PUBLIC_BRAND.logoHover}
        alt="Haekal"
        width={124}
        height={27}
        className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-200 group-hover:opacity-100"
      />
    </Link>
  );
}

function DesignsOctoVariant1Mockup() {
  return (
    <div className="absolute inset-0 flex items-center justify-center px-10 py-6">
      <div className="relative h-[108px] w-[108px] shrink-0">
        <img
          src={PUBLIC_DESIGNS_CARDS_VARIANT1.octoAppIcon}
          alt="OCTO Merchant app icon"
          width={108}
          height={108}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="block h-[108px] w-[108px] object-contain"
          style={{ filter: "drop-shadow(0px 0px 50px rgba(0, 0, 0, 0.06))" }}
        />
      </div>
    </div>
  );
}

function DesignsDsVariant1Mockup() {
  return (
    <div className="absolute inset-0 flex items-center justify-center px-10 py-6">
      <div className="relative h-[78px] w-[140px] shrink-0">
        <Image
          src={PUBLIC_DESIGNS_CARDS_VARIANT1.desaSeminyakLogo}
          alt="Desa Seminyak logo"
          fill
          className="object-contain"
          sizes="140px"
        />
      </div>
    </div>
  );
}

function DesignsSfsVariant1Mockup() {
  return (
    <div className="absolute inset-0 flex items-center justify-center px-10 py-6">
      <div className="relative h-[72px] w-[246px] shrink-0">
        <Image
          src={PUBLIC_DESIGNS_CARDS_VARIANT1.sfsLogo}
          alt="SF Sekuritas"
          fill
          className="object-contain"
          sizes="246px"
        />
      </div>
    </div>
  );
}

function resolvePlacementShell(
  cardKey: DesignsCardKey,
  filter: DesignsFilterId,
  width: DesignsCardPlacement["width"],
): FeaturedCardShellLayoutOverrides | undefined {
  if (cardKey === "octo") {
    if (width === "half") return OCTO_VARIANT1_CARD_SHELL;
    return {
      ...DESIGNS_LOGO_CARD_EXPANDED_SHELL,
      titleHeadingClassName: "text-[18px] leading-[20px] tracking-[-1px] text-black",
    };
  }
  if (cardKey === "ds") {
    if (width === "half") return VARIANT1_LOGO_CARD_SHELL;
    return DESIGNS_LOGO_CARD_EXPANDED_SHELL;
  }
  if (cardKey === "sfs") {
    if (filter === "all") return VARIANT1_SFS_CARD_SHELL;
    return DESIGNS_SFS_EXPANDED_SHELL;
  }
  if (
    cardKey === "bpr" ||
    cardKey === "nuho" ||
    cardKey === "sfast" ||
    cardKey === "personal" ||
    cardKey === "b2b" ||
    cardKey === "sfc"
  ) {
    return DESIGNS_LAPTOP_CARD_SHELL;
  }
  return undefined;
}

export function DesignsPage() {
  const [activeFilter, setActiveFilter] = useState<DesignsFilterId>("all");
  const [activeArrowId, setActiveArrowId] = useState<string | null>(null);
  const [revealedKey, setRevealedKey] = useState<string | null>(null);
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const isGlobalArrowFocus = activeArrowId !== null;
  const [isDesignsTabletViewport, setIsDesignsTabletViewport] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px) and (max-width: 1023px)");
    const update = () => setIsDesignsTabletViewport(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  /** Tablet `md`–`lg-1` 2-col: half-width cards use legacy laptop inset. Mobile single-col + desktop `lg+` full/half rows: center artboard. */
  const designsLaptopArtboard = isDesignsTabletViewport ? "narrow-column" : "wide-card";

  const onArrowHoverStart = useCallback((id: string) => {
    setActiveArrowId(id);
  }, []);
  const onArrowHoverEnd = useCallback((id: string) => {
    setActiveArrowId((prev) => (prev === id ? null : prev));
  }, []);

  const cardShellProps = useMemo(
    () => ({
      activeArrowId,
      onArrowHoverStart,
      onArrowHoverEnd,
      revealedKey,
      setRevealedKey,
      hoveredKey,
      setHoveredKey,
    }),
    [activeArrowId, onArrowHoverStart, onArrowHoverEnd, revealedKey, hoveredKey],
  );

  const filterPlacements = useMemo(() => {
    if (activeFilter === "mobile" && isDesignsTabletViewport) {
      return MOBILE_FILTER_TABLET_LAYOUT;
    }
    return getDesignsFilterLayout(activeFilter);
  }, [activeFilter, isDesignsTabletViewport]);

  const handleFilterChange = useCallback((filter: DesignsFilterId) => {
    setActiveFilter(filter);
    setRevealedKey(null);
    setHoveredKey(null);
    setActiveArrowId(null);
  }, []);

  const renderFilteredCard = useCallback(
    (placement: DesignsCardPlacement) => {
      const shellLayout = resolvePlacementShell(placement.cardKey, activeFilter, placement.width);
      const shared = { ...cardShellProps, shellLayout };

      switch (placement.cardKey) {
        case "bpr":
          return (
            <DesignsFeaturedDesignCard
              key="bpr"
              cardKey="bpr"
              title="bprqaya.co.id"
              subtitle="Web | Fintech"
              href="https://bprqaya.id/"
              mockupPaddingClass="px-0 py-0"
              renderMockup={(hovered) => <BPRMockup hovered={hovered} artboardPlacement={designsLaptopArtboard} />}
              {...shared}
            />
          );
        case "octo":
          return (
            <DesignsFeaturedDesignCard
              key="octo"
              cardKey="octo"
              title="OCTO Merchant"
              subtitle="Mobile | Fintech"
              href={CASE_DESIGNS.octo.detailHref}
              caseChip="Case"
              mockupPaddingClass="px-0 py-0"
              renderMockup={() => <DesignsOctoVariant1Mockup />}
              {...shared}
            />
          );
        case "ds":
          return (
            <DesignsFeaturedDesignCard
              key="ds"
              cardKey="ds"
              title="Desa Seminyak"
              subtitle="Web | Others"
              href={DS_HREF}
              revealStatus="preview"
              mockupPaddingClass="px-0 py-0"
              renderMockup={() => <DesignsDsVariant1Mockup />}
              {...shared}
            />
          );
        case "sfs":
          return (
            <DesignsFeaturedDesignCard
              key="sfs"
              cardKey="sfs"
              title="sfsekuritas.co.id"
              subtitle="Web | Fintech"
              href={SFS_HREF}
              mockupPaddingClass="px-0 py-0"
              renderMockup={() => <DesignsSfsVariant1Mockup />}
              {...shared}
            />
          );
        case "b2b":
          return (
            <DesignsFeaturedDesignCard
              key="b2b"
              cardKey="b2b"
              title="enterprise.dipay.id"
              subtitle="Web | Fintech"
              href={CASE_DESIGNS.b2b.detailHref}
              caseChip="Case"
              mockupPaddingClass="px-0 py-0"
              renderMockup={(hovered) => (
                <BPRDashboardFrameMockup
                  hovered={hovered}
                  contentSrc={PUBLIC_DESIGNS_MOCKUPS.b2b.content}
                  contentAlt="Dipay enterprise dashboard"
                  artboardPlacement={designsLaptopArtboard}
                />
              )}
              {...shared}
            />
          );
        case "sfast":
          return (
            <DesignsFeaturedDesignCard
              key="sfast"
              cardKey="sfast"
              title="SFAST Mobile App"
              subtitle="Mobile | Fintech"
              href={SFAST_APP_STORE_HREF}
              mockupPaddingClass="px-0 py-0"
              renderMockup={(hovered) => <SFASTMockup hovered={hovered} />}
              {...shared}
            />
          );
        case "personal":
          return (
            <DesignsFeaturedDesignCard
              key="personal"
              cardKey="personal"
              title="Dipay Personal"
              subtitle="Mobile | E-Wallet"
              href={CASE_DESIGNS.personal.detailHref}
              caseChip="Case"
              mockupPaddingClass="px-10 py-6"
              renderMockup={(hovered) => <PersonalMockup hovered={hovered} />}
              {...shared}
            />
          );
        case "nuho":
          return (
            <DesignsFeaturedDesignCard
              key="nuho"
              cardKey="nuho"
              title="nuholiving.com"
              subtitle="Web | Others"
              href="https://nuholiving.com/"
              mockupPaddingClass="px-0 py-0"
              renderMockup={(hovered) => (
                <BPRFrameMockup
                  hovered={hovered}
                  navbarSrc={PUBLIC_DESIGNS_MOCKUPS.nuho.navbar}
                  contentSrc={PUBLIC_DESIGNS_MOCKUPS.nuho.content}
                  contentAlt="nuholiving.com mockup"
                  navbarDisplayPx={38.155555625}
                  navbarIntrinsicWidth={1024}
                  navbarIntrinsicHeight={76}
                  contentHeightPx={2733}
                  artboardPlacement={designsLaptopArtboard}
                />
              )}
              {...shared}
            />
          );
        case "sfc":
          return (
            <DesignsFeaturedDesignCard
              key="sfc"
              cardKey="sfc"
              title="sfcapital.co.id"
              subtitle="Web | Fintech"
              href={CASE_DESIGNS.sfc.detailHref}
              caseChip="Case"
              mockupPaddingClass="px-0 py-0"
              renderMockup={(hovered) => (
                <BPRFrameMockup
                  hovered={hovered}
                  navbarSrc={PUBLIC_DESIGNS_MOCKUPS.sfc.navbar}
                  contentSrc={PUBLIC_DESIGNS_MOCKUPS.sfc.content}
                  contentAlt="sfcapital.co.id mockup"
                  navbarDisplayPx={28.444446563720703}
                  navbarDisplayWidthPx={396.79998779296875}
                  navbarIntrinsicWidth={2048}
                  navbarIntrinsicHeight={160}
                  contentHeightPx={1927}
                  artboardPlacement={designsLaptopArtboard}
                />
              )}
              {...shared}
            />
          );
        default:
          return null;
      }
    },
    [activeFilter, cardShellProps, designsLaptopArtboard],
  );

  return (
    <div className="bg-[#FAFAFA] text-black">
      <header className="pointer-events-none fixed inset-x-0 top-6 z-[60] hidden px-10 sm:block lg:px-[60px]">
        <div className="pointer-events-auto mx-auto flex h-14 w-full max-w-[1320px] items-center justify-between">
          <LogoMark />
          <nav
            aria-label="Primary navigation"
            className="flex items-center rounded-[56px] border border-black/10 bg-white/80 p-[5px] shadow-[0_10px_10px_-5px_rgba(0,0,0,0.10)] backdrop-blur-[8px]"
          >
            <Link
              href="/"
              className="flex h-[46px] w-[84px] items-center justify-center rounded-[230px] text-center text-base leading-[21px] text-[#707070] transition-colors hover:bg-[#F2F2F2]"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="flex h-[46px] w-[84px] items-center justify-center rounded-[230px] text-center text-base leading-[21px] text-[#707070] transition-colors hover:bg-[#F2F2F2]"
            >
              About
            </Link>
            <Link
              href="/designs"
              className="flex h-[46px] w-[84px] items-center justify-center rounded-[230px] bg-[#F2F2F2] text-center text-base leading-[21px] text-black"
            >
              Designs
            </Link>
          </nav>
          <Link
            href="mailto:alhaekalnast@gmail.com"
            className="rounded-[230px] bg-[#F2F2F2] px-6 py-3 text-base leading-[21px] text-[#707070] transition-colors hover:text-black"
          >
            Let&apos;s Talk
          </Link>
        </div>
      </header>

      <header className="pointer-events-none fixed inset-x-0 top-6 z-[60] px-4 sm:hidden">
        <div className="pointer-events-auto mx-auto flex h-[46px] w-full items-center justify-between">
          <LogoMark />
          <Link
            href="mailto:alhaekalnast@gmail.com"
            className="rounded-[230px] bg-[#F2F2F2] px-6 py-3 text-base leading-[21px] text-[#707070]"
          >
            Let&apos;s Talk
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1440px] overflow-visible px-4 pt-[124px] pb-[108px] sm:px-10 lg:px-[60px] lg:pb-[124px]">
        <div className="flex flex-col gap-[48px]">
          <motion.div
            className="max-w-[640px] flex flex-col gap-[24px]"
            initial={false}
            animate={getGlobalFocusMotionAnimate(activeArrowId !== null)}
            transition={{ duration: PREMIUM_DURATION, ease: PREMIUM_EASE }}
          >
            <h1 className="text-[32px] leading-[40px] tracking-[-1px] text-black lg:text-[40px] lg:leading-[56px]">All Designs</h1>
            <p className="text-base leading-6 text-[#666666]">
              A collection of shipped products, live builds, and selected previews across web, mobile, and internal systems.
            </p>
          </motion.div>

          <motion.div
            initial={false}
            animate={getGlobalFocusMotionAnimate(activeArrowId !== null)}
            transition={{ duration: PREMIUM_DURATION, ease: PREMIUM_EASE }}
          >
            <DesignsFilterTabs activeFilter={activeFilter} onFilterChange={handleFilterChange} />
          </motion.div>

          <DesignsFilteredGrid
            placements={filterPlacements}
            renderCard={renderFilteredCard}
            mobileTabletStack={activeFilter === "mobile" && isDesignsTabletViewport}
          />
        </div>
      </main>

      <motion.footer
        className="mt-[24px] w-full bg-[#F2F2F2]"
        initial={false}
        animate={getGlobalFocusMotionAnimate(isGlobalArrowFocus)}
        transition={{ duration: PREMIUM_DURATION, ease: PREMIUM_EASE }}
      >
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-16 px-4 pb-[124px] sm:px-10 lg:px-[60px]">
          <div className="flex flex-col gap-16 py-8 sm:py-20">
            <div className="flex items-start justify-between gap-8 sm:gap-6">
              <LogoMark />
              <nav className="flex flex-col items-end gap-6 text-base leading-6 text-black sm:flex-row sm:items-center sm:gap-6">
                <ExternalUnderlineLink href="https://docs.google.com/document/d/1rFAuSJrV4IpffI2PRfBmjHlHG5QDDF6L/edit?usp=sharing&ouid=107776713613949709441&rtpof=true&sd=true">
                  Resume
                </ExternalUnderlineLink>
                <ExternalUnderlineLink href="https://www.linkedin.com/in/haekalnast/">Linkedin</ExternalUnderlineLink>
                <ExternalUnderlineLink href="https://github.com/haekalnast">Github</ExternalUnderlineLink>
              </nav>
            </div>
            <p className="text-base leading-6 font-light text-[#707070]">
              Copyright © 2026 Bagas Al Haekal Nasution
              <br className="sm:hidden" />
              <span className="hidden sm:inline"> </span>
              All rights reserved
            </p>
          </div>
        </div>
      </motion.footer>

      <MobileSiteBottomNav />
    </div>
  );
}

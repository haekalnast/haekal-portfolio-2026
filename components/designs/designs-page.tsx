"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";
import {
  BPRDashboardFrameMockup,
  BPRFrameMockup,
  BPRMockup,
  DesignsFeaturedDesignCard,
  PersonalMockup,
  SFASTMockup,
  type FeaturedCardShellLayoutOverrides,
} from "@/components/shared/featured-design-card";
import { getGlobalFocusMotionAnimate } from "@/components/shared/arrow-reveal";
import { PUBLIC_BRAND, PUBLIC_DESIGNS_CARDS_VARIANT1, PUBLIC_DESIGNS_MOCKUPS } from "@/lib/public-assets";

const PREMIUM_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const PREMIUM_DURATION = 0.32;
const FALLBACK = "/not-found";
const OCTO_HREF = "https://play.google.com/store/apps/details?id=com.cimbedc&pcampaignid=web_share";
const DS_HREF = "https://desa-seminyak.vercel.app/";

const VARIANT1_LOGO_CARD_SHELL: FeaturedCardShellLayoutOverrides = {
  mockupInnerClassName: "h-[210px]",
  titleBlockClassName: "pointer-events-none mt-6 lg:absolute lg:left-0 lg:mt-0 lg:top-[226px]",
  articleCollapsed: "h-[210px] lg:h-[210px]",
  articleRevealed: "h-[512px] lg:h-[408px]",
};

const OCTO_VARIANT1_CARD_SHELL: FeaturedCardShellLayoutOverrides = {
  ...VARIANT1_LOGO_CARD_SHELL,
  titleHeadingClassName: "text-[18px] leading-[20px] tracking-[-1px] text-black",
};

function LogoMark() {
  return (
    <Link href="/" aria-label="Go to home" className="group relative block h-[27px] w-[124px]">
      <Image
        src={PUBLIC_BRAND.logoDefault}
        alt="Haekal"
        width={124}
        height={27}
        unoptimized
        className="absolute inset-0 h-full w-full opacity-100 transition-opacity duration-200 group-hover:opacity-0"
      />
      <Image
        src={PUBLIC_BRAND.logoHover}
        alt="Haekal"
        width={124}
        height={27}
        unoptimized
        className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-200 group-hover:opacity-100"
      />
    </Link>
  );
}

function FooterLink({ href, children }: { href: string; children: string }) {
  return (
    <Link href={href} target="_blank" rel="noreferrer noopener" className="relative inline-flex items-center gap-1">
      {children}
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M14.3763 12.7083V5.625H7.29297" stroke="#141414" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14.1667 5.83203L5.625 14.3737" stroke="#141414" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
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
          unoptimized
          className="object-contain"
          sizes="140px"
        />
      </div>
    </div>
  );
}

export function DesignsPage() {
  const [activeArrowId, setActiveArrowId] = useState<string | null>(null);
  const [revealedKey, setRevealedKey] = useState<string | null>(null);
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const isGlobalArrowFocus = activeArrowId !== null;

  const onArrowHoverStart = useCallback((id: string) => {
    setActiveArrowId(id);
  }, []);
  const onArrowHoverEnd = useCallback((id: string) => {
    setActiveArrowId((prev) => (prev === id ? null : prev));
  }, []);

  const cardShellProps = {
    activeArrowId,
    onArrowHoverStart,
    onArrowHoverEnd,
    revealedKey,
    setRevealedKey,
    hoveredKey,
    setHoveredKey,
  } as const;

  return (
    <div className="bg-[#FAFAFA] text-black">
      <header className="pointer-events-none fixed inset-x-0 top-6 z-40 hidden px-10 sm:block lg:px-[60px]">
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

      <header className="pointer-events-none fixed inset-x-0 top-6 z-40 px-4 sm:hidden">
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

      <main className="mx-auto w-full max-w-[1440px] px-4 pt-[124px] pb-[108px] sm:px-10 lg:px-[60px] lg:pb-[124px]">
        <motion.div
          className="max-w-[640px] flex flex-col gap-[24px] pb-[48px]"
          initial={false}
          animate={getGlobalFocusMotionAnimate(activeArrowId !== null)}
          transition={{ duration: PREMIUM_DURATION, ease: PREMIUM_EASE }}
        >
          <h1 className="text-[32px] leading-[40px] tracking-[-1px] text-black lg:text-[40px] lg:leading-[56px]">All Designs</h1>
          <p className="text-base leading-6 text-[#666666]">
            A collection of shipped products, live builds, and selected previews across web, mobile, and internal systems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-[24px] md:grid-cols-2">
          {/* Left column */}
          <div className="flex min-w-0 flex-col gap-[24px]">
            <DesignsFeaturedDesignCard
              cardKey="bpr"
              title="bprqaya.co.id"
              subtitle="Web | Fintech"
              href="https://bprqaya.id/"
              mockupPaddingClass="px-0 py-0"
              renderMockup={(hovered) => <BPRMockup hovered={hovered} />}
              {...cardShellProps}
            />

            <div className="grid grid-cols-1 gap-[24px] lg:grid-cols-2">
              <DesignsFeaturedDesignCard
                cardKey="octo"
                title="OCTO Merchant"
                subtitle="Mobile | Fintech"
                href={OCTO_HREF}
                mockupPaddingClass="px-0 py-0"
                shellLayout={OCTO_VARIANT1_CARD_SHELL}
                renderMockup={() => <DesignsOctoVariant1Mockup />}
                {...cardShellProps}
              />
              <DesignsFeaturedDesignCard
                cardKey="ds"
                title="Desa Seminyak"
                subtitle="Web | Others"
                href={DS_HREF}
                revealStatus="preview"
                mockupPaddingClass="px-0 py-0"
                shellLayout={VARIANT1_LOGO_CARD_SHELL}
                renderMockup={() => <DesignsDsVariant1Mockup />}
                {...cardShellProps}
              />
            </div>

            <DesignsFeaturedDesignCard
              cardKey="b2b"
              title="enterprise.dipay.id"
              subtitle="Web | Fintech"
              href="https://enterprise.dipay.id/login"
              mockupPaddingClass="px-0 py-0"
              renderMockup={(hovered) => (
                <BPRDashboardFrameMockup
                  hovered={hovered}
                  contentSrc={PUBLIC_DESIGNS_MOCKUPS.b2b.content}
                  contentAlt="Dipay enterprise dashboard"
                />
              )}
              {...cardShellProps}
            />
          </div>

          {/* Right column */}
          <div className="flex min-w-0 flex-col gap-[24px]">
            <div className="grid grid-cols-1 gap-[24px] lg:grid-cols-2">
              <DesignsFeaturedDesignCard
                cardKey="sfast"
                title="SFAST Mobile App"
                subtitle="Mobile | Fintech"
                href={FALLBACK}
                mockupPaddingClass="px-0 py-0"
                renderMockup={(hovered) => <SFASTMockup hovered={hovered} />}
                {...cardShellProps}
              />
              <DesignsFeaturedDesignCard
                cardKey="personal"
                title="Dipay Personal"
                subtitle="Mobile | E-Wallet"
                href={FALLBACK}
                mockupPaddingClass="px-10 py-6"
                renderMockup={(hovered) => <PersonalMockup hovered={hovered} />}
                {...cardShellProps}
              />
            </div>

            <DesignsFeaturedDesignCard
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
                />
              )}
              {...cardShellProps}
            />

            <DesignsFeaturedDesignCard
              cardKey="sfc"
              title="sfcapital.co.id"
              subtitle="Web | Fintech"
              href="https://sfcapital.co.id/"
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
                />
              )}
              {...cardShellProps}
            />
          </div>
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
                <FooterLink href="https://docs.google.com/document/d/1rFAuSJrV4IpffI2PRfBmjHlHG5QDDF6L/edit?usp=sharing&ouid=107776713613949709441&rtpof=true&sd=true">
                  Resume
                </FooterLink>
                <FooterLink href="https://www.linkedin.com/in/haekalnast/">Linkedin</FooterLink>
                <FooterLink href="https://github.com/haekalnast">Github</FooterLink>
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

      <div className="pointer-events-none fixed inset-x-0 bottom-6 z-40 px-4 sm:hidden">
        <nav
          aria-label="Mobile navigation"
          className="pointer-events-auto mx-auto flex w-fit items-center rounded-[56px] border border-black/10 bg-white/80 p-[5px] shadow-[0_10px_10px_-5px_rgba(0,0,0,0.10)] backdrop-blur-[8px]"
        >
          <Link href="/" className="flex h-[46px] w-[84px] items-center justify-center rounded-[230px] text-base leading-[21px] text-[#707070]">
            Home
          </Link>
          <Link href="/about" className="flex h-[46px] w-[84px] items-center justify-center rounded-[230px] text-base leading-[21px] text-[#707070]">
            About
          </Link>
          <Link href="/designs" className="flex h-[46px] w-[84px] items-center justify-center rounded-[230px] bg-[#F2F2F2] text-base leading-[21px] text-black">
            Designs
          </Link>
        </nav>
      </div>
    </div>
  );
}

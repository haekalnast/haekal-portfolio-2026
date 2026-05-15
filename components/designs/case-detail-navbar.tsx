"use client";

import Image from "next/image";
import Link from "next/link";
import { CaseNavPrevNextButton } from "@/components/designs/case-nav-prev-next-button";
import { CASE_DESIGNS, getAdjacentCaseSlugs, type CaseSlug } from "@/lib/case-designs";
import { cn } from "@/lib/cn";
import { PUBLIC_BRAND } from "@/lib/public-assets";

const NAV_LINK_CLASS =
  "flex h-[46px] w-[84px] items-center justify-center rounded-[230px] text-center text-base leading-[21px] text-[#707070] transition-colors hover:bg-[#F2F2F2]";

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

function CaseNavPillLinks() {
  return (
    <nav
      aria-label="Primary navigation"
      className="flex items-center rounded-[56px] border border-black/10 bg-white/80 p-[5px] shadow-[0_10px_10px_-5px_rgba(0,0,0,0.10)] backdrop-blur-[8px]"
    >
      <Link href="/" className={NAV_LINK_CLASS}>
        Home
      </Link>
      <Link href="/about" className={NAV_LINK_CLASS}>
        About
      </Link>
      <Link href="/designs" className={NAV_LINK_CLASS}>
        Designs
      </Link>
    </nav>
  );
}

function CaseNavPrevNextCluster({ slug, className }: { slug: CaseSlug; className?: string }) {
  const { prev, next } = getAdjacentCaseSlugs(slug);
  const prevCase = CASE_DESIGNS[prev];
  const nextCase = CASE_DESIGNS[next];

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <CaseNavPrevNextButton
        direction="prev"
        href={prevCase.detailHref}
        label={`Previous case study: ${prevCase.title}`}
      />
      <CaseNavPillLinks />
      <CaseNavPrevNextButton
        direction="next"
        href={nextCase.detailHref}
        label={`Next case study: ${nextCase.title}`}
      />
    </div>
  );
}

export function CaseDetailNavbar({ slug }: { slug: CaseSlug }) {
  return (
    <>
      {/* Desktop / tablet — logo · prev+pill+next · Let's Talk */}
      <header className="pointer-events-none fixed inset-x-0 top-6 z-[60] hidden px-10 sm:block lg:px-[60px]">
        <div className="pointer-events-auto mx-auto flex h-14 w-full max-w-[1320px] items-center gap-6">
          <div className="flex min-w-0 flex-1 justify-start">
            <LogoMark />
          </div>
          <CaseNavPrevNextCluster slug={slug} className="shrink-0" />
          <div className="flex min-w-0 flex-1 justify-end">
            <Link
              href="mailto:alhaekalnast@gmail.com"
              className="rounded-[230px] bg-[#F2F2F2] px-6 py-3 text-base leading-[21px] text-[#707070] transition-colors hover:text-black"
            >
              Let&apos;s Talk
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile top — logo + Let's Talk only (no prev/next) */}
      <header className="pointer-events-none fixed inset-x-0 top-6 z-[60] px-4 sm:hidden">
        <div className="pointer-events-auto mx-auto flex h-[46px] w-full items-center justify-between">
          <LogoMark />
          <Link
            href="mailto:alhaekalnast@gmail.com"
            className="rounded-[230px] bg-[#F2F2F2] px-6 py-3 text-base leading-[21px] text-[#707070] transition-colors hover:text-black"
          >
            Let&apos;s Talk
          </Link>
        </div>
      </header>
    </>
  );
}

/** Mobile bottom — prev + Home/About/Designs + next (Figma mobile case header). */
export function CaseDetailMobileBottomNav({ slug }: { slug: CaseSlug }) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[60] px-4 sm:hidden">
      <div className="pointer-events-auto mx-auto flex justify-center">
        <CaseNavPrevNextCluster slug={slug} />
      </div>
    </div>
  );
}

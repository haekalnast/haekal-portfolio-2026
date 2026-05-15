"use client";

import Image from "next/image";
import Link from "next/link";
import { CaseNavPrevNextButton } from "@/components/designs/case-nav-prev-next-button";
import { MobileBottomNavShell, PILL_NAV_CLASS } from "@/components/shared/mobile-bottom-nav";
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

function CaseNavPillLinks({ fitBar = false }: { fitBar?: boolean }) {
  const linkClass = fitBar
    ? "flex h-[46px] min-w-0 flex-1 items-center justify-center rounded-[230px] text-center text-base leading-[21px] text-[#707070] transition-colors hover:bg-[#F2F2F2]"
    : NAV_LINK_CLASS;

  return (
    <nav
      aria-label="Primary navigation"
      className={cn(PILL_NAV_CLASS, fitBar && "min-w-0 flex-1")}
    >
      <Link href="/" className={linkClass}>
        Home
      </Link>
      <Link href="/about" className={linkClass}>
        About
      </Link>
      <Link href="/designs" className={linkClass}>
        Designs
      </Link>
    </nav>
  );
}

function CaseNavPrevNextCluster({
  slug,
  className,
  layout = "inline",
}: {
  slug: CaseSlug;
  className?: string;
  layout?: "inline" | "bottomBar";
}) {
  const { prev, next } = getAdjacentCaseSlugs(slug);
  const prevCase = CASE_DESIGNS[prev];
  const nextCase = CASE_DESIGNS[next];

  const prevButton = (
    <CaseNavPrevNextButton
      direction="prev"
      href={prevCase.detailHref}
      label={`Previous case study: ${prevCase.title}`}
    />
  );
  const nextButton = (
    <CaseNavPrevNextButton
      direction="next"
      href={nextCase.detailHref}
      label={`Next case study: ${nextCase.title}`}
    />
  );

  if (layout === "bottomBar") {
    return (
      <>
        {prevButton}
        <CaseNavPillLinks fitBar />
        {nextButton}
      </>
    );
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {prevButton}
      <CaseNavPillLinks />
      {nextButton}
    </div>
  );
}

export function CaseDetailNavbar({ slug }: { slug: CaseSlug }) {
  return (
    <>
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

export function CaseDetailMobileBottomNav({ slug }: { slug: CaseSlug }) {
  return (
    <MobileBottomNavShell>
      <CaseNavPrevNextCluster slug={slug} layout="bottomBar" />
    </MobileBottomNavShell>
  );
}

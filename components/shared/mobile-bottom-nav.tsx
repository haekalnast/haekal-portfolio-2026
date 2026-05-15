"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import {
  FIXED_SITE_NAV_Z_CLASS,
  MOBILE_NAV_EDGE_SLOT_CLASS,
  SITE_CONTENT_MAX_WIDTH_CLASS,
  SITE_PAGE_GUTTER,
} from "@/lib/fixed-chrome";

const PILL_NAV_CLASS =
  "flex items-center rounded-[56px] border border-black/10 bg-white/80 p-[5px] shadow-[0_10px_10px_-5px_rgba(0,0,0,0.10)] backdrop-blur-[8px]";

function NavEdgeSlot() {
  return <div className={MOBILE_NAV_EDGE_SLOT_CLASS} aria-hidden="true" />;
}

function SiteNavPill({
  fitBar = false,
  designsHref = "/designs",
}: {
  fitBar?: boolean;
  designsHref?: string;
}) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isAbout = pathname === "/about";
  const isDesigns = pathname === "/designs" || pathname.startsWith("/designs/");

  const linkClass = fitBar
    ? "flex h-[46px] min-w-0 flex-1 items-center justify-center rounded-[230px] text-center text-base leading-[21px] transition-colors"
    : "flex h-[46px] w-[84px] items-center justify-center rounded-[230px] text-center text-base leading-[21px] transition-colors";

  return (
    <nav
      aria-label="Primary navigation"
      className={cn(PILL_NAV_CLASS, fitBar && "min-w-0 flex-1")}
    >
      <Link href="/" className={cn(linkClass, isHome ? "bg-[#F2F2F2] text-black" : "text-[#707070] hover:bg-[#F2F2F2]")}>
        Home
      </Link>
      <Link
        href="/about"
        className={cn(linkClass, isAbout ? "bg-[#F2F2F2] text-black" : "text-[#707070] hover:bg-[#F2F2F2]")}
      >
        About
      </Link>
      <Link
        href={designsHref}
        className={cn(linkClass, isDesigns ? "bg-[#F2F2F2] text-black" : "text-[#707070] hover:bg-[#F2F2F2]")}
      >
        Designs
      </Link>
    </nav>
  );
}

/** Full-width mobile bottom track (matches case detail prev + pill + next width). */
export function MobileBottomNavShell({ children }: { children: ReactNode }) {
  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-x-0 bottom-6 sm:hidden",
        FIXED_SITE_NAV_Z_CLASS,
        SITE_PAGE_GUTTER,
      )}
    >
      <div
        className={cn(
          "pointer-events-auto mx-auto flex w-full items-center justify-between gap-1",
          SITE_CONTENT_MAX_WIDTH_CLASS,
        )}
      >
        {children}
      </div>
    </div>
  );
}

/** Standard pages: empty prev/next slots + centered pill (same footprint as case detail bar). */
export function MobileSiteBottomNav({ designsHref = "/designs" }: { designsHref?: string }) {
  return (
    <MobileBottomNavShell>
      <NavEdgeSlot />
      <SiteNavPill fitBar designsHref={designsHref} />
      <NavEdgeSlot />
    </MobileBottomNavShell>
  );
}

export { SiteNavPill, PILL_NAV_CLASS };

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MobileSiteBottomNav } from "@/components/shared/mobile-bottom-nav";
import { PUBLIC_BRAND } from "@/lib/public-assets";

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

function PillLink({ href, children, hardReload = false }: { href: string; children: string; hardReload?: boolean }) {
  if (hardReload) {
    return (
      <a
        href={href}
        className="inline-flex h-[46px] items-center justify-center rounded-[230px] bg-[#F2F2F2] px-6 text-base leading-[21px] text-[#707070]"
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className="inline-flex h-[46px] items-center justify-center rounded-[230px] bg-[#F2F2F2] px-6 text-base leading-[21px] text-[#707070]"
    >
      {children}
    </Link>
  );
}

function FooterActionLink({ href, children }: { href: string; children: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="relative inline-flex items-center gap-1"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path
          d="M14.3763 12.7083V5.625H7.29297"
          stroke="#141414"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.1667 5.83203L5.625 14.3737"
          stroke="#141414"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span
        className="absolute right-0 bottom-0 left-0 h-px bg-[#141414] transition-transform duration-200 ease-out"
        style={{ transform: hovered ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left" }}
      />
    </Link>
  );
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-black">
      <header className="pointer-events-none fixed inset-x-0 top-6 z-[60] hidden px-10 sm:block lg:px-[60px]">
        <div className="pointer-events-auto mx-auto flex h-14 w-full max-w-[1320px] items-center justify-between">
          <LogoMark />
          <nav
            aria-label="Primary navigation"
            className="flex items-center rounded-[56px] border border-black/10 bg-white/80 p-[5px] shadow-[0_10px_10px_-5px_rgba(0,0,0,0.10)] backdrop-blur-[8px]"
          >
            <Link href="/" className="flex h-[46px] w-[84px] items-center justify-center rounded-[230px] text-center text-base leading-[21px] text-[#707070] transition-colors hover:bg-[#F2F2F2] hover:text-[#707070]">
              Home
            </Link>
            <Link href="/about" className="flex h-[46px] w-[84px] items-center justify-center rounded-[230px] text-center text-base leading-[21px] text-[#707070] transition-colors hover:bg-[#F2F2F2] hover:text-[#707070]">
              About
            </Link>
            <Link href="/#designs" className="flex h-[46px] w-[84px] items-center justify-center rounded-[230px] text-center text-base leading-[21px] text-[#707070] transition-colors hover:bg-[#F2F2F2] hover:text-[#707070]">
              Designs
            </Link>
          </nav>
          <PillLink href="mailto:alhaekalnast@gmail.com">Let&apos;s Talk</PillLink>
        </div>
      </header>

      <header className="pointer-events-none fixed inset-x-0 top-6 z-[60] px-4 sm:hidden">
        <div className="pointer-events-auto mx-auto flex h-[46px] w-full items-center justify-between">
          <LogoMark />
          <PillLink href="mailto:alhaekalnast@gmail.com">Let&apos;s Talk</PillLink>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-[1440px] flex-col">
        <section className="relative h-[960px] px-4 pt-[124px] pb-20 sm:h-[946px] sm:px-10 sm:pb-[108px] lg:h-[1014px] lg:px-[60px] lg:pb-[124px]">
          <div className="absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-10 px-4 text-center sm:px-10 lg:px-[60px]">
            <div className="space-y-4">
              <h1 className="text-[26px] leading-8 tracking-[-1px] lg:text-[32px] lg:leading-[40px]">
                Something&apos;s not right
              </h1>
              <p className="text-base leading-6 text-[#707070]">We can&apos;t find the page your are looking for.</p>
            </div>
            <PillLink href="/" hardReload>
              Homepage
            </PillLink>
          </div>
        </section>

        <footer className="w-full bg-[#F2F2F2] px-4 pb-[124px] sm:px-10 lg:px-[60px]">
          <div className="mx-auto w-full max-w-[1320px] py-8 sm:py-20">
            <div className="mb-16 flex items-start justify-between gap-8 sm:mb-16 sm:gap-6">
              <LogoMark />
              <nav className="flex flex-col items-end gap-6 text-base leading-6 sm:flex-row sm:items-center sm:gap-6">
                <FooterActionLink href="https://docs.google.com/document/d/1rFAuSJrV4IpffI2PRfBmjHlHG5QDDF6L/edit?usp=sharing&ouid=107776713613949709441&rtpof=true&sd=true">
                  Resume
                </FooterActionLink>
                <FooterActionLink href="https://www.linkedin.com/in/haekalnast/">Linkedin</FooterActionLink>
                <FooterActionLink href="https://github.com/haekalnast">Github</FooterActionLink>
              </nav>
            </div>
            <p className="text-base leading-6 font-light text-[#707070]">
              Copyright © 2026 Bagas Al Haekal Nasution
              <br className="sm:hidden" />
              <span className="hidden sm:inline"> </span>
              All rights reserved
            </p>
          </div>
        </footer>
      </main>

      <MobileSiteBottomNav designsHref="/#designs" />
    </div>
  );
}


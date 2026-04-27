"use client";

import { motion, useAnimationControls } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/cn";

type MarqueeItem = {
  key: string;
  title: string;
  subtitle?: string;
  href: string;
  kind: "hero" | "mockup";
  defaultCardBg: string;
  defaultTextColor?: string;
  defaultImageUrl?: string;
};

type FeaturedCard = {
  title: string;
  subtitle: string;
  href: string;
  imageUrl: string;
};

const marqueeItems: MarqueeItem[] = [
  {
    key: "b2b-hero",
    title: "B2B Dashboard",
    href: "https://www.behance.net/",
    kind: "hero",
    defaultCardBg: "#240040",
    defaultTextColor: "#B48CFF",
  },
  {
    key: "b2b-mockup",
    title: "Dipay Disbursement",
    subtitle: "Web | B2B Dashboard",
    href: "https://www.behance.net/",
    kind: "mockup",
    defaultCardBg: "#B48CFF",
    defaultImageUrl: "https://www.figma.com/api/mcp/asset/4312bf5e-ad20-435d-af81-004f8a0db338",
  },
  {
    key: "compro-hero",
    title: "Company Profile",
    href: "https://www.behance.net/",
    kind: "hero",
    defaultCardBg: "#661A00",
    defaultTextColor: "#FF814D",
  },
  {
    key: "compro-mockup",
    title: "Surya Fajar Capital",
    subtitle: "Web | Fintech Company Profile",
    href: "https://www.behance.net/",
    kind: "mockup",
    defaultCardBg: "#FF814D",
    defaultImageUrl: "https://www.figma.com/api/mcp/asset/740b2d34-e8f7-415d-8acb-85b307e7d799",
  },
  {
    key: "trading-hero",
    title: "Trading App",
    href: "https://www.behance.net/",
    kind: "hero",
    defaultCardBg: "#001A33",
    defaultTextColor: "#73B8FF",
  },
  {
    key: "trading-mockup",
    title: "SFAST Mobile App",
    subtitle: "Mobile | Trading App",
    href: "https://www.behance.net/",
    kind: "mockup",
    defaultCardBg: "#73B8FF",
    defaultImageUrl: "https://www.figma.com/api/mcp/asset/0b0d8428-8210-46a5-ad60-7ddfb870d200",
  },
  {
    key: "merchant-hero",
    title: "Merchant App",
    href: "https://www.behance.net/",
    kind: "hero",
    defaultCardBg: "#330000",
    defaultTextColor: "#FF7878",
  },
  {
    key: "merchant-mockup",
    title: "OCTO Merchant",
    subtitle: "Mobile | Merchant App",
    href: "https://www.behance.net/",
    kind: "mockup",
    defaultCardBg: "#FF7878",
    defaultImageUrl: "https://www.figma.com/api/mcp/asset/00e7b7fd-c261-4a2d-93e4-801b46f0391c",
  },
  {
    key: "ewallet-hero",
    title: "E-Wallet App",
    href: "https://www.behance.net/",
    kind: "hero",
    defaultCardBg: "#322200",
    defaultTextColor: "#FEE97F",
  },
  {
    key: "ewallet-mockup",
    title: "Dipay Personal",
    subtitle: "Mobile | E-Wallet App",
    href: "https://www.behance.net/",
    kind: "mockup",
    defaultCardBg: "#FEE97F",
    defaultImageUrl: "https://www.figma.com/api/mcp/asset/3b239509-fc93-460e-8d2b-76c4a9587074",
  },
];

const featuredCards: FeaturedCard[] = [
  {
    title: "BPR Platform",
    subtitle: "Banking product for lending and customer operations.",
    href: "https://www.behance.net/",
    imageUrl: "https://www.figma.com/api/mcp/asset/bc345e34-7b5b-486a-a892-8e15bf7f1741",
  },
  {
    title: "SFAST Mobile",
    subtitle: "Trading experience with real-time market data.",
    href: "https://www.behance.net/",
    imageUrl:
      "https://www.figma.com/api/mcp/asset/5eb0e6ae-acd4-4ba2-88cf-a29f3d091ba5",
  },
  {
    title: "Personal Finance",
    subtitle: "Financial planning, wallet, and payment overview.",
    href: "https://www.behance.net/",
    imageUrl:
      "https://www.figma.com/api/mcp/asset/0d6eacbd-c805-4b8e-bb05-8b6182333f7e",
  },
];

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Designs", href: "#designs" },
];

function LogoMark() {
  return (
    <Link
      href="#home"
      aria-label="Go to home"
      className="group relative block h-[27px] w-[124px]"
    >
      <Image
        src="/logo-haekal-default.svg"
        alt="Haekal"
        width={124}
        height={27}
        unoptimized
        className="absolute inset-0 h-full w-full opacity-100 transition-opacity duration-200 group-hover:opacity-0"
      />
      <Image
        src="/logo-haekal-hover.svg"
        alt="Haekal"
        width={124}
        height={27}
        unoptimized
        className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-200 group-hover:opacity-100"
      />
    </Link>
  );
}

function FloatingNavbar() {
  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-6 z-40 hidden px-10 sm:block lg:px-[60px]">
        <div className="pointer-events-auto mx-auto flex h-14 w-full max-w-[1320px] items-center justify-between">
          <LogoMark />
          <nav
            aria-label="Primary navigation"
            className="flex items-center rounded-[56px] border border-black/10 bg-white/80 p-[5px] shadow-[0_10px_10px_-5px_rgba(0,0,0,0.10)] backdrop-blur-[8px]"
          >
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-5 py-3 text-base leading-4 transition-colors",
                  index === 0 ? "bg-[#F2F2F2] text-black" : "text-[#707070] hover:text-black",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            href="mailto:alhaekalnast@gmail.com"
            className="rounded-[230px] bg-[#F2F2F2] px-6 py-3 text-base text-[#707070] transition-colors hover:text-black"
          >
            Let&apos;s Talk
          </Link>
        </div>
      </header>

      <header className="pointer-events-none fixed inset-x-0 top-6 z-40 px-4 sm:hidden">
        <div className="pointer-events-auto mx-auto flex h-[46px] w-full max-w-[358px] items-center justify-between">
          <LogoMark />
          <Link
            href="mailto:alhaekalnast@gmail.com"
            className="rounded-[230px] bg-[#F2F2F2] px-6 py-3 text-base text-[#707070] transition-colors hover:text-black"
          >
            Let&apos;s Talk
          </Link>
        </div>
      </header>

      <div className="pointer-events-none fixed inset-x-0 bottom-6 z-40 px-4 sm:hidden">
        <nav
          aria-label="Mobile navigation"
          className="pointer-events-auto mx-auto flex w-fit items-center rounded-[56px] border border-black/10 bg-white/80 p-[5px] shadow-[0_10px_10px_-5px_rgba(0,0,0,0.10)] backdrop-blur-[8px]"
        >
          {navItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-5 py-3 text-base leading-4",
                index === 0 ? "bg-[#F2F2F2] text-black" : "text-[#707070]",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}

function HeroSection() {
  return (
    <section
      id="home"
      className="mx-auto w-full max-w-[1440px] bg-[#FAFAFA] px-4 pt-[124px] pb-[80px] sm:px-10 lg:px-[60px]"
    >
      <div className="py-6 sm:py-10 lg:py-14">
        <div className="max-w-[800px] space-y-10">
          <div className="max-w-[640px] space-y-4">
            <p className="text-base leading-6 text-black">Bagas Al Haekal Nasution</p>
            <h1 className="text-[52px] leading-[56px] tracking-[-1px] text-black max-sm:text-[52px] max-sm:leading-[56px] max-[390px]:text-[38px] max-[390px]:leading-[46px]">
              Design Digital Products
              <br />
              for Financial Tech
            </h1>
            <p className="max-w-[640px] text-base leading-6 text-[#707070]">
              Designing digital products across finance, web, and business systems.
              <br />
              Built and shipped.
            </p>
          </div>
          <div className="inline-flex items-center gap-4 rounded-[1000px] border border-black/5 bg-white px-4 py-[6px] pl-[6px]">
            <Link
              href="mailto:alhaekalnast@gmail.com"
              className="rounded-[230px] bg-[#F2F2F2] px-6 py-3 text-base text-[#707070] transition-colors hover:text-black"
            >
              Let&apos;s Talk!
            </Link>
            <p className="text-base font-light leading-6 text-[#141414]">
              Based in Jakarta, Indonesia
            </p>
          </div>
        </div>
      </div>
      <MarqueeShowcase />
    </section>
  );
}

function MarqueeShowcase() {
  const controls = useAnimationControls();
  const [isPaused, setPaused] = useState(false);

  const loopItems = useMemo(() => [...marqueeItems, ...marqueeItems], []);

  const startAnimation = useCallback(() => {
    controls.start({
      x: ["0%", "-50%"],
      transition: {
        duration: 42,
        ease: "linear",
        repeat: Number.POSITIVE_INFINITY,
      },
    });
  }, [controls]);

  useEffect(() => {
    startAnimation();
  }, [startAnimation]);

  return (
    <div className="relative left-1/2 h-[342px] w-screen -translate-x-1/2 overflow-hidden">
      <motion.div
        className="flex min-w-max gap-[14px] pt-8"
        animate={controls}
        drag="x"
        dragConstraints={{ left: -1200, right: 0 }}
        dragElastic={0.08}
        onHoverStart={() => {
          setPaused(true);
          controls.stop();
        }}
        onHoverEnd={() => {
          setPaused(false);
          startAnimation();
        }}
        onDragStart={() => controls.stop()}
        onDragEnd={() => {
          if (!isPaused) startAnimation();
        }}
      >
        {loopItems.map((item, i) => (
          <MarqueeCard key={`${item.key}-${i}`} item={item} />
        ))}
      </motion.div>
    </div>
  );
}

function ArrowIcon({ hover = false }: { hover?: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M14.3763 12.7083V5.625H7.29297"
        stroke={hover ? "#000000" : "#707070"}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.1667 5.83203L5.625 14.3737"
        stroke={hover ? "#000000" : "#707070"}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MarqueeCard({ item }: { item: MarqueeItem }) {
  const isMockup = item.kind === "mockup";

  return (
    <article
      className={cn(
        "group relative w-[312px] shrink-0 overflow-visible rounded-[20px]",
        isMockup ? "h-[278px]" : "h-[210px]",
      )}
    >
      <Link href={item.href} target="_blank" className="absolute inset-0 z-20">
        <span className="sr-only">{item.title}</span>
      </Link>

      {isMockup ? (
        <div className="absolute inset-0">
          <div
            className="absolute inset-x-0 top-0 h-[210px] rounded-[20px]"
            style={{ backgroundColor: item.defaultCardBg }}
          >
            <div className="absolute inset-0 rounded-[20px] bg-[#F2F2F2] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            {item.defaultImageUrl && (
              <Image
                src={item.defaultImageUrl}
                alt={item.title}
                width={312}
                height={210}
                unoptimized
                className="relative z-10 h-[210px] w-[312px] object-contain"
              />
            )}
          </div>
          <div className="pointer-events-none absolute left-0 top-[218px] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <p className="text-[20px] leading-[30px] tracking-[-1px] text-black">{item.title}</p>
            <p className="text-base leading-6 text-[#707070]">{item.subtitle}</p>
          </div>
          <span className="absolute bottom-[84px] left-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-[#FAFAFA] shadow-[0_0_0_1px_rgba(0,0,0,0.06)] transition-all duration-300">
            <span className="block group-hover:hidden">
              <ArrowIcon />
            </span>
            <span className="hidden group-hover:block">
              <ArrowIcon hover />
            </span>
          </span>
        </div>
      ) : (
        <div
          className="relative h-[210px] w-[312px] rounded-[20px] p-6 transition-colors duration-300"
          style={{ backgroundColor: item.defaultCardBg }}
        >
          <div
            className="absolute inset-0 rounded-[20px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ backgroundColor: "#F2F2F2" }}
          />
          <p
            className="relative z-10 flex h-full items-center justify-center text-center text-[34px] leading-8 tracking-[-1px] transition-colors duration-300"
            style={{ color: item.defaultTextColor }}
          >
            <span className="group-hover:hidden">{item.title}</span>
            <span className="hidden group-hover:inline text-black">
              {item.title}
            </span>
          </p>
        </div>
      )}
    </article>
  );
}

function AboutSection() {
  return (
    <section
      id="about"
      className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 bg-[#FAFAFA] px-4 py-20 sm:px-10 sm:py-[108px] lg:flex-row lg:gap-10 lg:px-[60px] lg:py-[124px]"
    >
      <div className="flex-1 space-y-10">
        <div className="space-y-4">
          <h2 className="max-w-[632px] text-[32px] leading-[40px] tracking-[-1px] text-black max-lg:text-[26px] max-lg:leading-8">
            Product designer working on financial platforms.
          </h2>
          <p className="max-w-[720px] text-base leading-6 text-[#707070]">
            I design products across trading, payments, and B2B systems. Working closely
            with product and engineering to simplify complex flows. Focused on clarity,
            real usage, and scalable systems.
          </p>
          <p className="max-w-[720px] text-base leading-6 text-[#707070]">
            Currently building @sfast.official, @dipayindonesia, and @bpr_qaya.
            <br />
            Previously @cimb_niaga &amp; @brin_indonesia.
          </p>
        </div>
        <Link
          href="#"
          className="inline-flex h-[46px] items-center rounded-[230px] bg-[#F2F2F2] px-6 text-base text-[#707070] transition-colors hover:text-black"
        >
          About Me
        </Link>
      </div>

      <article className="relative h-[324px] w-full overflow-hidden rounded-[20px] bg-[#F2F2F2] px-10 pt-6 pb-20 lg:w-[648px]">
        <Image
          src="https://www.figma.com/api/mcp/asset/694ca566-1cf1-4292-be4a-b67c5811f9c4"
          alt="Tools card preview"
          className="h-full w-full object-cover"
          width={648}
          height={324}
          unoptimized
        />
        <Link
          href="https://github.com"
          target="_blank"
          className="absolute bottom-4 left-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#FAFAFA] shadow-[0_0_0_1px_rgba(0,0,0,0.06)]"
          aria-label="Open tools details"
        >
          <span className="text-xl leading-none text-[#707070]">↗</span>
        </Link>
      </article>
    </section>
  );
}

function FeaturedDesignsSection() {
  return (
    <section
      id="designs"
      className="mx-auto w-full max-w-[1440px] bg-[#FAFAFA] px-4 py-20 sm:px-10 sm:py-[108px] lg:px-[60px] lg:py-[124px]"
    >
      <div className="mb-12 flex flex-col gap-8 lg:mb-12 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-4">
          <h2 className="text-[56px] leading-[56px] tracking-[-1px] text-black max-lg:text-[40px] max-lg:leading-10">
            Featured Designs
          </h2>
          <p className="max-w-[720px] text-base leading-6 text-[#707070]">
            Selected products I&apos;ve designed, from launched platforms to ongoing
            builds.
          </p>
        </div>
        <Link
          href="https://www.behance.net/"
          target="_blank"
          className="inline-flex h-[46px] w-fit items-center rounded-[230px] bg-[#F2F2F2] px-6 text-base text-[#707070] transition-colors hover:text-black"
        >
          Explore Designs
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-[648px_648px] lg:grid-rows-[444px]">
        <FeaturedDesignCard card={featuredCards[0]} className="lg:col-span-1 lg:row-span-1" />
        <div className="grid gap-6 sm:grid-cols-2 lg:col-span-1 lg:row-span-1">
          <FeaturedDesignCard card={featuredCards[1]} />
          <FeaturedDesignCard card={featuredCards[2]} />
        </div>
      </div>
    </section>
  );
}

function FeaturedDesignCard({
  card,
  className,
}: {
  card: FeaturedCard;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group relative h-[444px] overflow-hidden rounded-[20px] bg-black/5",
        className,
      )}
    >
      <Image
        src={card.imageUrl}
        alt={card.title}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        fill
        unoptimized
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />
      <div className="absolute inset-x-6 bottom-6">
        <h3 className="text-[26px] leading-8 tracking-[-1px] text-white">{card.title}</h3>
        <p className="mt-1 max-w-[420px] text-sm leading-5 text-white/80">{card.subtitle}</p>
      </div>
      <Link href={card.href} target="_blank" className="absolute inset-0" aria-label={card.title} />
      <span className="absolute bottom-4 left-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#FAFAFA] shadow-[0_0_0_1px_rgba(0,0,0,0.06)] transition-transform group-hover:translate-y-[-2px]">
        <span className="text-xl leading-none text-[#707070]">↗</span>
      </span>
    </article>
  );
}

function FooterSection() {
  return (
    <footer className="mx-auto w-full max-w-[1440px] bg-[#F2F2F2] px-4 pb-[124px] sm:px-10 lg:px-[60px]">
      <div className="flex flex-col gap-16 py-20">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <p className="text-[27px] leading-[27px] font-medium text-[#B9B9B9]">Haekal</p>
          <nav className="flex flex-col gap-4 text-base leading-6 text-black sm:flex-row sm:gap-6">
            <FooterLink href="https://example.com">Resume</FooterLink>
            <FooterLink href="https://linkedin.com">Linkedin</FooterLink>
            <FooterLink href="https://github.com">Github</FooterLink>
          </nav>
        </div>
        <p className="text-base leading-6 font-light text-[#707070]">
          Copyright © 2026 Bagas Al Haekal Nasution All rights reserved
        </p>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: string }) {
  return (
    <Link href={href} target="_blank" className="inline-flex items-center gap-1 hover:underline">
      {children}
      <span className="text-base leading-none">↗</span>
    </Link>
  );
}

export function Homepage() {
  return (
    <div className="bg-[#FAFAFA] text-black">
      <FloatingNavbar />
      <main className="flex flex-col">
        <HeroSection />
        <AboutSection />
        <FeaturedDesignsSection />
      </main>
      <FooterSection />
    </div>
  );
}

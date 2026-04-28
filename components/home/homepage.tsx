"use client";

import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/cn";

type MarqueeItem = {
  key: string;
  title: string;
  subtitle?: string;
  href: string;
  kind: "hero" | "mockup";
  defaultCardBg: string;
  defaultTextColor?: string;
  hoverCardBg?: string;
  hoverTextColor?: string;
  defaultImageUrl?: string;
  mediaWidth?: number;
  mediaHeight?: number;
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
    hoverCardBg: "#B48CFF",
    hoverTextColor: "#240040",
  },
  {
    key: "b2b-mockup",
    title: "Dipay Disbursement",
    subtitle: "Web | B2B Dashboard",
    href: "https://www.behance.net/",
    kind: "mockup",
    defaultCardBg: "#B48CFF",
    defaultImageUrl: "https://www.figma.com/api/mcp/asset/2d44c91f-075a-46ae-88b3-4cc9d66abc94",
    mediaWidth: 272,
    mediaHeight: 186,
  },
  {
    key: "compro-hero",
    title: "Company Profile",
    href: "https://www.behance.net/",
    kind: "hero",
    defaultCardBg: "#661A00",
    defaultTextColor: "#FF814D",
    hoverCardBg: "#FF814D",
    hoverTextColor: "#661A00",
  },
  {
    key: "compro-mockup",
    title: "Surya Fajar Capital",
    subtitle: "Web | Fintech Company Profile",
    href: "https://www.behance.net/",
    kind: "mockup",
    defaultCardBg: "#FF814D",
    defaultImageUrl: "https://www.figma.com/api/mcp/asset/51a71833-419a-4070-b919-edc3fe0a9884",
    mediaWidth: 272,
    mediaHeight: 186,
  },
  {
    key: "trading-hero",
    title: "Trading App",
    href: "https://www.behance.net/",
    kind: "hero",
    defaultCardBg: "#001A33",
    defaultTextColor: "#73B8FF",
    hoverCardBg: "#73B8FF",
    hoverTextColor: "#001A33",
  },
  {
    key: "trading-mockup",
    title: "SFAST Mobile App",
    subtitle: "Mobile | Trading App",
    href: "https://www.behance.net/",
    kind: "mockup",
    defaultCardBg: "#73B8FF",
    defaultImageUrl: "https://www.figma.com/api/mcp/asset/04b5daca-64b8-4b21-84ff-44be593cc8f2",
    mediaWidth: 206,
    mediaHeight: 186,
  },
  {
    key: "merchant-hero",
    title: "Merchant App",
    href: "https://www.behance.net/",
    kind: "hero",
    defaultCardBg: "#330000",
    defaultTextColor: "#FF7878",
    hoverCardBg: "#FF7878",
    hoverTextColor: "#330000",
  },
  {
    key: "merchant-mockup",
    title: "OCTO Merchant",
    subtitle: "Mobile | Merchant App",
    href: "https://www.behance.net/",
    kind: "mockup",
    defaultCardBg: "#FF7878",
    defaultImageUrl: "https://www.figma.com/api/mcp/asset/887cfb82-fe15-469a-8872-350b9f376ecf",
    mediaWidth: 272,
    mediaHeight: 186,
  },
  {
    key: "ewallet-hero",
    title: "E-Wallet App",
    href: "https://www.behance.net/",
    kind: "hero",
    defaultCardBg: "#322200",
    defaultTextColor: "#FEE97F",
    hoverCardBg: "#FEE97F",
    hoverTextColor: "#322200",
  },
  {
    key: "ewallet-mockup",
    title: "Dipay Personal",
    subtitle: "Mobile | E-Wallet App",
    href: "https://www.behance.net/",
    kind: "mockup",
    defaultCardBg: "#FEE97F",
    defaultImageUrl: "https://www.figma.com/api/mcp/asset/6b25901b-42d5-4871-8e31-f5700949cc2f",
    mediaWidth: 174,
    mediaHeight: 186,
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

const instagramLinks = {
  sfast: "https://www.instagram.com/sfast.official/",
  dipay: "https://www.instagram.com/dipayindonesia/",
  bpr: "https://www.instagram.com/bpr_qaya/",
  cimb: "https://www.instagram.com/cimb_niaga/",
  brin: "https://www.instagram.com/brin_indonesia/",
};

const dockApps = [
  { name: "Figma", icon: "https://www.figma.com/api/mcp/asset/3928281a-3d0f-4b48-b7b7-adc64467900d" },
  { name: "Cursor", icon: "https://www.figma.com/api/mcp/asset/c4008ecb-0f80-475f-8f10-1e21da0f250c" },
  { name: "Affinity", icon: "https://www.figma.com/api/mcp/asset/7077e9dd-7ed2-4b04-95e6-2112418ef724" },
  { name: "Github Desktop", icon: "https://www.figma.com/api/mcp/asset/0022a158-2622-49f7-85b1-51899b386bfe" },
  { name: "Notion", icon: "https://www.figma.com/api/mcp/asset/99e8f6a5-ae66-4dcd-ac56-4bde678ac862" },
  { name: "Framer", icon: "https://www.figma.com/api/mcp/asset/690d584b-d135-4799-b944-1b75510e8e5f" },
  { name: "Spotify", icon: "https://www.figma.com/api/mcp/asset/cad70b18-1f0b-48a9-b78d-2cbb108071ce" },
  { name: "WhatsApp", icon: "https://www.figma.com/api/mcp/asset/15c7de87-fd3a-4e2f-9fc6-1110cf302c97" },
  { name: "Finder", icon: "https://www.figma.com/api/mcp/asset/c7b30e4e-76ac-4525-a021-05506e87a664" },
  { name: "Trash", icon: "https://www.figma.com/api/mcp/asset/5271f34d-aa24-47e4-9454-6abff83ccbf0" },
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
                  "flex h-[46px] w-[84px] items-center justify-center rounded-[230px] text-center text-base leading-[21px] transition-colors",
                  index === 0
                    ? "bg-[#F2F2F2] text-black"
                    : "text-[#707070] hover:bg-[#F2F2F2] hover:text-[#707070]",
                )}
              >
                {item.label}
              </Link>
            ))}
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
        <div className="pointer-events-auto mx-auto flex h-[46px] w-full max-w-[358px] items-center justify-between">
          <LogoMark />
          <Link
            href="mailto:alhaekalnast@gmail.com"
            className="rounded-[230px] bg-[#F2F2F2] px-6 py-3 text-base leading-[21px] text-[#707070] transition-colors hover:text-black"
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
                "flex h-[46px] w-[84px] items-center justify-center rounded-[230px] text-center text-base leading-[21px] transition-colors",
                index === 0
                  ? "bg-[#F2F2F2] text-black"
                  : "text-[#707070] hover:bg-[#F2F2F2] hover:text-[#707070]",
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
            <h1 className="text-[38px] leading-[46px] tracking-[-1px] text-black lg:text-[48px] lg:leading-[56px]">
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
              className="rounded-[230px] bg-[#F2F2F2] px-6 py-3 text-base leading-[21px] text-[#707070] transition-colors hover:text-black"
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
  const [isPausedByIcon, setIsPausedByIcon] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const x = useMotionValue(0);

  const loopItems = useMemo(() => [...marqueeItems, ...marqueeItems], []);
  const itemFullWidth = 326; // 312 card + 14 gap
  const oneSetWidth = marqueeItems.length * itemFullWidth;
  const wrapX = (value: number) => {
    let normalized = value % oneSetWidth;
    if (normalized > 0) normalized -= oneSetWidth;
    return normalized;
  };

  useEffect(() => {
    const rafId = window.requestAnimationFrame(() => {
      setIsMounted(true);
    });
    return () => window.cancelAnimationFrame(rafId);
  }, []);

  useAnimationFrame((_, delta) => {
    if (!isMounted || isPausedByIcon || isDragging) return;
    const speed = 36; // px per second
    const moved = (speed * delta) / 1000;
    x.set(wrapX(x.get() - moved));
  });

  if (!isMounted) {
    return (
      <div className="relative left-1/2 h-[342px] w-screen -translate-x-1/2 overflow-hidden">
        <div className="flex min-w-max gap-[14px] pt-8">
          {marqueeItems.map((item) => (
            <MarqueeCard
              key={`${item.key}-ssr`}
              item={item}
              onIconHoverStart={() => undefined}
              onIconHoverEnd={() => undefined}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative left-1/2 h-[342px] w-screen -translate-x-1/2 overflow-hidden">
      <motion.div
        className={cn(
          "flex min-w-max gap-[14px] pt-8 select-none",
          isDragging ? "cursor-grabbing" : "cursor-grab",
        )}
        style={{ x, touchAction: "pan-y" }}
        drag="x"
        dragElastic={0}
        dragMomentum={false}
        whileTap={{ cursor: "grabbing" }}
        onDragStart={() => setIsDragging(true)}
        onDrag={() => {
          x.set(wrapX(x.get()));
        }}
        onDragEnd={() => {
          setIsDragging(false);
        }}
      >
        {loopItems.map((item, i) => (
          <MarqueeCard
            key={`${item.key}-${i}`}
            item={item}
            onIconHoverStart={() => {
              setIsPausedByIcon(true);
            }}
            onIconHoverEnd={() => {
              setIsPausedByIcon(false);
            }}
          />
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

function SmartUnderlineLink({
  href,
  children,
}: {
  href: string;
  children: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      target="_blank"
      className="relative inline-block text-[#707070]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
      <motion.span
        className="absolute right-0 bottom-0 left-0 h-px bg-[#707070]"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        style={{ originX: 0 }}
      />
    </Link>
  );
}

function AboutToolsCard() {
  const [hoveredApp, setHoveredApp] = useState<string | null>(null);
  const [isIconHovered, setIsIconHovered] = useState(false);

  return (
    <article className="relative mx-auto w-[358px] md:w-full lg:w-[648px]">
      <div className="relative h-[324px] overflow-hidden rounded-[20px] bg-[#F2F2F2] pl-10 md:pl-0 lg:pl-10">
        <div className="absolute top-6 right-0 bottom-20 flex items-center">
          <div className="relative h-[124px] w-[290px] overflow-hidden md:w-[530px] lg:w-[530px]">
            <div className="absolute top-[39px] left-0 h-[85px] w-[880px] rounded-[20px] border border-[#484848] bg-[rgba(40,40,40,0.6)] shadow-[0_2px_2px_rgba(0,0,0,0.25)] backdrop-blur-[12px]" />
            <div className="absolute top-[48px] left-[6px] flex h-[66px] w-[868px] items-center gap-[5px] md:hidden">
              {dockApps.map((app, index) => {
                const hoverable = index <= 3; // up to Github on mobile
                return (
                  <div
                    key={`mobile-${app.name}`}
                    className="relative"
                    onMouseEnter={hoverable ? () => setHoveredApp(app.name) : undefined}
                    onMouseLeave={hoverable ? () => setHoveredApp(null) : undefined}
                  >
                    <motion.img
                      src={app.icon}
                      alt={app.name}
                      width={66}
                      height={66}
                      className="h-[66px] w-[66px] shrink-0 object-cover"
                      whileHover={hoverable ? { scale: 1.12, y: -4 } : undefined}
                      transition={{ type: "spring", stiffness: 280, damping: 20 }}
                    />
                    {hoverable && hoveredApp === app.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#5A5A5A] px-3 py-1 text-sm text-white"
                      >
                        {app.name}
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="absolute top-[48px] left-[6px] hidden h-[66px] w-[868px] items-center gap-[5px] md:flex">
              {dockApps.map((app, index) => {
                const hoverable = index <= 6; // up to Spotify on tablet/desktop
                return (
                  <div
                    key={`desktop-${app.name}`}
                    className="relative"
                    onMouseEnter={hoverable ? () => setHoveredApp(app.name) : undefined}
                    onMouseLeave={hoverable ? () => setHoveredApp(null) : undefined}
                  >
                    <motion.img
                      src={app.icon}
                      alt={app.name}
                      width={66}
                      height={66}
                      className="h-[66px] w-[66px] shrink-0 object-cover"
                      whileHover={hoverable ? { scale: 1.12, y: -4 } : undefined}
                      transition={{ type: "spring", stiffness: 280, damping: 20 }}
                    />
                    {hoverable && hoveredApp === app.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#5A5A5A] px-3 py-1 text-sm text-white"
                      >
                        {app.name}
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <button
          type="button"
          aria-label="Tools details"
          className="absolute bottom-4 left-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-[#FAFAFA] shadow-[0_0_0_1px_rgba(0,0,0,0.06)]"
          onMouseEnter={() => setIsIconHovered(true)}
          onMouseLeave={() => setIsIconHovered(false)}
        >
          {isIconHovered ? <ArrowIcon hover /> : <ArrowIcon />}
        </button>
      </div>

      <motion.div
        className="pt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: isIconHovered ? 1 : 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <p className="text-[20px] leading-[30px] tracking-[-1px] text-black">Tools I Use</p>
        <p className="text-base leading-6 text-[#707070]">The stack behind my work</p>
      </motion.div>
    </article>
  );
}

function MarqueeCard({
  item,
  onIconHoverStart,
  onIconHoverEnd,
}: {
  item: MarqueeItem;
  onIconHoverStart: () => void;
  onIconHoverEnd: () => void;
}) {
  const isMockup = item.kind === "mockup";
  const [isIconHovered, setIsIconHovered] = useState(false);

  return (
    <article
      className={cn(
        "group relative w-[312px] shrink-0 overflow-visible rounded-[20px]",
        isMockup ? "h-[278px]" : "h-[210px]",
      )}
    >
      {isMockup ? (
        <div className="absolute inset-0">
          <div
            className="absolute inset-x-0 top-0 h-[210px] rounded-[20px] transition-colors duration-300"
            style={{ backgroundColor: item.defaultCardBg }}
          >
            <div className="absolute inset-0 rounded-[20px] bg-[#F2F2F2] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            {item.defaultImageUrl && (
              <Image
                src={item.defaultImageUrl}
                alt={item.title}
                width={item.mediaWidth ?? 272}
                height={item.mediaHeight ?? 186}
                unoptimized
                className={cn(
                  "relative z-10 object-contain",
                  item.key === "ewallet-mockup"
                    ? "mx-auto mt-6 h-[186px] w-[174px]"
                    : item.key === "trading-mockup"
                      ? "mx-auto mt-6 h-[186px] w-[206px]"
                      : "mx-auto mt-6 h-[186px] w-[272px]",
                )}
              />
            )}
          </div>
          <div
            className={cn(
              "pointer-events-none absolute left-0 top-[218px] transition-opacity duration-200",
              isIconHovered ? "opacity-100" : "opacity-0",
            )}
          >
            <p className="text-[20px] leading-[30px] tracking-[-1px] text-black">{item.title}</p>
            <p className="text-base leading-6 text-[#707070]">{item.subtitle}</p>
          </div>
          <button
            type="button"
            aria-label={`${item.title} details`}
            className="absolute bottom-[84px] left-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-[#FAFAFA] shadow-[0_0_0_1px_rgba(0,0,0,0.06)] transition-all duration-300"
            onMouseEnter={() => {
              setIsIconHovered(true);
              onIconHoverStart();
            }}
            onMouseLeave={() => {
              setIsIconHovered(false);
              onIconHoverEnd();
            }}
            onFocus={() => {
              setIsIconHovered(true);
              onIconHoverStart();
            }}
            onBlur={() => {
              setIsIconHovered(false);
              onIconHoverEnd();
            }}
            tabIndex={0}
          >
            <span className={isIconHovered ? "hidden" : "block"}>
              <ArrowIcon />
            </span>
            <span className={isIconHovered ? "block" : "hidden"}>
              <ArrowIcon hover />
            </span>
          </button>
        </div>
      ) : (
        <div
          className="relative h-[210px] w-[312px] rounded-[20px] p-6 transition-colors duration-300"
          style={{ backgroundColor: item.defaultCardBg }}
        >
          <div
            className="absolute inset-0 rounded-[20px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ backgroundColor: item.hoverCardBg }}
          />
          <p
            className="relative z-10 flex h-full items-center justify-center text-center text-[26px] leading-8 tracking-[-1px] transition-colors duration-300"
            style={{ color: item.defaultTextColor }}
          >
            <span className="group-hover:hidden">{item.title}</span>
            <span className="hidden group-hover:inline" style={{ color: item.hoverTextColor }}>
              {item.title}
            </span>
          </p>
          <Link href={item.href} target="_blank" className="absolute inset-0" aria-label={item.title} />
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
      <div className="w-full flex-1 space-y-10">
        <div className="space-y-4">
          <h2 className="w-full text-[26px] leading-8 tracking-[-1px] text-black lg:max-w-[632px] lg:text-[32px] lg:leading-[40px]">
            Product designer working on financial platforms.
          </h2>
          <p className="w-full text-base leading-6 text-[#707070] lg:max-w-[720px]">
            I design products across trading, payments, and B2B systems. Working closely
            with product and engineering to simplify complex flows. Focused on clarity,
            real usage, and scalable systems.
          </p>
          <p className="w-full text-base leading-6 text-[#707070] lg:max-w-[720px]">
            Currently building{" "}
            <SmartUnderlineLink href={instagramLinks.sfast}>
              @sfast.official
            </SmartUnderlineLink>
            ,{" "}
            <SmartUnderlineLink href={instagramLinks.dipay}>
              @dipayindonesia
            </SmartUnderlineLink>
            , and{" "}
            <SmartUnderlineLink href={instagramLinks.bpr}>
              @bpr_qaya
            </SmartUnderlineLink>
            <br />
            Previously{" "}
            <SmartUnderlineLink href={instagramLinks.cimb}>
              @cimb_niaga
            </SmartUnderlineLink>{" "}
            &amp;{" "}
            <SmartUnderlineLink href={instagramLinks.brin}>
              @brin_indonesia
            </SmartUnderlineLink>
            .
          </p>
        </div>
        <Link
          href="#"
          className="inline-flex h-[46px] items-center rounded-[230px] bg-[#F2F2F2] px-6 text-base leading-[21px] text-[#707070] transition-colors hover:text-black"
        >
          About Me
        </Link>
      </div>

      <AboutToolsCard />
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
          <h2 className="text-[32px] leading-[40px] tracking-[-1px] text-black lg:text-[40px] lg:leading-[56px]">
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
          className="inline-flex h-[46px] w-fit items-center rounded-[230px] bg-[#F2F2F2] px-6 text-base leading-[21px] text-[#707070] transition-colors hover:text-black"
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
    <footer className="w-full bg-[#F2F2F2]">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-16 px-4 py-20 pb-[124px] sm:px-10 lg:px-[60px]">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <LogoMark />
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
    <Link
      href={href}
      target="_blank"
      className="inline-flex items-center gap-1 hover:underline"
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

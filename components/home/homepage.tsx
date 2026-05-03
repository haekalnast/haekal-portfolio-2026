"use client";

import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import { cn } from "@/lib/cn";
import {
  isToolsDockTourSuppressedForThisLoad,
  markToolsDockTourSuppressedForThisLoad,
} from "@/lib/tools-dock-tour-suppress-until-reload";
import { PUBLIC_BRAND, PUBLIC_HOME_FEATURED } from "@/lib/public-assets";
import {
  ArrowIcon,
  ArrowRevealButton,
  ArrowRevealText,
  getGlobalFocusMotionAnimate,
  getGlobalFocusStyle,
} from "@/components/shared/arrow-reveal";
import {
  SectionFeatureHeaderDesktopCta,
  SectionFeatureHeaderMobileCta,
  SectionFeatureHeaderMotionRow,
  SectionFeatureHeaderTitleBlock,
} from "@/components/shared/section-feature-header";

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
  id: "bpr" | "sfast" | "personal";
  title: string;
  subtitle: string;
  href: string;
};

const FALLBACK_ERROR_ROUTE = "/not-found";

const marqueeItems: MarqueeItem[] = [
  {
    key: "b2b-hero",
    title: "B2B Dashboard",
    href: FALLBACK_ERROR_ROUTE,
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
    href: FALLBACK_ERROR_ROUTE,
    kind: "mockup",
    defaultCardBg: "#B48CFF",
    defaultImageUrl: "https://www.figma.com/api/mcp/asset/2d44c91f-075a-46ae-88b3-4cc9d66abc94",
    mediaWidth: 272,
    mediaHeight: 186,
  },
  {
    key: "compro-hero",
    title: "Company Profile",
    href: FALLBACK_ERROR_ROUTE,
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
    href: FALLBACK_ERROR_ROUTE,
    kind: "mockup",
    defaultCardBg: "#FF814D",
    defaultImageUrl: "https://www.figma.com/api/mcp/asset/51a71833-419a-4070-b919-edc3fe0a9884",
    mediaWidth: 272,
    mediaHeight: 186,
  },
  {
    key: "trading-hero",
    title: "Trading App",
    href: FALLBACK_ERROR_ROUTE,
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
    href: FALLBACK_ERROR_ROUTE,
    kind: "mockup",
    defaultCardBg: "#73B8FF",
    defaultImageUrl: "https://www.figma.com/api/mcp/asset/04b5daca-64b8-4b21-84ff-44be593cc8f2",
    mediaWidth: 206,
    mediaHeight: 186,
  },
  {
    key: "merchant-hero",
    title: "Merchant App",
    href: FALLBACK_ERROR_ROUTE,
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
    href: FALLBACK_ERROR_ROUTE,
    kind: "mockup",
    defaultCardBg: "#FF7878",
    defaultImageUrl: "https://www.figma.com/api/mcp/asset/887cfb82-fe15-469a-8872-350b9f376ecf",
    mediaWidth: 272,
    mediaHeight: 186,
  },
  {
    key: "ewallet-hero",
    title: "E-Wallet App",
    href: FALLBACK_ERROR_ROUTE,
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
    href: FALLBACK_ERROR_ROUTE,
    kind: "mockup",
    defaultCardBg: "#FEE97F",
    defaultImageUrl: "https://www.figma.com/api/mcp/asset/6b25901b-42d5-4871-8e31-f5700949cc2f",
    mediaWidth: 174,
    mediaHeight: 186,
  },
];

const featuredCards: FeaturedCard[] = [
  {
    id: "bpr",
    title: "BPR Platform",
    subtitle: "Web | Fintech",
    href: "https://bprqaya.id/",
  },
  {
    id: "sfast",
    title: "SFAST Mobile App",
    subtitle: "Mobile | Fintech",
    href: FALLBACK_ERROR_ROUTE,
  },
  {
    id: "personal",
    title: "Dipay Personal",
    subtitle: "Mobile | E-Wallet",
    href: FALLBACK_ERROR_ROUTE,
  },
];

const FEATURED_ASSETS = {
  bpr: "https://www.figma.com/api/mcp/asset/3be41822-89f8-4007-b31f-c1340f0d50d3",
  sfast: "https://www.figma.com/api/mcp/asset/04b5daca-64b8-4b21-84ff-44be593cc8f2",
  personal: "https://www.figma.com/api/mcp/asset/8c0eea6a-8f54-4cbb-8429-524080328d4c",
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

const SFAST_MOCKUP_ASSETS = {
  leftShell: "https://www.figma.com/api/mcp/asset/8fa4f215-88eb-4e13-a042-2d06ef0acacf",
  rightShell: "https://www.figma.com/api/mcp/asset/414ac5c6-da91-482f-9679-9bfe79caf3cc",
  leftScreenDefault: "https://www.figma.com/api/mcp/asset/5f1c6839-28bd-4868-bf64-54b49b29492c",
  leftScreenHover: "https://www.figma.com/api/mcp/asset/16b32aec-013e-4f8e-8d96-cc0a083730ee",
  rightScreenDefault: "https://www.figma.com/api/mcp/asset/e25185e5-b7c2-4623-a6c7-382c6285197d",
  rightScreenHover: "https://www.figma.com/api/mcp/asset/cce268f6-1f04-4347-a0fd-67c61b8793ac",
  lightScreenMask: "https://www.figma.com/api/mcp/asset/d195f289-22a9-4043-aec0-309ad6438e6f",
  darkScreenMask: "https://www.figma.com/api/mcp/asset/158d416a-9138-447d-a11d-19b7d05ff4d8",
} as const;

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
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

const PREMIUM_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const PREMIUM_DURATION = 0.32;
const PREMIUM_DELAY = 0.04;

function useIsMobileViewport() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return isMobile;
}

function useScrollRevealActive<T extends HTMLElement>(threshold = 0.55) {
  const ref = useRef<T | null>(null);
  const isMobile = useIsMobileViewport();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!isMobile) return;
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsActive(entry.isIntersecting && entry.intersectionRatio >= threshold * 0.6);
      },
      { threshold: [0.15, threshold, 0.9] },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [isMobile, threshold]);

  return { ref, isActive: isMobile && isActive };
}

function LogoMark() {
  return (
    <Link
      href="#home"
      aria-label="Go to home"
      className="group relative block h-[27px] w-[124px]"
    >
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

function HeroSection({
  activeArrowId,
  onArrowHoverStart,
  onArrowHoverEnd,
}: {
  activeArrowId: string | null;
  onArrowHoverStart: (id: string) => void;
  onArrowHoverEnd: (id: string) => void;
}) {
  const isGlobalFocus = activeArrowId !== null;

  return (
    <section
      id="home"
      className="mx-auto w-full max-w-[1440px] bg-[#FAFAFA] px-4 pt-[124px] pb-[80px] sm:px-10 lg:px-[60px]"
    >
      <motion.div
        className="py-6 sm:py-10 lg:py-14"
        initial={false}
        animate={getGlobalFocusMotionAnimate(isGlobalFocus)}
        transition={{ duration: PREMIUM_DURATION, ease: PREMIUM_EASE }}
      >
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
      </motion.div>
      <MarqueeShowcase
        activeArrowId={activeArrowId}
        onArrowHoverStart={onArrowHoverStart}
        onArrowHoverEnd={onArrowHoverEnd}
      />
    </section>
  );
}

function MarqueeShowcase({
  activeArrowId,
  onArrowHoverStart,
  onArrowHoverEnd,
}: {
  activeArrowId: string | null;
  onArrowHoverStart: (id: string) => void;
  onArrowHoverEnd: (id: string) => void;
}) {
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
              isGlobalDimmed={activeArrowId !== null && activeArrowId !== `${item.key}-ssr`}
              onIconHoverStart={() => {
                onArrowHoverStart(`${item.key}-ssr`);
              }}
              onIconHoverEnd={() => {
                onArrowHoverEnd(`${item.key}-ssr`);
              }}
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
            isGlobalDimmed={activeArrowId !== null && activeArrowId !== `${item.key}-${i}`}
            onIconHoverStart={() => {
              setIsPausedByIcon(true);
              onArrowHoverStart(`${item.key}-${i}`);
            }}
            onIconHoverEnd={() => {
              setIsPausedByIcon(false);
              onArrowHoverEnd(`${item.key}-${i}`);
            }}
          />
        ))}
      </motion.div>
    </div>
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
  const isMobile = useIsMobileViewport();
  const isUnderlineVisible = isMobile || hovered;

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
        animate={{ scaleX: isUnderlineVisible ? 1 : 0 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        style={{ originX: 0 }}
      />
    </Link>
  );
}

function AboutToolsCard({
  isGlobalDimmed,
  onArrowHoverStart,
  onArrowHoverEnd,
}: {
  isGlobalDimmed: boolean;
  onArrowHoverStart: () => void;
  onArrowHoverEnd: () => void;
}) {
  const isMobile = useIsMobileViewport();
  const cardRef = useRef<HTMLElement | null>(null);
  const [hoveredApp, setHoveredApp] = useState<string | null>(null);
  const [isIconHovered, setIsIconHovered] = useState(false);
  const [mobileSequenceStep, setMobileSequenceStep] = useState(-1);
  const [mobileSequenceDone, setMobileSequenceDone] = useState(false);
  const [isCardCentered, setIsCardCentered] = useState(false);
  const sequenceNames = useMemo(() => ["Figma", "Cursor", "Affinity"], []);
  const wheelCooldownUntilRef = useRef(0);
  const touchStartYRef = useRef<number | null>(null);
  const touchCooldownUntilRef = useRef(0);
  const lockScrollYRef = useRef(0);
  const sessionTourSuppressed = isToolsDockTourSuppressedForThisLoad();
  const isScrollSequenceActive =
    isMobile && isCardCentered && !mobileSequenceDone && !sessionTourSuppressed;
  const activeMobileTooltip =
    isScrollSequenceActive && mobileSequenceStep >= 0 && mobileSequenceStep < sequenceNames.length
      ? sequenceNames[mobileSequenceStep]
      : null;
  const isDetailsActive = isMobile || isIconHovered;
  const activeTooltipName = isMobile ? (activeMobileTooltip ?? hoveredApp) : hoveredApp;

  useEffect(() => {
    if (!isMobile) return;
    const updateCenteredState = () => {
      const node = cardRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const viewportCenterY = window.innerHeight / 2;
      const cardCenterY = rect.top + rect.height / 2;
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      const threshold = Math.min(96, rect.height * 0.22);
      setIsCardCentered(isVisible && Math.abs(cardCenterY - viewportCenterY) <= threshold);
    };
    updateCenteredState();
    window.addEventListener("scroll", updateCenteredState, { passive: true });
    window.addEventListener("resize", updateCenteredState);
    return () => {
      window.removeEventListener("scroll", updateCenteredState);
      window.removeEventListener("resize", updateCenteredState);
    };
  }, [isMobile]);

  useEffect(() => {
    if (!isScrollSequenceActive) return;
    const body = document.body;
    const html = document.documentElement;
    lockScrollYRef.current = window.scrollY;
    const previousBodyOverflow = body.style.overflow;
    const previousBodyPosition = body.style.position;
    const previousBodyTop = body.style.top;
    const previousBodyWidth = body.style.width;
    const previousHtmlOverflow = html.style.overflow;
    body.style.overflow = "hidden";
    html.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${lockScrollYRef.current}px`;
    body.style.width = "100%";
    return () => {
      body.style.overflow = previousBodyOverflow;
      html.style.overflow = previousHtmlOverflow;
      body.style.position = previousBodyPosition;
      body.style.top = previousBodyTop;
      body.style.width = previousBodyWidth;
      window.scrollTo(0, lockScrollYRef.current);
    };
  }, [isScrollSequenceActive]);

  useEffect(() => {
    if (!isScrollSequenceActive) return;
    const finishTour = () => {
      markToolsDockTourSuppressedForThisLoad();
      setMobileSequenceStep(sequenceNames.length);
      setMobileSequenceDone(true);
    };
    const onWheelLock = (event: globalThis.WheelEvent) => {
      if (event.deltaY <= 0 || Math.abs(event.deltaY) <= 2) return;
      event.preventDefault();
      const now = Date.now();
      if (now < wheelCooldownUntilRef.current) return;
      wheelCooldownUntilRef.current = now + 320;
      setMobileSequenceStep((prev) => {
        const next = Math.min(prev + 1, sequenceNames.length + 1);
        if (next >= sequenceNames.length) {
          window.setTimeout(finishTour, 320);
        }
        return next;
      });
    };
    const onTouchMoveLock = (event: TouchEvent) => {
      const startY = touchStartYRef.current;
      const currentY = event.touches[0]?.clientY;
      if (startY == null || currentY == null) return;
      const delta = startY - currentY;
      if (delta <= 10) return;
      event.preventDefault();
      const now = Date.now();
      if (now < touchCooldownUntilRef.current) return;
      touchCooldownUntilRef.current = now + 320;
      touchStartYRef.current = currentY;
      setMobileSequenceStep((prev) => {
        const next = Math.min(prev + 1, sequenceNames.length + 1);
        if (next >= sequenceNames.length) {
          window.setTimeout(finishTour, 320);
        }
        return next;
      });
    };
    const onTouchStartLock = (event: TouchEvent) => {
      touchStartYRef.current = event.touches[0]?.clientY ?? null;
    };
    window.addEventListener("wheel", onWheelLock, { passive: false });
    window.addEventListener("touchstart", onTouchStartLock, { passive: true });
    window.addEventListener("touchmove", onTouchMoveLock, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWheelLock);
      window.removeEventListener("touchstart", onTouchStartLock);
      window.removeEventListener("touchmove", onTouchMoveLock);
    };
  }, [isScrollSequenceActive, sequenceNames.length]);

  return (
    <article
      ref={cardRef}
      className="relative mx-auto w-[358px] transition-all duration-300 md:w-full lg:w-[648px]"
      style={{
        ...getGlobalFocusStyle(isGlobalDimmed),
        touchAction: isScrollSequenceActive ? "none" : "auto",
      }}
    >
      <div className="relative h-[324px] overflow-hidden rounded-[20px] bg-[#F2F2F2] pl-10 md:pl-0 lg:pl-10">
        <div className="absolute top-6 right-0 bottom-20 flex items-center">
          <div className="relative h-[124px] w-[290px] overflow-hidden md:w-[530px] lg:w-[530px]">
            <div className="absolute top-[39px] left-0 h-[85px] w-[880px] rounded-[20px] border border-[#484848] bg-[rgba(40,40,40,0.6)] shadow-[0_2px_2px_rgba(0,0,0,0.25)] backdrop-blur-[12px]" />
            <div className="absolute top-[48px] left-[6px] flex h-[66px] w-[868px] items-center gap-[5px] md:hidden">
              {dockApps.map((app, index) => {
                const hoverable = index <= 2; // up to Affinity on mobile
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
                      animate={
                        hoverable && activeTooltipName === app.name
                          ? { y: -4, scale: 1.08 }
                          : { y: 0, scale: 1 }
                      }
                      transition={{ duration: 0.32, ease: PREMIUM_EASE }}
                    />
                    {hoverable && (
                      <motion.div
                        className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#5A5A5A] px-3 py-1 text-sm text-white"
                        initial={false}
                        animate={
                          activeTooltipName === app.name
                            ? { opacity: 1, y: 0, visibility: "visible" as const }
                            : { opacity: 0, y: 8, visibility: "hidden" as const }
                        }
                        transition={{ duration: 0.32, ease: PREMIUM_EASE }}
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
                    {hoverable && activeTooltipName === app.name && (
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

        <ArrowRevealButton
          isActive={isDetailsActive}
          ariaLabel="Tools details"
          className="absolute bottom-4 left-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-[#FAFAFA] shadow-[0_0_0_1px_rgba(0,0,0,0.06)] transition-all duration-300"
          onHoverStart={() => {
            setIsIconHovered(true);
            onArrowHoverStart();
          }}
          onHoverEnd={() => {
            setIsIconHovered(false);
            onArrowHoverEnd();
          }}
          onClick={(event) => {
            event.stopPropagation();
            window.location.href = FALLBACK_ERROR_ROUTE;
          }}
        />
      </div>

      <ArrowRevealText isActive={isDetailsActive} title="Tools I Use" subtitle="The stack behind my work" className="pt-2" />
    </article>
  );
}

function MarqueeCard({
  item,
  isGlobalDimmed = false,
  onIconHoverStart,
  onIconHoverEnd,
}: {
  item: MarqueeItem;
  isGlobalDimmed?: boolean;
  onIconHoverStart: () => void;
  onIconHoverEnd: () => void;
}) {
  const isMockup = item.kind === "mockup";
  const [isIconHovered, setIsIconHovered] = useState(false);
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 156, y: 105 });
  const [fillRadius, setFillRadius] = useState(220);
  const hoverFillColor = isMockup ? "#F2F2F2" : (item.hoverCardBg ?? item.defaultCardBg);
  const baseCircleSize = 2;

  const updateCursorFill = (event: MouseEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    const clampedX = Math.max(0, Math.min(x, bounds.width));
    const clampedY = Math.max(0, Math.min(y, bounds.height));
    const maxDist = Math.max(
      Math.hypot(clampedX, clampedY),
      Math.hypot(bounds.width - clampedX, clampedY),
      Math.hypot(clampedX, bounds.height - clampedY),
      Math.hypot(bounds.width - clampedX, bounds.height - clampedY),
    );
    setCursorPos({ x: clampedX, y: clampedY });
    setFillRadius(maxDist + 12);
  };

  return (
    <article
      className={cn(
        "group relative w-[312px] shrink-0 overflow-visible rounded-[20px] transition-all duration-300",
        isMockup ? "h-[278px]" : "h-[210px]",
      )}
      style={getGlobalFocusStyle(isGlobalDimmed)}
      onMouseEnter={(event) => {
        setIsCardHovered(true);
        updateCursorFill(event);
      }}
      onMouseMove={updateCursorFill}
      onMouseLeave={() => setIsCardHovered(false)}
    >
      {isMockup ? (
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-x-0 top-0 h-[210px] overflow-hidden rounded-[20px]"
            initial={false}
            animate={{ backgroundColor: isCardHovered ? hoverFillColor : item.defaultCardBg }}
            transition={{ duration: 0.42, ease: PREMIUM_EASE }}
            style={{ willChange: "background-color" }}
          >
            <motion.div
              className="pointer-events-none absolute inset-0 z-[1] rounded-[20px]"
              style={{ backgroundColor: hoverFillColor }}
              initial={false}
              animate={{ opacity: isCardHovered ? 1 : 0 }}
              transition={{ duration: 0.12, ease: "linear" }}
            />
            <motion.span
              className="pointer-events-none absolute z-[2] rounded-full"
              style={{ backgroundColor: hoverFillColor }}
              initial={false}
              animate={{
                left: cursorPos.x,
                top: cursorPos.y,
                width: baseCircleSize,
                height: baseCircleSize,
                x: "-50%",
                y: "-50%",
                scale: isCardHovered ? (fillRadius * 2) / baseCircleSize : 0,
              }}
              transition={{ duration: 0.62, ease: PREMIUM_EASE }}
            />
            {item.defaultImageUrl && (
              <motion.div
                className="relative z-10 origin-center"
                initial={false}
                animate={{ scale: isCardHovered ? 1.02 : 1 }}
                transition={{ duration: 0.5, ease: PREMIUM_EASE }}
              >
                <Image
                  src={item.defaultImageUrl}
                  alt={item.title}
                  width={item.mediaWidth ?? 272}
                  height={item.mediaHeight ?? 186}
                  unoptimized
                  draggable={false}
                  className={cn(
                    "relative z-10 object-contain",
                    item.key === "ewallet-mockup"
                      ? "mx-auto mt-6 h-[186px] w-[174px]"
                      : item.key === "trading-mockup"
                        ? "mx-auto mt-6 h-[186px] w-[206px]"
                        : "mx-auto mt-6 h-[186px] w-[272px]",
                  )}
                />
              </motion.div>
            )}
          </motion.div>
          <ArrowRevealText
            isActive={isIconHovered}
            title={item.title}
            subtitle={item.subtitle ?? ""}
            className="pointer-events-none absolute left-0 top-[218px]"
            delay={PREMIUM_DELAY}
          />
          <ArrowRevealButton
            isActive={isIconHovered}
            ariaLabel={`${item.title} details`}
            className="absolute bottom-[84px] left-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-[#FAFAFA] shadow-[0_0_0_1px_rgba(0,0,0,0.06)] transition-all duration-300"
            onHoverStart={() => {
              setIsIconHovered(true);
              onIconHoverStart();
            }}
            onHoverEnd={() => {
              setIsIconHovered(false);
              onIconHoverEnd();
            }}
            onClick={(event) => {
              event.stopPropagation();
              if (item.href.startsWith("/")) {
                window.location.href = item.href;
                return;
              }
              window.open(item.href, "_blank", "noopener,noreferrer");
            }}
          />
        </div>
      ) : (
        <motion.div
          className="relative h-[210px] w-[312px] overflow-hidden rounded-[20px] p-6 transition-colors duration-300"
          initial={false}
          animate={{ backgroundColor: isCardHovered ? hoverFillColor : item.defaultCardBg }}
          transition={{ duration: 0.42, ease: PREMIUM_EASE }}
          style={{ willChange: "background-color" }}
        >
          <motion.div
            className="pointer-events-none absolute inset-0 z-[1] rounded-[20px]"
            style={{ backgroundColor: hoverFillColor }}
            initial={false}
            animate={{ opacity: isCardHovered ? 1 : 0 }}
            transition={{ duration: 0.12, ease: "linear" }}
          />
          <motion.span
            className="pointer-events-none absolute z-[2] rounded-full"
            style={{ backgroundColor: hoverFillColor }}
            initial={false}
            animate={{
              left: cursorPos.x,
              top: cursorPos.y,
              width: baseCircleSize,
              height: baseCircleSize,
              x: "-50%",
              y: "-50%",
              scale: isCardHovered ? (fillRadius * 2) / baseCircleSize : 0,
            }}
            transition={{ duration: 0.62, ease: PREMIUM_EASE }}
          />
          <p
            className="relative z-10 flex h-full items-center justify-center text-center text-[26px] leading-8 tracking-[-1px] transition-colors duration-300"
            style={{ color: item.defaultTextColor }}
          >
            {isCardHovered ? (
              <span style={{ color: item.hoverTextColor }}>{item.title}</span>
            ) : (
              <span>{item.title}</span>
            )}
          </p>
          <Link href={item.href} target="_blank" className="absolute inset-0" aria-label={item.title} />
        </motion.div>
      )}
    </article>
  );
}

function AboutSection({
  activeArrowId,
  onArrowHoverStart,
  onArrowHoverEnd,
}: {
  activeArrowId: string | null;
  onArrowHoverStart: (id: string) => void;
  onArrowHoverEnd: (id: string) => void;
}) {
  const aboutArrowId = "about-tools";
  const isGlobalFocus = activeArrowId !== null;
  const isAboutFocused = activeArrowId === aboutArrowId;

  return (
    <section
      id="about"
      className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 bg-[#FAFAFA] px-4 py-20 sm:px-10 sm:py-[108px] lg:flex-row lg:gap-10 lg:px-[60px] lg:py-[124px]"
    >
      <div className="w-full flex-1 space-y-10 transition-all duration-300" style={getGlobalFocusStyle(isGlobalFocus)}>
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
          href={FALLBACK_ERROR_ROUTE}
          className="inline-flex h-[46px] items-center rounded-[230px] bg-[#F2F2F2] px-6 text-base leading-[21px] text-[#707070] transition-colors hover:text-black"
        >
          About Me
        </Link>
      </div>

      <AboutToolsCard
        isGlobalDimmed={isGlobalFocus && !isAboutFocused}
        onArrowHoverStart={() => onArrowHoverStart(aboutArrowId)}
        onArrowHoverEnd={() => onArrowHoverEnd(aboutArrowId)}
      />
    </section>
  );
}

function FeaturedDesignsSection({
  activeArrowId,
  onArrowHoverStart,
  onArrowHoverEnd,
}: {
  activeArrowId: string | null;
  onArrowHoverStart: (id: string) => void;
  onArrowHoverEnd: (id: string) => void;
}) {
  const isGlobalFocus = activeArrowId !== null;
  const [revealedId, setRevealedId] = useState<FeaturedCard["id"] | null>(null);
  const [hoveredCardId, setHoveredCardId] = useState<FeaturedCard["id"] | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!sectionRef.current) return;
      if (!sectionRef.current.contains(event.target as Node)) {
        setRevealedId(null);
        setHoveredCardId(null);
      }
    };
    window.addEventListener("pointerdown", handlePointerDown);
    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  const sharedProps = {
    revealedId,
    setRevealedId,
    hoveredCardId,
    setHoveredCardId,
  } as const;

  return (
    <section
      ref={sectionRef}
      id="designs"
      className="mx-auto w-full max-w-[1440px] bg-[#FAFAFA] px-4 py-20 sm:px-10 sm:py-[108px] lg:px-[60px] lg:py-[124px]"
    >
      <SectionFeatureHeaderMotionRow isDimmed={isGlobalFocus}>
        <SectionFeatureHeaderTitleBlock
          title="Featured Designs"
          description="Selected products I've designed, from launched platforms to ongoing builds."
        />
        <SectionFeatureHeaderDesktopCta href={FALLBACK_ERROR_ROUTE} target="_blank">
          See All Designs
        </SectionFeatureHeaderDesktopCta>
      </SectionFeatureHeaderMotionRow>

      <div className="relative">
        <motion.div
          className="pointer-events-none absolute inset-0 z-10 rounded-[20px] bg-white"
          initial={false}
          animate={{ opacity: 0 }}
          transition={{ duration: PREMIUM_DURATION, ease: PREMIUM_EASE }}
        />
        <div className="grid gap-[24px] lg:grid-cols-2">
          <FeaturedDesignCard
            card={featuredCards[0]}
            activeArrowId={activeArrowId}
            onArrowHoverStart={onArrowHoverStart}
            onArrowHoverEnd={onArrowHoverEnd}
            {...sharedProps}
          />
          <div className="grid gap-[24px] md:grid-cols-2">
            <FeaturedDesignCard
              card={featuredCards[1]}
              activeArrowId={activeArrowId}
              onArrowHoverStart={onArrowHoverStart}
              onArrowHoverEnd={onArrowHoverEnd}
              {...sharedProps}
            />
            <FeaturedDesignCard
              card={featuredCards[2]}
              activeArrowId={activeArrowId}
              onArrowHoverStart={onArrowHoverStart}
              onArrowHoverEnd={onArrowHoverEnd}
              {...sharedProps}
            />
          </div>
        </div>
      </div>

      <SectionFeatureHeaderMobileCta href={FALLBACK_ERROR_ROUTE} target="_blank">
        See All Designs
      </SectionFeatureHeaderMobileCta>
    </section>
  );
}

function FeaturedDesignCard({
  card,
  activeArrowId,
  onArrowHoverStart,
  onArrowHoverEnd,
  revealedId,
  setRevealedId,
  hoveredCardId,
  setHoveredCardId,
}: {
  card: FeaturedCard;
  activeArrowId: string | null;
  onArrowHoverStart: (id: string) => void;
  onArrowHoverEnd: (id: string) => void;
  revealedId: FeaturedCard["id"] | null;
  setRevealedId: (id: FeaturedCard["id"] | null) => void;
  hoveredCardId: FeaturedCard["id"] | null;
  setHoveredCardId: (id: FeaturedCard["id"] | null) => void;
}) {
  const isRevealed = revealedId === card.id;
  const isMockupHovered = hoveredCardId === card.id;
  const { ref: cardRef, isActive: isMobileRevealActive } = useScrollRevealActive<HTMLElement>(0.45);
  const isHoverState = isMockupHovered || isMobileRevealActive;
  const isRevealState = isRevealed || isMobileRevealActive;
  const cardArrowId = `design-${card.id}`;
  const isGlobalDimmed = activeArrowId !== null && activeArrowId !== cardArrowId;

  return (
    <motion.article
      ref={cardRef}
      className={cn(
        "relative lg:h-[444px]",
        isRevealState ? "h-[512px]" : "h-[444px]",
      )}
      initial={false}
      animate={getGlobalFocusMotionAnimate(isGlobalDimmed)}
      transition={{ duration: PREMIUM_DURATION, ease: PREMIUM_EASE }}
      style={{ zIndex: isRevealState ? 30 : 20 }}
      onMouseEnter={() => setHoveredCardId(card.id)}
      onMouseLeave={() => {
        setHoveredCardId(null);
        setRevealedId(null);
      }}
    >
      <div className="relative h-[444px] w-full overflow-hidden rounded-[20px] bg-[#F2F2F2]">
        <motion.div
          className={cn(
            "relative h-full w-full",
            card.id === "bpr" || card.id === "sfast" ? "px-0 py-0" : "px-10 py-6",
          )}
          initial={false}
          animate={{
            scale: isHoverState ? 1.012 : 1,
            y: isHoverState ? -2 : 0,
          }}
          transition={{ duration: 0.44, ease: PREMIUM_EASE }}
        >
          {card.id === "bpr" && <BPRMockup hovered={isHoverState} />}
          {card.id === "sfast" && <SFASTMockup hovered={isHoverState} />}
          {card.id === "personal" && <PersonalMockup hovered={isHoverState} />}
        </motion.div>

        <button
          type="button"
          aria-label={`${card.title} details`}
          className="absolute bottom-4 left-4 z-30 flex h-8 w-8 items-center justify-center rounded-full bg-[#FAFAFA] shadow-[0_0_0_1px_rgba(0,0,0,0.06)] transition-shadow duration-300 hover:shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_0_50px_rgba(0,0,0,0.1)]"
          style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
          onMouseEnter={() => {
            setRevealedId(card.id);
            onArrowHoverStart(cardArrowId);
          }}
          onMouseLeave={() => {
            setRevealedId(null);
            onArrowHoverEnd(cardArrowId);
          }}
          onFocus={() => {
            setRevealedId(card.id);
            onArrowHoverStart(cardArrowId);
          }}
          onBlur={() => {
            setRevealedId(null);
            onArrowHoverEnd(cardArrowId);
          }}
          onClick={(event) => {
            event.stopPropagation();
            window.open(card.href, "_blank", "noopener,noreferrer");
          }}
        >
          <ArrowIcon hover={isRevealState} />
        </button>
      </div>

      <motion.div
        className="pointer-events-none mt-4 lg:absolute lg:left-0 lg:top-[460px] lg:mt-0"
        initial={false}
        animate={{ opacity: isRevealState ? 1 : 0, y: isRevealState ? 0 : 8 }}
        transition={{ duration: 0.36, ease: PREMIUM_EASE, delay: isRevealState ? 0.2 : 0 }}
      >
        <div className="mb-[6px] flex flex-wrap items-center gap-2">
          <h3 className="text-[20px] leading-[30px] tracking-[-1px] text-black">{card.title}</h3>
          <span className="inline-flex items-center gap-2 rounded-[8px] border border-[#DEDEE0] bg-[#F2F2F2] px-3 py-[3px] text-base leading-6 text-black">
            <motion.span
              className="inline-block h-2 w-2 rounded-full bg-[#14C95D]"
              animate={{ opacity: [0.35, 1, 0.35], scale: [0.92, 1.08, 0.92] }}
              transition={{ duration: 1.9, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
            Live
          </span>
        </div>
        <p className="text-base leading-6 text-[#707070]">{card.subtitle}</p>
      </motion.div>
    </motion.article>
  );
}

function BPRMockup({ hovered }: { hovered: boolean }) {
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
          alt="BPR Platform"
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

function SFASTMockup({ hovered }: { hovered: boolean }) {
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

function PersonalMockup({ hovered }: { hovered: boolean }) {
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

function FooterSection() {
  return (
    <footer className="w-full bg-[#F2F2F2]">
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
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: string }) {
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
      <motion.span
        className="absolute right-0 bottom-0 left-0 h-px bg-[#141414]"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        style={{ originX: 0 }}
      />
    </Link>
  );
}

export function Homepage() {
  const [activeArrowId, setActiveArrowId] = useState<string | null>(null);
  const isGlobalArrowFocus = activeArrowId !== null;
  const handleArrowHoverStart = useCallback((id: string) => {
    setActiveArrowId(id);
  }, []);
  const handleArrowHoverEnd = useCallback((id: string) => {
    setActiveArrowId((prev) => (prev === id ? null : prev));
  }, []);

  return (
    <div className="bg-[#FAFAFA] text-black">
      <FloatingNavbar />
      <main className="flex flex-col">
        <HeroSection
          activeArrowId={activeArrowId}
          onArrowHoverStart={handleArrowHoverStart}
          onArrowHoverEnd={handleArrowHoverEnd}
        />
        <AboutSection
          activeArrowId={activeArrowId}
          onArrowHoverStart={handleArrowHoverStart}
          onArrowHoverEnd={handleArrowHoverEnd}
        />
        <FeaturedDesignsSection
          activeArrowId={activeArrowId}
          onArrowHoverStart={handleArrowHoverStart}
          onArrowHoverEnd={handleArrowHoverEnd}
        />
      </main>
      <motion.div
        initial={false}
        animate={getGlobalFocusMotionAnimate(isGlobalArrowFocus)}
        transition={{ duration: PREMIUM_DURATION, ease: PREMIUM_EASE }}
      >
        <FooterSection />
      </motion.div>
    </div>
  );
}

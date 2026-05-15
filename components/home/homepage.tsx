"use client";

import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import { cn } from "@/lib/cn";
import { AboutToolsCard } from "@/components/shared/about-tools-card";
import { PUBLIC_BRAND, PUBLIC_HOME_MARQUEE, SFAST_APP_STORE_HREF } from "@/lib/public-assets";
import {
  ArrowRevealButton,
  ArrowRevealText,
  getGlobalFocusMotionAnimate,
  getGlobalFocusStyle,
} from "@/components/shared/arrow-reveal";
import { HOME_FEATURED_CARDS, type HomeFeaturedCardId } from "@/components/shared/featured-design-card";
import {
  SectionFeatureHeaderDesktopCta,
  SectionFeatureHeaderMobileCta,
  SectionFeatureHeaderMotionRow,
  SectionFeatureHeaderTitleBlock,
} from "@/components/shared/section-feature-header";
import { ExternalUnderlineLink } from "@/components/shared/external-underline-link";
import { useIsMobileViewport } from "@/lib/use-is-mobile-viewport";

const HomeFeaturedDesignCard = dynamic(
  () => import("@/components/shared/featured-design-card").then((module) => module.HomeFeaturedDesignCard),
);

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
  /** Figma Variant 1 mockup layer size (px), fixed display box. */
  mockupWidth?: number;
  mockupHeight?: number;
};

const FALLBACK_ERROR_ROUTE = "/not-found";
const ALL_DESIGNS_ROUTE = "/designs";

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
    defaultImageUrl: PUBLIC_HOME_MARQUEE.b2bMockup,
    mockupWidth: 282,
    mockupHeight: 216,
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
    defaultImageUrl: PUBLIC_HOME_MARQUEE.comproMockup,
    mockupWidth: 282,
    mockupHeight: 195,
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
    href: SFAST_APP_STORE_HREF,
    kind: "mockup",
    defaultCardBg: "#73B8FF",
    defaultImageUrl: PUBLIC_HOME_MARQUEE.tradingMockup,
    mockupWidth: 206,
    mockupHeight: 332,
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
    defaultImageUrl: PUBLIC_HOME_MARQUEE.ewalletMockup,
    mockupWidth: 174,
    mockupHeight: 352,
  },
];

/** LCP candidate on homepage PSI runs (Surya Fajar Capital mockup). */
const LCP_MARQUEE_IMAGE_KEY = "compro-mockup";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Designs", href: "/designs" },
];

const instagramLinks = {
  sfast: "https://www.instagram.com/sfast.official/",
  dipay: "https://www.instagram.com/dipayindonesia/",
  bpr: "https://www.instagram.com/bpr_qaya/",
  cimb: "https://www.instagram.com/cimb_niaga/",
  brin: "https://www.instagram.com/brin_indonesia/",
};

const PREMIUM_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const PREMIUM_DURATION = 0.32;
const PREMIUM_DELAY = 0.04;

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
              Making Complexity
              <br />
              Feel Simple
            </h1>
            <p className="max-w-[640px] text-base leading-6 text-[#707070]">
              Product designer helping turn business needs and complex systems into digital products that feel
              simple and useful.
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
              Based in Jakarta, IND
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
  const isMobile = useIsMobileViewport();
  const [viewportWidth, setViewportWidth] = useState(0);
  const [isPausedByIcon, setIsPausedByIcon] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const x = useMotionValue(0);

  const loopItems = useMemo(() => [...marqueeItems, ...marqueeItems], []);
  useEffect(() => {
    const updateViewportWidth = () => setViewportWidth(window.innerWidth);
    updateViewportWidth();
    window.addEventListener("resize", updateViewportWidth);
    return () => window.removeEventListener("resize", updateViewportWidth);
  }, []);

  const mobileCardWidth = Math.max(280, viewportWidth - 32);
  const desktopCardWidth = 312;
  const cardWidth = isMobile ? mobileCardWidth : desktopCardWidth;
  const itemFullWidth = cardWidth + 14; // card width + gap
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
              cardWidth={cardWidth}
              imagePriority={item.key === LCP_MARQUEE_IMAGE_KEY}
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
            cardWidth={cardWidth}
            imagePriority={item.key === LCP_MARQUEE_IMAGE_KEY && i < marqueeItems.length}
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

function MarqueeCard({
  item,
  cardWidth = 312,
  isGlobalDimmed = false,
  imagePriority = false,
  onIconHoverStart,
  onIconHoverEnd,
}: {
  item: MarqueeItem;
  cardWidth?: number;
  isGlobalDimmed?: boolean;
  /** First marquee mockup image above the fold — improves mobile LCP when image wins over headline text. */
  imagePriority?: boolean;
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
        "group relative shrink-0 overflow-visible rounded-[20px] transition-all duration-300",
        isMockup ? "h-[278px]" : "h-[210px]",
      )}
      style={{ ...getGlobalFocusStyle(isGlobalDimmed), width: cardWidth }}
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
            {item.defaultImageUrl &&
              item.mockupWidth != null &&
              item.mockupHeight != null && (
                <div className="relative z-10 flex w-full flex-col items-center pt-6">
                  <motion.div
                    className="relative shrink-0 overflow-hidden"
                    initial={false}
                    animate={{ scale: isCardHovered ? 1.02 : 1 }}
                    transition={{ duration: 0.5, ease: PREMIUM_EASE }}
                    style={{
                      width: item.mockupWidth,
                      height: item.mockupHeight,
                      transformOrigin: "50% 0%",
                    }}
                  >
                    <Image
                      src={item.defaultImageUrl}
                      alt={item.title}
                      width={item.mockupWidth}
                      height={item.mockupHeight}
                      sizes={`${item.mockupWidth}px`}
                      priority={imagePriority}
                      draggable={false}
                      className="relative z-10 block h-full w-full object-center max-lg:object-contain lg:object-cover lg:object-top"
                    />
                  </motion.div>
                </div>
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
              window.location.href = ALL_DESIGNS_ROUTE;
            }}
          />
        </div>
      ) : (
        <motion.div
          className="relative h-[210px] overflow-hidden rounded-[20px] p-6 transition-colors duration-300"
          style={{ width: cardWidth, willChange: "background-color" }}
          initial={false}
          animate={{ backgroundColor: isCardHovered ? hoverFillColor : item.defaultCardBg }}
          transition={{ duration: 0.42, ease: PREMIUM_EASE }}
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
      className="mx-auto flex w-full max-w-[1440px] flex-col gap-[40px] bg-[#FAFAFA] px-4 py-20 sm:px-10 sm:py-[108px] lg:flex-row lg:gap-x-10 lg:gap-y-0 lg:px-[60px] lg:py-[124px]"
      style={{ contentVisibility: "auto", containIntrinsicSize: "1px 900px" }}
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
            <ExternalUnderlineLink
              href={instagramLinks.sfast}
              variant="subtle"
              showExternalIcon={false}
              alwaysUnderlineOnMobile
            >
              @sfast.official
            </ExternalUnderlineLink>
            ,{" "}
            <ExternalUnderlineLink
              href={instagramLinks.dipay}
              variant="subtle"
              showExternalIcon={false}
              alwaysUnderlineOnMobile
            >
              @dipayindonesia
            </ExternalUnderlineLink>
            , and{" "}
            <ExternalUnderlineLink
              href={instagramLinks.bpr}
              variant="subtle"
              showExternalIcon={false}
              alwaysUnderlineOnMobile
            >
              @bpr_qaya
            </ExternalUnderlineLink>
            <br />
            Previously{" "}
            <ExternalUnderlineLink
              href={instagramLinks.cimb}
              variant="subtle"
              showExternalIcon={false}
              alwaysUnderlineOnMobile
            >
              @cimb_niaga
            </ExternalUnderlineLink>{" "}
            &amp;{" "}
            <ExternalUnderlineLink
              href={instagramLinks.brin}
              variant="subtle"
              showExternalIcon={false}
              alwaysUnderlineOnMobile
            >
              @brin_indonesia
            </ExternalUnderlineLink>
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
        articleClassName="mx-auto"
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
  const [revealedId, setRevealedId] = useState<HomeFeaturedCardId | null>(null);
  const [hoveredCardId, setHoveredCardId] = useState<HomeFeaturedCardId | null>(null);
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
      style={{ contentVisibility: "auto", containIntrinsicSize: "1px 960px" }}
    >
      <SectionFeatureHeaderMotionRow isDimmed={isGlobalFocus}>
        <SectionFeatureHeaderTitleBlock
          title="Featured Designs"
          description="Selected products I've designed, from launched platforms to ongoing builds."
        />
        <SectionFeatureHeaderDesktopCta href="/designs">
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
          <HomeFeaturedDesignCard
            card={HOME_FEATURED_CARDS[0]}
            activeArrowId={activeArrowId}
            onArrowHoverStart={onArrowHoverStart}
            onArrowHoverEnd={onArrowHoverEnd}
            {...sharedProps}
          />
          <div className="grid gap-[24px] md:grid-cols-2">
            <HomeFeaturedDesignCard
              card={HOME_FEATURED_CARDS[1]}
              activeArrowId={activeArrowId}
              onArrowHoverStart={onArrowHoverStart}
              onArrowHoverEnd={onArrowHoverEnd}
              {...sharedProps}
            />
            <HomeFeaturedDesignCard
              card={HOME_FEATURED_CARDS[2]}
              activeArrowId={activeArrowId}
              onArrowHoverStart={onArrowHoverStart}
              onArrowHoverEnd={onArrowHoverEnd}
              {...sharedProps}
            />
          </div>
        </div>
      </div>

      <SectionFeatureHeaderMobileCta href="/designs">
        See All Designs
      </SectionFeatureHeaderMobileCta>
    </section>
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
    </footer>
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

"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import {
  isToolsDockTourSuppressedForThisLoad,
  markToolsDockTourSuppressedForThisLoad,
} from "@/lib/tools-dock-tour-suppress-until-reload";
import {
  ARROW_REVEAL_EASE,
  ArrowRevealButton,
  ArrowRevealText,
  getGlobalFocusStyle,
} from "@/components/shared/arrow-reveal";
import { ExternalUnderlineLink } from "@/components/shared/external-underline-link";
import {
  SectionFeatureHeaderDesktopCta,
  SectionFeatureHeaderMobileCta,
  SectionFeatureHeaderStaticRow,
  SectionFeatureHeaderTitleBlock,
} from "@/components/shared/section-feature-header";
import { PUBLIC_ABOUT, PUBLIC_BRAND, PUBLIC_CREATIVE_JOURNAL, PUBLIC_HOME_DOCK } from "@/lib/public-assets";
import { useIsMobileViewport } from "@/lib/use-is-mobile-viewport";
import { useScrollRevealActive } from "@/lib/use-scroll-reveal-active";

const ArrowAdvanceGalleryCard = dynamic(
  () => import("@/components/shared/arrow-advance-gallery-card").then((module) => module.ArrowAdvanceGalleryCard),
);

const PublicationHoverGalleryCard = dynamic(
  () =>
    import("@/components/shared/publication-hover-gallery-card").then(
      (module) => module.PublicationHoverGalleryCard,
    ),
);

const FALLBACK_ERROR_ROUTE = "/not-found";
const dockApps = [
  { name: "Figma", icon: PUBLIC_HOME_DOCK.figma },
  { name: "Cursor", icon: PUBLIC_HOME_DOCK.cursor },
  { name: "Affinity", icon: PUBLIC_HOME_DOCK.affinity },
  { name: "Github Desktop", icon: PUBLIC_HOME_DOCK.githubDesktop },
  { name: "Notion", icon: PUBLIC_HOME_DOCK.notion },
  { name: "Framer", icon: PUBLIC_HOME_DOCK.framer },
  { name: "Spotify", icon: PUBLIC_HOME_DOCK.spotify },
  { name: "WhatsApp", icon: PUBLIC_HOME_DOCK.whatsapp },
  { name: "Finder", icon: PUBLIC_HOME_DOCK.finder },
  { name: "Trash", icon: PUBLIC_HOME_DOCK.trash },
] as const;

const experienceItems = [
  { logo: "https://www.figma.com/api/mcp/asset/50d1c82a-d05c-4f80-a163-0e1c00ba3c90", title: "Product Designer", company: "SF Sekuritas", date: "Dec 2021 - Present", href: "https://www.instagram.com/sfast.official/" },
  { logo: "https://www.figma.com/api/mcp/asset/59273ef0-1816-43f7-a41f-863d190682e6", title: "Product Specialist", company: "CIMB Niaga", date: "Mar 2020 - Dec 2021", href: "https://www.instagram.com/cimb_niaga/" },
  { logo: "https://www.figma.com/api/mcp/asset/680de076-0449-4758-9635-c27db1c4b250", title: "Graphic Designer", company: "Ristek-BRIN", date: "Apr 2018 - Mar 2020", href: "https://www.instagram.com/brin_indonesia/" },
] as const;

type CertificationItem = {
  logo: string;
  title: string;
  org: string;
  date: string;
  href: string;
  fullWidth?: boolean;
};

const certificationItems: CertificationItem[] = [
  { logo: "https://www.figma.com/api/mcp/asset/3dca2474-52eb-49c4-bcac-87eead56e79c", title: "Legacy Responsive Web Design V8", org: "freeCodeCamp", date: "Oct 2025", href: "https://freecodecamp.org/certification/haekalnast/responsive-web-design" },
  { logo: "https://www.figma.com/api/mcp/asset/c9973cc3-6979-46ee-ba11-582a15f12af7", title: "HTML & CSS", org: "Progate", date: "Jan 2024", href: "https://progate.com/course_certificate/a0856e8as6ubxv" },
  { logo: "https://www.figma.com/api/mcp/asset/b4777a9f-fdbf-4823-996a-e4003e6a8b49", title: "English Certificate (C1 Advanced)", org: "EF SET", date: "Jul 2023", href: "https://www.efset.org/cert/WnJ5op" },
  { logo: "https://www.figma.com/api/mcp/asset/4c174135-2b11-4241-b413-358822deca9f", title: "Training Awareness Based on ISO27001:2022", org: "ISO", date: "Jul 2023", href: "https://madhava.id/verifikasi-sertifikat/" },
  { logo: "https://www.figma.com/api/mcp/asset/3aaaa0bb-3254-45c5-b67e-c1236d0b9b84", title: "101 Crash Course", org: "Protopie", date: "Apr 2023", href: "https://docs.google.com/gview?embedded=1&url=https%3A%2F%2Fmycourse.app%2FWkgsKhjJXoBgn5rL8" },
  { logo: "https://www.figma.com/api/mcp/asset/81d63956-c47f-41f8-b548-829cdd0d7f3b", title: "Enterprise Design Thinking Co-Creator", org: "IBM", date: "Sep 2022", href: "https://www.credly.com/badges/83d95043-8a50-4be8-a05c-a282399c0d38/linked_in_profile" },
  { logo: "https://www.figma.com/api/mcp/asset/81d63956-c47f-41f8-b548-829cdd0d7f3b", title: "Enterprise Design Thinking Practitioner", org: "IBM", date: "Aug 2022", href: "https://www.credly.com/badges/02ff6615-201b-4e4c-9e80-94758a0e681e/linked_in_profile", fullWidth: true },
];

/** Creative Journal mockups — `public/creative-journal/` via `lib/public-assets.ts`. */
const JOURNAL_ASSETS = {
  publication: PUBLIC_CREATIVE_JOURNAL.publication,
  collateralSlides: PUBLIC_CREATIVE_JOURNAL.collateralSlides,
  packagingSlides: PUBLIC_CREATIVE_JOURNAL.packagingSlides,
  campaign: PUBLIC_CREATIVE_JOURNAL.campaign,
} as const;

function LogoMark() {
  return (
    <Link href="/" aria-label="Go to home" className="group relative block h-[27px] w-[124px]">
      <Image src={PUBLIC_BRAND.logoDefault} alt="Haekal" width={124} height={27} className="absolute inset-0 h-full w-full opacity-100 transition-opacity duration-200 group-hover:opacity-0" />
      <Image src={PUBLIC_BRAND.logoHover} alt="Haekal" width={124} height={27} className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
    </Link>
  );
}

function ArrowButton() {
  return (
    <div className="bg-[#FAFAFA] p-[6px] rounded-[1000px] shadow-[0_0_0_1px_rgba(0,0,0,0.06)]">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M14.3763 12.7083V5.625H7.29297" stroke="#707070" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14.1667 5.83203L5.625 14.3737" stroke="#707070" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
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
      className="relative h-[398px] w-full transition-all duration-300 lg:h-[324px] lg:w-[648px]"
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
                const hoverable = index <= 2;
                return (
                  <div key={`mobile-${app.name}`} className="relative" onMouseEnter={hoverable ? () => setHoveredApp(app.name) : undefined} onMouseLeave={hoverable ? () => setHoveredApp(null) : undefined}>
                    <motion.img
                      src={app.icon}
                      alt={app.name}
                      width={66}
                      height={66}
                      className="h-[66px] w-[66px] shrink-0 object-cover"
                      animate={hoverable && activeTooltipName === app.name ? { y: -4, scale: 1.08 } : { y: 0, scale: 1 }}
                      transition={{ duration: 0.32, ease: ARROW_REVEAL_EASE }}
                    />
                    {hoverable && (
                      <motion.div
                        className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#5A5A5A] px-3 py-1 text-sm text-white"
                        initial={false}
                        animate={activeTooltipName === app.name ? { opacity: 1, y: 0, visibility: "visible" as const } : { opacity: 0, y: 8, visibility: "hidden" as const }}
                        transition={{ duration: 0.32, ease: ARROW_REVEAL_EASE }}
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
                const hoverable = index <= 6;
                return (
                  <div key={`desktop-${app.name}`} className="relative" onMouseEnter={hoverable ? () => setHoveredApp(app.name) : undefined} onMouseLeave={hoverable ? () => setHoveredApp(null) : undefined}>
                    <motion.img src={app.icon} alt={app.name} width={66} height={66} className="h-[66px] w-[66px] shrink-0 object-cover" whileHover={hoverable ? { scale: 1.12, y: -4 } : undefined} transition={{ type: "spring", stiffness: 280, damping: 20 }} />
                    {hoverable && activeTooltipName === app.name && (
                      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.18, ease: "easeOut" }} className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#5A5A5A] px-3 py-1 text-sm text-white">
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
          }}
        />
      </div>
      <ArrowRevealText isActive={isDetailsActive} title="Tools I Use" subtitle="The stack behind my work" className="pointer-events-none absolute left-0 top-[332px] z-30 w-full bg-[#FAFAFA]" />
    </article>
  );
}

function ResumeCard({
  onArrowHoverStart,
  onArrowHoverEnd,
}: {
  onArrowHoverStart: () => void;
  onArrowHoverEnd: () => void;
}) {
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [isIconHovered, setIsIconHovered] = useState(false);
  const { ref, isActive } = useScrollRevealActive<HTMLElement>(0.45);
  const isMockupHover = isCardHovered || isActive;
  const isTextHover = isIconHovered || isActive;

  return (
    <article
      ref={ref}
      className="relative h-[278px] w-full shrink-0 overflow-visible rounded-[20px] sm:w-[348px] lg:w-[312px]"
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => {
        setIsCardHovered(false);
        setIsIconHovered(false);
      }}
    >
      <div className="absolute inset-x-0 top-0 h-[210px] overflow-hidden rounded-[20px] bg-[#F2F2F2]">
        <div className="relative h-full overflow-hidden">
          <motion.div
            className="absolute left-1/2 top-[42px] h-[396px] w-[280px] -translate-x-1/2 overflow-hidden rounded-[4px] shadow-[0_0_50px_rgba(0,0,0,0.06)]"
            initial={false}
            animate={{ rotate: isMockupHover ? 0 : -8, scale: isMockupHover ? 1.06 : 1, x: isMockupHover ? 0 : 9, y: isMockupHover ? -6 : 2 }}
            transition={{
              duration: 0.44,
              ease: ARROW_REVEAL_EASE,
              scale: {
                duration: 0.34,
                ease: ARROW_REVEAL_EASE,
                delay: isMockupHover ? 0.14 : 0,
              },
            }}
            style={{ transformOrigin: "50% 0%" }}
          >
            <Image src={PUBLIC_ABOUT.resumeSheet} alt="Resume preview" fill className="object-cover" />
          </motion.div>
        </div>
        <ArrowRevealButton
          isActive={isTextHover}
          ariaLabel="Resume details"
          className={`absolute bottom-4 left-4 z-20 flex h-8 w-8 items-center justify-center rounded-[1000px] bg-[#FAFAFA] p-[6px] shadow-[0_0_0_1px_rgba(0,0,0,0.06)] transition-all duration-300 ${isTextHover ? "scale-105 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_0_50px_rgba(0,0,0,0.12)]" : ""}`}
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
      <ArrowRevealText isActive={isTextHover} title="Resume" subtitle="See details" className="pointer-events-none absolute left-0 top-[218px]" />
    </article>
  );
}

function ThisIsHaekalCard({
  onArrowHoverStart,
  onArrowHoverEnd,
}: {
  onArrowHoverStart: () => void;
  onArrowHoverEnd: () => void;
}) {
  return (
    <ArrowAdvanceGalleryCard
      images={PUBLIC_ABOUT.thisIsHaekalPhotos}
      title="This is Haekal"
      subtitle="Get to know me"
      imageAlt="This is Haekal"
      arrowAriaLabel="This is Haekal details"
      layout="haekal"
      priority
      onArrowHoverStart={onArrowHoverStart}
      onArrowHoverEnd={onArrowHoverEnd}
    />
  );
}

export default function AboutPage() {
  const isMobile = useIsMobileViewport();
  const [activeArrowId, setActiveArrowId] = useState<string | null>(null);
  const aboutArrowId = "about-tools";
  const resumeArrowId = "about-resume";
  const thisIsHaekalArrowId = "about-this-is-haekal";
  const publicationArrowId = "journal-publication";
  const collateralArrowId = "journal-collateral";
  const packagingArrowId = "journal-packaging";
  const campaignArrowId = "journal-campaign";
  const isGlobalFocus = activeArrowId !== null;
  const isAboutFocused = activeArrowId === aboutArrowId;
  const isResumeFocused = activeArrowId === resumeArrowId;
  const isThisIsHaekalFocused = activeArrowId === thisIsHaekalArrowId;
  const isMobileNoDim = isMobile;
  const isTextDimmed = !isMobileNoDim && isGlobalFocus;
  const isAboutDimmed = !isMobileNoDim && isGlobalFocus && !isAboutFocused;
  const isResumeDimmed = !isMobileNoDim && isGlobalFocus && !isResumeFocused;
  const isThisIsHaekalDimmed = !isMobileNoDim && isGlobalFocus && !isThisIsHaekalFocused;
  /** Dims content below the hero (and journal header) when any arrow is focused — matches home “global focus” feel; navbar stays full opacity. */
  const isRestOfPageDimmed = !isMobileNoDim && isGlobalFocus;
  const isJournalHeaderDimmed = isRestOfPageDimmed;

  return (
    <div className="bg-[#FAFAFA] text-black">
      <header className="pointer-events-none fixed inset-x-0 top-6 z-40 hidden px-10 sm:block lg:px-[60px]">
        <div className="pointer-events-auto mx-auto flex h-14 w-full max-w-[1320px] items-center justify-between">
          <LogoMark />
          <nav aria-label="Primary navigation" className="flex items-center rounded-[56px] border border-black/10 bg-white/80 p-[5px] shadow-[0_10px_10px_-5px_rgba(0,0,0,0.10)] backdrop-blur-[8px]">
            <Link href="/" className="flex h-[46px] w-[84px] items-center justify-center rounded-[230px] text-center text-base leading-[21px] text-[#707070] hover:bg-[#F2F2F2]">Home</Link>
            <Link href="/about" className="flex h-[46px] w-[84px] items-center justify-center rounded-[230px] bg-[#F2F2F2] text-center text-base leading-[21px] text-black">About</Link>
            <Link href="/designs" className="flex h-[46px] w-[84px] items-center justify-center rounded-[230px] text-center text-base leading-[21px] text-[#707070] hover:bg-[#F2F2F2]">Designs</Link>
          </nav>
          <Link href="mailto:alhaekalnast@gmail.com" className="rounded-[230px] bg-[#F2F2F2] px-6 py-3 text-base leading-[21px] text-[#707070]">Let&apos;s Talk</Link>
        </div>
      </header>

      <header className="pointer-events-none fixed inset-x-0 top-6 z-40 px-4 sm:hidden">
        <div className="pointer-events-auto mx-auto flex h-[46px] w-full items-center justify-between">
          <LogoMark />
          <Link href="mailto:alhaekalnast@gmail.com" className="rounded-[230px] bg-[#F2F2F2] px-6 py-3 text-base leading-[21px] text-[#707070]">Let&apos;s Talk</Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1440px] px-4 pt-[124px] sm:px-10 lg:px-[60px]">
        <section className="grid gap-10 py-10 lg:grid-cols-[1fr_648px] lg:py-14">
          <div className="space-y-4 transition-all duration-300" style={getGlobalFocusStyle(isTextDimmed)}>
            <h1 className="text-[26px] leading-[32px] tracking-[-1px] text-black lg:text-[40px] lg:leading-[56px]">
              About Haekal
            </h1>
            <p className="max-w-[632px] text-base leading-6 text-[#707070]">I&apos;m Haekal, a product designer with 4+ years of experience building digital products across trading, payments, and B2B systems.</p>
            <p className="max-w-[632px] text-base leading-6 text-[#707070]">I work closely with product and engineering to simplify complex flows into clear and usable experiences.</p>
            <p className="max-w-[632px] text-base leading-6 text-[#707070]">Before product design, my background was in visual communication and marketing, which shaped how I think about clarity, storytelling, and communication.</p>
            <p className="max-w-[632px] text-base leading-6 text-[#707070]">More of a quiet builder. I think, structure, and iterate. Recently exploring how design decisions turn to implementation.</p>
          </div>

          <div className="space-y-6">
            <AboutToolsCard
              isGlobalDimmed={isAboutDimmed}
              onArrowHoverStart={() => setActiveArrowId(aboutArrowId)}
              onArrowHoverEnd={() => setActiveArrowId((current) => (current === aboutArrowId ? null : current))}
            />

            <div className="relative z-10 grid gap-6 sm:grid-cols-2">
              <div className="order-2 transition-all duration-300 sm:order-1" style={getGlobalFocusStyle(isResumeDimmed)}>
                <ResumeCard
                  onArrowHoverStart={() => setActiveArrowId(resumeArrowId)}
                  onArrowHoverEnd={() => setActiveArrowId((current) => (current === resumeArrowId ? null : current))}
                />
              </div>
              <div
                className="relative z-20 order-1 transition-all duration-300 sm:order-2"
                style={getGlobalFocusStyle(isThisIsHaekalDimmed)}
              >
                <ThisIsHaekalCard
                  onArrowHoverStart={() => setActiveArrowId(thisIsHaekalArrowId)}
                  onArrowHoverEnd={() => setActiveArrowId((current) => (current === thisIsHaekalArrowId ? null : current))}
                />
              </div>
            </div>
          </div>
        </section>

        <div className="transition-all duration-300">
          <div className="flex flex-col gap-12 py-[64px] transition-all duration-300" style={getGlobalFocusStyle(isRestOfPageDimmed)}>
            <section className="flex flex-col gap-10 lg:gap-12">
              <div className="space-y-4">
                <h2 className="text-[26px] leading-[32px] tracking-[-1px] lg:text-[32px] lg:leading-[40px]">Experience</h2>
                <p className="text-base leading-6 tracking-[0px] text-[#666666]">From communication and design to product and digital systems.</p>
              </div>
              <div className="grid gap-6 lg:grid-cols-3">
                {experienceItems.map((item) => (
                  <article key={item.title} className="group relative flex items-center gap-2 rounded-[16px] bg-[#F2F2F2] p-2 transition-[background-color,transform] duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform hover:-translate-y-[1px] hover:scale-[1.01] hover:bg-white active:translate-y-0 active:scale-[0.995]">
                    <span className="pointer-events-none absolute inset-0 rounded-[16px] opacity-0 shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_6px_16px_rgba(0,0,0,0.06)] transition-opacity duration-[240ms] delay-[60ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100" />
                    <div className="relative h-[50px] w-[50px] overflow-hidden rounded-[12px] bg-white transition-[background-color] duration-[260ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:bg-[#FAFAFA]">
                      <Image src={item.logo} alt={item.company} fill unoptimized className="object-contain" />
                    </div>
                    <div>
                      <p className="text-[18px] leading-[20px] tracking-[-1px] text-black lg:text-[20px] lg:leading-[24px]">{item.title}</p>
                      <p className="text-base leading-6 tracking-[0px] text-[#666666]">{item.company} | {item.date}</p>
                    </div>
                    <Link href={item.href} target="_blank" rel="noreferrer noopener" className="absolute inset-0 z-10 rounded-[16px]" aria-label={`${item.title} details`} />
                  </article>
                ))}
              </div>
            </section>

            <div className="h-px w-full bg-[#DEDEE0]" aria-hidden />

            <section className="flex flex-col gap-10 lg:gap-12">
              <div className="space-y-4">
                <h2 className="text-[26px] leading-[32px] tracking-[-1px] lg:text-[32px] lg:leading-[40px]">Learning &amp; Certifications</h2>
                <p className="text-base leading-6 tracking-[0px] text-[#666666]">Covering design, frontend, communication, and security fundamentals.</p>
              </div>
              <div className="grid gap-6 lg:grid-cols-2">
                {certificationItems.map((item) => (
                  <article key={item.title} className={cn(
                    "group relative flex items-center gap-2 rounded-[16px] bg-[#F2F2F2] p-2 transition-[background-color,transform] duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform hover:-translate-y-[1px] hover:scale-[1.01] hover:bg-white active:translate-y-0 active:scale-[0.995]",
                    item.fullWidth ? "lg:col-span-2" : "",
                  )}>
                    <span className="pointer-events-none absolute inset-0 rounded-[16px] opacity-0 shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_6px_16px_rgba(0,0,0,0.06)] transition-opacity duration-[240ms] delay-[60ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100" />
                    <div className="relative h-[50px] w-[50px] overflow-hidden rounded-[12px] bg-white transition-[background-color] duration-[260ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:bg-[#FAFAFA]">
                      <Image src={item.logo} alt={item.org} fill unoptimized className="object-contain" />
                    </div>
                    <div>
                      <p className="text-[18px] leading-[20px] tracking-[-1px] text-black lg:text-[20px] lg:leading-[24px]">{item.title}</p>
                      <p className="text-base leading-6 tracking-[0px] text-[#666666]">{item.org} | {item.date}</p>
                    </div>
                    <Link href={item.href} target="_blank" rel="noreferrer noopener" className="absolute inset-0 z-10 rounded-[16px]" aria-label={`${item.title} details`} />
                  </article>
                ))}
              </div>
            </section>
          </div>

          <section className="relative isolate py-20 sm:py-[108px] lg:py-[124px]">
            <div className="relative z-10">
              <SectionFeatureHeaderStaticRow dimmed={isJournalHeaderDimmed}>
                <SectionFeatureHeaderTitleBlock
                  title="Creative Journal"
                  description="Work from my early years in visual communication, branding, and marketing, shaping how I design today."
                />
              </SectionFeatureHeaderStaticRow>
            </div>

            <div className="relative z-0">
              <div className="hidden gap-[24px] lg:grid lg:grid-cols-2 lg:items-start">
                <PublicationHoverGalleryCard
                  images={JOURNAL_ASSETS.publication}
                  articleClassName="lg:w-[648px]"
                  isDimmed={!isMobile && isGlobalFocus && activeArrowId !== publicationArrowId}
                  onArrowHoverStart={() => setActiveArrowId(publicationArrowId)}
                  onArrowHoverEnd={() => setActiveArrowId((current) => (current === publicationArrowId ? null : current))}
                />
                <div className="flex w-full flex-col gap-[24px]">
                  <div className="grid grid-cols-2 gap-6 lg:relative lg:z-[1]">
                    <ArrowAdvanceGalleryCard
                      images={JOURNAL_ASSETS.collateralSlides}
                      title="Collateral Design"
                      subtitle="Promotional and supporting materials"
                      imageAlt="Collateral Design"
                      arrowAriaLabel="Collateral Design details"
                      layout="journal-short"
                      articleClassName="lg:relative lg:z-[2]"
                      isDimmed={!isMobile && isGlobalFocus && activeArrowId !== collateralArrowId}
                      onArrowHoverStart={() => setActiveArrowId(collateralArrowId)}
                      onArrowHoverEnd={() => setActiveArrowId((current) => (current === collateralArrowId ? null : current))}
                      imageStageClassName="absolute inset-0 flex items-center justify-center px-10 py-6"
                      imageFrameClassName="relative h-[162px] w-[156px]"
                      imageClassName="object-contain"
                    />
                    <ArrowAdvanceGalleryCard
                      images={JOURNAL_ASSETS.packagingSlides}
                      title="Packaging Design"
                      subtitle="Product and brand packaging"
                      imageAlt="Packaging Design"
                      arrowAriaLabel="Packaging Design details"
                      layout="journal-short"
                      articleClassName="lg:relative lg:z-[2]"
                      isDimmed={!isMobile && isGlobalFocus && activeArrowId !== packagingArrowId}
                      onArrowHoverStart={() => setActiveArrowId(packagingArrowId)}
                      onArrowHoverEnd={() => setActiveArrowId((current) => (current === packagingArrowId ? null : current))}
                      imageStageClassName="absolute inset-0 flex items-center justify-center px-10 py-6"
                      imageFrameClassName="relative h-[162px] w-[96px]"
                      imageClassName="object-contain"
                    />
                  </div>
                  <ArrowAdvanceGalleryCard
                    images={JOURNAL_ASSETS.campaign}
                    title="Campaign Design"
                    subtitle="Marketing and communication visuals"
                    imageAlt="Campaign Design"
                    arrowAriaLabel="Campaign Design details"
                    layout="journal-short"
                    articleClassName="lg:relative lg:z-0 lg:-mt-[68px]"
                    isDimmed={!isMobile && isGlobalFocus && activeArrowId !== campaignArrowId}
                    onArrowHoverStart={() => setActiveArrowId(campaignArrowId)}
                    onArrowHoverEnd={() => setActiveArrowId((current) => (current === campaignArrowId ? null : current))}
                  />
                </div>
              </div>

              <div className="hidden gap-[24px] md:grid lg:hidden">
                <PublicationHoverGalleryCard
                  images={JOURNAL_ASSETS.publication}
                  articleClassName="lg:w-[648px]"
                  isDimmed={!isMobile && isGlobalFocus && activeArrowId !== publicationArrowId}
                  onArrowHoverStart={() => setActiveArrowId(publicationArrowId)}
                  onArrowHoverEnd={() => setActiveArrowId((current) => (current === publicationArrowId ? null : current))}
                />
                <div className="flex w-full flex-col gap-6">
                  <div className="grid grid-cols-2 gap-6">
                    <ArrowAdvanceGalleryCard
                      images={JOURNAL_ASSETS.collateralSlides}
                      title="Collateral Design"
                      subtitle="Promotional and supporting materials"
                      imageAlt="Collateral Design"
                      arrowAriaLabel="Collateral Design details"
                      layout="journal-short"
                      isDimmed={!isMobile && isGlobalFocus && activeArrowId !== collateralArrowId}
                      onArrowHoverStart={() => setActiveArrowId(collateralArrowId)}
                      onArrowHoverEnd={() => setActiveArrowId((current) => (current === collateralArrowId ? null : current))}
                      imageStageClassName="absolute inset-0 flex items-center justify-center px-10 py-6"
                      imageFrameClassName="relative h-[162px] w-[156px]"
                      imageClassName="object-contain"
                    />
                    <ArrowAdvanceGalleryCard
                      images={JOURNAL_ASSETS.packagingSlides}
                      title="Packaging Design"
                      subtitle="Product and brand packaging"
                      imageAlt="Packaging Design"
                      arrowAriaLabel="Packaging Design details"
                      layout="journal-short"
                      isDimmed={!isMobile && isGlobalFocus && activeArrowId !== packagingArrowId}
                      onArrowHoverStart={() => setActiveArrowId(packagingArrowId)}
                      onArrowHoverEnd={() => setActiveArrowId((current) => (current === packagingArrowId ? null : current))}
                      imageStageClassName="absolute inset-0 flex items-center justify-center px-10 py-6"
                      imageFrameClassName="relative h-[162px] w-[96px]"
                      imageClassName="object-contain"
                    />
                  </div>
                  <ArrowAdvanceGalleryCard
                    images={JOURNAL_ASSETS.campaign}
                    title="Campaign Design"
                    subtitle="Marketing and communication visuals"
                    imageAlt="Campaign Design"
                    arrowAriaLabel="Campaign Design details"
                    layout="journal-tall"
                    isDimmed={!isMobile && isGlobalFocus && activeArrowId !== campaignArrowId}
                    onArrowHoverStart={() => setActiveArrowId(campaignArrowId)}
                    onArrowHoverEnd={() => setActiveArrowId((current) => (current === campaignArrowId ? null : current))}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-[24px] md:hidden">
                <PublicationHoverGalleryCard
                  images={JOURNAL_ASSETS.publication}
                  isDimmed={false}
                  onArrowHoverStart={() => setActiveArrowId(publicationArrowId)}
                  onArrowHoverEnd={() => setActiveArrowId((current) => (current === publicationArrowId ? null : current))}
                />
                <div className="flex flex-col gap-[24px]">
                  <ArrowAdvanceGalleryCard
                    images={JOURNAL_ASSETS.collateralSlides}
                    title="Collateral Design"
                    subtitle="Promotional and supporting materials"
                    imageAlt="Collateral Design"
                    arrowAriaLabel="Collateral Design details"
                    layout="journal-short"
                    isDimmed={false}
                    onArrowHoverStart={() => setActiveArrowId(collateralArrowId)}
                    onArrowHoverEnd={() => setActiveArrowId((current) => (current === collateralArrowId ? null : current))}
                    imageStageClassName="absolute inset-0 flex items-center justify-center px-10 py-6"
                    imageFrameClassName="relative h-[162px] w-[156px]"
                    imageClassName="object-contain"
                  />
                  <ArrowAdvanceGalleryCard
                    images={JOURNAL_ASSETS.packagingSlides}
                    title="Packaging Design"
                    subtitle="Product and brand packaging"
                    imageAlt="Packaging Design"
                    arrowAriaLabel="Packaging Design details"
                    layout="journal-short"
                    isDimmed={false}
                    onArrowHoverStart={() => setActiveArrowId(packagingArrowId)}
                    onArrowHoverEnd={() => setActiveArrowId((current) => (current === packagingArrowId ? null : current))}
                    imageStageClassName="absolute inset-0 flex items-center justify-center px-10 py-6"
                    imageFrameClassName="relative h-[162px] w-[96px]"
                    imageClassName="object-contain"
                  />
                </div>
                <ArrowAdvanceGalleryCard
                  images={JOURNAL_ASSETS.campaign}
                  title="Campaign Design"
                  subtitle="Marketing and communication visuals"
                  imageAlt="Campaign Design"
                  arrowAriaLabel="Campaign Design details"
                  layout="journal-tall"
                  isDimmed={false}
                  onArrowHoverStart={() => setActiveArrowId(campaignArrowId)}
                  onArrowHoverEnd={() => setActiveArrowId((current) => (current === campaignArrowId ? null : current))}
                />
              </div>
            </div>

          </section>
        </div>
      </main>

      <footer className="w-full bg-[#F2F2F2] transition-all duration-300" style={getGlobalFocusStyle(isRestOfPageDimmed)}>
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-16 px-4 pb-[124px] sm:px-10 lg:px-[60px]">
          <div className="flex flex-col gap-16 py-8 sm:py-20">
            <div className="flex items-start justify-between gap-8 sm:gap-6">
              <LogoMark />
              <nav className="flex flex-col items-end gap-6 text-base leading-6 text-black sm:flex-row sm:items-center sm:gap-6">
                <ExternalUnderlineLink href="https://docs.google.com/document/d/1rFAuSJrV4IpffI2PRfBmjHlHG5QDDF6L/edit?usp=sharing&ouid=107776713613949709441&rtpof=true&sd=true">Resume</ExternalUnderlineLink>
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

      <div className="pointer-events-none fixed inset-x-0 bottom-6 z-40 px-4 sm:hidden">
        <nav aria-label="Mobile navigation" className="pointer-events-auto mx-auto flex w-fit items-center rounded-[56px] border border-black/10 bg-white/80 p-[5px] shadow-[0_10px_10px_-5px_rgba(0,0,0,0.10)] backdrop-blur-[8px]">
          <Link href="/" className="flex h-[46px] w-[84px] items-center justify-center rounded-[230px] text-base leading-[21px] text-[#707070]">Home</Link>
          <Link href="/about" className="flex h-[46px] w-[84px] items-center justify-center rounded-[230px] bg-[#F2F2F2] text-base leading-[21px] text-black">About</Link>
          <Link href="/designs" className="flex h-[46px] w-[84px] items-center justify-center rounded-[230px] text-base leading-[21px] text-[#707070]">Designs</Link>
        </nav>
      </div>
    </div>
  );
}


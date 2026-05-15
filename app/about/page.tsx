"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { AboutToolsCard } from "@/components/shared/about-tools-card";
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
import {
  PUBLIC_ABOUT,
  PUBLIC_ABOUT_CERTIFICATION,
  PUBLIC_ABOUT_EXPERIENCE,
  PUBLIC_BRAND,
  PUBLIC_CREATIVE_JOURNAL,
} from "@/lib/public-assets";
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

const experienceItems = [
  { logo: PUBLIC_ABOUT_EXPERIENCE.sfSekuritas, title: "Product Designer", company: "SF Sekuritas", date: "Dec 2021 - Present", href: "https://www.instagram.com/sfast.official/" },
  { logo: PUBLIC_ABOUT_EXPERIENCE.cimbNiaga, title: "Product Specialist", company: "CIMB Niaga", date: "Mar 2020 - Dec 2021", href: "https://www.instagram.com/cimb_niaga/" },
  { logo: PUBLIC_ABOUT_EXPERIENCE.ristekBrin, title: "Graphic Designer", company: "Ristek-BRIN", date: "Apr 2018 - Mar 2020", href: "https://www.instagram.com/brin_indonesia/" },
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
  { logo: PUBLIC_ABOUT_CERTIFICATION.freecodecamp, title: "Legacy Responsive Web Design V8", org: "freeCodeCamp", date: "Oct 2025", href: "https://freecodecamp.org/certification/haekalnast/responsive-web-design" },
  { logo: PUBLIC_ABOUT_CERTIFICATION.progate, title: "HTML & CSS", org: "Progate", date: "Jan 2024", href: "https://progate.com/course_certificate/a0856e8as6ubxv" },
  { logo: PUBLIC_ABOUT_CERTIFICATION.efset, title: "English Certificate (C1 Advanced)", org: "EF SET", date: "Jul 2023", href: "https://www.efset.org/cert/WnJ5op" },
  { logo: PUBLIC_ABOUT_CERTIFICATION.iso, title: "Training Awareness Based on ISO27001:2022", org: "ISO", date: "Jul 2023", href: "https://madhava.id/verifikasi-sertifikat/" },
  { logo: PUBLIC_ABOUT_CERTIFICATION.protopie, title: "101 Crash Course", org: "Protopie", date: "Apr 2023", href: "https://docs.google.com/gview?embedded=1&url=https%3A%2F%2Fmycourse.app%2FWkgsKhjJXoBgn5rL8" },
  { logo: PUBLIC_ABOUT_CERTIFICATION.ibm, title: "Enterprise Design Thinking Co-Creator", org: "IBM", date: "Sep 2022", href: "https://www.credly.com/badges/83d95043-8a50-4be8-a05c-a282399c0d38/linked_in_profile" },
  { logo: PUBLIC_ABOUT_CERTIFICATION.ibm, title: "Enterprise Design Thinking Practitioner", org: "IBM", date: "Aug 2022", href: "https://www.credly.com/badges/02ff6615-201b-4e4c-9e80-94758a0e681e/linked_in_profile", fullWidth: true },
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

function ResumeCard({
  onArrowHoverStart,
  onArrowHoverEnd,
}: {
  onArrowHoverStart: () => void;
  onArrowHoverEnd: () => void;
}) {
  const isMobile = useIsMobileViewport();
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [isIconHovered, setIsIconHovered] = useState(false);
  const { ref, isActive } = useScrollRevealActive<HTMLElement>(0.45);
  const isMockupHover = isCardHovered || isActive;
  const isTextHover = isIconHovered || isActive;

  return (
    <article
      ref={ref}
      className="relative h-[278px] w-full shrink-0 overflow-visible rounded-[20px]"
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
      <ArrowRevealText
        isActive={isTextHover}
        title="Resume"
        subtitle="See details"
        className="absolute left-0 top-[218px] max-md:pointer-events-auto md:pointer-events-none"
        onTextClick={isMobile ? () => { window.location.href = FALLBACK_ERROR_ROUTE; } : undefined}
      />
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
      articleClassName="w-full sm:w-full lg:w-full"
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
      <header className="pointer-events-none fixed inset-x-0 top-6 z-[60] hidden px-10 sm:block lg:px-[60px]">
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

      <header className="pointer-events-none fixed inset-x-0 top-6 z-[60] px-4 sm:hidden">
        <div className="pointer-events-auto mx-auto flex h-[46px] w-full items-center justify-between">
          <LogoMark />
          <Link href="mailto:alhaekalnast@gmail.com" className="rounded-[230px] bg-[#F2F2F2] px-6 py-3 text-base leading-[21px] text-[#707070]">Let&apos;s Talk</Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1440px] px-4 pt-[124px] sm:px-10 lg:px-[60px]">
        <section className="grid gap-[24px] py-10 lg:grid-cols-[1fr_648px] lg:gap-x-10 lg:gap-y-[24px] lg:py-14">
          <div className="space-y-4 transition-all duration-300" style={getGlobalFocusStyle(isTextDimmed)}>
            <h1 className="text-[26px] leading-[32px] tracking-[-1px] text-black lg:text-[40px] lg:leading-[56px]">
              About Haekal
            </h1>
            <p className="max-w-[632px] text-base leading-6 text-[#707070]">I&apos;m Haekal, a product designer with 4+ years of experience building digital products across trading, payments, and B2B systems.</p>
            <p className="max-w-[632px] text-base leading-6 text-[#707070]">I work closely with product and engineering to simplify complex flows into clear and usable experiences.</p>
            <p className="max-w-[632px] text-base leading-6 text-[#707070]">Before product design, my background was in visual communication and marketing, which shaped how I think about clarity, storytelling, and communication.</p>
            <p className="max-w-[632px] text-base leading-6 text-[#707070]">More of a quiet builder. I think, structure, and iterate. Recently exploring how design decisions turn to implementation.</p>
          </div>

          <div className="flex flex-col gap-[24px]">
            <AboutToolsCard
              isGlobalDimmed={isAboutDimmed}
              onArrowHoverStart={() => setActiveArrowId(aboutArrowId)}
              onArrowHoverEnd={() => setActiveArrowId((current) => (current === aboutArrowId ? null : current))}
            />

            <div className="relative z-10 grid gap-[24px] sm:grid-cols-2">
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
              <div className="grid gap-[24px] lg:grid-cols-3">
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
              <div className="grid gap-[24px] lg:grid-cols-2">
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
                  <div className="grid grid-cols-2 gap-[24px] lg:relative lg:z-[1]">
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
                    articleClassName="lg:relative lg:z-0"
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
                <div className="flex w-full flex-col gap-[24px]">
                  <div className="grid grid-cols-2 gap-[24px]">
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

      <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[60] px-4 sm:hidden">
        <nav aria-label="Mobile navigation" className="pointer-events-auto mx-auto flex w-fit items-center rounded-[56px] border border-black/10 bg-white/80 p-[5px] shadow-[0_10px_10px_-5px_rgba(0,0,0,0.10)] backdrop-blur-[8px]">
          <Link href="/" className="flex h-[46px] w-[84px] items-center justify-center rounded-[230px] text-base leading-[21px] text-[#707070]">Home</Link>
          <Link href="/about" className="flex h-[46px] w-[84px] items-center justify-center rounded-[230px] bg-[#F2F2F2] text-base leading-[21px] text-black">About</Link>
          <Link href="/designs" className="flex h-[46px] w-[84px] items-center justify-center rounded-[230px] text-base leading-[21px] text-[#707070]">Designs</Link>
        </nav>
      </div>
    </div>
  );
}


"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import {
  BPRDashboardFrameMockup,
  BPRFrameMockup,
  DesignsFeaturedDesignCard,
  PersonalMockup,
  type FeaturedCardShellLayoutOverrides,
} from "@/components/shared/featured-design-card";
import { getGlobalFocusMotionAnimate } from "@/components/shared/arrow-reveal";
import { CASE_DESIGNS, CASE_RELATED_MAPPING, type CaseSlug } from "@/lib/case-designs";
import { PUBLIC_BRAND, PUBLIC_DESIGNS_CARDS_VARIANT1, PUBLIC_DESIGNS_MOCKUPS } from "@/lib/public-assets";

const PREMIUM_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const PREMIUM_DURATION = 0.32;
const TEXT_STYLE_SECTION_TITLE = "text-[32px] leading-[40px] tracking-[-1px] text-black lg:text-[40px] lg:leading-[56px]";
const TEXT_STYLE_BODY = "text-base leading-6 text-[#707070]";
const TEXT_STYLE_BODY_STRONG = "text-base leading-6 text-black";

const CASE_SECTION_CARD_SHELL: FeaturedCardShellLayoutOverrides = {
  mockupInnerClassName: "h-[444px]",
  titleBlockClassName: "pointer-events-none mt-4 sm:absolute sm:left-0 sm:top-[460px] sm:mt-0",
  articleCollapsed: "h-[512px] sm:h-[444px]",
  articleRevealed: "h-[512px] sm:h-[444px]",
};

function LogoMark() {
  return (
    <Link href="/" aria-label="Go to home" className="group relative block h-[27px] w-[124px]">
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

function CaseOctoMockup() {
  return (
    <div className="absolute inset-0 flex items-center justify-center px-10 py-6">
      <div className="relative h-[108px] w-[108px] shrink-0">
        <img
          src={PUBLIC_DESIGNS_CARDS_VARIANT1.octoAppIcon}
          alt="OCTO Merchant app icon"
          width={108}
          height={108}
          draggable={false}
          className="block h-[108px] w-[108px] object-contain"
          style={{ filter: "drop-shadow(0px 0px 50px rgba(0, 0, 0, 0.06))" }}
        />
      </div>
    </div>
  );
}

type RelatedCaseCardProps = {
  slug: CaseSlug;
  hrefOverride?: string;
  activeArrowId: string | null;
  onArrowHoverStart: (id: string) => void;
  onArrowHoverEnd: (id: string) => void;
  revealedKey: string | null;
  setRevealedKey: (id: string | null) => void;
  hoveredKey: string | null;
  setHoveredKey: (id: string | null) => void;
};

function RelatedCaseCard(props: RelatedCaseCardProps) {
  const cardHref = props.hrefOverride ?? CASE_DESIGNS[props.slug].detailHref;
  if (props.slug === "personal") {
    return (
      <DesignsFeaturedDesignCard
        cardKey={CASE_DESIGNS.personal.cardKey}
        title={CASE_DESIGNS.personal.title}
        subtitle={CASE_DESIGNS.personal.subtitle}
        href={cardHref}
        caseChip="Case"
        mockupPaddingClass="px-10 py-6"
        shellLayout={CASE_SECTION_CARD_SHELL}
        renderMockup={(hovered) => <PersonalMockup hovered={hovered} />}
        activeArrowId={props.activeArrowId}
        onArrowHoverStart={props.onArrowHoverStart}
        onArrowHoverEnd={props.onArrowHoverEnd}
        revealedKey={props.revealedKey}
        setRevealedKey={props.setRevealedKey}
        hoveredKey={props.hoveredKey}
        setHoveredKey={props.setHoveredKey}
      />
    );
  }

  if (props.slug === "b2b") {
    return (
      <DesignsFeaturedDesignCard
        cardKey={CASE_DESIGNS.b2b.cardKey}
        title={CASE_DESIGNS.b2b.title}
        subtitle={CASE_DESIGNS.b2b.subtitle}
        href={cardHref}
        caseChip="Case"
        mockupPaddingClass="px-0 py-0"
        shellLayout={CASE_SECTION_CARD_SHELL}
        renderMockup={(hovered) => (
          <BPRDashboardFrameMockup
            hovered={hovered}
            contentSrc={PUBLIC_DESIGNS_MOCKUPS.b2b.content}
            contentAlt="Dipay enterprise dashboard"
          />
        )}
        activeArrowId={props.activeArrowId}
        onArrowHoverStart={props.onArrowHoverStart}
        onArrowHoverEnd={props.onArrowHoverEnd}
        revealedKey={props.revealedKey}
        setRevealedKey={props.setRevealedKey}
        hoveredKey={props.hoveredKey}
        setHoveredKey={props.setHoveredKey}
      />
    );
  }

  if (props.slug === "sfc") {
    return (
      <DesignsFeaturedDesignCard
        cardKey={CASE_DESIGNS.sfc.cardKey}
        title={CASE_DESIGNS.sfc.title}
        subtitle={CASE_DESIGNS.sfc.subtitle}
        href={cardHref}
        caseChip="Case"
        mockupPaddingClass="px-0 py-0"
        shellLayout={CASE_SECTION_CARD_SHELL}
        renderMockup={(hovered) => (
          <BPRFrameMockup
            hovered={hovered}
            navbarSrc={PUBLIC_DESIGNS_MOCKUPS.sfc.navbar}
            contentSrc={PUBLIC_DESIGNS_MOCKUPS.sfc.content}
            contentAlt="sfcapital.co.id mockup"
            navbarDisplayPx={28.444446563720703}
            navbarDisplayWidthPx={396.79998779296875}
            navbarIntrinsicWidth={2048}
            navbarIntrinsicHeight={160}
            contentHeightPx={1927}
          />
        )}
        activeArrowId={props.activeArrowId}
        onArrowHoverStart={props.onArrowHoverStart}
        onArrowHoverEnd={props.onArrowHoverEnd}
        revealedKey={props.revealedKey}
        setRevealedKey={props.setRevealedKey}
        hoveredKey={props.hoveredKey}
        setHoveredKey={props.setHoveredKey}
      />
    );
  }

  return (
    <DesignsFeaturedDesignCard
      cardKey={CASE_DESIGNS.octo.cardKey}
      title={CASE_DESIGNS.octo.title}
      subtitle={CASE_DESIGNS.octo.subtitle}
      href={cardHref}
      caseChip="Case"
      mockupPaddingClass="px-0 py-0"
      shellLayout={CASE_SECTION_CARD_SHELL}
      renderMockup={() => <CaseOctoMockup />}
      activeArrowId={props.activeArrowId}
      onArrowHoverStart={props.onArrowHoverStart}
      onArrowHoverEnd={props.onArrowHoverEnd}
      revealedKey={props.revealedKey}
      setRevealedKey={props.setRevealedKey}
      hoveredKey={props.hoveredKey}
      setHoveredKey={props.setHoveredKey}
    />
  );
}

export function CaseDetailPage({ slug }: { slug: CaseSlug }) {
  const [activeArrowId, setActiveArrowId] = useState<string | null>(null);
  const [revealedKey, setRevealedKey] = useState<string | null>(null);
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const currentCase = CASE_DESIGNS[slug];
  const relatedCards = useMemo(() => CASE_RELATED_MAPPING[slug], [slug]);

  const onArrowHoverStart = useCallback((id: string) => {
    setActiveArrowId(id);
  }, []);
  const onArrowHoverEnd = useCallback((id: string) => {
    setActiveArrowId((prev) => (prev === id ? null : prev));
  }, []);

  const isPersonal = slug === "personal";

  return (
    <div className="bg-[#FAFAFA] text-black">
      <header className="pointer-events-none fixed inset-x-0 top-6 z-40 px-4 sm:px-10 lg:px-[60px]">
        <div className="pointer-events-auto mx-auto flex h-14 w-full max-w-[1320px] items-center justify-between">
          <LogoMark />
          <Link
            href="/designs"
            className="rounded-[230px] bg-[#F2F2F2] px-6 py-3 text-base leading-[21px] text-[#707070] transition-colors hover:text-black"
          >
            Back to All Designs
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1440px] px-4 pt-[124px] pb-[108px] sm:px-10 lg:px-[60px] lg:pb-[124px]">
        {isPersonal ? (
          <>
            <motion.section
              className="pb-20"
              initial={false}
              animate={getGlobalFocusMotionAnimate(activeArrowId !== null)}
              transition={{ duration: PREMIUM_DURATION, ease: PREMIUM_EASE }}
            >
              <div className="mx-auto w-full max-w-[800px]">
                <p className="text-base leading-6 text-black">Dipay Personal</p>
                <h1 className="mt-6 text-[38px] leading-[46px] tracking-[-1px] text-black lg:text-[56px] lg:leading-[56px]">
                  Helping Users Track Their Finances Smarter with Spending Statistic
                </h1>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="text-base leading-6 text-[#707070]">Mobile</span>
                  <span className="text-base leading-6 text-[#707070]">|</span>
                  <span className="text-base leading-6 text-[#707070]">E-Wallet</span>
                  <span className="inline-flex items-center rounded-[8px] border border-[#DEDEE0] bg-[#F2F2F2] px-3 py-[3px] text-base leading-6 text-black">
                    Live
                  </span>
                  <span className="inline-flex items-center rounded-[8px] border border-[#DEDEE0] bg-[#F2F2F2] px-3 py-[3px] text-base leading-6 text-black">
                    Case
                  </span>
                </div>
                <div className="relative mt-12 h-[240px] overflow-hidden rounded-[20px] bg-[#F2F2F2] sm:h-[470px] lg:h-[533px]">
                  <PersonalMockup hovered={false} />
                </div>
              </div>
            </motion.section>

            <section className="pb-20">
              <div className="mx-auto max-w-[800px] rounded-[20px] border border-[#DEDEE0] bg-[#F2F2F2] p-6">
                <h2 className="text-base leading-6 text-black">Quick Overview</h2>
                <p className="mt-4 text-base leading-6 text-[#707070]">
                  I introduced a new feature in Dipay Personal to help users automatically track and understand their spending habits.
                  The Spending Statistic module includes categorized expenses, monthly comparisons, and visual charts, all generated
                  without manual input. By removing friction and offering clear insights, the feature turned passive users into more
                  financially aware individuals.
                </p>
                <div className="my-6 h-px w-full bg-[#DEDEE0]" />
                <p className="text-base leading-6 text-black">Live Mobile App</p>
                <div className="mt-4 flex flex-wrap gap-4">
                  <Link href={currentCase.liveHref} target="_blank" rel="noreferrer noopener" className="text-base leading-6 text-[#707070] underline">
                    App Store
                  </Link>
                  <Link href="https://play.google.com/store/apps/details?id=com.dipay.user&hl=id" target="_blank" rel="noreferrer noopener" className="text-base leading-6 text-[#707070] underline">
                    Play Store
                  </Link>
                </div>
              </div>
            </section>

            <section className="pb-20">
              <div className="mx-auto max-w-[800px]">
                <h2 className={TEXT_STYLE_SECTION_TITLE}>A. Knowing the Why?</h2>
                <div className="mt-4 space-y-4 text-base leading-6 text-[#707070]">
                  <p>
                    Before this feature existed, most Dipay users simply used the app for quick transactions, to top up, pay bills, or
                    scan QR codes. However, there was no way for them to review how much they were actually spending, or on what.
                  </p>
                  <p>
                    As a result, users often lacked financial awareness. They might overspend across categories like Shopping or Eat &
                    Drinks without realizing it, and there was no visual cue to help them reflect on their habits.
                  </p>
                  <p>
                    That gap inspired us to build Spending Statistic, a feature that helps users understand their monthly expenses by
                    automatically categorizing and visualizing their transactions, without requiring any manual input.
                  </p>
                </div>
              </div>
            </section>

            <section className="pb-20">
              <div className="mx-auto max-w-[800px]">
                <h2 className={TEXT_STYLE_SECTION_TITLE}>B. Design Process</h2>
                <p className="mt-4 text-base leading-6 text-[#707070]">
                  I led this project as Lead Product Designer, collaborating with two product designers and one product manager. My role
                  was to guide the UX vision, define the structure of insights, and align experience patterns across the product.
                </p>
              </div>
            </section>

            <section className="pb-20">
              <div className="mx-auto max-w-[800px]">
                <h2 className={TEXT_STYLE_SECTION_TITLE}>C. Design Preview</h2>
                <p className="mt-4 text-base leading-6 text-[#707070]">
                  The final direction focuses on clear categorization, monthly comparison, and visualized spending summary so users can
                  build financial awareness without friction.
                </p>
              </div>
            </section>

            <section className="pb-20">
              <div className="mx-auto max-w-[800px]">
                <h2 className={TEXT_STYLE_SECTION_TITLE}>D. Learnings</h2>
                <p className="mt-4 text-base leading-6 text-[#707070]">
                  Spending Statistic proved that thoughtful defaults and invisible UX can meaningfully change behavior, even in products
                  as routine as digital wallets.
                </p>
              </div>
            </section>
          </>
        ) : (
          <section className="py-20">
            <h1 className={TEXT_STYLE_SECTION_TITLE}>{currentCase.title}</h1>
            <p className="mt-4 text-base leading-6 text-[#707070]">{currentCase.summary}</p>
          </section>
        )}
      </main>
    </div>
  );
}

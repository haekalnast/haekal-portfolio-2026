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
import { ExternalUnderlineLink } from "@/components/shared/external-underline-link";
import { getGlobalFocusMotionAnimate } from "@/components/shared/arrow-reveal";
import { StatusChip } from "@/components/shared/status-chip";
import {
  SectionFeatureHeaderDesktopCta,
  SectionFeatureHeaderMobileCta,
  SectionFeatureHeaderMotionRow,
  SectionFeatureHeaderTitleBlock,
} from "@/components/shared/section-feature-header";
import { CASE_DESIGNS, CASE_RELATED_MAPPING, type CaseSlug } from "@/lib/case-designs";
import {
  PUBLIC_BRAND,
  PUBLIC_CASE_PERSONAL,
  PUBLIC_DESIGNS_CARDS_VARIANT1,
  PUBLIC_DESIGNS_MOCKUPS,
} from "@/lib/public-assets";

const PREMIUM_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const PREMIUM_DURATION = 0.32;

const TEXT_STYLE_BODY_DEFAULT = "text-[16px] leading-[24px] font-normal text-[#707070]";
const TEXT_STYLE_BODY_SUBTLE = "text-[16px] leading-[24px] font-light text-[#707070]";
const TEXT_STYLE_CAPTION = "text-[16px] leading-[24px] font-normal text-[#707070]";
const TEXT_STYLE_H2 = "text-[32px] leading-[40px] tracking-[-1px] text-black lg:text-[40px] lg:leading-[56px]";
const TEXT_STYLE_H3 = "text-[28px] leading-[36px] tracking-[-1px] text-black lg:text-[32px] lg:leading-[40px]";
const TEXT_STYLE_H4 = "text-[20px] leading-[24px] tracking-[-1px] text-black";
const TEXT_STYLE_LINK = "font-[family-name:var(--font-open-sans)] text-[16px] leading-[24px] text-black";

const TEXT_STYLE_SECTION_TITLE = TEXT_STYLE_H2;
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

function CaseLinkButton({ href, label }: { href: string; label: string }) {
  return (
    <ExternalUnderlineLink
      href={href}
      className="inline-flex items-center gap-[6px]"
      textClassName={TEXT_STYLE_LINK}
    >
      {label}
    </ExternalUnderlineLink>
  );
}

function CaseSectionImage({
  src,
  alt,
  caption,
  priority,
}: {
  src: string;
  alt: string;
  caption?: string;
  priority?: boolean;
}) {
  return (
    <div className="flex w-full flex-col items-center gap-[16px]">
      <div className="relative h-[260px] w-full overflow-hidden rounded-[16px] sm:h-[420px] lg:h-[533px]">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 800px, 100vw"
          className="object-cover"
        />
      </div>
      {caption ? (
        <p className={`${TEXT_STYLE_CAPTION} w-full text-center`}>{caption}</p>
      ) : null}
    </div>
  );
}

function BodyMixedParagraph({
  strong,
  light,
}: {
  strong: string;
  light: string;
}) {
  return (
    <p className="text-[16px] leading-[24px] text-[#707070]">
      <span className="font-normal">{strong}</span>
      <span className="font-light">{light}</span>
    </p>
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
          loading="lazy"
          decoding="async"
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
      <header className="pointer-events-none fixed inset-x-0 top-6 z-40 hidden px-10 sm:block lg:px-[60px]">
        <div className="pointer-events-auto mx-auto flex h-14 w-full max-w-[1320px] items-center justify-between">
          <LogoMark />
          <nav
            aria-label="Primary navigation"
            className="flex items-center rounded-[56px] border border-black/10 bg-white/80 p-[5px] shadow-[0_10px_10px_-5px_rgba(0,0,0,0.10)] backdrop-blur-[8px]"
          >
            <Link
              href="/"
              className="flex h-[46px] w-[84px] items-center justify-center rounded-[230px] text-center text-base leading-[21px] text-[#707070] transition-colors hover:bg-[#F2F2F2]"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="flex h-[46px] w-[84px] items-center justify-center rounded-[230px] text-center text-base leading-[21px] text-[#707070] transition-colors hover:bg-[#F2F2F2]"
            >
              About
            </Link>
            <Link
              href="/designs"
              className="flex h-[46px] w-[84px] items-center justify-center rounded-[230px] text-center text-base leading-[21px] text-[#707070] transition-colors hover:bg-[#F2F2F2]"
            >
              Designs
            </Link>
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
            className="rounded-[230px] bg-[#F2F2F2] px-6 py-3 text-base leading-[21px] text-[#707070]"
          >
            Let&apos;s Talk
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1440px] px-4 pt-[124px] sm:px-10 lg:px-[60px]">
        {isPersonal ? (
          <>
            <motion.div
              initial={false}
              animate={getGlobalFocusMotionAnimate(activeArrowId !== null)}
              transition={{ duration: PREMIUM_DURATION, ease: PREMIUM_EASE }}
            >
              {/* Hero — Figma node 42462:38506 */}
              <section className="flex flex-col items-center gap-[48px]">
              <div className="flex w-full max-w-[800px] flex-col gap-[24px]">
                <p className="text-[16px] leading-[24px] text-black">Dipay Personal</p>
                <div className="flex flex-col gap-[16px]">
                  <h1 className={`${TEXT_STYLE_H2} font-normal`}>
                    Helping Users Track Their Finances Smarter with Spending Statistic
                  </h1>
                  <div className="flex flex-wrap items-center gap-[8px]">
                    <div className="flex flex-1 items-start gap-[4px] text-[16px] leading-[24px] text-[#707070]">
                      <span>Mobile</span>
                      <span>|</span>
                      <span>Fintech</span>
                    </div>
                    <StatusChip label="Live" tone="live" className="shrink-0 justify-center" />
                    <StatusChip label="Case" tone="neutral" className="shrink-0 justify-center" />
                  </div>
                </div>
              </div>
              <div className="relative h-[260px] w-full max-w-[800px] overflow-hidden rounded-[16px] sm:h-[420px] lg:h-[533px]">
                <Image
                  src={PUBLIC_CASE_PERSONAL.heroMockup}
                  alt="Dipay Personal — Spending Statistic"
                  fill
                  priority
                  sizes="(min-width: 1024px) 800px, 100vw"
                  className="object-cover"
                />
              </div>
              </section>

            {/* Quick Overview — Figma node 42462:38514 */}
            <section className="flex flex-col items-center py-[80px]">
              <div className="flex w-full max-w-[800px] flex-col gap-[24px] rounded-[16px] bg-[#F2F2F2] py-[24px]">
                <div className="flex flex-col gap-[16px] px-[24px]">
                  <h2 className={TEXT_STYLE_H4}>Quick Overview</h2>
                  <p className={TEXT_STYLE_BODY_SUBTLE}>
                    I introduced a new feature in Dipay Personal to help users automatically track and understand their spending habits.
                    The Spending Statistic module includes categorized expenses, monthly comparisons, and visual charts, all generated
                    without manual input. By removing friction and offering clear insights, the feature turned passive users into more
                    financially aware individuals.
                  </p>
                </div>
                <div className="h-px w-full bg-[#DEDEE0]" />
                <div className="flex flex-col gap-[16px] px-[24px]">
                  <h3 className={TEXT_STYLE_H4}>Live Mobile App</h3>
                  <div className="flex flex-wrap items-start gap-[16px]">
                    <CaseLinkButton href="https://apps.apple.com/us/app/dipay/id1497076024" label="App Store" />
                    <CaseLinkButton href="https://play.google.com/store/apps/details?id=com.dipay.user&hl=id" label="Play Store" />
                  </div>
                </div>
              </div>
            </section>

            {/* A. Knowing the Why? — Figma node 42462:38519 */}
            <section className="flex flex-col items-center gap-[48px] py-[80px]">
              <div className="flex w-full max-w-[800px] flex-col gap-[16px]">
                <h2 className={TEXT_STYLE_H3}>A. Knowing the Why?</h2>
                <p className={TEXT_STYLE_BODY_SUBTLE}>
                  Before this feature existed, most Dipay users simply used the app for quick transactions, to top up, pay bills, or
                  scan QR codes. However, there was no way for them to review how much they were actually spending, or on what.
                </p>
                <p className={TEXT_STYLE_BODY_SUBTLE}>
                  As a result, users often lacked financial awareness. They might overspend across categories like “Shopping” or
                  “Eat &amp; Drinks” without realizing it, and there was no visual cue to help them reflect on their habits.
                </p>
                <p className={TEXT_STYLE_BODY_SUBTLE}>
                  That gap inspired us to build Spending Statistic, a feature that helps users understand their monthly expenses by
                  automatically categorizing and visualizing their transactions, without requiring any manual input.
                </p>
                <div className="flex w-full items-center justify-center rounded-[16px] bg-[#F2F2F2] p-[24px]">
                  <p className={`flex-1 ${TEXT_STYLE_BODY_SUBTLE}`}>
                    From internal feedback and data logs, we found that users rarely opened the transaction history unless their balance
                    looked “too low.” Most people didn’t realize they’d spent 1–2 million until they were forced to check, so this
                    feature was designed to be passive, but powerful.
                  </p>
                </div>
              </div>

              <div className="flex w-full max-w-[800px] flex-col gap-[16px]">
                <h3 className={TEXT_STYLE_H4}>That insight led us to design a new feature:</h3>
                <BodyMixedParagraph
                  strong="Spending Statistic "
                  light="→ a monthly transaction breakdown grouped into meaningful categories to help users understand their financial habits."
                />
                <p className={TEXT_STYLE_BODY_SUBTLE}>
                  Rather than asking users to log their expenses manually, we designed a system that detects, categorizes, and visualizes
                  spending patterns automatically, giving users a financial mirror they could trust.
                </p>
              </div>

              <div className="flex w-full max-w-[800px] flex-col gap-[16px]">
                <h3 className={TEXT_STYLE_H4}>This led us to the development of four key sub-features:</h3>
                <BodyMixedParagraph
                  strong="Automatic Tracking "
                  light="→ all transactions recorded seamlessly behind the scenes"
                />
                <BodyMixedParagraph
                  strong="Spending Categories "
                  light="→ grouped into 7 everyday segments to help users interpret spending faster"
                />
                <BodyMixedParagraph
                  strong="Monthly Comparison "
                  light="→ shows increases or decreases in each category compared to previous month"
                />
                <BodyMixedParagraph
                  strong="Spending Chart "
                  light="→ a visual donut chart to quickly scan where most money goes"
                />
              </div>

              <div className="flex w-full max-w-[800px] flex-col gap-[16px]">
                <h3 className={TEXT_STYLE_H4}>The intention behind these features was clear:</h3>
                <p className={TEXT_STYLE_BODY_SUBTLE}>
                  To empower users to build financial awareness without friction, helping them identify patterns, spot problems, and
                  eventually feel more in control of their money.
                </p>
              </div>

              <div className="flex w-full max-w-[800px] flex-col gap-[16px]">
                <CaseSectionImage
                  src={PUBLIC_CASE_PERSONAL.oldDesign}
                  alt="Dipay Personal Old Design"
                  caption="Dipay Personal Old Design"
                />
              </div>
            </section>

            {/* B. Design Process — Figma node 42462:38545 */}
            <section className="flex flex-col items-center gap-[48px] py-[80px]">
              <div className="flex w-full max-w-[800px] flex-col gap-[16px]">
                <h2 className={TEXT_STYLE_H3}>B. Design Process</h2>
                <p className={TEXT_STYLE_BODY_SUBTLE}>
                  I led this project as Lead Product Designer, collaborating with two product designers and one product manager. My role
                  was to guide the UX vision, define the structure of insights, and align experience patterns across the product.
                </p>
                <p className="text-[16px] leading-[24px] text-[#707070]">
                  <span className="font-light">The feature was designed to answer a simple question → </span>
                  <span className="font-normal">“Where is my money going?”</span>
                </p>
                <p className={TEXT_STYLE_BODY_SUBTLE}>
                  We structured the experience to feel effortless and data-driven, with clarity as a design priority. To ensure we were
                  building a product users would truly benefit from, we benchmarked how similar products delivered spending insights.
                </p>
              </div>

              <div className="flex w-full max-w-[800px] flex-col gap-[16px]">
                <h3 className={TEXT_STYLE_H4}>User Goals</h3>
                <BodyMixedParagraph
                  strong="Understand where their money goes "
                  light="→ Users get categorized summaries of their monthly spending, updated automatically"
                />
                <BodyMixedParagraph
                  strong="Compare their spending across time "
                  light="→ With monthly percentage differences and trend icons, users can reflect and adjust habits."
                />
                <BodyMixedParagraph
                  strong="Get insights without manual work "
                  light="→ Everything works in the background, no extra setup or effort needed."
                />
              </div>

              <div className="flex w-full max-w-[800px] flex-col gap-[16px]">
                <h3 className={TEXT_STYLE_H4}>Business Goals</h3>
                <BodyMixedParagraph
                  strong="Increase user retention "
                  light="→ Financial awareness creates stickiness; users return monthly to check their stats."
                />
                <BodyMixedParagraph
                  strong="Strengthen perceived value of Dipay "
                  light="→ Going beyond transactions into personal finance helps Dipay stand out in a crowded payments space."
                />
                <BodyMixedParagraph
                  strong="Enable future monetization "
                  light="→ Spending habits open up opportunities for cross-sell (e.g., financial products, savings goals)."
                />
              </div>

              <div className="flex w-full max-w-[800px] flex-col gap-[16px]">
                <h3 className={TEXT_STYLE_H4}>Key Findings</h3>
                <p className={TEXT_STYLE_BODY_SUBTLE}>
                  With goals aligned, I benchmarked other app like Bank Jago (a digital bank) and Pina (a budgeting + investment app) to
                  gather answers to specific questions.
                </p>
                <CaseSectionImage
                  src={PUBLIC_CASE_PERSONAL.benchmarking}
                  alt="Benchmarking from other app's"
                  caption="Benchmarking from other app’s"
                />
              </div>

              <div className="flex w-full max-w-[800px] flex-col gap-[16px]">
                <BodyMixedParagraph
                  strong="What makes Bank Jago's spending insights work? "
                  light="→ Jago keeps insights clean, visual, and tailored for younger users. It supports flexible category editing and offers monthly comparisons, which gave us the idea to include visualized changes and grouping flexibility."
                />
                <BodyMixedParagraph
                  strong="What does Pina do well for non-bank users? "
                  light="→ Pina’s UI is fresh and includes goal budgeting. While their categorization is generic, they integrate investment tracking too. We took inspiration from their simplicity but opted for tighter data mapping to actual transactions."
                />
              </div>

              <div className="flex w-full max-w-[800px] flex-col gap-[16px]">
                <CaseSectionImage
                  src={PUBLIC_CASE_PERSONAL.competitorTable}
                  alt="Competitor Comparison Table"
                  caption="Competitor Comparison Table"
                />
              </div>
            </section>

            {/* C. Design Preview — Figma node 42462:38572 */}
            <section className="flex flex-col items-center gap-[48px] py-[80px]">
              <div className="flex w-full max-w-[800px] flex-col">
                <h2 className={TEXT_STYLE_H3}>C. Design Preview</h2>
              </div>

              <div className="flex w-full max-w-[800px] flex-col gap-[16px]">
                <h3 className={TEXT_STYLE_H4}>Spending Category</h3>
                <p className={TEXT_STYLE_BODY_SUBTLE}>
                  On the Statistik page, users can view all 7 spending categories as stacked cards, each showing icon, label, and
                  amount. This card layout reduces scanning friction and reinforces segmentation.
                </p>
                <CaseSectionImage
                  src={PUBLIC_CASE_PERSONAL.spendingCategoryCards}
                  alt="Spending Category Cards"
                  caption="Spending Category Cards"
                />
              </div>

              <div className="flex w-full max-w-[800px] flex-col gap-[16px]">
                <h3 className={TEXT_STYLE_H4}>Statistic Entry Point on Homepage</h3>
                <p className={TEXT_STYLE_BODY_SUBTLE}>
                  The feature was placed in the Dompet section of the homepage. It shows the top 3 categories and total spending with a
                  CTA to “Lihat Statistik.”
                </p>
                <CaseSectionImage
                  src={PUBLIC_CASE_PERSONAL.newCardHomepage}
                  alt="New Card on Homepage"
                  caption="New Card on Homepage"
                />
              </div>

              <div className="flex w-full max-w-[800px] flex-col gap-[16px]">
                <h3 className={TEXT_STYLE_H4}>Full Statistic Page with Donut Chart</h3>
                <p className={TEXT_STYLE_BODY_SUBTLE}>
                  Tapping “Lihat Statistik” brings users to a dedicated Statistik page, where a donut chart summarizes their full
                  monthly spending. Users can navigate by month and view breakdowns per category.
                </p>
                <CaseSectionImage
                  src={PUBLIC_CASE_PERSONAL.newStatisticPage}
                  alt="New Statistic Page"
                  caption="New Statistic Page"
                />
              </div>

              <div className="flex w-full max-w-[800px] flex-col gap-[16px]">
                <h3 className={TEXT_STYLE_H4}>Auto-Categorized Payment Proof</h3>
                <p className={TEXT_STYLE_BODY_SUBTLE}>
                  Each completed transaction from QRIS, PPOB, to transfers, is instantly labeled with the proper spending category on
                  its success screen. To enable this, we used a merchant keyword/tag mapping system, and applied fallback heuristics
                  when category confidence was low.
                </p>
                <CaseSectionImage
                  src={PUBLIC_CASE_PERSONAL.newQrisPayment}
                  alt="New QRIS Payment Proof"
                  caption="New QRIS Payment Proof"
                />
                <CaseSectionImage
                  src={PUBLIC_CASE_PERSONAL.newTransferPayment}
                  alt="New Transfer Payment Proof"
                  caption="New Transfer Payment Proof"
                />
                <CaseSectionImage
                  src={PUBLIC_CASE_PERSONAL.ppobPayment}
                  alt="PPOB Payment Proof"
                  caption="PPOB Payment Proof"
                />
              </div>
            </section>

              {/* D. Learnings — Figma node 42462:38599 */}
              <section className="flex flex-col items-center gap-[48px] py-[80px]">
              <div className="flex w-full max-w-[800px] flex-col gap-[16px]">
                <h2 className={TEXT_STYLE_H3}>D. Learnings</h2>
                <p className={TEXT_STYLE_BODY_SUBTLE}>
                  This project taught me how powerful data can be when it’s visualized simply. Most users don’t need accounting-level
                  granularity, they just want awareness.
                </p>
                <div className={TEXT_STYLE_BODY_SUBTLE}>
                  <p>We were able to ship a smart, low-friction feature by leaning on:</p>
                  <ul className="ms-[24px] list-disc">
                    <li>Internal CS &amp; product feedback</li>
                    <li>Real transaction data</li>
                    <li>Smart fallback logic</li>
                    <li>Competitor benchmarking</li>
                  </ul>
                </div>
                <p className={TEXT_STYLE_BODY_SUBTLE}>
                  Even without user interviews, we delivered something useful and the feedback showed it: users began referencing
                  categories like “Shopping” and “Bills” when discussing their expenses, something that never happened before.
                </p>
                <p className={TEXT_STYLE_BODY_SUBTLE}>
                  Spending Statistic proved that thoughtful defaults and invisible UX can meaningfully change behavior, even in products
                  as routine as digital wallets.
                </p>
              </div>

              <div className="flex w-full max-w-[800px] flex-col gap-[16px]">
                <h3 className={TEXT_STYLE_H4}>Live Mobile App</h3>
                <div className="flex flex-wrap items-start gap-[16px]">
                  <CaseLinkButton href="https://apps.apple.com/us/app/dipay/id1497076024" label="App Store" />
                  <CaseLinkButton href="https://play.google.com/store/apps/details?id=com.dipay.user&hl=id" label="Play Store" />
                </div>
              </div>
              </section>
            </motion.div>

            <section className="mx-auto w-full max-w-[1440px] bg-[#FAFAFA] py-20 sm:py-[108px] lg:py-[124px]">
              <div className="mx-auto w-full max-w-[1320px]">
                <SectionFeatureHeaderMotionRow isDimmed={activeArrowId !== null}>
                  <SectionFeatureHeaderTitleBlock
                    title="Featured Designs Case"
                    description="Selected products I've designed, from launched platforms to ongoing builds."
                  />
                  <SectionFeatureHeaderDesktopCta href="/designs">
                    See All Designs
                  </SectionFeatureHeaderDesktopCta>
                </SectionFeatureHeaderMotionRow>

                <div className="grid grid-cols-1 gap-[24px] lg:grid-cols-2">
                  <RelatedCaseCard
                    slug={relatedCards[0]}
                    activeArrowId={activeArrowId}
                    onArrowHoverStart={onArrowHoverStart}
                    onArrowHoverEnd={onArrowHoverEnd}
                    revealedKey={revealedKey}
                    setRevealedKey={setRevealedKey}
                    hoveredKey={hoveredKey}
                    setHoveredKey={setHoveredKey}
                  />
                  <RelatedCaseCard
                    slug={relatedCards[1]}
                    activeArrowId={activeArrowId}
                    onArrowHoverStart={onArrowHoverStart}
                    onArrowHoverEnd={onArrowHoverEnd}
                    revealedKey={revealedKey}
                    setRevealedKey={setRevealedKey}
                    hoveredKey={hoveredKey}
                    setHoveredKey={setHoveredKey}
                  />
                </div>
                <SectionFeatureHeaderMobileCta href="/designs">
                  See All Designs
                </SectionFeatureHeaderMobileCta>
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

      <motion.footer
        className="w-full bg-[#F2F2F2]"
        initial={false}
        animate={getGlobalFocusMotionAnimate(activeArrowId !== null)}
        transition={{ duration: PREMIUM_DURATION, ease: PREMIUM_EASE }}
      >
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
      </motion.footer>

      <div className="pointer-events-none fixed inset-x-0 bottom-6 z-40 px-4 sm:hidden">
        <nav
          aria-label="Mobile navigation"
          className="pointer-events-auto mx-auto flex w-fit items-center rounded-[56px] border border-black/10 bg-white/80 p-[5px] shadow-[0_10px_10px_-5px_rgba(0,0,0,0.10)] backdrop-blur-[8px]"
        >
          <Link href="/" className="flex h-[46px] w-[84px] items-center justify-center rounded-[230px] text-base leading-[21px] text-[#707070]">
            Home
          </Link>
          <Link href="/about" className="flex h-[46px] w-[84px] items-center justify-center rounded-[230px] text-base leading-[21px] text-[#707070]">
            About
          </Link>
          <Link href="/designs" className="flex h-[46px] w-[84px] items-center justify-center rounded-[230px] text-base leading-[21px] text-[#707070]">
            Designs
          </Link>
        </nav>
      </div>
    </div>
  );
}

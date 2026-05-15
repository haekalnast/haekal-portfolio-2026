"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { ReactElement } from "react";
import { ExternalUnderlineLink } from "@/components/shared/external-underline-link";
import { getGlobalFocusMotionAnimate } from "@/components/shared/arrow-reveal";
import { StatusChip } from "@/components/shared/status-chip";
import {
  SectionFeatureHeaderDesktopCta,
  SectionFeatureHeaderMobileCta,
  SectionFeatureHeaderMotionRow,
  SectionFeatureHeaderTitleBlock,
} from "@/components/shared/section-feature-header";
import { CASE_DESIGNS, type CaseSlug } from "@/lib/case-designs";
import { cn } from "@/lib/cn";
import { PUBLIC_CASE_SFC } from "@/lib/public-assets";
import { CASE_DETAIL_FEATURED_SECTION_CLASS } from "@/components/designs/case-detail-layout";
import {
  CASE_DETAIL_MEDIA_FRAME,
  CASE_DETAIL_MEDIA_IMAGE,
  CaseSectionImage,
} from "@/components/designs/case-section-image";

const PREMIUM_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const PREMIUM_DURATION = 0.32;

const TEXT_STYLE_BODY_SUBTLE = "text-[16px] leading-[24px] font-light text-[#707070]";
const TEXT_STYLE_H2 = "text-[32px] leading-[40px] tracking-[-1px] text-black lg:text-[40px] lg:leading-[56px]";
const TEXT_STYLE_H3 = "text-[28px] leading-[36px] tracking-[-1px] text-black lg:text-[32px] lg:leading-[40px]";
const TEXT_STYLE_H4 = "text-[20px] leading-[24px] tracking-[-1px] text-black";
const TEXT_STYLE_LINK = "font-[family-name:var(--font-open-sans)] text-[16px] leading-[24px] text-black";

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

export function CaseSfcStudySections({
  activeArrowId,
  relatedCards,
  renderRelatedCaseCard,
}: {
  activeArrowId: string | null;
  relatedCards: [CaseSlug, CaseSlug];
  renderRelatedCaseCard: (slug: CaseSlug) => ReactElement;
}) {
  const sfc = CASE_DESIGNS.sfc;

  return (
    <>
      <motion.div
        initial={false}
        animate={getGlobalFocusMotionAnimate(activeArrowId !== null)}
        transition={{ duration: PREMIUM_DURATION, ease: PREMIUM_EASE }}
      >
        <section className="flex flex-col items-center gap-[48px]">
          <div className="flex w-full max-w-[800px] flex-col gap-[24px]">
            <p className="text-[16px] leading-[24px] text-black">Surya Fajar Capital</p>
            <div className="flex flex-col gap-[16px]">
              <h1 className={`${TEXT_STYLE_H2} font-normal`}>
                Redefining SF Capital&apos;s Website to Build Investor Trust and Business Credibility
              </h1>
              <div className="flex flex-wrap items-center gap-[8px]">
                <div className="flex flex-1 items-start gap-[4px] text-[16px] leading-[24px] text-[#707070]">
                  <span>Web</span>
                  <span>|</span>
                  <span>Fintech</span>
                </div>
                <StatusChip label="Live" tone="live" className="shrink-0 justify-center" />
                <StatusChip label="Case" tone="neutral" className="shrink-0 justify-center" />
              </div>
            </div>
          </div>
          <div className={cn(CASE_DETAIL_MEDIA_FRAME, "max-w-[800px]")}>
            <Image
              src={PUBLIC_CASE_SFC.heroMockup}
              alt="SF Capital — corporate website hero"
              fill
              priority
              sizes="(min-width: 1024px) 800px, 100vw"
              className={CASE_DETAIL_MEDIA_IMAGE}
            />
          </div>
        </section>

        <section className="flex flex-col items-center py-[80px]">
          <div className="flex w-full max-w-[800px] flex-col gap-[24px] rounded-[16px] bg-[#F2F2F2] py-[24px]">
            <div className="flex flex-col gap-[16px] px-[24px]">
              <h2 className={TEXT_STYLE_H4}>Quick Overview</h2>
              <p className={TEXT_STYLE_BODY_SUBTLE}>
                I led the redesign of SF Capital&apos;s corporate website, transforming it from a static placeholder into a unified,
                responsive, and investor-ready presence. The revamp was initiated as SF Capital (Surya Fajar Capital) entered a new phase
                as a publicly listed company (IDX: SFAN). We restructured the site to reflect its role as a holding company, clarified the
                relationship between subsidiaries, and introduced a full-featured Investor Relations (IR) section that meets public
                company disclosure standards.
              </p>
            </div>
            <div className="h-px w-full bg-[#DEDEE0]" />
            <div className="flex flex-col gap-[16px] px-[24px]">
              <h3 className={TEXT_STYLE_H4}>Live Website</h3>
              <div className="flex flex-wrap items-start gap-[16px]">
                <CaseLinkButton href={sfc.liveHref} label="https://sfcapital.co.id/" />
              </div>
            </div>
          </div>
        </section>

        <section className="flex flex-col items-center gap-[48px] py-[80px]">
          <div className="flex w-full max-w-[800px] flex-col gap-[16px]">
            <h2 className={TEXT_STYLE_H3}>A. Knowing the Why?</h2>
            <p className={TEXT_STYLE_BODY_SUBTLE}>
              When SF Capital became a publicly listed company, the expectations around its digital presence shifted dramatically. The old
              site had only a few basic pages and was built as a compliance formality, offering little context about the group&apos;s
              structure, business units, or long-term vision.
            </p>
            <p className={TEXT_STYLE_BODY_SUBTLE}>
              This was problematic for both investors and partners. Institutional investors needed timely and transparent access to
              financial reports. Retail visitors were often confused about the company&apos;s relationship with subsidiaries like SF
              Sekuritas or SFUND. And prospective partners lacked a clear picture of what SF Capital actually does.
            </p>
          </div>

          <div className="flex w-full max-w-[800px] flex-col gap-[16px]">
            <h3 className={TEXT_STYLE_H4}>That insight led us to design a new product:</h3>
            <p className={TEXT_STYLE_BODY_SUBTLE}>
              A modern, responsive website that clearly introduces SF Capital as a multi-entity financial group, while also providing the
              trust signals required by public company stakeholders.
            </p>
          </div>

          <div className="flex w-full max-w-[800px] flex-col gap-[16px]">
            <h3 className={TEXT_STYLE_H4}>This led us to the development of three key modules:</h3>
            <BodyMixedParagraph
              strong="Corporate Overview "
              light="→ a section that introduces SF Capital's role as a holding company, along with its investment philosophy, governance structure, and long-term goals."
            />
            <BodyMixedParagraph
              strong="Subsidiary Navigator "
              light="→ a modular layout that visually clarifies the different companies under the SF Capital group, including SF Sekuritas, SFUND, and SF Ventures."
            />
            <BodyMixedParagraph
              strong="Investor Relations (IR) "
              light="→ a structured space for IDX filings, financial reports, and investor disclosures, making it easy for stakeholders to find verified updates."
            />
          </div>

          <div className="flex w-full max-w-[800px] flex-col gap-[16px]">
            <h3 className={TEXT_STYLE_H4}>The intention behind these features was clear:</h3>
            <p className={TEXT_STYLE_BODY_SUBTLE}>
              To build investor trust and business credibility by presenting SF Capital as a serious, transparent, and strategically
              structured public company, not just through words, but through clear architecture and thoughtful interaction design.
            </p>
          </div>

          <div className="flex w-full max-w-[800px] flex-col gap-[16px]">
            <CaseSectionImage
              src={PUBLIC_CASE_SFC.oldWebsiteDesign}
              alt="Old SF Capital website design"
              caption="Old SF Capital Website Design"
            />
          </div>
        </section>

        <section className="flex flex-col items-center gap-[48px] py-[80px]">
          <div className="flex w-full max-w-[800px] flex-col gap-[16px]">
            <h2 className={TEXT_STYLE_H3}>B. Design Process</h2>
            <p className={TEXT_STYLE_BODY_SUBTLE}>
              I worked directly with the Director and Corporate Secretary to understand regulatory expectations, business goals, and how
              investors typically consume IR content. Since this was a high-urgency project tied to the IPO timeline, most iterations
              happened in real-time over working sessions.
            </p>
            <p className={TEXT_STYLE_BODY_SUBTLE}>
              This wasn&apos;t just a UI facelift, it required thinking about how to represent a growing financial ecosystem under one
              coherent brand voice.
            </p>
          </div>

          <div className="flex w-full max-w-[800px] flex-col gap-[16px]">
            <h3 className={TEXT_STYLE_H4}>User Goals</h3>
            <BodyMixedParagraph
              strong="Understand what SF Capital actually does "
              light="→ By redesigning the homepage and corporate section, users can quickly grasp that SF Capital is a holding company with diverse subsidiaries in financial services."
            />
            <BodyMixedParagraph
              strong="Find relevant information about subsidiaries "
              light="→ A visual navigator helps users explore different entities like SF Sekuritas, SFUND, and SF Ventures without leaving the main site or getting confused about ownership."
            />
            <BodyMixedParagraph
              strong="Access verified financial reports and IDX filings "
              light="→ Through a dedicated Investor Relations (IR) section, public investors and analysts can download quarterly reports, prospectuses, and other key filings easily."
            />
          </div>

          <div className="flex w-full max-w-[800px] flex-col gap-[16px]">
            <h3 className={TEXT_STYLE_H4}>Business Goals</h3>
            <BodyMixedParagraph
              strong="Present SF Capital as a credible, listed financial group "
              light="→ The new site introduces SF Capital with clear, professional messaging that reflects the company's maturity and strategic direction."
            />
            <BodyMixedParagraph
              strong="Support investor confidence and compliance "
              light="→ The IR section ensures that the company meets OJK/IDX transparency standards, while also giving investors a reason to trust the brand beyond minimum compliance."
            />
            <BodyMixedParagraph
              strong="Clarify holding structure across all subsidiaries "
              light="→ Rather than treat each entity in isolation, the website visually positions subsidiaries as part of one strategic group, supporting cross-brand recognition and synergy."
            />
            <BodyMixedParagraph
              strong="Build a modern, mobile-friendly presence "
              light="→ The new design uses a fluid layout that ensures easy reading and navigation across all devices, including phones and tablets."
            />
          </div>

          <div className="flex w-full max-w-[800px] flex-col gap-[16px]">
            <h3 className={TEXT_STYLE_H4}>Key Findings</h3>
            <p className={TEXT_STYLE_BODY_SUBTLE}>
              With goals aligned, I benchmarked other platforms like Saratoga and Northstar to gather answers to specific questions:
            </p>
            <CaseSectionImage
              src={PUBLIC_CASE_SFC.benchmarkingSaratoga}
              alt="Benchmarking Saratoga website"
              caption="Benchmarking from Saratoga website"
            />
            <CaseSectionImage
              src={PUBLIC_CASE_SFC.benchmarkingNorthstar}
              alt="Benchmarking Northstar website"
              caption="Benchmarking from Northstar website"
            />
          </div>

          <div className="flex w-full max-w-[800px] flex-col gap-[16px]">
            <BodyMixedParagraph
              strong="How do listed holding companies structure their websites? "
              light="→ Many firms like Northstar and Saratoga use a split homepage that separates their corporate narrative from their investment portfolio. This helped us rethink SF Capital's layout into two flows: one that tells the company story, and one that shows the business ecosystem."
            />
            <BodyMixedParagraph
              strong="How is investor information typically surfaced? "
              light="→ Saratoga's IR section is structured chronologically, with downloadable PDFs, charts, and key metrics surfaced up front. Northstar uses a minimalist approach but lacks file clarity. SF Capital's IR page adopted the best of both: clarity in document categories and ease of access."
            />
            <BodyMixedParagraph
              strong="How should subsidiaries be represented? "
              light="→ Most holding companies either list all subsidiaries in text or separate them completely. SF Capital takes a visual module approach, grouping subsidiaries with logos, descriptions, and CTA links, all within the parent site."
            />
          </div>

          <div className="flex w-full max-w-[800px] flex-col gap-[16px]">
            <CaseSectionImage
              src={PUBLIC_CASE_SFC.featureAspectTable}
              alt="Feature aspect comparison table"
              caption="Feature Aspect Table"
            />
          </div>
        </section>

        <section className="flex flex-col items-center gap-[48px] py-[80px]">
          <div className="flex w-full max-w-[800px] flex-col">
            <h2 className={TEXT_STYLE_H3}>C. Design Preview</h2>
          </div>

          <div className="flex w-full max-w-[800px] flex-col gap-[16px]">
            <h3 className={TEXT_STYLE_H4}>Homepage</h3>
            <p className={TEXT_STYLE_BODY_SUBTLE}>
              The homepage introduces SF Capital as a holding company, with two main entry points: an overview of the company&apos;s role,
              and a gateway into its business ecosystem.
            </p>
            <CaseSectionImage
              src={PUBLIC_CASE_SFC.newHomepage}
              alt="New SF Capital homepage"
              caption="New SF Capital Homepage"
            />
          </div>

          <div className="flex w-full max-w-[800px] flex-col gap-[16px]">
            <h3 className={TEXT_STYLE_H4}>Subsidiary Navigator</h3>
            <p className={TEXT_STYLE_BODY_SUBTLE}>
              This section shows the main subsidiaries under SF Capital: SF Sekuritas, Dipay, etc. Each is presented as part of a cohesive
              group, while linking out to their respective sites.
            </p>
            <CaseSectionImage
              src={PUBLIC_CASE_SFC.newPortfolioSection}
              alt="New portfolio section"
              caption="New Portfolio Section"
            />
          </div>

          <div className="flex w-full max-w-[800px] flex-col gap-[16px]">
            <h3 className={TEXT_STYLE_H4}>Investor Relations (IR) Page</h3>
            <p className={TEXT_STYLE_BODY_SUBTLE}>
              The IR section includes quarterly and annual reports, IDX disclosures, and shareholder information, organized by type and
              chronology for maximum accessibility.
            </p>
            <CaseSectionImage src={PUBLIC_CASE_SFC.newIrPage} alt="New IR page" caption="New IR page" />
          </div>

          <div className="flex w-full max-w-[800px] flex-col gap-[16px]">
            <h3 className={TEXT_STYLE_H4}>Responsive Layout</h3>
            <p className={TEXT_STYLE_BODY_SUBTLE}>
              Every section was designed using a 12-column fluid grid to support all breakpoints, with mobile-first behavior especially for
              key investor actions.
            </p>
            <CaseSectionImage
              src={PUBLIC_CASE_SFC.responsiveViews}
              alt="Responsive views homepage, portfolio and IR section"
              caption="Responsive views homepage, portfolio & IR section"
            />
          </div>

          <div className="flex w-full max-w-[800px] flex-col gap-[16px]">
            <h3 className={TEXT_STYLE_H4}>Foundation Design System</h3>
            <p className={TEXT_STYLE_BODY_SUBTLE}>
              To ensure visual consistency and enable scalable growth, I introduced a lightweight design system for SF Capital&apos;s web.
            </p>
            <div className={TEXT_STYLE_BODY_SUBTLE}>
              <p className="font-normal">It covered:</p>
              <ul className="ms-[24px] list-disc">
                <li>Typography scale for different levels of content (title, heading, etc)</li>
                <li>Color tokens reflecting trust and corporate maturity (e.g., deep blue, soft grays, accent orange)</li>
                <li>Components for IR cards, navigation tabs, CTAs, and content sections</li>
                <li>Grid system based on 12-column responsive layout principles</li>
              </ul>
            </div>
            <CaseSectionImage
              src={PUBLIC_CASE_SFC.designSystemPreview}
              alt="Design system preview"
              caption="Design System Preview"
            />
            <p className={TEXT_STYLE_BODY_SUBTLE}>
              This system now acts as a visual backbone, helping the brand remain consistent across future updates, disclosures, or product
              expansions.
            </p>
          </div>
        </section>

        <section className="flex flex-col items-center gap-[48px] py-[80px]">
          <div className="flex w-full max-w-[800px] flex-col gap-[16px]">
            <h2 className={TEXT_STYLE_H3}>D. Learnings</h2>
            <p className={TEXT_STYLE_BODY_SUBTLE}>
              This project taught me that designing for corporate credibility requires more than just clean visuals, it&apos;s about
              signaling maturity and structure through architecture, tone, and hierarchy.
            </p>
            <div className={TEXT_STYLE_BODY_SUBTLE}>
              <p className="font-normal">I learned to:</p>
              <ul className="ms-[24px] list-disc">
                <li>Align design priorities with regulatory timelines and investor expectations</li>
                <li>Study how real investment groups introduce themselves digitally</li>
                <li>Turn abstract business structures into digestible user flows</li>
              </ul>
            </div>
            <p className={TEXT_STYLE_BODY_SUBTLE}>
              By translating complexity into clarity, the new SF Capital website now reflects the ambition and accountability of a public
              financial group and gives users a clear reason to trust what they see.
            </p>
          </div>

          <div className="flex w-full max-w-[800px] flex-col gap-[16px]">
            <h3 className={TEXT_STYLE_H4}>Live Website</h3>
            <div className="flex flex-wrap items-start gap-[16px]">
              <CaseLinkButton href={sfc.liveHref} label="https://sfcapital.co.id/" />
            </div>
          </div>
        </section>
      </motion.div>

      <section className={CASE_DETAIL_FEATURED_SECTION_CLASS}>
        <div className="mx-auto w-full max-w-[1320px]">
          <SectionFeatureHeaderMotionRow isDimmed={activeArrowId !== null}>
            <SectionFeatureHeaderTitleBlock
              title="Featured Designs Case"
              description="Selected products I've designed, from launched platforms to ongoing builds."
            />
            <SectionFeatureHeaderDesktopCta href="/designs">See All Designs</SectionFeatureHeaderDesktopCta>
          </SectionFeatureHeaderMotionRow>

          <div className="grid grid-cols-1 gap-[24px] lg:grid-cols-2">
            {renderRelatedCaseCard(relatedCards[0])}
            {renderRelatedCaseCard(relatedCards[1])}
          </div>
          <SectionFeatureHeaderMobileCta href="/designs">See All Designs</SectionFeatureHeaderMobileCta>
        </div>
      </section>
    </>
  );
}

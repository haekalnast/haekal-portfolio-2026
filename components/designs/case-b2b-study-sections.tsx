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
import { PUBLIC_CASE_B2B } from "@/lib/public-assets";
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

export function CaseB2bStudySections({
  activeArrowId,
  relatedCards,
  renderRelatedCaseCard,
}: {
  activeArrowId: string | null;
  relatedCards: [CaseSlug, CaseSlug];
  renderRelatedCaseCard: (slug: CaseSlug) => ReactElement;
}) {
  const b2b = CASE_DESIGNS.b2b;

  return (
    <>
      <motion.div
        initial={false}
        animate={getGlobalFocusMotionAnimate(activeArrowId !== null)}
        transition={{ duration: PREMIUM_DURATION, ease: PREMIUM_EASE }}
      >
        <section className="flex flex-col items-center gap-[48px]">
          <div className="flex w-full max-w-[800px] flex-col gap-[24px]">
            <p className="text-[16px] leading-[24px] text-black">Dipay Disbursement</p>
            <div className="flex flex-col gap-[16px]">
              <h1 className={`${TEXT_STYLE_H2} font-normal`}>Streamlining B2B Payouts with Dipay Disbursement</h1>
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
              src={PUBLIC_CASE_B2B.heroMockup}
              alt="Dipay Disbursement — enterprise dashboard hero"
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
                I led the 0-to-1 product design of Dipay Disbursement, a scalable payout platform for enterprise clients. It enables bulk
                transactions via Excel or CSV upload, real-time tracking, and reconciliation exports. The platform empowers HR,
                accounting, and finance teams to move money faster with confidence and transparency, while reducing support tickets and
                operational overhead.
              </p>
            </div>
            <div className="h-px w-full bg-[#DEDEE0]" />
            <div className="flex flex-col gap-[16px] px-[24px]">
              <h3 className={TEXT_STYLE_H4}>Live Website</h3>
              <div className="flex flex-wrap items-start gap-[16px]">
                <CaseLinkButton href={b2b.liveHref} label="https://enterprise.dipay.id/login" />
              </div>
            </div>
          </div>
        </section>

        <section className="flex flex-col items-center gap-[48px] py-[80px]">
          <div className="flex w-full max-w-[800px] flex-col gap-[16px]">
            <h2 className={TEXT_STYLE_H3}>A. Knowing the Why?</h2>
            <p className={TEXT_STYLE_BODY_SUBTLE}>
              While Dipay had long served individual users with personal finance features, the company lacked a platform for businesses to
              send money at scale, whether for payroll, vendor payments, or project-based disbursements.
            </p>
            <p className={TEXT_STYLE_BODY_SUBTLE}>
              At the time, there was no live product, only raw wireframes and a working internal title: &ldquo;Dipay Enterprise&rdquo;. The
              goal was clear — to help businesses process large volumes of outbound transfers reliably in a single flow.
            </p>
            <p className={TEXT_STYLE_BODY_SUBTLE}>
              Together with 2 product designers and a PM, I led the design of Dipay&apos;s first B2B-facing platform, launched publicly as
              Dipay Disbursement.
            </p>
          </div>

          <div className="flex w-full max-w-[800px] flex-col gap-[16px]">
            <h3 className={TEXT_STYLE_H4}>That insight led us to design a new product:</h3>
            <BodyMixedParagraph
              strong="Dipay Disbursement "
              light="→ a transactional tool built to simplify bulk transfers, track real-time statuses, and support enterprise-scale reconciliation with minimal manual effort."
            />
          </div>

          <div className="flex w-full max-w-[800px] flex-col gap-[16px]">
            <h3 className={TEXT_STYLE_H4}>This led us to the development of three key modules:</h3>
            <BodyMixedParagraph
              strong="Dashboard Overview "
              light="→ provides high-level metrics and batch summaries for a quick operational glance."
            />
            <BodyMixedParagraph
              strong="Bulk Upload & Review Flow "
              light="→ upload hundreds of rows at once, validate in real time, and confirm with confidence."
            />
            <BodyMixedParagraph
              strong="Transaction Logs & Export "
              light="→ lets teams filter results, find failures, and download clean reports for reconciliation."
            />
            <BodyMixedParagraph
              strong="Multi-Account Management (Admin only) "
              light="→ Admins can manage multiple &ldquo;Maker&rdquo; accounts under one company. This includes inviting users, activating roles, and removing access."
            />
          </div>

          <div className="flex w-full max-w-[800px] flex-col gap-[16px]">
            <h3 className={TEXT_STYLE_H4}>The intention behind these features was clear:</h3>
            <p className={TEXT_STYLE_BODY_SUBTLE}>
              To help business teams disburse funds with confidence, eliminate friction in operations, and gain full control over their
              transaction pipelines.
            </p>
          </div>

          <div className="flex w-full max-w-[800px] flex-col gap-[16px]">
            <CaseSectionImage
              src={PUBLIC_CASE_B2B.oldLoginWireframe}
              alt="Old login page Dipay Enterprise wireframe"
              caption="Old Login Page Dipay Enterprise (Wireframe)"
            />
            <CaseSectionImage
              src={PUBLIC_CASE_B2B.oldDashboardWireframe}
              alt="Old dashboard Dipay Enterprise wireframe"
              caption="Old Dashboard Dipay Enterprise (Wireframe)"
            />
          </div>
        </section>

        <section className="flex flex-col items-center gap-[48px] py-[80px]">
          <div className="flex w-full max-w-[800px] flex-col gap-[16px]">
            <h2 className={TEXT_STYLE_H3}>B. Design Process</h2>
            <p className={TEXT_STYLE_BODY_SUBTLE}>
              We started with aligning user needs and business priorities, then evaluated existing solutions in the market to find gaps and
              opportunities.
            </p>
          </div>

          <div className="flex w-full max-w-[800px] flex-col gap-[16px]">
            <h3 className={TEXT_STYLE_H4}>User Goals</h3>
            <BodyMixedParagraph
              strong="Perform bulk transactions efficiently "
              light="→ Upload Excel or CSV files with thousands of rows, validate them in real-time, and confirm confidently."
            />
            <BodyMixedParagraph
              strong="Minimize transfer errors and delays "
              light="→ Provide downloadable templates and real-time feedback so issues can be fixed immediately."
            />
            <BodyMixedParagraph
              strong="Track and reconcile payouts easily "
              light="→ Real-time statuses, filters, and exports designed for accounting and finance workflows."
            />
            <BodyMixedParagraph
              strong="Manage team access securely "
              light="→ Allow Admins to create, activate, and monitor multiple user roles under a single company account."
            />
          </div>

          <div className="flex w-full max-w-[800px] flex-col gap-[16px]">
            <h3 className={TEXT_STYLE_H4}>Business Goals</h3>
            <BodyMixedParagraph
              strong="Lower support and ops load "
              light="→ Users should be able to resolve issues themselves through clear feedback and guided flows."
            />
            <BodyMixedParagraph
              strong="Win and retain enterprise clients "
              light="→ Offer a seamless bulk disbursement tool as a competitive edge in the growing B2B payments market."
            />
          </div>

          <div className="flex w-full max-w-[800px] flex-col gap-[16px]">
            <h3 className={TEXT_STYLE_H4}>Key Findings</h3>
            <p className={TEXT_STYLE_BODY_SUBTLE}>
              We looked into Flip Business and Mekari Talenta to understand how other platforms approached bulk disbursement flows, and
              where we could improve.
            </p>
            <CaseSectionImage
              src={PUBLIC_CASE_B2B.benchmarkingFlip}
              alt="Benchmarking Flip for Business"
              caption="Benchmarking from Flip for Business"
            />
            <CaseSectionImage
              src={PUBLIC_CASE_B2B.benchmarkingMekari}
              alt="Benchmarking Mekari Talenta"
              caption="Benchmarking from Mekari Talenta"
            />
          </div>

          <div className="flex w-full max-w-[800px] flex-col gap-[16px]">
            <BodyMixedParagraph
              strong="How are bulk transactions handled? "
              light="→ Flip offers basic CSV support with no feedback. We added templates, size limits, and preview before confirmation."
            />
            <BodyMixedParagraph
              strong="How is status communicated? "
              light="→ Talenta uses tabs to separate transaction types. We chose inline colored status chips, visible directly in the transaction table."
            />
            <BodyMixedParagraph
              strong="How is reconciliation supported? "
              light="→ Others offer generic exports. We added custom column selectors and date filters to match enterprise accounting needs."
            />
          </div>

          <div className="flex w-full max-w-[800px] flex-col gap-[16px]">
            <CaseSectionImage
              src={PUBLIC_CASE_B2B.featureAspectTable}
              alt="Feature aspect comparison table"
              caption="Feature Aspect Table"
            />
            <p className={TEXT_STYLE_BODY_SUBTLE}>
              These insights helped us design a product that doesn&apos;t just &ldquo;do the job&rdquo;, but helps users feel in control
              every step of the way.
            </p>
          </div>
        </section>

        <section className="flex flex-col items-center gap-[48px] py-[80px]">
          <div className="flex w-full max-w-[800px] flex-col">
            <h2 className={TEXT_STYLE_H3}>C. Design Preview</h2>
          </div>

          <div className="flex w-full max-w-[800px] flex-col gap-[16px]">
            <h3 className={TEXT_STYLE_H4}>Login Page</h3>
            <p className={TEXT_STYLE_BODY_SUBTLE}>
              Designed with secure business credential logic, company ID, email, password, as the starting point for enterprise separation.
            </p>
            <CaseSectionImage src={PUBLIC_CASE_B2B.newLogin} alt="New login page Dipay Disbursement" caption="New Login Page" />
          </div>

          <div className="flex w-full max-w-[800px] flex-col gap-[16px]">
            <h3 className={TEXT_STYLE_H4}>Dashboard</h3>
            <p className={TEXT_STYLE_BODY_SUBTLE}>
              Provides visual summaries of transaction counts and amounts, with filterable graph by time period and transaction status.
            </p>
            <CaseSectionImage src={PUBLIC_CASE_B2B.newHomepage} alt="New dashboard homepage" caption="New Homepage" />
          </div>

          <div className="flex w-full max-w-[800px] flex-col gap-[16px]">
            <h3 className={TEXT_STYLE_H4}>Bulk Transaction Upload</h3>
            <BodyMixedParagraph
              strong="Download template "
              light="→ Upload CSV/Excel (max 10,000 rows) → Review validation results → Confirm. Helps reduce upload friction while increasing data accuracy."
            />
            <CaseSectionImage
              src={PUBLIC_CASE_B2B.newTransactions}
              alt="New transactions page bulk upload"
              caption="New Transactions Page"
            />
          </div>

          <div className="flex w-full max-w-[800px] flex-col gap-[16px]">
            <h3 className={TEXT_STYLE_H4}>Transaction Logs</h3>
            <p className={TEXT_STYLE_BODY_SUBTLE}>
              Full log of transactions with inline status, filters (by date, bank, status, and keyword), and actions like view details and
              export.
            </p>
            <CaseSectionImage
              src={PUBLIC_CASE_B2B.newHistoryTransactions}
              alt="New history transactions page"
              caption="New History Transactions Page"
            />
          </div>

          <div className="flex w-full max-w-[800px] flex-col gap-[16px]">
            <h3 className={TEXT_STYLE_H4}>Deposit</h3>
            <p className={TEXT_STYLE_BODY_SUBTLE}>
              Users can initiate balance top-ups, select preferred bank accounts, and track payment history.
            </p>
            <CaseSectionImage src={PUBLIC_CASE_B2B.newDeposit} alt="New deposit page" caption="New Deposit Page" />
            <CaseSectionImage src={PUBLIC_CASE_B2B.newTopUp} alt="New top up page" caption="New Top up Page" />
          </div>

          <div className="flex w-full max-w-[800px] flex-col gap-[16px]">
            <h3 className={TEXT_STYLE_H4}>Admin Settings</h3>
            <p className={TEXT_STYLE_BODY_SUBTLE}>
              Admins can upload company logo, update contact information and adjust deposit notification settings.
            </p>
            <CaseSectionImage src={PUBLIC_CASE_B2B.newProfile} alt="New profile page" caption="New Profile Page" />
          </div>

          <div className="flex w-full max-w-[800px] flex-col gap-[16px]">
            <h3 className={TEXT_STYLE_H4}>Multi-Account Management</h3>
            <p className={TEXT_STYLE_BODY_SUBTLE}>
              Admins can invite Makers, monitor account status (Active / Not Active), and manage user access — centralizing organizational
              control in one place.
            </p>
            <CaseSectionImage
              src={PUBLIC_CASE_B2B.newMultiAccount}
              alt="New multi-account management page"
              caption="New Multi-Account Page"
            />
          </div>
        </section>

        <section className="flex flex-col items-center gap-[48px] py-[80px]">
          <div className="flex w-full max-w-[800px] flex-col gap-[16px]">
            <h2 className={TEXT_STYLE_H3}>D. Learnings</h2>
            <p className={TEXT_STYLE_BODY_SUBTLE}>
              Designing Dipay Disbursement taught me that B2B UX must prioritize clarity, reliability, and precision over visual complexity.
            </p>
            <div className={TEXT_STYLE_BODY_SUBTLE}>
              <p className="font-normal">Key takeaways:</p>
              <ul className="ms-[24px] list-disc">
                <li>Enterprise users value stability and autonomy, if flows are clear, they won&apos;t need support.</li>
                <li>Small touches, like row-level error indicators and templated CSVs, can drastically reduce drop-offs and user frustration.</li>
                <li>A well-designed platform isn&apos;t just usable, it makes ops teams feel confident and in control.</li>
              </ul>
            </div>
            <p className={TEXT_STYLE_BODY_SUBTLE}>
              Dipay Disbursement went from internal concept to live product in under 6 months and remains a cornerstone in Dipay&apos;s
              enterprise strategy.
            </p>
          </div>

          <div className="flex w-full max-w-[800px] flex-col gap-[16px]">
            <h3 className={TEXT_STYLE_H4}>Live Website</h3>
            <div className="flex flex-wrap items-start gap-[16px]">
              <CaseLinkButton href={b2b.liveHref} label="https://enterprise.dipay.id/login" />
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

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
import { PUBLIC_CASE_OCTO } from "@/lib/public-assets";
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

export function CaseOctoStudySections({
  activeArrowId,
  relatedCards,
  renderRelatedCaseCard,
}: {
  activeArrowId: string | null;
  relatedCards: [CaseSlug, CaseSlug];
  renderRelatedCaseCard: (slug: CaseSlug) => ReactElement;
}) {
  const octo = CASE_DESIGNS.octo;

  return (
    <>
      <motion.div
        initial={false}
        animate={getGlobalFocusMotionAnimate(activeArrowId !== null)}
        transition={{ duration: PREMIUM_DURATION, ease: PREMIUM_EASE }}
      >
        <section className="flex flex-col items-center gap-[48px]">
          <div className="flex w-full max-w-[800px] flex-col gap-[24px]">
            <p className="text-[16px] leading-[24px] text-black">OCTO Merchant</p>
            <div className="flex flex-col gap-[16px]">
              <h1 className={`${TEXT_STYLE_H2} font-normal`}>Simplifying QRIS Onboarding for Small Businesses</h1>
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
          <div className={cn(CASE_DETAIL_MEDIA_FRAME, "max-w-[800px]")}>
            <Image
              src={PUBLIC_CASE_OCTO.heroMockup}
              alt="OCTO Merchant — onboarding case study hero"
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
                I designed the onboarding flow for OCTO Merchant, CIMB Niaga&apos;s first merchant-focused app built to help small
                businesses register for QRIS. My work focused on mapping and structuring flows for new-to-bank and existing-to-bank
                merchants, covering all KYC, business validation, and follow-up logic. The final UI was executed by a vendor based on
                the foundation I delivered.
              </p>
            </div>
            <div className="h-px w-full bg-[#DEDEE0]" />
            <div className="flex flex-col gap-[16px] px-[24px]">
              <h3 className={TEXT_STYLE_H4}>Live Mobile App</h3>
              <div className="flex flex-wrap items-start gap-[16px]">
                {octo.appStoreHref ? <CaseLinkButton href={octo.appStoreHref} label="App Store" /> : null}
                <CaseLinkButton href={octo.liveHref} label="Play Store" />
              </div>
            </div>
          </div>
        </section>

        <section className="flex flex-col items-center gap-[48px] py-[80px]">
          <div className="flex w-full max-w-[800px] flex-col gap-[16px]">
            <h2 className={TEXT_STYLE_H3}>A. Knowing the Why?</h2>
            <p className={TEXT_STYLE_BODY_SUBTLE}>
              At the time OCTO Merchant was initiated, CIMB Niaga had no standalone app tailored for merchants. Most QRIS registration
              was handled manually or offline, and early government rollout efforts showed that many small business owners still lacked
              access to easy digital tools or didn&apos;t fully understand the benefit of QR payments.
            </p>
            <p className={TEXT_STYLE_BODY_SUBTLE}>
              This presented a unique opportunity → design a mobile-first onboarding experience from scratch, one that&apos;s intuitive
              enough for first-time users, but compliant with Bank Indonesia&apos;s QRIS regulations.
            </p>
          </div>

          <div className="flex w-full max-w-[800px] flex-col gap-[16px]">
            <h3 className={TEXT_STYLE_H4}>That insight led us to design a new product:</h3>
            <BodyMixedParagraph
              strong="A split-flow onboarding experience "
              light="→ that adapts to the user&apos;s relationship with the bank, shortening steps for ETB merchants, and guiding NTB users through registration and e-KYC."
            />
          </div>

          <div className="flex w-full max-w-[800px] flex-col gap-[16px]">
            <h3 className={TEXT_STYLE_H4}>This led us to the development of two distinct onboarding flows:</h3>
            <BodyMixedParagraph
              strong="NTB Flow "
              light="→ Full onboarding journey including personal/business identity verification, e-KYC, and bank account creation."
            />
            <BodyMixedParagraph
              strong="ETB Flow "
              light="→ Shortened flow that leverages existing bank data to fast-track QRIS registration and business verification."
            />
          </div>

          <div className="flex w-full max-w-[800px] flex-col gap-[16px]">
            <h3 className={TEXT_STYLE_H4}>The intention behind these flows was clear:</h3>
            <p className={TEXT_STYLE_BODY_SUBTLE}>
              To make QRIS adoption seamless and scalable for SMEs, regardless of their banking status, while reducing dependency on
              manual field agents or branch visits.
            </p>
          </div>
        </section>

        <section className="flex flex-col items-center gap-[48px] py-[80px]">
          <div className="flex w-full max-w-[800px] flex-col gap-[16px]">
            <h2 className={TEXT_STYLE_H3}>B. Design Process</h2>
            <p className={TEXT_STYLE_BODY_SUBTLE}>
              I collaborated with internal product owners, compliance teams, and onboarding staff to understand the full requirements,
              from documentation and approval flows to channel follow-up.
            </p>
            <p className={TEXT_STYLE_BODY_SUBTLE}>
              I also studied competitor flows and marketing strategies to identify pain points and potential enhancements, particularly
              how other apps simplify onboarding for digitally inexperienced merchants.
            </p>
            <p className={TEXT_STYLE_BODY_SUBTLE}>
              All logic and screens were structured via detailed user flows, followed by low-to-mid fidelity wireframes used in vendor
              handoff and internal validation.
            </p>
          </div>

          <div className="flex w-full max-w-[800px] flex-col gap-[16px]">
            <h3 className={TEXT_STYLE_H4}>User Goals</h3>
            <BodyMixedParagraph
              strong="Register for QRIS smoothly with minimal confusion "
              light="→ Both flows were structured to feel familiar and reassuring, even to users with low digital literacy."
            />
            <BodyMixedParagraph
              strong="Know which documents are required upfront "
              light="→ Clear microcopy and visual cues helped merchants understand each input or upload requirement."
            />
            <BodyMixedParagraph
              strong="Complete the process via mobile "
              light="→ The flows were fully mobile-first, allowing merchants to onboard from anywhere without visiting a branch."
            />
          </div>

          <div className="flex w-full max-w-[800px] flex-col gap-[16px]">
            <h3 className={TEXT_STYLE_H4}>Business Goals</h3>
            <BodyMixedParagraph
              strong="Acquire merchants at scale without agent dependency "
              light="→ Self-service onboarding reduces operational load and helps CIMB reach merchants in remote or unbanked areas."
            />
            <BodyMixedParagraph
              strong="Comply with QRIS and e-KYC regulations "
              light="→ Flows were aligned with Bank Indonesia&apos;s requirements, including document type, size, and upload structure."
            />
            <BodyMixedParagraph
              strong="Educate a low-awareness merchant segment "
              light="→ Many merchants were unfamiliar with QRIS and digital onboarding. The experience was designed to educate and convert, not just collect data."
            />
          </div>

          <div className="flex w-full max-w-[800px] flex-col gap-[16px]">
            <h3 className={TEXT_STYLE_H4}>Key Findings</h3>
            <p className={TEXT_STYLE_BODY_SUBTLE}>
              With goals aligned, I benchmarked Nobu Bank and GoBiz (by Gojek) to understand different onboarding approaches from both
              a banking and PJSP perspective:
            </p>
            <CaseSectionImage
              src={PUBLIC_CASE_OCTO.benchmarking}
              alt="Benchmarking merchant onboarding platforms"
              caption="Benchmarking from other merchant platforms"
            />
          </div>

          <div className="flex w-full max-w-[800px] flex-col gap-[16px]">
            <BodyMixedParagraph
              strong="How do platforms distinguish between ETB and NTB merchants? "
              light="→ Nobu&apos;s entry flow is linear, often unclear. We introduced a clear entry selector to route users appropriately, reducing drop-offs."
            />
            <BodyMixedParagraph
              strong="How do competitors handle education and awareness? "
              light="→ GoBiz includes merchant success stories, but requires multiple app hops. We chose to embed welcome kit materials directly into OCTO Merchant to minimize friction."
            />
            <BodyMixedParagraph
              strong="What design patterns help low-literacy users? "
              light="→ Many PJSPs lack visual document examples. OCTO Merchant uses simplified upload interfaces with image guidance and real-time validation."
            />
          </div>

          <div className="flex w-full max-w-[800px] flex-col gap-[16px]">
            <CaseSectionImage
              src={PUBLIC_CASE_OCTO.featureAspectTable}
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
            <h3 className={TEXT_STYLE_H4}>NTB Onboarding User Flow</h3>
            <p className={TEXT_STYLE_BODY_SUBTLE}>
              A full onboarding path for new merchants including identity verification, business validation, and account creation,
              designed to comply with e-KYC requirements.
            </p>
            <CaseSectionImage
              src={PUBLIC_CASE_OCTO.flowNtb}
              alt="Process flow onboarding merchant NTB"
              caption="Process Flow Onboarding Merchant (NTB)"
            />
          </div>

          <div className="flex w-full max-w-[800px] flex-col gap-[16px]">
            <h3 className={TEXT_STYLE_H4}>ETB Onboarding User Flow</h3>
            <p className={TEXT_STYLE_BODY_SUBTLE}>
              A shorter, simplified flow that pulls data from CIMB&apos;s existing records and minimizes required input from merchants.
            </p>
            <CaseSectionImage
              src={PUBLIC_CASE_OCTO.flowEtb}
              alt="Process flow onboarding merchant ETB"
              caption="Process Flow Onboarding Merchant (ETB)"
            />
          </div>

          <div className="flex w-full max-w-[800px] flex-col gap-[16px]">
            <h3 className={TEXT_STYLE_H4}>Welcome Kit Experience</h3>
            <p className={TEXT_STYLE_BODY_SUBTLE}>
              After registration, merchants receive a visual welcome kit outlining QRIS usage, account activation status, and contact
              info, delivered digitally via the app.
            </p>
            <CaseSectionImage
              src={PUBLIC_CASE_OCTO.welcomeKit}
              alt="Welcome kit OCTO Merchant"
              caption="Welcome Kit OCTO Merchant"
            />
          </div>

          <div className="flex w-full max-w-[800px] flex-col gap-[16px]">
            <h3 className={TEXT_STYLE_H4}>UI Mobile Preview</h3>
            <p className={TEXT_STYLE_BODY_SUBTLE}>
              Sample mobile screen to illustrate how input forms, document uploads, and progress tracking were structured for clarity and
              accessibility.
            </p>
            <CaseSectionImage
              src={PUBLIC_CASE_OCTO.mobileUiPreview}
              alt="Mobile UI preview OCTO Merchant"
              caption="Mobile UI Preview"
            />
          </div>
        </section>

        <section className="flex flex-col items-center gap-[48px] py-[80px]">
          <div className="flex w-full max-w-[800px] flex-col gap-[16px]">
            <h2 className={TEXT_STYLE_H3}>D. Learnings</h2>
            <p className={TEXT_STYLE_BODY_SUBTLE}>
              This project gave me the opportunity to define critical logic and flows for a high-impact, first-time banking product,
              even before UI came into play.
            </p>
            <div className={TEXT_STYLE_BODY_SUBTLE}>
              <p>Key lessons included:</p>
              <ul className="ms-[24px] list-disc">
                <li>Balancing regulatory structure with a lightweight, friendly experience</li>
                <li>Designing for handoff, ensuring flow clarity for external vendors</li>
                <li>Educating users as part of onboarding, not as a separate campaign</li>
                <li>Benchmarking banks and PJSPs side-by-side to find best UX practices</li>
              </ul>
            </div>
            <p className={TEXT_STYLE_BODY_SUBTLE}>
              Even before pixels were applied, well-structured user flows gave CIMB the foundation needed to launch OCTO Merchant as a
              national onboarding tool for QRIS adoption.
            </p>
          </div>

          <div className="flex w-full max-w-[800px] flex-col gap-[16px]">
            <h3 className={TEXT_STYLE_H4}>Live Mobile App</h3>
            <div className="flex flex-wrap items-start gap-[16px]">
              {octo.appStoreHref ? <CaseLinkButton href={octo.appStoreHref} label="App Store" /> : null}
              <CaseLinkButton href={octo.liveHref} label="Play Store" />
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

"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  ARROW_REVEAL_EASE,
  ArrowRevealButton,
  ArrowRevealText,
  getGlobalFocusStyle,
} from "@/components/shared/arrow-reveal";
import { cn } from "@/lib/cn";
import { PUBLIC_HOME_DOCK } from "@/lib/public-assets";
import { useIsMobileViewport } from "@/lib/use-is-mobile-viewport";
import { useScrollRevealActive } from "@/lib/use-scroll-reveal-active";

const FALLBACK_ERROR_ROUTE = "/not-found";

/** Same first-three apps as the mobile dock strip; tap arrow/title on mobile cycles this list. */
const MOBILE_DOCK_CYCLE = ["Figma", "Cursor", "Affinity"] as const;

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

type AboutToolsCardProps = {
  isGlobalDimmed: boolean;
  onArrowHoverStart: () => void;
  onArrowHoverEnd: () => void;
  /** Home uses `mx-auto`; About omits it so width matches the column. */
  articleClassName?: string;
};

export function AboutToolsCard({ isGlobalDimmed, onArrowHoverStart, onArrowHoverEnd, articleClassName }: AboutToolsCardProps) {
  const isMobile = useIsMobileViewport();
  const { ref, isActive } = useScrollRevealActive<HTMLElement>(0.45);
  const [hoveredApp, setHoveredApp] = useState<string | null>(null);
  const [isIconHovered, setIsIconHovered] = useState(false);
  /** Mobile: -1 = no “hover” yet; 0,1,2 = index in MOBILE_DOCK_CYCLE (tap arrow or title advances, loops). */
  const [mobileCycleIdx, setMobileCycleIdx] = useState(-1);

  const isDetailsActive = isMobile || isIconHovered;

  const mobileActiveName = mobileCycleIdx >= 0 ? MOBILE_DOCK_CYCLE[mobileCycleIdx] : null;
  const activeTooltipName = isMobile ? mobileActiveName : hoveredApp;

  const advanceMobileDockCycle = () => {
    setMobileCycleIdx((prev) => (prev < 0 ? 0 : (prev + 1) % MOBILE_DOCK_CYCLE.length));
  };

  /** When the tools card leaves the mobile “in view” zone, clear dock cycle (same ref as scroll-reveal). */
  useEffect(() => {
    if (!isMobile || isActive) return;
    const id = window.setTimeout(() => setMobileCycleIdx(-1), 0);
    return () => window.clearTimeout(id);
  }, [isMobile, isActive]);

  return (
    <article
      ref={ref}
      className={cn("relative w-full overflow-visible transition-all duration-300 lg:w-[648px]", articleClassName)}
      style={getGlobalFocusStyle(isGlobalDimmed)}
    >
      <motion.div
        className="relative h-[324px] overflow-visible rounded-[20px] bg-[#F2F2F2] pl-10 md:pl-0 lg:pl-10"
        initial={false}
        animate={{
          scale: isMobile && isActive ? 1.02 : 1,
        }}
        transition={{ duration: 0.44, ease: ARROW_REVEAL_EASE }}
      >
        <div className="absolute top-6 right-0 bottom-20 flex items-center">
          <div className="relative h-[124px] w-[290px] overflow-x-clip overflow-y-visible md:w-[530px] lg:w-[530px]">
            <div className="absolute top-[39px] left-0 h-[85px] w-[880px] rounded-[20px] border border-[#484848] bg-[rgba(40,40,40,0.6)] shadow-[0_2px_2px_rgba(0,0,0,0.25)] backdrop-blur-[12px]" />
            <div className="absolute top-[48px] left-[6px] flex h-[66px] w-[868px] items-center gap-[5px] md:hidden">
              {dockApps.map((app, index) => {
                const hoverable = index <= 2;
                const isActiveApp = hoverable && activeTooltipName === app.name;
                return (
                  <div
                    key={`mobile-${app.name}`}
                    className="relative"
                    onMouseEnter={!isMobile && hoverable ? () => setHoveredApp(app.name) : undefined}
                    onMouseLeave={!isMobile && hoverable ? () => setHoveredApp(null) : undefined}
                  >
                    <motion.img
                      src={app.icon}
                      alt={app.name}
                      width={66}
                      height={66}
                      className="h-[66px] w-[66px] shrink-0 object-cover"
                      animate={
                        isActiveApp ? { y: -4, scale: 1.12 } : { y: 0, scale: 1 }
                      }
                      transition={{ type: "spring", stiffness: 280, damping: 20 }}
                    />
                    {hoverable && isActiveApp && (
                      <motion.div
                        key={app.name}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className="pointer-events-none absolute -top-10 left-1/2 z-30 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#5A5A5A] px-3 py-1 text-sm text-white shadow-md"
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
            if (isMobile) {
              advanceMobileDockCycle();
              return;
            }
            window.location.href = FALLBACK_ERROR_ROUTE;
          }}
        />
      </motion.div>

      <ArrowRevealText
        isActive={isDetailsActive}
        title="Tools I Use"
        subtitle="The stack behind my work"
        className="relative z-10 mt-4 w-full bg-[#FAFAFA] max-md:pointer-events-auto md:pointer-events-none md:absolute md:left-0 md:top-[332px] md:z-30 md:mt-0"
        onTextClick={isMobile ? advanceMobileDockCycle : undefined}
      />
    </article>
  );
}

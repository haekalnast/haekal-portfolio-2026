"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import type { CSSProperties, MouseEvent, ReactNode } from "react";
import { useCallback, useState } from "react";
import { cn } from "@/lib/cn";
import {
  ARROW_REVEAL_EASE,
  ArrowRevealButton,
  ArrowRevealText,
  getGlobalFocusStyle,
} from "@/components/shared/arrow-reveal";
import { useIsMobileViewport } from "@/lib/use-is-mobile-viewport";
import { useScrollRevealActive } from "@/lib/use-scroll-reveal-active";

/**
 * Gallery cards that advance images only via arrow (desktop) or tapping the mockup (mobile).
 * Hover scales the mockup only — no auto-rotation. Pair with assets such as
 * Creative Journal + About gallery cards — paths in `lib/public-assets.ts` (`PUBLIC_CREATIVE_JOURNAL`, `PUBLIC_ABOUT`).
 */
export type ArrowAdvanceGalleryLayout = "haekal" | "journal-short" | "journal-tall";

type ArrowAdvanceGalleryCardProps = {
  images: readonly string[];
  title: string;
  subtitle: string;
  imageAlt: string;
  arrowAriaLabel: string;
  layout: ArrowAdvanceGalleryLayout;
  onArrowHoverStart: () => void;
  onArrowHoverEnd: () => void;
  isDimmed?: boolean;
  priority?: boolean;
  /** Merged onto layout article classes (e.g. `lg:w-[648px]`). */
  articleClassName?: string;
  /** Wrapper around image frame inside scaled area (e.g. `absolute inset-0 flex items-center justify-center px-10 py-6`). */
  imageStageClassName?: string;
  /** The direct frame that receives `Image fill` (must be positioned). */
  imageFrameClassName?: string;
  /** Object fit/class for image. */
  imageClassName?: string;
};

const LAYOUT = {
  haekal: {
    article: "relative h-[278px] w-full shrink-0 overflow-visible rounded-[20px]",
    mockup: "absolute inset-x-0 top-0 h-[210px] overflow-hidden rounded-[20px] bg-[#F2F2F2]",
    revealText: "max-lg:pointer-events-auto lg:pointer-events-none absolute left-0 top-[218px]",
  },
  "journal-short": {
    article:
      "relative min-h-[280px] w-full overflow-visible transition-all duration-300 lg:min-h-0 lg:h-[210px]",
    mockup: "relative h-[210px] overflow-hidden rounded-[20px] bg-[#F2F2F2]",
    revealText:
      "relative z-10 mt-4 w-full max-lg:pointer-events-auto lg:pointer-events-none lg:absolute lg:left-0 lg:top-[218px] lg:mt-0",
  },
  "journal-tall": {
    article:
      "relative min-h-[524px] w-full overflow-visible transition-all duration-300 lg:min-h-0 lg:h-[444px]",
    mockup: "relative h-[444px] overflow-hidden rounded-[20px] bg-[#F2F2F2]",
    revealText:
      "relative z-10 mt-4 w-full max-lg:pointer-events-auto lg:pointer-events-none lg:absolute lg:left-0 lg:top-[452px] lg:mt-0",
  },
} as const;

/** Haekal layout only — journal layouts use Featured-style `motion` on the mockup wrapper instead. */
function ScaledMockup({ scaleUp, children }: { scaleUp: boolean; children: ReactNode }) {
  return (
    <motion.div
      className="absolute inset-0"
      animate={{ scale: scaleUp ? 1.03 : 1 }}
      transition={{ duration: 0.34, ease: ARROW_REVEAL_EASE }}
    >
      {children}
    </motion.div>
  );
}

export function ArrowAdvanceGalleryCard({
  images,
  title,
  subtitle,
  imageAlt,
  arrowAriaLabel,
  layout,
  onArrowHoverStart,
  onArrowHoverEnd,
  isDimmed = false,
  priority = false,
  articleClassName,
  imageStageClassName,
  imageFrameClassName,
  imageClassName,
}: ArrowAdvanceGalleryCardProps) {
  const [imageIndex, setImageIndex] = useState(0);
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [isIconHovered, setIsIconHovered] = useState(false);
  const isMobile = useIsMobileViewport();
  const { ref, isActive } = useScrollRevealActive<HTMLElement>(0.45);
  const isRevealActive = isIconHovered || isActive;
  /** Same as FeaturedDesignCard (`homepage`): mockup scale from desktop hover OR mobile scroll-reveal. */
  const isHoverState = isCardHovered || isActive;
  const scaleUp = isHoverState;
  const cfg = LAYOUT[layout];
  const resolvedImageStageClassName = imageStageClassName ?? "absolute inset-0";
  const resolvedImageFrameClassName = imageFrameClassName ?? "absolute inset-0";
  const resolvedImageClassName = imageClassName ?? "object-cover";

  const nextImage = useCallback(() => {
    setImageIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const articleStyle: CSSProperties | undefined =
    layout === "haekal" ? undefined : getGlobalFocusStyle(isDimmed);

  const handleMockupClick = () => {
    if (!isMobile) return;
    nextImage();
  };

  const handleArrowClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (isMobile) {
      nextImage();
      return;
    }
    if (!isRevealActive) return;
    nextImage();
  };

  const arrowButton = (
    <ArrowRevealButton
      isActive={isRevealActive}
      ariaLabel={arrowAriaLabel}
      className="flex h-8 w-8 items-center justify-center rounded-[1000px] bg-[#FAFAFA] p-[6px] shadow-[0_0_0_1px_rgba(0,0,0,0.06)] transition-all duration-300"
      onHoverStart={() => {
        setIsIconHovered(true);
        onArrowHoverStart();
      }}
      onHoverEnd={() => {
        setIsIconHovered(false);
        onArrowHoverEnd();
      }}
      onClick={handleArrowClick}
    />
  );

  return (
    <article
      ref={ref}
      className={cn(cfg.article, articleClassName)}
      style={articleStyle}
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => {
        setIsCardHovered(false);
        setIsIconHovered(false);
      }}
    >
      <div
        className={cn(cfg.mockup, isMobile && images.length > 1 && "cursor-pointer")}
        onClick={handleMockupClick}
      >
        {layout === "haekal" ? (
          <ScaledMockup scaleUp={scaleUp}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={images[imageIndex]}
                className={resolvedImageStageClassName}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.36, ease: ARROW_REVEAL_EASE }}
              >
                <div className={resolvedImageFrameClassName}>
                  <Image
                    src={images[imageIndex]}
                    alt={imageAlt}
                    fill
                    className={resolvedImageClassName}
                    priority={priority && imageIndex === 0}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </ScaledMockup>
        ) : (
          <motion.div
            className="absolute inset-0"
            initial={false}
            animate={{
              scale: isHoverState ? 1.012 : 1,
              y: isHoverState ? -2 : 0,
            }}
            transition={{ duration: 0.44, ease: ARROW_REVEAL_EASE }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={images[imageIndex]}
                className={resolvedImageStageClassName}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.36, ease: ARROW_REVEAL_EASE }}
              >
                <div className={resolvedImageFrameClassName}>
                  <Image
                    src={images[imageIndex]}
                    alt={imageAlt}
                    fill
                    className={resolvedImageClassName}
                    priority={priority && imageIndex === 0}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}

        {layout === "haekal" ? (
          <div className="absolute bottom-4 left-4 z-20">{arrowButton}</div>
        ) : (
          <motion.div
            className="absolute bottom-4 left-4 z-20"
            animate={{ y: isRevealActive ? -1 : 0, scale: isRevealActive ? 1.05 : 1 }}
            transition={{ type: "spring", stiffness: 320, damping: 24, mass: 0.7 }}
          >
            {arrowButton}
          </motion.div>
        )}
      </div>

      <ArrowRevealText
        isActive={isRevealActive}
        title={title}
        subtitle={subtitle}
        className={cfg.revealText}
        onTextClick={isMobile ? nextImage : undefined}
      />
    </article>
  );
}

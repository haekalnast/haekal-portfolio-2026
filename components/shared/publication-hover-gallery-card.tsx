"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import {
  ARROW_REVEAL_EASE,
  ArrowRevealButton,
  ArrowRevealText,
  getGlobalFocusStyle,
} from "@/components/shared/arrow-reveal";
import { cn } from "@/lib/cn";
import { useScrollRevealActive } from "@/lib/use-scroll-reveal-active";

/**
 * Publication row — same fixed pixel geometry as desktop (`156×271` × 3, `-space-x-8`).
 * Layout mirrors `BPRMockup` + `FeaturedDesignCard`: absolute artboard; artboard + book wrappers stay `overflow-visible` so hover lift is not clipped. Card shell keeps `overflow-hidden` for rounded crop.
 */
const PUBLICATION_ARTBOARD_W = 404;
const PUBLICATION_ARTBOARD_H = 271;
/** Extra space below the card’s top clip so lift + scale stay inside the rounded shell. */
const PUBLICATION_MOCKUP_TOP_INSET = 22;
/** Lift on per-book hover; artboard + book wrappers use visible overflow; shell still clips. */
const PUBLICATION_BOOK_HOVER_Y = -20;

type PublicationHoverGalleryCardProps = {
  images: readonly string[];
  isDimmed: boolean;
  onArrowHoverStart: () => void;
  onArrowHoverEnd: () => void;
  articleClassName?: string;
};

export function PublicationHoverGalleryCard({
  images,
  isDimmed,
  onArrowHoverStart,
  onArrowHoverEnd,
  articleClassName,
}: PublicationHoverGalleryCardProps) {
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [isIconHovered, setIsIconHovered] = useState(false);
  const [hoveredBook, setHoveredBook] = useState<number | null>(null);
  const { ref, isActive } = useScrollRevealActive<HTMLElement>(0.45);
  const isRevealActive = isIconHovered || isActive;
  /** Same as FeaturedDesignCard + BPR: pointer hover OR mobile scroll-reveal. */
  const isHoverState = isCardHovered || isActive;

  return (
    <article
      ref={ref}
      className={cn("relative h-[444px] w-full overflow-visible transition-all duration-300", articleClassName)}
      style={getGlobalFocusStyle(isDimmed)}
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => {
        setIsCardHovered(false);
        setIsIconHovered(false);
        setHoveredBook(null);
      }}
    >
      <div className="relative h-[444px] w-full touch-manipulation overflow-hidden rounded-[20px] bg-[#F2F2F2]">
        <motion.div
          className="relative h-full w-full px-0 py-0"
          initial={false}
          animate={{
            scale: isHoverState ? 1.01 : 1,
            y: isHoverState ? -2 : 0,
          }}
          transition={{ duration: 0.44, ease: ARROW_REVEAL_EASE }}
        >
          <div className="relative h-full w-full">
            <div
              className="absolute overflow-visible"
              style={{
                width: PUBLICATION_ARTBOARD_W,
                height: PUBLICATION_ARTBOARD_H,
                left: `calc(50% - ${PUBLICATION_ARTBOARD_W / 2}px)`,
                top: `calc(${PUBLICATION_MOCKUP_TOP_INSET}px + (100% - ${PUBLICATION_MOCKUP_TOP_INSET}px - ${PUBLICATION_ARTBOARD_H}px) / 2)`,
                transformOrigin: "50% 50%",
              }}
            >
              <div
                className="flex h-full w-full items-center justify-center -space-x-8"
                onMouseLeave={() => setHoveredBook(null)}
              >
                {images.map((src, index) => (
                  <motion.div
                    key={src}
                    className="relative h-[271px] w-[156px] shrink-0 overflow-visible"
                    style={{ zIndex: index + 1 }}
                    initial={false}
                    animate={{
                      y: hoveredBook === index ? PUBLICATION_BOOK_HOVER_Y : 0,
                    }}
                    transition={{ type: "spring", stiffness: 320, damping: 26, mass: 0.72 }}
                    onMouseEnter={() => setHoveredBook(index)}
                  >
                    <Image
                      src={src}
                      alt={`Publication mockup ${index + 1}`}
                      fill
                      className="object-contain"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-4 left-4 z-20"
          animate={{ y: isRevealActive ? -1 : 0, scale: isRevealActive ? 1.05 : 1 }}
          transition={{ type: "spring", stiffness: 320, damping: 24, mass: 0.7 }}
        >
          <ArrowRevealButton
            isActive={isRevealActive}
            ariaLabel="Publication details"
            className="flex h-8 w-8 items-center justify-center rounded-[1000px] bg-[#FAFAFA] p-[6px] shadow-[0_0_0_1px_rgba(0,0,0,0.06)] transition-all duration-300"
            onHoverStart={() => {
              setIsIconHovered(true);
              onArrowHoverStart();
            }}
            onHoverEnd={() => {
              setIsIconHovered(false);
              onArrowHoverEnd();
            }}
            onClick={(event) => event.stopPropagation()}
          />
        </motion.div>
      </div>

      <ArrowRevealText
        isActive={isRevealActive}
        title="Publication Design"
        subtitle="Print and editorial design"
        className="pointer-events-none absolute left-0 top-[452px]"
      />
    </article>
  );
}

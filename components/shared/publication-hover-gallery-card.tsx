"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import {
  ArrowRevealButton,
  ArrowRevealText,
  getGlobalFocusStyle,
} from "@/components/shared/arrow-reveal";
import { cn } from "@/lib/cn";
import { useScrollRevealActive } from "@/lib/use-scroll-reveal-active";

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
  return (
    <article
      ref={ref}
      className={cn("relative h-[444px] w-full overflow-visible transition-all duration-300", articleClassName)}
      style={getGlobalFocusStyle(isDimmed)}
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => {
        setIsCardHovered(false);
        setHoveredBook(null);
        setIsIconHovered(false);
      }}
    >
      <div className="relative h-[444px] overflow-hidden rounded-[20px] bg-[#F2F2F2] px-10 py-6">
        <motion.div
          className="flex h-full items-center justify-center -space-x-8"
          animate={{ scale: isCardHovered ? 1.01 : 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 24, mass: 0.75 }}
        >
          {images.map((src, index) => (
            <motion.div
              key={src}
              className="relative h-[271px] w-[156px] overflow-hidden"
              animate={{
                y: hoveredBook === index ? -14 : 0,
                scale: hoveredBook === index ? 1.025 : 1,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 24, mass: 0.72 }}
              onMouseEnter={() => setHoveredBook(index)}
              onMouseLeave={() => setHoveredBook(null)}
            >
              <Image
                src={src}
                alt={`Publication mockup ${index + 1}`}
                fill
                unoptimized
                className="object-contain"
              />
            </motion.div>
          ))}
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
        subtitle="Editorial and publication visuals"
        className="pointer-events-none absolute left-0 top-[452px]"
      />
    </article>
  );
}

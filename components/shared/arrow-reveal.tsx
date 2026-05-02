"use client";

import { motion } from "framer-motion";
import { type CSSProperties, type MouseEvent } from "react";

export const ARROW_REVEAL_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const ARROW_REVEAL_DURATION = 0.32;
export const ARROW_REVEAL_DELAY = 0.04;
export const ARROW_REVEAL_TIMING = "cubic-bezier(0.22, 1, 0.36, 1)";

/** Non-focused UI during arrow hover/focus — single source of truth (About + Home + section headers). Lower = dimmer. */
export const GLOBAL_FOCUS_DIMMED_OPACITY = 0.08;

export function ArrowIcon({ hover = false }: { hover?: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M14.3763 12.7083V5.625H7.29297"
        stroke={hover ? "#000000" : "#707070"}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.1667 5.83203L5.625 14.3737"
        stroke={hover ? "#000000" : "#707070"}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type ArrowRevealButtonProps = {
  isActive: boolean;
  ariaLabel: string;
  className: string;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
};

export function ArrowRevealButton({
  isActive,
  ariaLabel,
  className,
  onHoverStart,
  onHoverEnd,
  onClick,
}: ArrowRevealButtonProps) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className={className}
      style={{ transitionTimingFunction: ARROW_REVEAL_TIMING }}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onFocus={onHoverStart}
      onBlur={onHoverEnd}
      onClick={onClick}
    >
      <span className="relative block h-5 w-5">
        <span
          className={`absolute inset-0 transition-opacity duration-300 ${isActive ? "opacity-0" : "opacity-100"}`}
          style={{ transitionTimingFunction: ARROW_REVEAL_TIMING }}
        >
          <ArrowIcon />
        </span>
        <span
          className={`absolute inset-0 transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-0"}`}
          style={{ transitionTimingFunction: ARROW_REVEAL_TIMING }}
        >
          <ArrowIcon hover />
        </span>
      </span>
    </button>
  );
}

type ArrowRevealTextProps = {
  isActive: boolean;
  title: string;
  subtitle: string;
  className: string;
  delay?: number;
};

export function ArrowRevealText({
  isActive,
  title,
  subtitle,
  className,
  delay = ARROW_REVEAL_DELAY,
}: ArrowRevealTextProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 8 }}
      transition={{
        duration: ARROW_REVEAL_DURATION,
        ease: ARROW_REVEAL_EASE,
        delay: isActive ? delay : 0,
      }}
    >
      <p className="text-[20px] leading-[30px] tracking-[-1px] text-black">{title}</p>
      <p className="text-base leading-6 text-[#707070]">{subtitle}</p>
    </motion.div>
  );
}

export function getGlobalFocusStyle(isDimmed: boolean): CSSProperties {
  return {
    transitionTimingFunction: ARROW_REVEAL_TIMING,
    opacity: isDimmed ? GLOBAL_FOCUS_DIMMED_OPACITY : 1,
    filter: isDimmed ? "blur(1px)" : "blur(0px)",
    transform: isDimmed ? "scale(0.995)" : "scale(1)",
  };
}

/** Framer Motion `animate` values — keeps blur/scale in sync with `getGlobalFocusStyle`. */
export function getGlobalFocusMotionAnimate(isDimmed: boolean) {
  return {
    opacity: isDimmed ? GLOBAL_FOCUS_DIMMED_OPACITY : 1,
    filter: isDimmed ? "blur(1px)" : "blur(0px)",
    scale: isDimmed ? 0.995 : 1,
  };
}

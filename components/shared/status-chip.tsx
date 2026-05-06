"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

type StatusChipTone = "live" | "preview" | "neutral";

const DOT_COLOR: Record<Exclude<StatusChipTone, "neutral">, string> = {
  live: "bg-[#14C95D]",
  preview: "bg-[#FF9A3D]",
};

type StatusChipProps = {
  label: string;
  tone?: StatusChipTone;
  className?: string;
};

export function StatusChip({ label, tone = "neutral", className }: StatusChipProps) {
  const hasPulseDot = tone === "live" || tone === "preview";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-[8px] border border-[#DEDEE0] bg-[#F2F2F2] px-3 py-[3px] text-base leading-6 text-black",
        className,
      )}
    >
      {hasPulseDot ? (
        <motion.span
          className={cn("inline-block h-2 w-2 rounded-full", DOT_COLOR[tone])}
          animate={{ opacity: [0.35, 1, 0.35], scale: [0.92, 1.08, 0.92] }}
          transition={{ duration: 1.9, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      ) : null}
      {label}
    </span>
  );
}

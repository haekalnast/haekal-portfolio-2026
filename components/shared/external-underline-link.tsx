"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type ExternalUnderlineLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  textClassName?: string;
  underlineClassName?: string;
  showExternalIcon?: boolean;
};

function ArrowUpRightIcon({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <path
        d="M14.3763 12.7083V5.625H7.29297"
        stroke="#141414"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.1667 5.83203L5.625 14.3737"
        stroke="#141414"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ExternalUnderlineLink({
  href,
  children,
  className,
  textClassName,
  underlineClassName,
  showExternalIcon = true,
}: ExternalUnderlineLinkProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={cn("relative inline-flex items-center gap-1", className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className={textClassName}>{children}</span>
      {showExternalIcon ? <ArrowUpRightIcon className="size-5 shrink-0" /> : null}
      <motion.span
        className={cn("absolute right-0 bottom-0 left-0 h-px bg-[#141414]", underlineClassName)}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        style={{ originX: 0 }}
      />
    </Link>
  );
}

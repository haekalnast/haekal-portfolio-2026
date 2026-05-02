"use client";

import { useEffect, useRef, useState } from "react";
import { useIsMobileViewport } from "@/lib/use-is-mobile-viewport";

export function useScrollRevealActive<T extends HTMLElement>(threshold = 0.55) {
  const ref = useRef<T | null>(null);
  const isMobile = useIsMobileViewport();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!isMobile) return;
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsActive(entry.isIntersecting && entry.intersectionRatio >= threshold * 0.6),
      { threshold: [0.15, threshold, 0.9] },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [isMobile, threshold]);

  return { ref, isActive: isMobile && isActive };
}

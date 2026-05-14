import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * Fixed frame for case study rasters (Personal, OCTO, etc.):
 * - Mobile: 240px tall
 * - Tablet and up (`md`, 768px): 448px tall
 * - Gray fill so `object-contain` letterboxing matches case sections.
 */
export const CASE_DETAIL_MEDIA_FRAME =
  "relative h-[240px] w-full overflow-hidden rounded-[16px] bg-[#F2F2F2] md:h-[448px]";

/**
 * Below desktop (`lg`, 1024px): `contain` + `center` keeps the full mockup centered in the frame (tablet + phone).
 * `lg+`: `cover` for edge-to-edge on wide layouts.
 */
export const CASE_DETAIL_MEDIA_IMAGE = "object-center max-lg:object-contain lg:object-cover";

const CAPTION = "text-[16px] leading-[24px] font-normal text-[#707070]";

export function CaseSectionImage({
  src,
  alt,
  caption,
  priority,
  className,
}: {
  src: string;
  alt: string;
  caption?: string;
  priority?: boolean;
  /** Optional outer wrapper classes (e.g. max width). */
  className?: string;
}) {
  return (
    <div className={cn("flex w-full flex-col items-center gap-[16px]", className)}>
      <div className={CASE_DETAIL_MEDIA_FRAME}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          quality={95}
          sizes="(min-width: 1440px) 1280px, (min-width: 1024px) 1100px, 100vw"
          className={CASE_DETAIL_MEDIA_IMAGE}
        />
      </div>
      {caption ? <p className={`${CAPTION} w-full text-center`}>{caption}</p> : null}
    </div>
  );
}

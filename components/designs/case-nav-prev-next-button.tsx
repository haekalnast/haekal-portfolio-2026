"use client";

import Link from "next/link";
import { useId } from "react";
import { cn } from "@/lib/cn";

const PREV_PATH =
  "M6.875 10.7513L10.546 14.4223C10.6959 14.5722 10.7708 14.7478 10.7708 14.9492C10.7708 15.1506 10.6944 15.331 10.5417 15.4905C10.3889 15.6366 10.2118 15.7096 10.0104 15.7096C9.80903 15.7096 9.63326 15.6345 9.48313 15.4842L4.52917 10.524C4.45417 10.4489 4.39931 10.3675 4.36458 10.2798C4.32986 10.1922 4.3125 10.0982 4.3125 9.99797C4.3125 9.89783 4.32986 9.80387 4.36458 9.71609C4.39931 9.62846 4.45139 9.54991 4.52083 9.48047L9.47917 4.52214C9.63194 4.36936 9.81021 4.29297 10.014 4.29297C10.2176 4.29297 10.3935 4.36936 10.5417 4.52214C10.6944 4.67033 10.7708 4.84623 10.7708 5.04984C10.7708 5.25359 10.6956 5.43075 10.545 5.5813L6.875 9.2513H15.2504C15.4628 9.2513 15.6408 9.32276 15.7846 9.46568C15.9282 9.60859 16 9.78568 16 9.99693C16 10.2082 15.9282 10.3867 15.7846 10.5326C15.6408 10.6784 15.4628 10.7513 15.2504 10.7513H6.875Z";

const NEXT_PATH =
  "M13.125 10.7513H4.74958C4.53722 10.7513 4.35917 10.6798 4.21542 10.5369C4.07181 10.394 4 10.2169 4 10.0057C4 9.79443 4.07181 9.61589 4.21542 9.47005C4.35917 9.32422 4.53722 9.2513 4.74958 9.2513H13.125L9.45396 5.58026C9.3041 5.4304 9.22917 5.25477 9.22917 5.05339C9.22917 4.852 9.30556 4.67158 9.45833 4.51214C9.61111 4.36602 9.78819 4.29297 9.98958 4.29297C10.191 4.29297 10.3667 4.36811 10.5169 4.51839L15.4708 9.47859C15.5458 9.55373 15.6007 9.63512 15.6354 9.72276C15.6701 9.8104 15.6875 9.90436 15.6875 10.0046C15.6875 10.1048 15.6701 10.1987 15.6354 10.2865C15.6007 10.3741 15.5486 10.4527 15.4792 10.5221L10.5208 15.4805C10.3681 15.6332 10.1944 15.7062 10 15.6992C9.80556 15.6923 9.63194 15.6157 9.47917 15.4696C9.32639 15.3102 9.25 15.1286 9.25 14.9248C9.25 14.7212 9.32639 14.5453 9.47917 14.3971L13.125 10.7513Z";

function CaseNavArrowIcon({ direction, maskId }: { direction: "prev" | "next"; maskId: string }) {
  const path = direction === "prev" ? PREV_PATH : NEXT_PATH;

  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="block">
      <mask id={maskId} style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
        <rect width="20" height="20" fill="#D9D9D9" />
      </mask>
      <g mask={`url(#${maskId})`}>
        <path
          d={path}
          className="fill-[#707070] transition-[fill] duration-150 group-active:fill-black"
        />
      </g>
    </svg>
  );
}

type CaseNavPrevNextButtonProps = {
  direction: "prev" | "next";
  href: string;
  label: string;
  className?: string;
};

export function CaseNavPrevNextButton({ direction, href, label, className }: CaseNavPrevNextButtonProps) {
  const maskId = useId().replace(/:/g, "");

  return (
    <Link
      href={href}
      aria-label={label}
      className={cn(
        "group flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-black/10 bg-white/80 shadow-[0_10px_10px_-5px_rgba(0,0,0,0.10)] backdrop-blur-[8px] transition-colors",
        "hover:bg-[#F2F2F2] active:bg-[#E8E8E8]",
        className,
      )}
    >
      <CaseNavArrowIcon direction={direction} maskId={maskId} />
    </Link>
  );
}

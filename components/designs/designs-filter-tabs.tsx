"use client";

import { DESIGNS_FILTER_TABS, type DesignsFilterId } from "@/lib/designs-filter";
import { cn } from "@/lib/cn";

type DesignsFilterTabsProps = {
  activeFilter: DesignsFilterId;
  onFilterChange: (filter: DesignsFilterId) => void;
};

export function DesignsFilterTabs({ activeFilter, onFilterChange }: DesignsFilterTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Filter designs"
      className="-mx-4 flex gap-[14px] overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
    >
      {DESIGNS_FILTER_TABS.map((tab) => {
        const isActive = activeFilter === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onFilterChange(tab.id)}
            className={cn(
              "flex h-[44px] shrink-0 cursor-pointer items-center justify-center rounded-[230px] px-6 text-base leading-[21px] transition-colors",
              isActive
                ? "bg-[#F2F2F2] text-black"
                : "bg-white text-[#707070] hover:bg-[#F2F2F2]",
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

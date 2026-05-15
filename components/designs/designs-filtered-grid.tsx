"use client";

import type { ReactNode } from "react";
import {
  groupColumnPlacements,
  type DesignsCardPlacement,
} from "@/lib/designs-filter";

type DesignsFilteredGridProps = {
  placements: DesignsCardPlacement[];
  renderCard: (placement: DesignsCardPlacement) => ReactNode;
  /** Tablet Mobile tab: SFAST + Personal row, OCTO full width below (Figma `42609:76424`). */
  mobileTabletStack?: boolean;
};

function DesignsColumn({
  groups,
  renderCard,
}: {
  groups: DesignsCardPlacement[][];
  renderCard: (placement: DesignsCardPlacement) => ReactNode;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-[24px]">
      {groups.map((group) => {
        const groupKey = group.map((p) => `${p.cardKey}-${p.width}`).join("-");
        const isPair = group.length > 1;

        if (isPair) {
          return (
            <div key={groupKey} className="grid grid-cols-1 gap-[24px] lg:grid-cols-2">
              {group.map((placement) => renderCard(placement))}
            </div>
          );
        }

        return <div key={groupKey}>{renderCard(group[0])}</div>;
      })}
    </div>
  );
}

function DesignsMobileTabletStack({
  placements,
  renderCard,
}: {
  placements: DesignsCardPlacement[];
  renderCard: (placement: DesignsCardPlacement) => ReactNode;
}) {
  const halfCards = placements.filter((p) => p.width === "half");
  const fullCards = placements.filter((p) => p.width === "full");

  return (
    <div className="flex flex-col gap-[24px]">
      {halfCards.length > 0 ? (
        <div className="grid grid-cols-2 gap-[24px]">
          {halfCards.map((placement) => renderCard(placement))}
        </div>
      ) : null}
      {fullCards.map((placement) => (
        <div key={placement.cardKey}>{renderCard(placement)}</div>
      ))}
    </div>
  );
}

export function DesignsFilteredGrid({
  placements,
  renderCard,
  mobileTabletStack = false,
}: DesignsFilteredGridProps) {
  if (mobileTabletStack) {
    return <DesignsMobileTabletStack placements={placements} renderCard={renderCard} />;
  }

  const { left, right } = groupColumnPlacements(placements);

  return (
    <div className="grid grid-cols-1 gap-[24px] md:grid-cols-2">
      <DesignsColumn groups={left} renderCard={renderCard} />
      <DesignsColumn groups={right} renderCard={renderCard} />
    </div>
  );
}

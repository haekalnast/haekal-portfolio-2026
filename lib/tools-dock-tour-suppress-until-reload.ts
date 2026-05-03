/**
 * After the mobile dock tour completes once, skip re-activating scroll capture
 * for the rest of this full JS page load (including client navigations Home ↔ About).
 * A full browser refresh reloads the bundle and clears this flag so the tour can run again.
 */
let suppressedForThisJsLoad = false;

export function isToolsDockTourSuppressedForThisLoad(): boolean {
  return suppressedForThisJsLoad;
}

export function markToolsDockTourSuppressedForThisLoad(): void {
  suppressedForThisJsLoad = true;
}

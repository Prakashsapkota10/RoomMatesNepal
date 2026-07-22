"use client";

import { useEffect } from "react";

/**
 * Warns the user before they close/reload the tab while there are unsaved
 * settings changes, via the standard `beforeunload` confirmation dialog.
 * This only covers browser-level navigation (close tab, reload, external
 * link) — it intentionally doesn't intercept Next.js's own client-side
 * router to avoid changing existing routing behavior.
 */
export function useUnsavedChangesWarning(hasUnsavedChanges: boolean) {
  useEffect(() => {
    function handleBeforeUnload(e: BeforeUnloadEvent) {
      if (!hasUnsavedChanges) return;
      e.preventDefault();
      e.returnValue = "";
    }

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges]);
}

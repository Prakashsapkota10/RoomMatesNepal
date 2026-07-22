"use client";

import { useCallback, useMemo, useState } from "react";
import { INITIAL_SETTINGS } from "./mock-settings";
import type { PlatformSettings } from "./types";

/**
 * Centralized settings state for the admin Platform Settings page.
 *
 * Tracks `savedSettings` (last persisted state) separately from
 * `currentSettings` (in-progress edits), and derives `hasUnsavedChanges` by
 * comparison. `updateSettings` accepts a partial-update function so any
 * card can mutate its own slice without knowing about the rest of the tree.
 *
 * TODO: replace INITIAL_SETTINGS with a real fetch, and wire save() to a
 * real PATCH /api/admin/settings call once the backend exists.
 */
export function usePlatformSettings() {
  const [savedSettings, setSavedSettings] = useState<PlatformSettings>(INITIAL_SETTINGS);
  const [currentSettings, setCurrentSettings] = useState<PlatformSettings>(INITIAL_SETTINGS);
  const [isSaving, setIsSaving] = useState(false);

  const hasUnsavedChanges = useMemo(
    () => JSON.stringify(savedSettings) !== JSON.stringify(currentSettings),
    [savedSettings, currentSettings]
  );

  const updateSettings = useCallback(
    (updater: (prev: PlatformSettings) => PlatformSettings) => {
      setCurrentSettings((prev) => updater(prev));
    },
    []
  );

  const save = useCallback(async () => {
    setIsSaving(true);
    // Simulated network delay — TODO: replace with a real API call.
    await new Promise((resolve) => setTimeout(resolve, 700));
    setSavedSettings(currentSettings);
    setIsSaving(false);
  }, [currentSettings]);

  const discard = useCallback(() => {
    setCurrentSettings(savedSettings);
  }, [savedSettings]);

  return {
    settings: currentSettings,
    updateSettings,
    hasUnsavedChanges,
    isSaving,
    save,
    discard,
  };
}

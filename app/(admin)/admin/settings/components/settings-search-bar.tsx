"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SETTINGS_SEARCH_INDEX } from "./constants";

interface SettingsSearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export interface SettingsSearchMatch {
  sectionLabel: string;
  matchedLabels: string[];
}

/** Runs the query against the static settings index — section names, setting labels, and descriptions. */
export function searchSettings(query: string): SettingsSearchMatch[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const results: SettingsSearchMatch[] = [];
  for (const section of SETTINGS_SEARCH_INDEX) {
    const sectionMatches = section.sectionLabel.toLowerCase().includes(q);
    const matchedLabels = section.items
      .filter((item) => item.label.toLowerCase().includes(q) || item.description.toLowerCase().includes(q))
      .map((item) => item.label);

    if (sectionMatches || matchedLabels.length > 0) {
      results.push({ sectionLabel: section.sectionLabel, matchedLabels });
    }
  }
  return results;
}

/** Returns the set of section keys (from SETTINGS_SEARCH_INDEX) that match the query. */
export function getMatchingSectionKeys(query: string): Set<string> {
  const q = query.trim().toLowerCase();
  if (!q) return new Set(SETTINGS_SEARCH_INDEX.map((s) => s.key));

  const keys = new Set<string>();
  for (const section of SETTINGS_SEARCH_INDEX) {
    const sectionMatches = section.sectionLabel.toLowerCase().includes(q);
    const itemMatches = section.items.some(
      (item) => item.label.toLowerCase().includes(q) || item.description.toLowerCase().includes(q)
    );
    if (sectionMatches || itemMatches) keys.add(section.key);
  }
  return keys;
}

/**
 * Functional settings search — searches section names, setting labels, and
 * descriptions from SETTINGS_SEARCH_INDEX. The parent page uses
 * getMatchingSectionKeys() to decide which cards stay visible.
 */
export function SettingsSearchBar({ value, onChange }: SettingsSearchBarProps) {
  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search settings..."
        className="pl-9 pr-9 h-9 text-sm bg-muted/50 border-none rounded-lg"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}

"use client";

import { SearchX } from "lucide-react";

interface SettingsEmptyStateProps {
  query: string;
}

/** Shown when the settings search query matches no section, label, or description. */
export function SettingsEmptyState({ query }: SettingsEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed py-16 text-center">
      <SearchX className="h-8 w-8 text-muted-foreground" />
      <p className="text-sm font-medium text-foreground">No settings found for &ldquo;{query}&rdquo;</p>
      <p className="text-xs text-muted-foreground">Try a different keyword, like &ldquo;security&rdquo; or &ldquo;listing&rdquo;.</p>
    </div>
  );
}

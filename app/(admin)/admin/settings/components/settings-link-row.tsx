"use client";

import { ChevronRight } from "lucide-react";

interface SettingsLinkRowProps {
  label: string;
  description: string;
  onClick: () => void;
  trailing?: React.ReactNode;
}

/**
 * Clickable row that opens a modal for more detailed configuration — used
 * for Password Policy and Trust Score Configuration, matching the
 * reference design's chevron-affordance rows.
 */
export function SettingsLinkRow({ label, description, onClick, trailing }: SettingsLinkRowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-between gap-3 rounded-xl border p-3.5 text-left hover:border-primary/40 hover:bg-muted/30 transition-colors"
    >
      <div className="min-w-0">
        <p className="text-sm font-semibold text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{description}</p>
      </div>
      <div className="flex items-center gap-1.5 shrink-0">
        {trailing}
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
      </div>
    </button>
  );
}

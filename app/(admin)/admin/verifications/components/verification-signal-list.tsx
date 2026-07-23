"use client";

import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { VerificationSignal } from "./types";

interface VerificationSignalListProps {
  signals: VerificationSignal[];
  /** Compact mode shows just a handful of short "Email ✓" style chips for table cells. */
  compact?: boolean;
}

/**
 * Compact signal chips shown in the table (e.g. "Email ✓ Phone ✓ Profile ✓")
 * and a fuller list in the detail drawer. Deliberately avoids raw document
 * or biometric data — every signal here is an account/contact/activity
 * indicator, never a document or face-match result.
 */
export function VerificationSignalList({ signals, compact = false }: VerificationSignalListProps) {
  if (compact) {
    return (
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {signals.map((signal) => (
          <span
            key={signal.key}
            className={cn(
              "inline-flex items-center gap-1 text-xs font-medium",
              signal.active ? "text-foreground" : "text-muted-foreground/60 line-through"
            )}
          >
            {signal.label.replace(/ (Verified|Complete)$/, "")}
            {signal.active ? (
              <Check className="h-3 w-3 text-[color:var(--success)]" aria-label="Present" />
            ) : (
              <X className="h-3 w-3 text-muted-foreground/50" aria-label="Not present" />
            )}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {signals.map((signal) => (
        <div
          key={signal.key}
          className={cn(
            "flex items-center gap-2 rounded-lg border px-2.5 py-2 text-xs",
            signal.active ? "text-foreground" : "text-muted-foreground border-dashed"
          )}
        >
          {signal.active ? (
            <Check className="h-3.5 w-3.5 text-[color:var(--success)] shrink-0" />
          ) : (
            <X className="h-3.5 w-3.5 text-muted-foreground/50 shrink-0" />
          )}
          <span className="truncate">{signal.label}</span>
        </div>
      ))}
    </div>
  );
}

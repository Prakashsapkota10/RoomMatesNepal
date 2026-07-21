"use client";

import { cn } from "@/lib/utils";

interface TrustScoreBarProps {
  score: number;
}

function getScoreColor(score: number) {
  if (score >= 80) return "bg-[color:var(--success)]";
  if (score >= 60) return "bg-[color:var(--trust)]";
  if (score >= 40) return "bg-[color:var(--warning)]";
  return "bg-[color:var(--error)]";
}

function getScoreTextColor(score: number) {
  if (score >= 80) return "text-[color:var(--success-dark)]";
  if (score >= 60) return "text-[color:var(--trust-dark)]";
  if (score >= 40) return "text-[color:var(--warning-dark)]";
  return "text-[color:var(--error-dark)]";
}

/** Compact horizontal trust score indicator used in the users table. */
export function TrustScoreBar({ score }: TrustScoreBarProps) {
  return (
    <div className="flex items-center gap-2 min-w-[88px]">
      <div className="h-1.5 w-14 rounded-full bg-muted overflow-hidden shrink-0">
        <div
          className={cn("h-full rounded-full", getScoreColor(score))}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className={cn("text-xs font-bold tabular-nums", getScoreTextColor(score))}>
        {score}
      </span>
    </div>
  );
}

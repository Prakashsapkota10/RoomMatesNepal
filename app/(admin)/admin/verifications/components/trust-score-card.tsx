"use client";

import { cn } from "@/lib/utils";

interface TrustScoreCardProps {
  score: number;
  summary: string;
}

function getScoreTone(score: number) {
  if (score >= 80) return { ring: "var(--success)", text: "text-[color:var(--success-dark)]", bg: "bg-[color:var(--success-light)]" };
  if (score >= 60) return { ring: "var(--trust)", text: "text-[color:var(--trust-dark)]", bg: "bg-[color:var(--trust-light)]" };
  if (score >= 40) return { ring: "var(--warning)", text: "text-[color:var(--warning-dark)]", bg: "bg-[color:var(--warning-light)]" };
  return { ring: "var(--error)", text: "text-[color:var(--error-dark)]", bg: "bg-[color:var(--error-light)]" };
}

/**
 * Trust score ring + plain-language explanation shown at the top of the
 * verification detail drawer. Deliberately framed as "why" the user has
 * this score (via `summary`) rather than an unexplained percentage —
 * the full factor breakdown lives in TrustScoreBreakdown just below it.
 */
export function TrustScoreCard({ score, summary }: TrustScoreCardProps) {
  const tone = getScoreTone(score);
  const circumference = 2 * Math.PI * 26;
  const offset = circumference * (1 - score / 100);

  return (
    <div className={cn("flex items-center gap-4 rounded-xl border p-4", tone.bg)}>
      <div className="relative h-16 w-16 shrink-0">
        <svg viewBox="0 0 64 64" className="h-16 w-16 -rotate-90">
          <circle cx="32" cy="32" r="26" fill="none" stroke="var(--border)" strokeWidth="6" />
          <circle
            cx="32"
            cy="32"
            r="26"
            fill="none"
            stroke={tone.ring}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-700 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn("text-lg font-bold leading-none", tone.text)}>{score}</span>
          <span className="text-[9px] text-muted-foreground leading-none mt-0.5">/ 100</span>
        </div>
      </div>
      <div className="min-w-0">
        <p className={cn("text-sm font-bold", tone.text)}>Trust Score: {score} / 100</p>
        <p className="text-xs text-muted-foreground leading-relaxed mt-1">{summary}</p>
      </div>
    </div>
  );
}

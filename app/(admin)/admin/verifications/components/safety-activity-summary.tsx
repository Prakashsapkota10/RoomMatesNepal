"use client";

import Link from "next/link";
import { Home, CheckCircle2, Users, Star, AlertTriangle, ShieldAlert, ExternalLink } from "lucide-react";
import type { SafetyActivitySummary as SafetyActivitySummaryType } from "./types";

interface SafetyActivitySummaryProps {
  summary: SafetyActivitySummaryType;
  userDisplayId: string;
}

function StatTile({ icon: Icon, label, value, tone }: { icon: typeof Home; label: string; value: string | number; tone?: "warning" | "error" }) {
  const toneClass =
    tone === "error" ? "text-destructive" : tone === "warning" ? "text-[color:var(--warning-dark)]" : "text-foreground";
  return (
    <div className="flex items-center gap-2.5 rounded-lg border px-2.5 py-2">
      <Icon className={`h-3.5 w-3.5 shrink-0 ${toneClass}`} />
      <div className="min-w-0">
        <p className={`text-sm font-bold leading-none ${toneClass}`}>{value}</p>
        <p className="text-[10px] text-muted-foreground mt-0.5 truncate">{label}</p>
      </div>
    </div>
  );
}

/**
 * Safety & Activity Summary — platform signals (bookings, listings,
 * reviews) plus a contextual link into the Reports system rather than a
 * duplicate reports UI. Deliberately omits anything sensitive beyond
 * report counts/warnings.
 */
export function SafetyActivitySummary({ summary, userDisplayId }: SafetyActivitySummaryProps) {
  const hasConcerns = summary.activeReports > 0 || summary.previousWarnings > 0;

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-2">
        <StatTile icon={CheckCircle2} label="Successful Bookings" value={summary.successfulBookings} />
        <StatTile icon={Home} label="Active Listings" value={summary.activeListings} />
        <StatTile icon={Users} label="Completed Connections" value={summary.completedConnections} />
        <StatTile icon={Star} label="Reviews Received" value={summary.reviewsReceived} />
        <StatTile
          icon={ShieldAlert}
          label="Active Reports"
          value={summary.activeReports}
          tone={summary.activeReports > 0 ? "error" : undefined}
        />
        <StatTile
          icon={AlertTriangle}
          label="Previous Warnings"
          value={summary.previousWarnings}
          tone={summary.previousWarnings > 0 ? "warning" : undefined}
        />
      </div>

      <p className="text-xs text-muted-foreground">
        Account age: <span className="text-foreground font-medium">{summary.accountAge}</span> · Resolved reports:{" "}
        <span className="text-foreground font-medium">{summary.resolvedReports}</span>
      </p>

      {hasConcerns && summary.suspiciousActivityNote && (
        <div className="flex items-start gap-2 rounded-lg bg-[color:var(--warning-light)] p-2.5">
          <AlertTriangle className="h-3.5 w-3.5 text-[color:var(--warning-dark)] shrink-0 mt-0.5" />
          <p className="text-xs text-[color:var(--warning-dark)] leading-relaxed">{summary.suspiciousActivityNote}</p>
        </div>
      )}

      <Link
        href={`/admin/reports?user=${userDisplayId}`}
        className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
      >
        <ExternalLink className="h-3 w-3" />
        View Reports & Safety History
      </Link>
    </div>
  );
}

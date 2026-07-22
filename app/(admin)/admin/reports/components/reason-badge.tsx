"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { ReportReasonTag } from "./types";

const STYLES: Record<ReportReasonTag, string> = {
  abuse: "bg-[color:var(--error-light)] text-[color:var(--error-dark)]",
  spam: "bg-[color:var(--trust-light)] text-[color:var(--trust-dark)]",
  false_info: "bg-muted text-muted-foreground",
  fake_listing: "bg-[color:var(--warning-light)] text-[color:var(--warning-dark)]",
  scam: "bg-[color:var(--error-light)] text-[color:var(--error-dark)]",
  other: "bg-muted text-muted-foreground",
};

const LABELS: Record<ReportReasonTag, string> = {
  abuse: "Abuse",
  spam: "Spam",
  false_info: "False Info",
  fake_listing: "Fake Listing",
  scam: "Scam",
  other: "Other",
};

/** Reason tag for a report row (Abuse/Spam/False Info/etc). */
export function ReasonBadge({ reason }: { reason: ReportReasonTag }) {
  return (
    <Badge className={cn("text-[10px] font-semibold border-0", STYLES[reason])}>
      {LABELS[reason]}
    </Badge>
  );
}

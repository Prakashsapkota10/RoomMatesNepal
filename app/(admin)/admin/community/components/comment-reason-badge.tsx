"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { CommentReportReason } from "./types";

const STYLES: Record<CommentReportReason, string> = {
  harassment: "bg-[color:var(--error-light)] text-[color:var(--error-dark)]",
  spam: "bg-[color:var(--trust-light)] text-[color:var(--trust-dark)]",
  misinformation: "bg-[color:var(--warning-light)] text-[color:var(--warning-dark)]",
  inappropriate_language: "bg-[color:var(--error-light)] text-[color:var(--error-dark)]",
  other: "bg-muted text-muted-foreground",
};

const LABELS: Record<CommentReportReason, string> = {
  harassment: "Harassment",
  spam: "Spam",
  misinformation: "Misinformation",
  inappropriate_language: "Inappropriate Language",
  other: "Other",
};

/** Reason tag for why a comment was reported (Harassment/Spam/etc). */
export function CommentReasonBadge({ reason }: { reason: CommentReportReason }) {
  return (
    <Badge className={cn("text-[10px] font-semibold border-0", STYLES[reason])}>
      {LABELS[reason]}
    </Badge>
  );
}

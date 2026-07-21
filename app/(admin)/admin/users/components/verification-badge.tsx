"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type VerificationState = "verified" | "pending" | "rejected";

const STYLES: Record<VerificationState, string> = {
  verified: "bg-[color:var(--success-light)] text-[color:var(--success-dark)]",
  pending: "bg-[color:var(--warning-light)] text-[color:var(--warning-dark)]",
  rejected: "bg-[color:var(--error-light)] text-[color:var(--error-dark)]",
};

const LABELS: Record<VerificationState, string> = {
  verified: "Verified",
  pending: "Pending",
  rejected: "Rejected",
};

/** Small pill badge for a user's verification state — matches the admin design's status chips. */
export function VerificationBadge({ state }: { state: VerificationState }) {
  return (
    <Badge className={cn("uppercase tracking-wide text-[10px] font-semibold border-0", STYLES[state])}>
      {LABELS[state]}
    </Badge>
  );
}

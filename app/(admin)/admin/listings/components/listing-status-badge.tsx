"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { ListingModerationStatus } from "./types";

const STYLES: Record<ListingModerationStatus, string> = {
  pending: "bg-[color:var(--warning-light)] text-[color:var(--warning-dark)]",
  approved: "bg-[color:var(--success-light)] text-[color:var(--success-dark)]",
  reported: "bg-[color:var(--error-light)] text-[color:var(--error-dark)]",
  rejected: "bg-muted text-muted-foreground",
  expired: "bg-muted text-muted-foreground",
};

const LABELS: Record<ListingModerationStatus, string> = {
  pending: "Pending",
  approved: "Approved",
  reported: "Reported",
  rejected: "Rejected",
  expired: "Expired",
};

/** Status pill for a listing/roommate request's moderation state. */
export function ListingStatusBadge({ status }: { status: ListingModerationStatus }) {
  return (
    <Badge className={cn("uppercase tracking-wide text-[10px] font-semibold border-0", STYLES[status])}>
      {LABELS[status]}
    </Badge>
  );
}

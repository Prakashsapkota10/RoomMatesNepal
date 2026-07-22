"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { CommentModerationStatus } from "./types";

const STYLES: Record<CommentModerationStatus, string> = {
  pending: "bg-[color:var(--warning-light)] text-[color:var(--warning-dark)]",
  approved: "bg-[color:var(--success-light)] text-[color:var(--success-dark)]",
  removed: "bg-muted text-muted-foreground line-through",
};

const LABELS: Record<CommentModerationStatus, string> = {
  pending: "Pending",
  approved: "Approved",
  removed: "Removed",
};

/** Status pill for a reported comment's moderation state. */
export function CommentStatusBadge({ status }: { status: CommentModerationStatus }) {
  return (
    <Badge className={cn("text-[10px] font-semibold border-0", STYLES[status])}>
      {LABELS[status]}
    </Badge>
  );
}

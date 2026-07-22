"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { PostStatus } from "./types";

const STYLES: Record<PostStatus, string> = {
  live: "bg-[color:var(--success-light)] text-[color:var(--success-dark)]",
  flagged: "bg-[color:var(--warning-light)] text-[color:var(--warning-dark)]",
  removed: "bg-muted text-muted-foreground line-through",
};

const LABELS: Record<PostStatus, string> = {
  live: "Live",
  flagged: "Flagged",
  removed: "Removed",
};

/** Status pill for a community post's moderation state — Live/Flagged/Removed. */
export function PostStatusBadge({ status }: { status: PostStatus }) {
  return (
    <Badge className={cn("text-[10px] font-semibold border-0", STYLES[status])}>
      {LABELS[status]}
    </Badge>
  );
}

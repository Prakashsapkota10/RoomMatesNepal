"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { AnnouncementStatus } from "./types";

const STYLES: Record<AnnouncementStatus, string> = {
  draft: "bg-muted text-muted-foreground",
  scheduled: "bg-[color:var(--trust-light)] text-[color:var(--trust-dark)]",
  published: "bg-[color:var(--success-light)] text-[color:var(--success-dark)]",
  archived: "bg-muted text-muted-foreground line-through",
};

const LABELS: Record<AnnouncementStatus, string> = {
  draft: "Draft",
  scheduled: "Scheduled",
  published: "Published",
  archived: "Archived",
};

/** Status pill for an announcement's lifecycle state — Draft/Scheduled/Published/Archived. */
export function AnnouncementStatusBadge({ status }: { status: AnnouncementStatus }) {
  return (
    <Badge className={cn("gap-1 text-[10px] font-semibold border-0", STYLES[status])}>
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full shrink-0",
          status === "published" && "bg-[color:var(--success)]",
          status === "scheduled" && "bg-[color:var(--trust)]",
          status === "draft" && "bg-muted-foreground/50",
          status === "archived" && "bg-muted-foreground/50"
        )}
      />
      {LABELS[status]}
    </Badge>
  );
}

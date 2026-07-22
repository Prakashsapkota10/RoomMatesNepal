"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { ReportPriority } from "./types";

const STYLES: Record<ReportPriority, string> = {
  high: "bg-destructive text-destructive-foreground",
  medium: "bg-foreground text-background",
  low: "bg-muted text-muted-foreground",
};

const LABELS: Record<ReportPriority, string> = {
  high: "High",
  medium: "Medium",
  low: "Low",
};

/** Priority pill for a report row — High/Medium/Low, matching the reference design's solid chips. */
export function PriorityBadge({ priority }: { priority: ReportPriority }) {
  return (
    <Badge className={cn("uppercase tracking-wide text-[10px] font-semibold border-0", STYLES[priority])}>
      {LABELS[priority]}
    </Badge>
  );
}

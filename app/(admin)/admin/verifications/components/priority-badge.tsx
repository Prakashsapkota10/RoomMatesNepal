"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { PRIORITY_LABELS, PRIORITY_TONE } from "./constants";
import type { StatusTone } from "./constants";
import type { VerificationPriority } from "./types";

const TONE_STYLES: Record<StatusTone, string> = {
  success: "bg-[color:var(--success-light)] text-[color:var(--success-dark)]",
  warning: "bg-[color:var(--warning-light)] text-[color:var(--warning-dark)]",
  error: "bg-destructive text-destructive-foreground",
  info: "bg-muted text-muted-foreground",
  neutral: "bg-muted text-muted-foreground",
};

/** Priority pill for a verification case — Low/Normal/High/Urgent. Urgent uses a solid destructive fill to stand out sparingly. */
export function PriorityBadge({ priority }: { priority: VerificationPriority }) {
  const tone = PRIORITY_TONE[priority];
  return (
    <Badge className={cn("uppercase tracking-wide text-[10px] font-semibold border-0", TONE_STYLES[tone])}>
      {PRIORITY_LABELS[priority]}
    </Badge>
  );
}

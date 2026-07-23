"use client";

import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { VERIFICATION_STATUS_ICON, VERIFICATION_STATUS_LABELS, VERIFICATION_STATUS_TONE } from "./constants";
import type { StatusTone } from "./constants";
import type { VerificationStatus } from "./types";

const TONE_STYLES: Record<StatusTone, string> = {
  success: "bg-[color:var(--success-light)] text-[color:var(--success-dark)]",
  warning: "bg-[color:var(--warning-light)] text-[color:var(--warning-dark)]",
  error: "bg-[color:var(--error-light)] text-[color:var(--error-dark)]",
  info: "bg-[color:var(--trust-light)] text-[color:var(--trust-dark)]",
  neutral: "bg-muted text-muted-foreground",
};

/**
 * Status pill for a verification case. Combines an icon + label + color so
 * status is never communicated by color alone — every current and future
 * status maps to an existing design-system token via VERIFICATION_STATUS_TONE.
 */
export function VerificationStatusBadge({ status }: { status: VerificationStatus }) {
  const tone = VERIFICATION_STATUS_TONE[status];
  const Icon = (Icons as unknown as Record<string, LucideIcon>)[VERIFICATION_STATUS_ICON[status]];
  return (
    <Badge className={cn("gap-1 text-[10px] font-semibold border-0", TONE_STYLES[tone])}>
      {Icon && <Icon className="h-2.5 w-2.5" aria-hidden="true" />}
      {VERIFICATION_STATUS_LABELS[status]}
    </Badge>
  );
}

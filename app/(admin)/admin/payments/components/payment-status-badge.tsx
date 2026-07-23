"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { PAYMENT_STATUS_LABELS, PAYMENT_STATUS_TONE, type StatusTone } from "./constants";
import type { PaymentStatus } from "./types";

const TONE_STYLES: Record<StatusTone, string> = {
  success: "bg-[color:var(--success-light)] text-[color:var(--success-dark)]",
  warning: "bg-[color:var(--warning-light)] text-[color:var(--warning-dark)]",
  error: "bg-[color:var(--error-light)] text-[color:var(--error-dark)]",
  info: "bg-[color:var(--trust-light)] text-[color:var(--trust-dark)]",
  neutral: "bg-muted text-muted-foreground",
};

const TONE_DOT: Record<StatusTone, string> = {
  success: "bg-[color:var(--success)]",
  warning: "bg-[color:var(--warning)]",
  error: "bg-[color:var(--error)]",
  info: "bg-[color:var(--trust)]",
  neutral: "bg-muted-foreground/50",
};

/**
 * Status pill for a payment row. Color/tone is driven by PAYMENT_STATUS_TONE
 * so every current and future status (paid/pending/held/overdue/...) maps to
 * an existing design-system token rather than a hardcoded color. The colored
 * dot means status is still legible without relying on color alone.
 */
export function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  const tone = PAYMENT_STATUS_TONE[status];
  return (
    <Badge className={cn("gap-1 text-[10px] font-semibold border-0", TONE_STYLES[tone])}>
      <span className={cn("h-1.5 w-1.5 rounded-full shrink-0", TONE_DOT[tone])} aria-hidden="true" />
      {PAYMENT_STATUS_LABELS[status]}
    </Badge>
  );
}

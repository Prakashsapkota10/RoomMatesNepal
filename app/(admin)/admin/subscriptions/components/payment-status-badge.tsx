"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { PAYMENT_STATUS_LABELS, PAYMENT_STATUS_TONE } from "./constants";
import type { StatusTone } from "./constants";
import type { PaymentStatus } from "./types";

const TONE_STYLES: Record<StatusTone, string> = {
  success: "bg-[color:var(--success-light)] text-[color:var(--success-dark)]",
  warning: "bg-[color:var(--warning-light)] text-[color:var(--warning-dark)]",
  error: "bg-[color:var(--error-light)] text-[color:var(--error-dark)]",
  info: "bg-[color:var(--trust-light)] text-[color:var(--trust-dark)]",
  neutral: "bg-muted text-muted-foreground",
};

/**
 * Status pill for the subscription's most recent payment — Paid/Pending/
 * Failed/Refunded. Kept as its own component (distinct from
 * SubscriptionStatusBadge) since subscription status and payment status
 * are independent concepts that must be shown side by side, never merged.
 */
export function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  const tone = PAYMENT_STATUS_TONE[status];
  return (
    <Badge className={cn("gap-1 text-[10px] font-semibold border-0", TONE_STYLES[tone])}>
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full shrink-0",
          tone === "success" && "bg-[color:var(--success)]",
          tone === "warning" && "bg-[color:var(--warning)]",
          tone === "error" && "bg-[color:var(--error)]",
          tone === "neutral" && "bg-muted-foreground/50"
        )}
        aria-hidden="true"
      />
      {PAYMENT_STATUS_LABELS[status]}
    </Badge>
  );
}

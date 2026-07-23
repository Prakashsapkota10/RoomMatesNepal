"use client";

import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { SUBSCRIPTION_STATUS_ICON, SUBSCRIPTION_STATUS_LABELS, SUBSCRIPTION_STATUS_TONE } from "./constants";
import type { StatusTone } from "./constants";
import type { SubscriptionStatus } from "./types";

const TONE_STYLES: Record<StatusTone, string> = {
  success: "bg-[color:var(--success-light)] text-[color:var(--success-dark)]",
  warning: "bg-[color:var(--warning-light)] text-[color:var(--warning-dark)]",
  error: "bg-[color:var(--error-light)] text-[color:var(--error-dark)]",
  info: "bg-[color:var(--trust-light)] text-[color:var(--trust-dark)]",
  neutral: "bg-muted text-muted-foreground",
};

/**
 * Status pill for a subscription's lifecycle state — Active/Past Due/
 * Cancelled/Expired/Paused. Deliberately separate from PaymentStatusBadge:
 * a subscription can be "Active" while its latest payment is "Failed"
 * (past-due), and the two must never be combined into one status.
 */
export function SubscriptionStatusBadge({ status }: { status: SubscriptionStatus }) {
  const tone = SUBSCRIPTION_STATUS_TONE[status];
  const Icon = (Icons as unknown as Record<string, LucideIcon>)[SUBSCRIPTION_STATUS_ICON[status]];
  return (
    <Badge className={cn("gap-1 text-[10px] font-semibold border-0", TONE_STYLES[tone])}>
      {Icon && <Icon className="h-2.5 w-2.5" aria-hidden="true" />}
      {SUBSCRIPTION_STATUS_LABELS[status]}
    </Badge>
  );
}

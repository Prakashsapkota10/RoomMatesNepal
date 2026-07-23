"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { PAYMENT_TYPE_LABELS } from "./constants";
import type { PaymentType } from "./types";

const STYLES: Record<PaymentType, string> = {
  subscription: "bg-primary/10 text-primary",
  monthly_rent: "bg-[color:var(--ai-light)] text-[color:var(--ai-dark)]",
  security_deposit: "bg-[color:var(--community-light)] text-[color:var(--community-dark)]",
};

/** Payment type tag — Subscription / Monthly Rent / Security Deposit. */
export function PaymentTypeBadge({ type }: { type: PaymentType }) {
  return (
    <Badge className={cn("text-[10px] font-semibold border-0", STYLES[type])}>
      {PAYMENT_TYPE_LABELS[type]}
    </Badge>
  );
}

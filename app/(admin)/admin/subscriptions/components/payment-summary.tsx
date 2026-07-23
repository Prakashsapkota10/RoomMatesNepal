"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PaymentStatusBadge } from "./payment-status-badge";
import { PAYMENT_METHOD_LABELS } from "../../payments/components/constants";
import { formatCurrency, formatSubscriptionDate } from "./subscription.utils";
import type { LastPaymentSummary } from "./types";

function KeyValueRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 py-1.5">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-foreground text-right">{value}</span>
    </div>
  );
}

/**
 * Payment summary shown in the subscription detail drawer — a lightweight
 * snapshot of the most recent payment plus a link into Payment Management
 * for the full transaction record. Deliberately does not recreate the
 * Payment Management page's transaction detail, timeline, or invoice tools.
 */
export function PaymentSummary({ payment }: { payment: LastPaymentSummary }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="rounded-xl border p-3">
        <KeyValueRow label="Last Payment" value={formatCurrency(payment.amount)} />
        <KeyValueRow label="Payment Status" value={<PaymentStatusBadge status={payment.status} />} />
        <KeyValueRow label="Payment Method" value={PAYMENT_METHOD_LABELS[payment.method]} />
        <KeyValueRow label="Payment Date" value={formatSubscriptionDate(payment.paidAt)} />
        <KeyValueRow label="Transaction ID" value={payment.transactionId} />
      </div>
      <Link href={`/admin/payments?id=${payment.relatedPaymentId}`}>
        <Button variant="outline" size="sm" className="btn-secondary-motion w-full gap-1.5 font-medium">
          <ExternalLink className="h-3.5 w-3.5" />
          View Payment Details
        </Button>
      </Link>
    </div>
  );
}

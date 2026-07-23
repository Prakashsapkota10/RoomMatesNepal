"use client";

import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { RoleBadge } from "../../users/components/role-badge";
import { SubscriptionStatusBadge } from "./subscription-status-badge";
import { AutoRenewBadge } from "./auto-renew-badge";
import { PlanFeatures } from "./plan-features";
import { PaymentSummary } from "./payment-summary";
import { SubscriptionTimeline } from "./subscription-timeline";
import { InvoiceActionButtons } from "./invoice-actions";
import { PLAN_LABELS } from "./constants";
import { formatRecurringAmount, formatSubscriptionDate } from "./subscription.utils";
import type { SubscriptionRow } from "./types";

interface SubscriptionDetailDrawerProps {
  subscription: SubscriptionRow | null;
  onOpenChange: (open: boolean) => void;
  onSendReminder: (subscription: SubscriptionRow) => void;
  onDisableAutoRenew: (subscription: SubscriptionRow) => void;
  onCancel: (subscription: SubscriptionRow) => void;
  onReactivate: (subscription: SubscriptionRow) => void;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-2">{children}</p>
  );
}

function KeyValueRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 py-1.5">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-foreground text-right">{value}</span>
    </div>
  );
}

/**
 * Right-side subscription detail drawer for /admin/subscriptions. Payment
 * information here is a lightweight summary with a link into Payment
 * Management (see PaymentSummary) — this drawer never recreates the full
 * transaction system. Admin actions at the bottom are context-aware based
 * on the subscription's current status.
 */
export function SubscriptionDetailDrawer({
  subscription,
  onOpenChange,
  onSendReminder,
  onDisableAutoRenew,
  onCancel,
  onReactivate,
}: SubscriptionDetailDrawerProps) {
  return (
    <Sheet open={!!subscription} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md p-0 gap-0 flex flex-col">
        {subscription && (
          <>
            <SheetHeader className="px-4 pt-4 pb-3 border-b shrink-0">
              <SheetTitle>Subscription Details</SheetTitle>
            </SheetHeader>

            <div className="overflow-y-auto flex-1">
              {/* User summary */}
              <div className="flex flex-col items-center gap-2 px-4 pt-6 pb-5 border-b text-center">
                <Avatar size="lg">
                  <AvatarImage src={subscription.subscriber.avatar} alt={subscription.subscriber.name} />
                  <AvatarFallback className="text-sm font-semibold bg-primary/10 text-primary">
                    {subscription.subscriber.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <p className="text-base font-bold text-foreground mt-1">{subscription.subscriber.name}</p>
                <p className="text-xs text-muted-foreground">{subscription.subscriber.email}</p>
                <div className="flex items-center gap-1.5">
                  <RoleBadge role={subscription.subscriber.role} />
                  <SubscriptionStatusBadge status={subscription.status} />
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Customer ID: #{subscription.subscriber.displayId} · Subscription ID: #{subscription.id}
                </p>
              </div>

              <div className="p-4 flex flex-col gap-5">
                {/* Subscription overview */}
                <div>
                  <SectionLabel>Subscription Overview</SectionLabel>
                  <div className="rounded-xl border p-3 bg-primary/5 border-primary/15">
                    <KeyValueRow label="Plan" value={PLAN_LABELS[subscription.planId]} />
                    <KeyValueRow label="Status" value={<SubscriptionStatusBadge status={subscription.status} />} />
                    <KeyValueRow label="Billing Cycle" value={<span className="capitalize">{subscription.billingCycle}</span>} />
                    <KeyValueRow
                      label="Recurring Price"
                      value={formatRecurringAmount(subscription.recurringAmount, subscription.billingCycle)}
                    />
                    <KeyValueRow label="Subscription Started" value={formatSubscriptionDate(subscription.startedAt)} />
                    <KeyValueRow label="Next Billing" value={formatSubscriptionDate(subscription.nextBillingAt)} />
                    <KeyValueRow label="Auto-Renew" value={<AutoRenewBadge enabled={subscription.autoRenew} />} />
                  </div>
                </div>

                {/* Plan features */}
                <div>
                  <SectionLabel>Plan Features</SectionLabel>
                  <PlanFeatures planId={subscription.planId} />
                </div>

                {/* Payment summary */}
                <div>
                  <SectionLabel>Payment Summary</SectionLabel>
                  <PaymentSummary payment={subscription.lastPayment} />
                </div>

                {/* Invoice actions */}
                <div>
                  <SectionLabel>Invoice</SectionLabel>
                  <InvoiceActionButtons subscription={subscription} />
                </div>

                {/* Subscription history */}
                <div>
                  <SectionLabel>Subscription History</SectionLabel>
                  <div className="rounded-xl border p-3.5">
                    <SubscriptionTimeline steps={subscription.history} />
                  </div>
                </div>
              </div>
            </div>

            {/* Context-aware admin actions */}
            <SheetFooter className="flex-row flex-wrap gap-2 p-4 border-t bg-muted/30 shrink-0">
              {subscription.status === "past_due" && (
                <Button
                  className="flex-1 btn-primary-motion gap-1.5 font-semibold min-w-[calc(50%-0.25rem)]"
                  onClick={() => onSendReminder(subscription)}
                >
                  Send Payment Reminder
                </Button>
              )}

              {(subscription.status === "active" || subscription.status === "past_due") && subscription.autoRenew && (
                <Button
                  variant="outline"
                  className="flex-1 btn-secondary-motion gap-1.5 font-semibold min-w-[calc(50%-0.25rem)]"
                  onClick={() => onDisableAutoRenew(subscription)}
                >
                  Disable Auto-Renewal
                </Button>
              )}

              {(subscription.status === "active" || subscription.status === "past_due") && (
                <Button
                  variant="outline"
                  className="flex-1 btn-secondary-motion gap-1.5 font-semibold border-destructive/40 text-destructive hover:bg-destructive/10 min-w-[calc(50%-0.25rem)]"
                  onClick={() => onCancel(subscription)}
                >
                  Cancel Subscription
                </Button>
              )}

              {subscription.status === "cancelled" && (
                <Button
                  className="flex-1 btn-primary-motion gap-1.5 font-semibold min-w-[calc(50%-0.25rem)]"
                  onClick={() => onReactivate(subscription)}
                >
                  Reactivate Subscription
                </Button>
              )}

              <Link href={`/admin/payments?id=${subscription.lastPayment.relatedPaymentId}`} className="flex-1 min-w-[calc(50%-0.25rem)]">
                <Button variant="outline" className="btn-secondary-motion w-full gap-1.5 font-medium">
                  View Payment History
                </Button>
              </Link>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

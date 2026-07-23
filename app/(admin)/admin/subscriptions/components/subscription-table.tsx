"use client";

import { AlertTriangle, SearchX } from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { SubscriptionStatusBadge } from "./subscription-status-badge";
import { PaymentStatusBadge } from "./payment-status-badge";
import { AutoRenewBadge } from "./auto-renew-badge";
import { SubscriptionRowActions } from "./subscription-row-actions";
import { PLAN_LABELS } from "./constants";
import { formatRecurringAmount, formatSubscriptionDate } from "./subscription.utils";
import type { SubscriptionRow } from "./types";

interface SubscriptionTableProps {
  subscriptions: SubscriptionRow[];
  isLoading?: boolean;
  isError?: boolean;
  onRetry?: () => void;
  onViewDetails: (subscription: SubscriptionRow) => void;
  onViewPayment: (subscription: SubscriptionRow) => void;
  onSendReminder: (subscription: SubscriptionRow) => void;
  onDisableAutoRenew: (subscription: SubscriptionRow) => void;
  onCancel: (subscription: SubscriptionRow) => void;
  onReactivate: (subscription: SubscriptionRow) => void;
}

function TableSkeletonRows() {
  return (
    <>
      {Array.from({ length: 5 }, (_, i) => (
        <TableRow key={i} className="hover:bg-transparent">
          {Array.from({ length: 8 }, (_, j) => (
            <TableCell key={j}>
              <Skeleton className="h-4 w-full max-w-24" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}

/**
 * Subscription table for /admin/subscriptions — User, Plan, Billing Cycle,
 * Recurring Amount, Next Billing, Auto-Renew, Payment Status, Subscription
 * Status, Actions. Subscription status and payment status are always shown
 * as two separate columns/badges — never combined.
 */
export function SubscriptionTable({
  subscriptions,
  isLoading = false,
  isError = false,
  onRetry,
  onViewDetails,
  onViewPayment,
  onSendReminder,
  onDisableAutoRenew,
  onCancel,
  onReactivate,
}: SubscriptionTableProps) {
  if (isError) {
    return (
      <div className="py-16 flex flex-col items-center text-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
          <AlertTriangle className="h-5 w-5 text-destructive" />
        </div>
        <p className="text-sm font-medium text-foreground">Unable to load subscriptions.</p>
        <p className="text-xs text-muted-foreground">Please try again.</p>
        {onRetry && (
          <Button variant="outline" size="sm" className="btn-secondary-motion mt-2" onClick={onRetry}>
            Retry
          </Button>
        )}
      </div>
    );
  }

  if (!isLoading && subscriptions.length === 0) {
    return (
      <div className="py-16 flex flex-col items-center text-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
          <SearchX className="h-5 w-5 text-muted-foreground" />
        </div>
        <p className="text-sm font-medium text-foreground">No subscriptions found.</p>
        <p className="text-xs text-muted-foreground">Try adjusting your filters or search query.</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">User</TableHead>
          <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Plan</TableHead>
          <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Billing Cycle</TableHead>
          <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Recurring Amount</TableHead>
          <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Next Billing</TableHead>
          <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Auto-Renew</TableHead>
          <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Payment Status</TableHead>
          <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Subscription Status</TableHead>
          <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableSkeletonRows />
        ) : (
          subscriptions.map((s, index) => (
            <TableRow
              key={s.id}
              className="animate-in fade-in slide-in-from-bottom-1 duration-300 fill-mode-both cursor-pointer"
              style={{ animationDelay: `${index * 40}ms` }}
              onClick={() => onViewDetails(s)}
            >
              <TableCell>
                <div className="flex items-center gap-2.5">
                  <Avatar size="sm">
                    <AvatarImage src={s.subscriber.avatar} alt={s.subscriber.name} />
                    <AvatarFallback className="text-[10px] font-semibold bg-primary/10 text-primary">
                      {s.subscriber.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground leading-tight">{s.subscriber.name}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">#{s.id}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <span className="text-sm text-foreground">{PLAN_LABELS[s.planId]}</span>
              </TableCell>
              <TableCell>
                <span className="text-xs text-muted-foreground capitalize">{s.billingCycle}</span>
              </TableCell>
              <TableCell>
                <span className="text-sm font-semibold text-foreground">
                  {formatRecurringAmount(s.recurringAmount, s.billingCycle)}
                </span>
              </TableCell>
              <TableCell>
                <span className="text-xs text-muted-foreground">{formatSubscriptionDate(s.nextBillingAt)}</span>
              </TableCell>
              <TableCell>
                <AutoRenewBadge enabled={s.autoRenew} />
              </TableCell>
              <TableCell>
                <PaymentStatusBadge status={s.lastPayment.status} />
              </TableCell>
              <TableCell>
                <SubscriptionStatusBadge status={s.status} />
              </TableCell>
              <TableCell onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-end">
                  <SubscriptionRowActions
                    subscription={s}
                    onViewDetails={onViewDetails}
                    onViewPayment={onViewPayment}
                    onSendReminder={onSendReminder}
                    onDisableAutoRenew={onDisableAutoRenew}
                    onCancel={onCancel}
                    onReactivate={onReactivate}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}

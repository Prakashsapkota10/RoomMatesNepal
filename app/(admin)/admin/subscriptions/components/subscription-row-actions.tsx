"use client";

import { MoreVertical, Eye, CreditCard, FileText, RefreshCwOff, XCircle, BellRing, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import type { SubscriptionRow } from "./types";

interface SubscriptionRowActionsProps {
  subscription: SubscriptionRow;
  onViewDetails: (subscription: SubscriptionRow) => void;
  onViewPayment: (subscription: SubscriptionRow) => void;
  onSendReminder: (subscription: SubscriptionRow) => void;
  onDisableAutoRenew: (subscription: SubscriptionRow) => void;
  onCancel: (subscription: SubscriptionRow) => void;
  onReactivate: (subscription: SubscriptionRow) => void;
}

/**
 * Row-level action menu — actions are context-aware based on the
 * subscription's current status, mirroring the pattern used in
 * VerificationRowActions. E.g. "Send Payment Reminder" only appears on
 * past-due subscriptions, "Reactivate" only on cancelled ones.
 * TODO: wire "View Payment Details" to /admin/payments?id=... once cross-linking exists.
 */
export function SubscriptionRowActions({
  subscription,
  onViewDetails,
  onViewPayment,
  onSendReminder,
  onDisableAutoRenew,
  onCancel,
  onReactivate,
}: SubscriptionRowActionsProps) {
  const { status, autoRenew } = subscription;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" size="icon-sm" aria-label={`Actions for ${subscription.subscriber.name}`}>
            <MoreVertical className="h-3.5 w-3.5 text-muted-foreground" />
          </Button>
        }
      />
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onViewDetails(subscription)}>
          <Eye className="h-3.5 w-3.5" />
          View Details
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onViewPayment(subscription)}>
          <CreditCard className="h-3.5 w-3.5" />
          View Payment Details
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {status === "past_due" && (
          <DropdownMenuItem onClick={() => onSendReminder(subscription)}>
            <BellRing className="h-3.5 w-3.5" />
            Send Payment Reminder
          </DropdownMenuItem>
        )}

        {(status === "active" || status === "past_due") && autoRenew && (
          <DropdownMenuItem onClick={() => onDisableAutoRenew(subscription)}>
            <RefreshCwOff className="h-3.5 w-3.5" />
            Disable Auto-Renewal
          </DropdownMenuItem>
        )}

        {(status === "active" || status === "past_due") && (
          <DropdownMenuItem variant="destructive" onClick={() => onCancel(subscription)}>
            <XCircle className="h-3.5 w-3.5" />
            Cancel Subscription
          </DropdownMenuItem>
        )}

        {status === "cancelled" && (
          <DropdownMenuItem onClick={() => onReactivate(subscription)}>
            <RotateCcw className="h-3.5 w-3.5" />
            Reactivate Subscription
          </DropdownMenuItem>
        )}

        <DropdownMenuItem onClick={() => onViewDetails(subscription)}>
          <FileText className="h-3.5 w-3.5" />
          View Invoice
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

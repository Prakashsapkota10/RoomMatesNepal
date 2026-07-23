"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { SubscriptionRow } from "./types";

/**
 * Cancel Subscription confirmation — requires an explicit choice between
 * cancelling immediately or at the end of the current billing period.
 * Cancelling never deletes the subscription record; history is preserved
 * and status simply moves to "cancelled".
 * TODO: wire onConfirm to the real cancellation mutation.
 */
export function CancelSubscriptionDialog({
  open,
  onOpenChange,
  subscription,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subscription: SubscriptionRow | null;
  onConfirm: (atPeriodEnd: boolean) => void;
}) {
  const [mode, setMode] = useState<"immediate" | "period_end">("period_end");

  const [prevOpen, setPrevOpen] = useState(open);
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) setMode("period_end");
  }

  if (!subscription) return null;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Cancel Subscription?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to cancel <strong>{subscription.subscriber.name}</strong>&apos;s subscription?
            Subscription history will remain available after cancellation.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <RadioGroup value={mode} onValueChange={(v) => setMode((v as typeof mode) ?? mode)} className="px-1">
          <label className="flex items-start gap-2.5 rounded-lg border p-2.5 cursor-pointer hover:border-primary/40 transition-colors">
            <RadioGroupItem value="period_end" className="mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">Cancel at end of billing period</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Access continues until {new Date(subscription.currentPeriodEnd).toLocaleDateString("en-NP")}.
              </p>
            </div>
          </label>
          <label className="flex items-start gap-2.5 rounded-lg border p-2.5 cursor-pointer hover:border-primary/40 transition-colors">
            <RadioGroupItem value="immediate" className="mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">Cancel immediately</p>
              <p className="text-xs text-muted-foreground mt-0.5">Access ends right away.</p>
            </div>
          </label>
        </RadioGroup>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            onClick={() => {
              onConfirm(mode === "period_end");
              onOpenChange(false);
            }}
          >
            Cancel Subscription
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

/** Confirmation for disabling auto-renewal — a financial lifecycle setting, never toggled directly in the table. */
export function DisableAutoRenewDialog({
  open,
  onOpenChange,
  subscription,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subscription: SubscriptionRow | null;
  onConfirm: () => void;
}) {
  if (!subscription) return null;
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Disable Auto-Renewal?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to disable auto-renewal for <strong>{subscription.subscriber.name}</strong>&apos;s
            subscription? Their plan will not renew automatically after the current billing period ends.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
          >
            Disable Auto-Renewal
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

/** Confirmation for reactivating a cancelled subscription. */
export function ReactivateSubscriptionDialog({
  open,
  onOpenChange,
  subscription,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subscription: SubscriptionRow | null;
  onConfirm: () => void;
}) {
  if (!subscription) return null;
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Reactivate Subscription?</AlertDialogTitle>
          <AlertDialogDescription>
            Reactivate <strong>{subscription.subscriber.name}</strong>&apos;s subscription? Billing will resume on
            their next scheduled cycle.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
          >
            Reactivate Subscription
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

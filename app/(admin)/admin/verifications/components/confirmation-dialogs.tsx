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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { VerificationRow } from "./types";

/**
 * Confirmation dialogs for the three sensitive verification actions — Mark
 * as Verified, Suspend Account, and Reject Verification. Grouped in one
 * file since they share the same open/verification/onConfirm shape and are
 * always used together from the same parent (the detail drawer / row actions).
 * TODO: wire each onConfirm to its real backend mutation.
 */

interface BaseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  verification: VerificationRow | null;
}

export function MarkVerifiedDialog({
  open,
  onOpenChange,
  verification,
  onConfirm,
}: BaseDialogProps & { onConfirm: () => void }) {
  if (!verification) return null;
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Mark as Verified?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to mark <strong>{verification.userName}</strong> as verified? This confirms
            their account meets RoomMate Nepal&apos;s trust requirements.
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
            Mark as Verified
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function SuspendAccountDialog({
  open,
  onOpenChange,
  verification,
  onConfirm,
}: BaseDialogProps & { onConfirm: () => void }) {
  if (!verification) return null;
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Suspend Account?</AlertDialogTitle>
          <AlertDialogDescription>
            Suspending <strong>{verification.userName}</strong>&apos;s account may prevent them from accessing
            platform features until reinstated. This action should be reserved for confirmed safety concerns.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
          >
            Suspend Account
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function RejectVerificationDialog({
  open,
  onOpenChange,
  verification,
  onConfirm,
}: BaseDialogProps & { onConfirm: (reason: string) => void }) {
  const [reason, setReason] = useState("");

  const [prevOpen, setPrevOpen] = useState(open);
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) setReason("");
  }

  if (!verification) return null;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Reject Verification?</AlertDialogTitle>
          <AlertDialogDescription>
            Please provide a reason for rejecting <strong>{verification.userName}</strong>&apos;s verification
            request. This will be recorded in their verification history.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="flex flex-col gap-1.5 px-1">
          <Label htmlFor="reject-reason" className="text-xs text-muted-foreground font-medium">
            Reason
          </Label>
          <Textarea
            id="reject-reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Explain why this verification is being rejected..."
            className="min-h-20"
          />
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            disabled={!reason.trim()}
            onClick={() => {
              onConfirm(reason.trim());
              onOpenChange(false);
            }}
          >
            Reject Verification
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

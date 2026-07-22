"use client";

import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "./toast-provider";
import type { PlatformSettings } from "./types";

interface TwoFactorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  value: PlatformSettings["security"];
  onChange: (value: PlatformSettings["security"]) => void;
}

/**
 * Manage 2FA modal — shows current status/method, lets the admin toggle
 * 2FA, requires confirmation before disabling, and saves the change.
 * TODO: wire to a real 2FA enrollment/disable API.
 */
export function TwoFactorDialog({ open, onOpenChange, value, onChange }: TwoFactorDialogProps) {
  const { showToast } = useToast();
  const [draftEnabled, setDraftEnabled] = useState(value.twoFactorEnabled);
  const [confirmDisableOpen, setConfirmDisableOpen] = useState(false);

  // Resync the draft from the saved value whenever the dialog reopens —
  // adjusting state during render instead of an effect.
  const [prevOpen, setPrevOpen] = useState(open);
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) setDraftEnabled(value.twoFactorEnabled);
  }

  function handleToggle(checked: boolean) {
    if (!checked) {
      setConfirmDisableOpen(true);
      return;
    }
    setDraftEnabled(true);
  }

  function handleSave() {
    onChange({ ...value, twoFactorEnabled: draftEnabled });
    onOpenChange(false);
    showToast(draftEnabled ? "Two-factor authentication enabled." : "Two-factor authentication disabled.");
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Manage Two-Factor Authentication</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-2.5 rounded-xl bg-primary/5 border border-primary/15 p-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 shrink-0">
                <ShieldCheck className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Status: {draftEnabled ? "Enabled" : "Disabled"}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Current method: {value.twoFactorMethod}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 rounded-xl border p-3.5">
              <Label htmlFor="tfa-toggle" className="text-sm font-medium cursor-pointer">
                Require 2FA for admin accounts
              </Label>
              <Switch id="tfa-toggle" checked={draftEnabled} onCheckedChange={handleToggle} />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" className="btn-secondary-motion font-medium" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button size="sm" className="btn-primary-motion font-semibold" onClick={handleSave}>
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Confirm before disabling */}
      <AlertDialog open={confirmDisableOpen} onOpenChange={setConfirmDisableOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Disable Two-Factor Authentication?</AlertDialogTitle>
            <AlertDialogDescription>
              This will reduce the security of admin accounts. Are you sure you want to continue?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => {
                setDraftEnabled(false);
                setConfirmDisableOpen(false);
              }}
            >
              Disable 2FA
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

"use client";

import { useState } from "react";
import { ShieldAlert, AlertTriangle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "./toast-provider";

interface ResetPlatformDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CONFIRM_PHRASE = "RESET ROOMMATE NEPAL";
const STEP_COUNT = 4;

/**
 * Reset Platform Data — the most destructive action on the page, gated
 * behind a 4-step confirmation flow: warning -> password -> typed phrase
 * -> final confirmation. Nothing is actually deleted; this only simulates
 * the flow on the frontend since no such backend endpoint exists.
 * TODO: wire the final step to a real, heavily-guarded reset endpoint.
 */
export function ResetPlatformDialog({ open, onOpenChange }: ResetPlatformDialogProps) {
  const { showToast } = useToast();
  const [step, setStep] = useState(1);
  const [password, setPassword] = useState("");
  const [confirmText, setConfirmText] = useState("");
  const [isResetting, setIsResetting] = useState(false);

  // Reset the whole flow back to step 1 whenever the dialog reopens —
  // adjusting state during render instead of an effect.
  const [prevOpen, setPrevOpen] = useState(open);
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) {
      setStep(1);
      setPassword("");
      setConfirmText("");
    }
  }

  function handleClose() {
    onOpenChange(false);
  }

  function handleFinalConfirm() {
    setIsResetting(true);
    // Simulated reset — TODO: replace with a real, guarded reset endpoint.
    setTimeout(() => {
      setIsResetting(false);
      handleClose();
      showToast("Platform reset simulation complete. No data was actually deleted.", "info");
    }, 1000);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Reset Platform Data</DialogTitle>
        </DialogHeader>

        {/* Step indicator */}
        <div className="flex items-center gap-1.5">
          {Array.from({ length: STEP_COUNT }, (_, i) => i + 1).map((s) => (
            <span
              key={s}
              className={`h-1 flex-1 rounded-full ${s <= step ? "bg-destructive" : "bg-muted"}`}
            />
          ))}
        </div>

        {step === 1 && (
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-2.5 rounded-xl bg-destructive/5 border border-destructive/20 p-3">
              <ShieldAlert className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                This will irreversibly reset <strong className="text-foreground">all</strong> platform
                data — users, listings, reports, community posts, and settings. There is no way to
                recover this data afterward. Only proceed if you fully understand the consequences.
              </p>
            </div>
            <div className="flex items-center justify-end gap-2">
              <Button variant="outline" size="sm" className="btn-secondary-motion font-medium" onClick={handleClose}>
                Cancel
              </Button>
              <Button size="sm" variant="destructive" className="font-semibold" onClick={() => setStep(2)}>
                I Understand, Continue
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="reset-password" className="text-xs text-muted-foreground font-medium">
                Confirm your admin password
              </Label>
              <Input
                id="reset-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="h-10"
              />
            </div>
            <div className="flex items-center justify-end gap-2">
              <Button variant="outline" size="sm" className="btn-secondary-motion font-medium" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button
                size="sm"
                variant="destructive"
                className="font-semibold"
                disabled={!password.trim()}
                onClick={() => setStep(3)}
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="reset-confirm-text" className="text-xs text-muted-foreground font-medium">
                Type <span className="font-mono font-semibold text-foreground">{CONFIRM_PHRASE}</span> to confirm
              </Label>
              <Input
                id="reset-confirm-text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder={CONFIRM_PHRASE}
                className="h-10 font-mono"
              />
            </div>
            <div className="flex items-center justify-end gap-2">
              <Button variant="outline" size="sm" className="btn-secondary-motion font-medium" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button
                size="sm"
                variant="destructive"
                className="font-semibold"
                disabled={confirmText !== CONFIRM_PHRASE}
                onClick={() => setStep(4)}
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-2.5 rounded-xl bg-destructive/10 border border-destructive/30 p-3">
              <AlertTriangle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
              <p className="text-xs font-medium text-foreground leading-relaxed">
                Final confirmation: this is your last chance to cancel. Clicking below will permanently
                reset all platform data.
              </p>
            </div>
            <div className="flex items-center justify-end gap-2">
              <Button variant="outline" size="sm" className="btn-secondary-motion font-medium" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                size="sm"
                variant="destructive"
                className="font-semibold"
                disabled={isResetting}
                onClick={handleFinalConfirm}
              >
                {isResetting ? "Resetting..." : "Reset Platform Data"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

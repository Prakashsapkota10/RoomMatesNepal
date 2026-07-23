"use client";

import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/admin/toast-provider";

interface DeleteTestDataDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CONFIRM_PHRASE = "DELETE TEST DATA";

/**
 * Delete Test Data confirmation — requires typing an exact phrase before
 * the destructive action button becomes enabled.
 * TODO: wire to a real test-data cleanup endpoint.
 */
export function DeleteTestDataDialog({ open, onOpenChange }: DeleteTestDataDialogProps) {
  const { showToast } = useToast();
  const [confirmText, setConfirmText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Reset the confirmation text whenever the dialog transitions to open —
  // adjusting state during render (React's recommended pattern) instead of
  // an effect, since this must run before paint with no flash of stale text.
  const [prevOpen, setPrevOpen] = useState(open);
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) setConfirmText("");
  }

  const isMatch = confirmText === CONFIRM_PHRASE;

  function handleDelete() {
    if (!isMatch) return;
    setIsDeleting(true);
    // Simulated deletion — TODO: replace with a real API call.
    setTimeout(() => {
      setIsDeleting(false);
      onOpenChange(false);
      showToast("Test data deleted.", "info");
    }, 800);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Delete Test Data</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-2.5 rounded-xl bg-destructive/5 border border-destructive/20 p-3">
            <AlertTriangle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              This permanently removes seeded and test-only records. Real user, listing, and report
              data will not be affected. This action cannot be undone.
            </p>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="delete-confirm" className="text-xs text-muted-foreground font-medium">
              Type <span className="font-mono font-semibold text-foreground">{CONFIRM_PHRASE}</span> to confirm
            </Label>
            <Input
              id="delete-confirm"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder={CONFIRM_PHRASE}
              className="h-10 font-mono"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-2">
          <Button variant="outline" size="sm" className="btn-secondary-motion font-medium" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            size="sm"
            variant="destructive"
            className="font-semibold"
            disabled={!isMatch || isDeleting}
            onClick={handleDelete}
          >
            {isDeleting ? "Deleting..." : "Delete Test Data"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

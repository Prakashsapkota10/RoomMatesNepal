"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ADDITIONAL_VERIFICATION_REASONS } from "./constants";
import type { VerificationRow } from "./types";

interface AdditionalVerificationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  verification: VerificationRow | null;
  onSend: (reason: string, message: string) => void;
}

/**
 * "Request Additional Verification" dialog — a reason dropdown plus an
 * optional message, deliberately built without any document-upload field.
 * This keeps the platform flexible (it can ask a user for more information)
 * without forcing government ID or biometric collection.
 * TODO: wire onSend to a real POST /api/admin/verifications/:id/request call
 * that notifies the user in-app/by email.
 */
export function AdditionalVerificationDialog({
  open,
  onOpenChange,
  verification,
  onSend,
}: AdditionalVerificationDialogProps) {
  const [reason, setReason] = useState<string>(ADDITIONAL_VERIFICATION_REASONS[0].value);
  const [message, setMessage] = useState("");

  // Reset the form whenever the dialog reopens — adjusting state during
  // render instead of an effect.
  const [prevOpen, setPrevOpen] = useState(open);
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) {
      setReason(ADDITIONAL_VERIFICATION_REASONS[0].value);
      setMessage("");
    }
  }

  function handleSend() {
    onSend(reason, message.trim());
    onOpenChange(false);
  }

  if (!verification) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Request Additional Verification</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <p className="text-xs text-muted-foreground">
            Ask <span className="font-medium text-foreground">{verification.userName}</span> for more
            information without requiring government ID or biometric data.
          </p>

          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-muted-foreground font-medium">Reason</Label>
            <Select value={reason} onValueChange={(v) => setReason(v ?? reason)}>
              <SelectTrigger className="h-10 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ADDITIONAL_VERIFICATION_REASONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="additional-verification-message" className="text-xs text-muted-foreground font-medium">
              Message (optional)
            </Label>
            <Textarea
              id="additional-verification-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Add any additional context for the user..."
              className="min-h-20"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-2">
          <Button variant="outline" size="sm" className="btn-secondary-motion font-medium" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button size="sm" className="btn-primary-motion font-semibold" onClick={handleSend}>
            Send Verification Request
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

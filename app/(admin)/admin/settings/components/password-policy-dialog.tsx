"use client";

import { useState } from "react";
import { AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/admin/toast-provider";
import type { PasswordPolicy } from "./types";

interface PasswordPolicyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  value: PasswordPolicy;
  onChange: (value: PasswordPolicy) => void;
}

const REQUIREMENT_ROWS: { key: keyof PasswordPolicy; label: string }[] = [
  { key: "requireUppercase", label: "Require uppercase letter" },
  { key: "requireLowercase", label: "Require lowercase letter" },
  { key: "requireNumber", label: "Require number" },
  { key: "requireSpecialChar", label: "Require special character" },
];

/**
 * Password Policy modal — minimum length + character requirement toggles.
 * TODO: wire to a real password-policy API once one exists.
 */
export function PasswordPolicyDialog({ open, onOpenChange, value, onChange }: PasswordPolicyDialogProps) {
  const { showToast } = useToast();
  const [draft, setDraft] = useState<PasswordPolicy>(value);
  const [lengthError, setLengthError] = useState<string | null>(null);

  // Resync the draft from the saved value whenever the dialog reopens —
  // adjusting state during render instead of an effect.
  const [prevOpen, setPrevOpen] = useState(open);
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) {
      setDraft(value);
      setLengthError(null);
    }
  }

  function handleLengthChange(raw: string) {
    const num = Number(raw);
    setDraft({ ...draft, minLength: num });
    if (!raw || Number.isNaN(num) || num < 6 || num > 32) {
      setLengthError("Minimum length must be between 6 and 32 characters.");
    } else {
      setLengthError(null);
    }
  }

  function handleSave() {
    if (lengthError) return;
    onChange(draft);
    onOpenChange(false);
    showToast("Password policy updated.");
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Password Policy</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="min-length" className="text-xs text-muted-foreground font-medium">
              Minimum Password Length
            </Label>
            <Input
              id="min-length"
              type="number"
              min={6}
              max={32}
              value={draft.minLength}
              onChange={(e) => handleLengthChange(e.target.value)}
              aria-invalid={!!lengthError}
              className="h-10"
            />
            {lengthError && (
              <p className="flex items-center gap-1 text-[11px] text-destructive">
                <AlertCircle className="h-3 w-3" />
                {lengthError}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            {REQUIREMENT_ROWS.map((row) => (
              <div key={row.key} className="flex items-center justify-between gap-3 rounded-lg border p-3">
                <Label htmlFor={row.key} className="text-sm font-medium cursor-pointer">
                  {row.label}
                </Label>
                <Switch
                  id={row.key}
                  checked={draft[row.key] as boolean}
                  onCheckedChange={(checked) => setDraft({ ...draft, [row.key]: checked === true })}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-2">
          <Button variant="outline" size="sm" className="btn-secondary-motion font-medium" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button size="sm" className="btn-primary-motion font-semibold" disabled={!!lengthError} onClick={handleSave}>
            Save Password Policy
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

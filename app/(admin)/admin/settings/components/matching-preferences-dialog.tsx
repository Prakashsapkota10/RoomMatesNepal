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
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/admin/toast-provider";
import type { MatchingWeights } from "./types";

interface MatchingPreferencesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  value: MatchingWeights;
  onChange: (value: MatchingWeights) => void;
}

const WEIGHT_ROWS: { key: keyof MatchingWeights; label: string }[] = [
  { key: "lifestyle", label: "Lifestyle Compatibility" },
  { key: "budget", label: "Budget Compatibility" },
  { key: "location", label: "Location Compatibility" },
  { key: "personality", label: "Personality Compatibility" },
];

/**
 * Configure Matching Preferences modal — sliders for each compatibility
 * dimension, with a running total so the admin can see the weights sum
 * to 100%.
 * TODO: wire to a real AI matching configuration API.
 */
export function MatchingPreferencesDialog({ open, onOpenChange, value, onChange }: MatchingPreferencesDialogProps) {
  const { showToast } = useToast();
  const [draft, setDraft] = useState<MatchingWeights>(value);

  // Resync the draft from the saved value whenever the dialog reopens —
  // adjusting state during render instead of an effect.
  const [prevOpen, setPrevOpen] = useState(open);
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) setDraft(value);
  }

  const total = WEIGHT_ROWS.reduce((sum, row) => sum + draft[row.key], 0);
  const totalInvalid = total !== 100;

  function handleSave() {
    if (totalInvalid) return;
    onChange(draft);
    onOpenChange(false);
    showToast("Matching preferences updated.");
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Configure Matching Preferences</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          {WEIGHT_ROWS.map((row) => (
            <div key={row.key} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <Label className="text-xs text-muted-foreground font-medium">{row.label}</Label>
                <span className="text-xs font-semibold text-foreground tabular-nums">{draft[row.key]}%</span>
              </div>
              <Slider
                value={[draft[row.key]]}
                min={0}
                max={100}
                step={5}
                onValueChange={(v) => {
                  const values = v as number[];
                  setDraft({ ...draft, [row.key]: values[0] });
                }}
              />
            </div>
          ))}

          <div className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2">
            <span className="text-xs font-medium text-muted-foreground">Total</span>
            <span className={`text-sm font-bold tabular-nums ${totalInvalid ? "text-destructive" : "text-[color:var(--success-dark)]"}`}>
              {total}%
            </span>
          </div>
          {totalInvalid && (
            <p className="flex items-center gap-1 text-[11px] text-destructive">
              <AlertCircle className="h-3 w-3" />
              Weights must add up to 100%.
            </p>
          )}
        </div>

        <div className="flex items-center justify-end gap-2 pt-2">
          <Button variant="outline" size="sm" className="btn-secondary-motion font-medium" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button size="sm" className="btn-primary-motion font-semibold" disabled={totalInvalid} onClick={handleSave}>
            Save Preferences
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

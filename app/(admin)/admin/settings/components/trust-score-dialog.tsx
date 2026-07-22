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
import { useToast } from "./toast-provider";
import type { TrustScoreWeights } from "./types";

interface TrustScoreDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  value: TrustScoreWeights;
  onChange: (value: TrustScoreWeights) => void;
}

const WEIGHT_ROWS: { key: keyof TrustScoreWeights; label: string }[] = [
  { key: "verification", label: "Verification Weight" },
  { key: "review", label: "Review Weight" },
  { key: "report", label: "Report Weight" },
  { key: "profileCompletion", label: "Profile Completion Weight" },
];

// A representative sample profile used purely to make the weighted example concrete.
const SAMPLE_INPUTS: Record<keyof TrustScoreWeights, number> = {
  verification: 90,
  review: 85,
  report: 95,
  profileCompletion: 80,
};

/**
 * Trust Score Configuration modal — sliders for each weight component,
 * plus a live example combining the weights against a sample profile.
 * TODO: wire to a real trust-score configuration API.
 */
export function TrustScoreDialog({ open, onOpenChange, value, onChange }: TrustScoreDialogProps) {
  const { showToast } = useToast();
  const [draft, setDraft] = useState<TrustScoreWeights>(value);

  // Resync the draft from the saved value whenever the dialog reopens —
  // adjusting state during render instead of an effect.
  const [prevOpen, setPrevOpen] = useState(open);
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) setDraft(value);
  }

  const total = WEIGHT_ROWS.reduce((sum, row) => sum + draft[row.key], 0);
  const totalInvalid = total !== 100;

  const exampleScore = Math.round(
    WEIGHT_ROWS.reduce((sum, row) => sum + (SAMPLE_INPUTS[row.key] * draft[row.key]) / 100, 0)
  );

  function handleSave() {
    if (totalInvalid) return;
    onChange(draft);
    onOpenChange(false);
    showToast("Trust score configuration updated.");
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Trust Score Configuration</DialogTitle>
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

          {totalInvalid && (
            <p className="flex items-center gap-1 text-[11px] text-destructive">
              <AlertCircle className="h-3 w-3" />
              Weights must add up to 100% (currently {total}%).
            </p>
          )}

          <div className="rounded-xl bg-primary/5 border border-primary/15 p-3.5">
            <p className="text-xs text-muted-foreground font-medium mb-1">Trust Score Example</p>
            <p className="text-lg font-bold text-primary">{exampleScore} / 100</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              Based on a sample profile with strong verification, reviews, and low reports.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-2">
          <Button variant="outline" size="sm" className="btn-secondary-motion font-medium" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button size="sm" className="btn-primary-motion font-semibold" disabled={totalInvalid} onClick={handleSave}>
            Save Configuration
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

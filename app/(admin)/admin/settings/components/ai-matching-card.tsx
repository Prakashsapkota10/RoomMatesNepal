"use client";

import { useState } from "react";
import { Sparkles, SlidersHorizontal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SettingToggleRow } from "./setting-toggle-row";
import { MatchingPreferencesDialog } from "./matching-preferences-dialog";
import { MATCHING_ALGORITHM_OPTIONS } from "./constants";
import type { MatchingAlgorithm, PlatformSettings } from "./types";

interface AiMatchingCardProps {
  value: PlatformSettings["aiMatching"];
  onChange: (value: PlatformSettings["aiMatching"]) => void;
}

/**
 * AI Matching card — status toggle, minimum match score slider,
 * recommendations/feedback toggles, algorithm selector, and a link to the
 * detailed Configure Matching Preferences modal.
 */
export function AiMatchingCard({ value, onChange }: AiMatchingCardProps) {
  const [prefsOpen, setPrefsOpen] = useState(false);

  return (
    <Card>
      <CardContent className="p-5 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground">AI Matching</h3>
            <p className="text-xs text-muted-foreground">
              Configure AI-powered roommate compatibility recommendations.
            </p>
          </div>
        </div>

        <SettingToggleRow
          id="ai-matching-status"
          label="AI Matching Status"
          description="Turn AI-powered roommate matching on or off platform-wide."
          checked={value.enabled}
          onCheckedChange={(checked) => onChange({ ...value, enabled: checked })}
        />

        <div className="flex flex-col gap-1.5 rounded-xl bg-muted/40 p-3.5">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-semibold text-foreground">Minimum Match Score</Label>
            <span className="text-xs font-semibold text-primary tabular-nums">{value.minMatchScore}%</span>
          </div>
          <p className="text-xs text-muted-foreground mb-1">
            Minimum compatibility score required to surface a match.
          </p>
          <Slider
            value={[value.minMatchScore]}
            min={0}
            max={100}
            step={5}
            onValueChange={(v) => {
              const values = v as number[];
              onChange({ ...value, minMatchScore: values[0] });
            }}
          />
        </div>

        <SettingToggleRow
          id="ai-recommendations"
          label="AI Recommendations"
          description="Show AI-recommended roommates to users."
          checked={value.recommendationsEnabled}
          onCheckedChange={(checked) => onChange({ ...value, recommendationsEnabled: checked })}
        />

        <SettingToggleRow
          id="match-feedback"
          label="Match Feedback Collection"
          description="Collect user feedback on match quality to improve results."
          checked={value.feedbackCollectionEnabled}
          onCheckedChange={(checked) => onChange({ ...value, feedbackCollectionEnabled: checked })}
        />

        <div className="flex flex-col gap-1.5">
          <Label className="text-xs text-muted-foreground font-medium">Matching Algorithm</Label>
          <Select
            value={value.algorithm}
            onValueChange={(v) => onChange({ ...value, algorithm: (v ?? value.algorithm) as MatchingAlgorithm })}
          >
            <SelectTrigger className="h-10 w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {MATCHING_ALGORITHM_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="btn-secondary-motion gap-1.5 font-medium w-fit"
          onClick={() => setPrefsOpen(true)}
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
          Configure Matching Preferences
        </Button>
      </CardContent>

      <MatchingPreferencesDialog
        open={prefsOpen}
        onOpenChange={setPrefsOpen}
        value={value.weights}
        onChange={(weights) => onChange({ ...value, weights })}
      />
    </Card>
  );
}

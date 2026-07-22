"use client";

import { useState } from "react";
import { BadgeCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SettingToggleRow } from "./setting-toggle-row";
import { SettingsLinkRow } from "./settings-link-row";
import { TrustScoreDialog } from "./trust-score-dialog";
import { REVIEW_MODERATION_OPTIONS } from "./constants";
import type { PlatformSettings, ReviewModeration } from "./types";

interface VerificationTrustCardProps {
  value: PlatformSettings["verification"];
  onChange: (value: PlatformSettings["verification"]) => void;
}

/**
 * Verification & Trust card — identity verification toggles, the trust
 * score system toggle + weight configuration modal, and review moderation mode.
 */
export function VerificationTrustCard({ value, onChange }: VerificationTrustCardProps) {
  const [trustDialogOpen, setTrustDialogOpen] = useState(false);

  return (
    <Card>
      <CardContent className="p-5 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
            <BadgeCheck className="h-3.5 w-3.5 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground">Verification & Trust</h3>
            <p className="text-xs text-muted-foreground">
              Manage identity verification and platform trust requirements.
            </p>
          </div>
        </div>

        <SettingToggleRow
          id="email-verification"
          label="Email Verification"
          description="Require users to verify their email address."
          checked={value.emailVerificationEnabled}
          onCheckedChange={(checked) => onChange({ ...value, emailVerificationEnabled: checked })}
        />

        <SettingToggleRow
          id="phone-verification"
          label="Phone Verification"
          description="Require users to verify their phone number."
          checked={value.phoneVerificationEnabled}
          onCheckedChange={(checked) => onChange({ ...value, phoneVerificationEnabled: checked })}
        />

        <SettingToggleRow
          id="profile-verification"
          label="Profile Verification"
          description="Require users to verify their profile details."
          checked={value.profileVerificationEnabled}
          onCheckedChange={(checked) => onChange({ ...value, profileVerificationEnabled: checked })}
        />

        <SettingToggleRow
          id="trust-score"
          label="Trust Score"
          description="Enable the Trust Score system for user profiles."
          checked={value.trustScoreEnabled}
          onCheckedChange={(checked) => onChange({ ...value, trustScoreEnabled: checked })}
        />

        <SettingsLinkRow
          label="Trust Score Configuration"
          description="Adjust the verification, review, report, and profile weights."
          onClick={() => setTrustDialogOpen(true)}
        />

        <div className="flex flex-col gap-1.5">
          <Label className="text-xs text-muted-foreground font-medium">Review Moderation</Label>
          <Select
            value={value.reviewModeration}
            onValueChange={(v) => onChange({ ...value, reviewModeration: (v ?? value.reviewModeration) as ReviewModeration })}
          >
            <SelectTrigger className="h-10 w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {REVIEW_MODERATION_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>

      <TrustScoreDialog
        open={trustDialogOpen}
        onOpenChange={setTrustDialogOpen}
        value={value.trustScoreWeights}
        onChange={(weights) => onChange({ ...value, trustScoreWeights: weights })}
      />
    </Card>
  );
}

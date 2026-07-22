"use client";

import { Building2, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SettingToggleRow } from "./setting-toggle-row";
import { AUTO_EXPIRE_DAY_OPTIONS } from "./constants";
import type { PlatformSettings } from "./types";

interface ListingModerationCardProps {
  value: PlatformSettings["listing"];
  onChange: (value: PlatformSettings["listing"]) => void;
}

/**
 * Listing & Moderation card — approval requirements, auto-expiry, report
 * threshold, duplicate detection, and featured listing approval.
 */
export function ListingModerationCard({ value, onChange }: ListingModerationCardProps) {
  const thresholdInvalid = value.reportThreshold < 1 || value.reportThreshold > 50;

  return (
    <Card>
      <CardContent className="p-5 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
            <Building2 className="h-3.5 w-3.5 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground">Listing & Moderation</h3>
            <p className="text-xs text-muted-foreground">
              Control listing approval, reporting, and marketplace safety rules.
            </p>
          </div>
        </div>

        <SettingToggleRow
          id="listing-approval"
          label="Listing Approval"
          description="Require admin approval before publishing listings."
          checked={value.requireApproval}
          onCheckedChange={(checked) => onChange({ ...value, requireApproval: checked })}
        />

        <SettingToggleRow
          id="auto-expire"
          label="Auto Expire Listings"
          description="Automatically expire old listings."
          checked={value.autoExpireEnabled}
          onCheckedChange={(checked) => onChange({ ...value, autoExpireEnabled: checked })}
        />

        {value.autoExpireEnabled && (
          <div className="flex flex-col gap-1.5 pl-3.5 border-l-2 border-primary/20 ml-1">
            <Label className="text-xs text-muted-foreground font-medium">Expire listings after</Label>
            <Select
              value={String(value.autoExpireDays)}
              onValueChange={(v) => onChange({ ...value, autoExpireDays: Number(v ?? value.autoExpireDays) })}
            >
              <SelectTrigger className="h-9 w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {AUTO_EXPIRE_DAY_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="flex flex-col gap-1.5 rounded-xl bg-muted/40 p-3.5">
          <Label htmlFor="report-threshold" className="text-sm font-semibold text-foreground">
            Automatically flag content after
          </Label>
          <div className="flex items-center gap-2">
            <Input
              id="report-threshold"
              type="number"
              min={1}
              max={50}
              value={value.reportThreshold}
              onChange={(e) => onChange({ ...value, reportThreshold: Number(e.target.value) })}
              aria-invalid={thresholdInvalid}
              className="h-9 w-24"
            />
            <span className="text-xs text-muted-foreground">reports</span>
          </div>
          {thresholdInvalid && (
            <p className="flex items-center gap-1 text-[11px] text-destructive">
              <AlertCircle className="h-3 w-3" />
              Report threshold must be between 1 and 50.
            </p>
          )}
        </div>

        <SettingToggleRow
          id="duplicate-detection"
          label="Duplicate Listing Detection"
          description="Detect potentially duplicated listings."
          checked={value.duplicateDetectionEnabled}
          onCheckedChange={(checked) => onChange({ ...value, duplicateDetectionEnabled: checked })}
        />

        <SettingToggleRow
          id="featured-approval"
          label="Featured Listing Approval"
          description="Require admin approval before featuring listings."
          checked={value.featuredApprovalRequired}
          onCheckedChange={(checked) => onChange({ ...value, featuredApprovalRequired: checked })}
        />
      </CardContent>
    </Card>
  );
}

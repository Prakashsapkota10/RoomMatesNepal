"use client";

import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SettingsLinkRow } from "./settings-link-row";
import { TwoFactorDialog } from "./two-factor-dialog";
import { PasswordPolicyDialog } from "./password-policy-dialog";
import { SESSION_TIMEOUT_OPTIONS, LOGIN_ATTEMPT_OPTIONS } from "./constants";
import type { PlatformSettings } from "./types";

interface SecurityCardProps {
  value: PlatformSettings["security"];
  onChange: (value: PlatformSettings["security"]) => void;
}

/** Security card — 2FA status, Password Policy link, and session security selects. */
export function SecurityCard({ value, onChange }: SecurityCardProps) {
  const [tfaOpen, setTfaOpen] = useState(false);
  const [policyOpen, setPolicyOpen] = useState(false);

  return (
    <Card>
      <CardContent className="p-5 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
          </div>
          <h3 className="text-sm font-bold text-foreground">Security</h3>
        </div>

        {/* 2FA */}
        <div className="rounded-xl border p-3.5">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-semibold text-foreground">2FA Authentication</p>
            <Badge
              className={
                value.twoFactorEnabled
                  ? "bg-[color:var(--success-light)] text-[color:var(--success-dark)] text-[10px] font-semibold border-0"
                  : "bg-muted text-muted-foreground text-[10px] font-semibold border-0"
              }
            >
              {value.twoFactorEnabled ? "Enabled" : "Disabled"}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Current method: {value.twoFactorMethod}
          </p>
          <button
            type="button"
            onClick={() => setTfaOpen(true)}
            className="text-xs font-medium text-primary hover:underline mt-2"
          >
            Manage 2FA
          </button>
        </div>

        {/* Password Policy */}
        <SettingsLinkRow
          label="Password Policy"
          description={`Required: ${value.passwordPolicy.minLength} chars, alphanumeric, symbols.`}
          onClick={() => setPolicyOpen(true)}
        />

        {/* Session Security */}
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-muted-foreground font-medium">Session Timeout</Label>
            <Select
              value={String(value.sessionTimeoutMinutes)}
              onValueChange={(v) => onChange({ ...value, sessionTimeoutMinutes: Number(v ?? value.sessionTimeoutMinutes) })}
            >
              <SelectTrigger className="h-10 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SESSION_TIMEOUT_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-muted-foreground font-medium">Maximum Login Attempts</Label>
            <Select
              value={String(value.maxLoginAttempts)}
              onValueChange={(v) => onChange({ ...value, maxLoginAttempts: Number(v ?? value.maxLoginAttempts) })}
            >
              <SelectTrigger className="h-10 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LOGIN_ATTEMPT_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>

      <TwoFactorDialog open={tfaOpen} onOpenChange={setTfaOpen} value={value} onChange={onChange} />
      <PasswordPolicyDialog
        open={policyOpen}
        onOpenChange={setPolicyOpen}
        value={value.passwordPolicy}
        onChange={(policy) => onChange({ ...value, passwordPolicy: policy })}
      />
    </Card>
  );
}

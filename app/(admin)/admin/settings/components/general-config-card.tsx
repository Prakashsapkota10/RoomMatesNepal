"use client";

import { useRef, useState } from "react";
import { Globe, ImageIcon, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TIMEZONE_OPTIONS } from "./constants";
import { useToast } from "@/components/admin/toast-provider";
import type { PlatformSettings, SystemTimezone } from "./types";

interface GeneralConfigCardProps {
  value: PlatformSettings["general"];
  onChange: (value: PlatformSettings["general"]) => void;
}

const MAX_LOGO_BYTES = 2 * 1024 * 1024; // 2MB
const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/svg+xml"];

/**
 * General Configuration card — platform name, system timezone, and logo
 * upload with client-side validation (type + 2MB size limit) and preview.
 * No real upload endpoint exists yet, so the selected file is only kept as
 * an object URL preview in memory.
 * TODO: replace the object-URL preview with a real upload call once storage exists.
 */
export function GeneralConfigCard({ value, onChange }: GeneralConfigCardProps) {
  const { showToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [logoError, setLogoError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [nameError, setNameError] = useState<string | null>(null);

  function handleNameChange(next: string) {
    onChange({ ...value, platformName: next });
    setNameError(next.trim() ? null : "Platform name cannot be empty.");
  }

  function handleFileSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setLogoError("Unsupported format. Please upload PNG, JPG, JPEG, or SVG.");
      return;
    }
    if (file.size > MAX_LOGO_BYTES) {
      setLogoError("File exceeds the 2MB size limit.");
      return;
    }

    setLogoError(null);
    setIsUploading(true);
    // Simulated upload delay — TODO: replace with a real upload call.
    setTimeout(() => {
      const previewUrl = URL.createObjectURL(file);
      onChange({ ...value, logoUrl: previewUrl });
      setIsUploading(false);
      showToast("Logo uploaded successfully.");
    }, 600);
  }

  function handleRemoveLogo() {
    onChange({ ...value, logoUrl: null });
    setLogoError(null);
    showToast("Logo removed.", "info");
  }

  return (
    <Card>
      <CardContent className="p-5 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
            <Globe className="h-3.5 w-3.5 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground">General Configuration</h3>
            <p className="text-xs text-muted-foreground">
              Manage basic platform information and global configuration.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="platform-name" className="text-xs text-muted-foreground font-medium">
              Platform Name
            </Label>
            <Input
              id="platform-name"
              value={value.platformName}
              onChange={(e) => handleNameChange(e.target.value)}
              aria-invalid={!!nameError}
              className="h-10"
            />
            {nameError && (
              <p className="flex items-center gap-1 text-[11px] text-destructive">
                <AlertCircle className="h-3 w-3" />
                {nameError}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-muted-foreground font-medium">System Timezone</Label>
            <Select
              value={value.timezone}
              onValueChange={(v) => onChange({ ...value, timezone: (v ?? value.timezone) as SystemTimezone })}
            >
              <SelectTrigger className="h-10 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TIMEZONE_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Platform Logo */}
        <div className="flex flex-col gap-2 rounded-xl border p-3.5">
          <p className="text-xs text-muted-foreground font-medium">Platform Logo</p>
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border bg-muted overflow-hidden">
              {value.logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element -- transient object URL preview, not an optimizable remote asset
                <img src={value.logoUrl} alt="Platform logo preview" className="h-full w-full object-cover" />
              ) : (
                <ImageIcon className="h-5 w-5 text-muted-foreground" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-muted-foreground leading-relaxed">
                Upload a high-resolution PNG, JPG, or SVG. Max 2MB.
              </p>
              <div className="flex items-center gap-2 mt-2">
                <Button
                  size="sm"
                  className="btn-primary-motion font-semibold"
                  disabled={isUploading}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {isUploading ? "Uploading..." : "Replace Logo"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="btn-secondary-motion font-medium"
                  disabled={!value.logoUrl || isUploading}
                  onClick={handleRemoveLogo}
                >
                  Remove
                </Button>
              </div>
              {logoError && (
                <p className="flex items-center gap-1 text-[11px] text-destructive mt-1.5">
                  <AlertCircle className="h-3 w-3" />
                  {logoError}
                </p>
              )}
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".png,.jpg,.jpeg,.svg,image/png,image/jpeg,image/svg+xml"
            className="hidden"
            onChange={handleFileSelected}
          />
        </div>
      </CardContent>
    </Card>
  );
}

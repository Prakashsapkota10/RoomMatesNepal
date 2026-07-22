"use client";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface SettingToggleRowProps {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

/**
 * Shared label + description + Switch row used across the Listing &
 * Moderation, Verification & Trust, and Notification Preferences cards, so
 * every toggle setting on the page looks and behaves identically.
 */
export function SettingToggleRow({
  id,
  label,
  description,
  checked,
  onCheckedChange,
  disabled,
  className,
}: SettingToggleRowProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 rounded-xl p-3.5",
        checked ? "bg-primary/5" : "bg-muted/40",
        className
      )}
    >
      <div className="min-w-0">
        <Label htmlFor={id} className="text-sm font-semibold text-foreground cursor-pointer">
          {label}
        </Label>
        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{description}</p>
      </div>
      <Switch id={id} checked={checked} onCheckedChange={onCheckedChange} disabled={disabled} />
    </div>
  );
}

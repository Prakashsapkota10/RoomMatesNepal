"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export interface StatusFilterOption {
  value: string;
  label: string;
}

interface StatusFilterProps {
  /** Currently selected status value */
  value: string;
  /** Called when the user picks a new status */
  onValueChange: (value: string) => void;
  /** Status options for this page (e.g. Verified/Suspended, Pending/Approved) */
  options: StatusFilterOption[];
  /** Accessible label / trigger placeholder */
  label?: string;
  className?: string;
}

/**
 * Reusable status filter dropdown for admin list pages.
 *
 * Each admin route defines its own relevant statuses and passes them in via
 * `options` — e.g. Users: Verified/Unverified/Suspended, Listings:
 * Pending/Approved/Rejected, Reports: Open/Under Review/Resolved/Dismissed.
 *
 * Currently client-side only — TODO: wire selected value to backend query params.
 */
export function StatusFilter({
  value,
  onValueChange,
  options,
  label = "Status",
  className,
}: StatusFilterProps) {
  return (
    <Select value={value} onValueChange={(v) => onValueChange(v ?? options[0]?.value ?? "all")}>
      <SelectTrigger size="sm" className={cn("text-xs", className)} aria-label={label}>
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

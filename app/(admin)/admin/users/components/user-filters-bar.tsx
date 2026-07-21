"use client";

import { SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusFilter } from "@/components/admin/status-filter";
import { NEPAL_CITIES } from "@/lib/constants";

// The "all" option label is just the bare category name (e.g. "Role"), so the
// trigger reads as a simple, unambiguous placeholder until the admin picks a
// specific value — avoids the "Role: All" / "Status: All" clutter.
const ROLE_OPTIONS = [
  { value: "all", label: "Role" },
  { value: "user", label: "Room Seeker" },
  { value: "tenant", label: "Room Owner" },
  { value: "admin", label: "Admin" },
];

const STATUS_OPTIONS = [
  { value: "all", label: "Status" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "suspended", label: "Suspended" },
];

const CITY_OPTIONS = [
  { value: "all", label: "City" },
  ...NEPAL_CITIES.map((city) => ({ value: city.toLowerCase(), label: city })),
];

const VERIFICATION_OPTIONS = [
  { value: "all", label: "Verification" },
  { value: "verified", label: "Verified" },
  { value: "pending", label: "Pending" },
  { value: "rejected", label: "Rejected" },
];

export interface UserFiltersState {
  role: string;
  status: string;
  city: string;
  verification: string;
}

interface UserFiltersBarProps {
  filters: UserFiltersState;
  onChange: (filters: UserFiltersState) => void;
  onClear: () => void;
}

const DEFAULT_FILTERS: UserFiltersState = {
  role: "all",
  status: "all",
  city: "all",
  verification: "all",
};

export { DEFAULT_FILTERS };

function findLabel(options: { value: string; label: string }[], value: string) {
  return options.find((o) => o.value === value)?.label ?? value;
}

/**
 * Filter row for the User Management table — role, status, city, and
 * verification dropdowns plus active-filter chips and a clear action.
 * Currently client-side only — TODO: wire selections to backend query params.
 */
export function UserFiltersBar({ filters, onChange, onClear }: UserFiltersBarProps) {
  const activeChips = [
    filters.role !== "all" && { key: "role" as const, label: findLabel(ROLE_OPTIONS, filters.role) },
    filters.status !== "all" && { key: "status" as const, label: findLabel(STATUS_OPTIONS, filters.status) },
    filters.city !== "all" && { key: "city" as const, label: findLabel(CITY_OPTIONS, filters.city) },
    filters.verification !== "all" && { key: "verification" as const, label: findLabel(VERIFICATION_OPTIONS, filters.verification) },
  ].filter(Boolean) as { key: keyof UserFiltersState; label: string }[];

  const hasActiveFilters = activeChips.length > 0;

  function removeChip(key: keyof UserFiltersState) {
    onChange({ ...filters, [key]: "all" });
  }

  return (
    <div className="flex flex-col gap-3 px-4 py-3.5 rounded-xl border bg-card">
      <div className="flex flex-wrap items-center gap-2.5">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground shrink-0">
          <SlidersHorizontal className="h-3.5 w-3.5" />
          Filters
        </div>

        <StatusFilter
          value={filters.role}
          onValueChange={(v) => onChange({ ...filters, role: v })}
          options={ROLE_OPTIONS}
          label="Role"
        />
        <StatusFilter
          value={filters.status}
          onValueChange={(v) => onChange({ ...filters, status: v })}
          options={STATUS_OPTIONS}
          label="Status"
        />
        <StatusFilter
          value={filters.city}
          onValueChange={(v) => onChange({ ...filters, city: v })}
          options={CITY_OPTIONS}
          label="City"
        />
        <StatusFilter
          value={filters.verification}
          onValueChange={(v) => onChange({ ...filters, verification: v })}
          options={VERIFICATION_OPTIONS}
          label="Verification"
        />

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="xs"
            onClick={onClear}
            className="text-xs text-primary font-medium h-auto p-0 ml-auto"
          >
            Clear all
          </Button>
        )}
      </div>

      {/* Active filter chips — quick visual confirmation of what's applied */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-1.5 pt-2.5 border-t">
          {activeChips.map((chip) => (
            <Badge
              key={chip.key}
              variant="secondary"
              className="gap-1 pr-1 text-[11px] font-medium capitalize"
            >
              {chip.label}
              <button
                type="button"
                onClick={() => removeChip(chip.key)}
                aria-label={`Remove ${chip.label} filter`}
                className="flex h-3.5 w-3.5 items-center justify-center rounded-full hover:bg-primary/20 transition-colors"
              >
                <X className="h-2.5 w-2.5" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}

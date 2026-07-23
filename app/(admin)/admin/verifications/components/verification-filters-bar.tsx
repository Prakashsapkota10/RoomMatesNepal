"use client";

import { SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusFilter } from "@/components/admin/status-filter";
import {
  DATE_RANGE_OPTIONS,
  PRIORITY_OPTIONS,
  ROLE_OPTIONS,
  TRUST_RANGE_OPTIONS,
  VERIFICATION_STATUS_OPTIONS,
  VERIFICATION_TYPE_OPTIONS,
} from "./constants";
import { DEFAULT_VERIFICATION_FILTERS, type VerificationFiltersState } from "./types";

interface VerificationFiltersBarProps {
  filters: VerificationFiltersState;
  onChange: (filters: VerificationFiltersState) => void;
  onClear: () => void;
}

function findLabel(options: { value: string; label: string }[], value: string) {
  return options.find((o) => o.value === value)?.label ?? value;
}

/**
 * Filter row for /admin/verifications — Verification Type, Status, User
 * Role, Trust Score range, Priority, and Date Range, plus removable
 * active-filter chips and a filter count.
 * Currently client-side only — TODO: wire selections to backend query params.
 */
export function VerificationFiltersBar({ filters, onChange, onClear }: VerificationFiltersBarProps) {
  const activeChips = [
    filters.type !== "all" && { key: "type" as const, label: findLabel(VERIFICATION_TYPE_OPTIONS, filters.type) },
    filters.status !== "all" && { key: "status" as const, label: findLabel(VERIFICATION_STATUS_OPTIONS, filters.status) },
    filters.role !== "all" && { key: "role" as const, label: findLabel(ROLE_OPTIONS, filters.role) },
    filters.trustRange !== "all" && { key: "trustRange" as const, label: findLabel(TRUST_RANGE_OPTIONS, filters.trustRange) },
    filters.priority !== "all" && { key: "priority" as const, label: findLabel(PRIORITY_OPTIONS, filters.priority) },
    filters.dateRange !== "all" && { key: "dateRange" as const, label: findLabel(DATE_RANGE_OPTIONS, filters.dateRange) },
  ].filter(Boolean) as { key: keyof VerificationFiltersState; label: string }[];

  const hasActiveFilters = activeChips.length > 0;

  function removeChip(key: keyof VerificationFiltersState) {
    onChange({ ...filters, [key]: DEFAULT_VERIFICATION_FILTERS[key] });
  }

  return (
    <div className="flex flex-col gap-3 px-4 py-3.5 rounded-xl border bg-card">
      <div className="flex flex-wrap items-center gap-2.5">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground shrink-0">
          <SlidersHorizontal className="h-3.5 w-3.5" />
          Filters
          {hasActiveFilters && (
            <span className="text-primary font-semibold">· {activeChips.length} active</span>
          )}
        </div>

        <StatusFilter
          value={filters.type}
          onValueChange={(v) => onChange({ ...filters, type: v as VerificationFiltersState["type"] })}
          options={VERIFICATION_TYPE_OPTIONS}
          label="Type"
        />
        <StatusFilter
          value={filters.status}
          onValueChange={(v) => onChange({ ...filters, status: v as VerificationFiltersState["status"] })}
          options={VERIFICATION_STATUS_OPTIONS}
          label="Status"
        />
        <StatusFilter
          value={filters.role}
          onValueChange={(v) => onChange({ ...filters, role: v as VerificationFiltersState["role"] })}
          options={ROLE_OPTIONS}
          label="Role"
        />
        <StatusFilter
          value={filters.trustRange}
          onValueChange={(v) => onChange({ ...filters, trustRange: v as VerificationFiltersState["trustRange"] })}
          options={TRUST_RANGE_OPTIONS}
          label="Trust Score"
        />
        <StatusFilter
          value={filters.priority}
          onValueChange={(v) => onChange({ ...filters, priority: v as VerificationFiltersState["priority"] })}
          options={PRIORITY_OPTIONS}
          label="Priority"
        />
        <StatusFilter
          value={filters.dateRange}
          onValueChange={(v) => onChange({ ...filters, dateRange: v as VerificationFiltersState["dateRange"] })}
          options={DATE_RANGE_OPTIONS}
          label="Date Range"
        />

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="xs"
            onClick={onClear}
            className="text-xs text-primary font-medium h-auto p-0 ml-auto"
          >
            Clear All Filters
          </Button>
        )}
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-1.5 pt-2.5 border-t">
          {activeChips.map((chip) => (
            <Badge key={chip.key} variant="secondary" className="gap-1 pr-1 text-[11px] font-medium">
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

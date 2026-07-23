"use client";

import { SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { StatusFilter } from "@/components/admin/status-filter";
import {
  DATE_RANGE_OPTIONS,
  PAYMENT_METHOD_OPTIONS,
  PAYMENT_STATUS_LABELS,
  PAYMENT_TYPE_OPTIONS,
} from "./constants";
import { getStatusOptionsForType } from "./payment.utils";
import { DEFAULT_PAYMENT_FILTERS, type PaymentFiltersState } from "./types";

interface PaymentFiltersBarProps {
  filters: PaymentFiltersState;
  onChange: (filters: PaymentFiltersState) => void;
  onClear: () => void;
}

function findLabel(options: { value: string; label: string }[], value: string) {
  return options.find((o) => o.value === value)?.label ?? value;
}

/**
 * Filter row for /admin/payments — Payment Type, Payment Status (options
 * narrow to the selected type), Payment Method, Date Range, and a Min/Max
 * amount range, plus removable active-filter chips and a filter count.
 * Currently client-side only — TODO: wire selections to backend query params.
 */
export function PaymentFiltersBar({ filters, onChange, onClear }: PaymentFiltersBarProps) {
  const statusOptions = [
    { value: "all", label: "Status" },
    ...getStatusOptionsForType(filters.type).map((s) => ({ value: s, label: PAYMENT_STATUS_LABELS[s] })),
  ];

  const activeChips = [
    filters.type !== "all" && { key: "type" as const, label: findLabel(PAYMENT_TYPE_OPTIONS, filters.type) },
    filters.status !== "all" && { key: "status" as const, label: findLabel(statusOptions, filters.status) },
    filters.method !== "all" && { key: "method" as const, label: findLabel(PAYMENT_METHOD_OPTIONS, filters.method) },
    filters.dateRange !== "all" && { key: "dateRange" as const, label: findLabel(DATE_RANGE_OPTIONS, filters.dateRange) },
    filters.minAmount !== "" && { key: "minAmount" as const, label: `Min Rs. ${filters.minAmount}` },
    filters.maxAmount !== "" && { key: "maxAmount" as const, label: `Max Rs. ${filters.maxAmount}` },
  ].filter(Boolean) as { key: keyof PaymentFiltersState; label: string }[];

  const hasActiveFilters = activeChips.length > 0;

  function removeChip(key: keyof PaymentFiltersState) {
    if (key === "minAmount" || key === "maxAmount") {
      onChange({ ...filters, [key]: "" });
      return;
    }
    onChange({ ...filters, [key]: DEFAULT_PAYMENT_FILTERS[key] });
  }

  function handleTypeChange(value: string) {
    // Reset status when type changes since status options are type-specific.
    onChange({ ...filters, type: value as PaymentFiltersState["type"], status: "all" });
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
          onValueChange={handleTypeChange}
          options={PAYMENT_TYPE_OPTIONS}
          label="Type"
        />
        <StatusFilter
          value={filters.status}
          onValueChange={(v) => onChange({ ...filters, status: v as PaymentFiltersState["status"] })}
          options={statusOptions}
          label="Status"
        />
        <StatusFilter
          value={filters.method}
          onValueChange={(v) => onChange({ ...filters, method: v as PaymentFiltersState["method"] })}
          options={PAYMENT_METHOD_OPTIONS}
          label="Method"
        />
        <StatusFilter
          value={filters.dateRange}
          onValueChange={(v) => onChange({ ...filters, dateRange: v as PaymentFiltersState["dateRange"] })}
          options={DATE_RANGE_OPTIONS}
          label="Date Range"
        />

        <div className="flex items-center gap-1.5">
          <Input
            type="number"
            inputMode="numeric"
            placeholder="Min Rs."
            aria-label="Minimum amount"
            value={filters.minAmount}
            onChange={(e) => onChange({ ...filters, minAmount: e.target.value })}
            className="h-7 w-24 text-xs"
          />
          <span className="text-xs text-muted-foreground">–</span>
          <Input
            type="number"
            inputMode="numeric"
            placeholder="Max Rs."
            aria-label="Maximum amount"
            value={filters.maxAmount}
            onChange={(e) => onChange({ ...filters, maxAmount: e.target.value })}
            className="h-7 w-24 text-xs"
          />
        </div>

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

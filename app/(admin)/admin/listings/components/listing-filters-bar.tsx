"use client";

import { SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusFilter } from "@/components/admin/status-filter";
import { NEPAL_CITIES } from "@/lib/constants";

const CITY_OPTIONS = [
  { value: "all", label: "City" },
  ...NEPAL_CITIES.map((city) => ({ value: city.toLowerCase(), label: city })),
];

const PRICE_OPTIONS = [
  { value: "all", label: "Price Range" },
  { value: "0-10000", label: "Under Rs. 10,000" },
  { value: "10000-20000", label: "Rs. 10,000 - 20,000" },
  { value: "20000-999999", label: "Above Rs. 20,000" },
];

const STATUS_OPTIONS = [
  { value: "all", label: "Status" },
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "reported", label: "Reported" },
  { value: "rejected", label: "Rejected" },
  { value: "expired", label: "Expired" },
];

export interface ListingFiltersState {
  city: string;
  price: string;
  status: string;
}

export const DEFAULT_LISTING_FILTERS: ListingFiltersState = {
  city: "all",
  price: "all",
  status: "all",
};

interface ListingFiltersBarProps {
  filters: ListingFiltersState;
  onChange: (filters: ListingFiltersState) => void;
  onClear: () => void;
}

function findLabel(options: { value: string; label: string }[], value: string) {
  return options.find((o) => o.value === value)?.label ?? value;
}

/**
 * Filter row for the admin Listings page — City, Price Range, and Status
 * dropdowns, right-aligned per the reference design, with an "Apply Filters"
 * action and removable chips for active filters.
 * Currently client-side only — TODO: wire selections + Apply to backend query params.
 */
export function ListingFiltersBar({ filters, onChange, onClear }: ListingFiltersBarProps) {
  const activeChips = [
    filters.city !== "all" && { key: "city" as const, label: findLabel(CITY_OPTIONS, filters.city) },
    filters.price !== "all" && { key: "price" as const, label: findLabel(PRICE_OPTIONS, filters.price) },
    filters.status !== "all" && { key: "status" as const, label: findLabel(STATUS_OPTIONS, filters.status) },
  ].filter(Boolean) as { key: keyof ListingFiltersState; label: string }[];

  const hasActiveFilters = activeChips.length > 0;

  function removeChip(key: keyof ListingFiltersState) {
    onChange({ ...filters, [key]: "all" });
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center justify-end gap-2.5">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground mr-auto">
          <SlidersHorizontal className="h-3.5 w-3.5" />
          Filters
        </div>

        <StatusFilter
          value={filters.city}
          onValueChange={(v) => onChange({ ...filters, city: v })}
          options={CITY_OPTIONS}
          label="City"
        />
        <StatusFilter
          value={filters.price}
          onValueChange={(v) => onChange({ ...filters, price: v })}
          options={PRICE_OPTIONS}
          label="Price Range"
        />
        <StatusFilter
          value={filters.status}
          onValueChange={(v) => onChange({ ...filters, status: v })}
          options={STATUS_OPTIONS}
          label="Status"
        />

        <Button size="sm" className="btn-primary-motion gap-1.5 font-semibold">
          <SlidersHorizontal className="h-3.5 w-3.5" />
          Apply Filters
        </Button>
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap items-center justify-end gap-1.5">
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
          <Button
            variant="ghost"
            size="xs"
            onClick={onClear}
            className="text-xs text-primary font-medium h-auto p-0 ml-1"
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
}

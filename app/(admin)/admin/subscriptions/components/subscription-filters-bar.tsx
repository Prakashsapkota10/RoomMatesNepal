"use client";

import { SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusFilter } from "@/components/admin/status-filter";
import {
  AUTO_RENEW_OPTIONS,
  BILLING_CYCLE_OPTIONS,
  EXPIRY_OPTIONS,
  PAYMENT_STATUS_OPTIONS,
  PLAN_OPTIONS,
  STATUS_OPTIONS,
  TYPE_OPTIONS,
} from "./constants";
import { DEFAULT_SUBSCRIPTION_FILTERS, type SubscriptionFiltersState } from "./types";

interface SubscriptionFiltersBarProps {
  filters: SubscriptionFiltersState;
  onChange: (filters: SubscriptionFiltersState) => void;
  onClear: () => void;
}

function findLabel(options: { value: string; label: string }[], value: string) {
  return options.find((o) => o.value === value)?.label ?? value;
}

/**
 * Filter row for /admin/subscriptions — Type, Status, Plan, Billing Cycle,
 * Auto-Renew, Payment Status, and Expiry Date. Every dropdown's default
 * label is the descriptive category name itself (e.g. "Status", never a
 * bare "All"), so its purpose stays clear before a value is picked.
 * Currently client-side only — TODO: wire selections to backend query params.
 */
export function SubscriptionFiltersBar({ filters, onChange, onClear }: SubscriptionFiltersBarProps) {
  const activeChips = [
    filters.type !== "all" && { key: "type" as const, label: findLabel(TYPE_OPTIONS, filters.type) },
    filters.status !== "all" && { key: "status" as const, label: findLabel(STATUS_OPTIONS, filters.status) },
    filters.plan !== "all" && { key: "plan" as const, label: findLabel(PLAN_OPTIONS, filters.plan) },
    filters.billingCycle !== "all" && { key: "billingCycle" as const, label: findLabel(BILLING_CYCLE_OPTIONS, filters.billingCycle) },
    filters.autoRenew !== "all" && { key: "autoRenew" as const, label: `Auto-Renew: ${findLabel(AUTO_RENEW_OPTIONS, filters.autoRenew)}` },
    filters.paymentStatus !== "all" && { key: "paymentStatus" as const, label: findLabel(PAYMENT_STATUS_OPTIONS, filters.paymentStatus) },
    filters.expiry !== "all" && { key: "expiry" as const, label: findLabel(EXPIRY_OPTIONS, filters.expiry) },
  ].filter(Boolean) as { key: keyof SubscriptionFiltersState; label: string }[];

  const hasActiveFilters = activeChips.length > 0;

  function removeChip(key: keyof SubscriptionFiltersState) {
    onChange({ ...filters, [key]: DEFAULT_SUBSCRIPTION_FILTERS[key] });
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
          onValueChange={(v) => onChange({ ...filters, type: v as SubscriptionFiltersState["type"] })}
          options={TYPE_OPTIONS}
          label="Type"
        />
        <StatusFilter
          value={filters.status}
          onValueChange={(v) => onChange({ ...filters, status: v as SubscriptionFiltersState["status"] })}
          options={STATUS_OPTIONS}
          label="Status"
        />
        <StatusFilter
          value={filters.plan}
          onValueChange={(v) => onChange({ ...filters, plan: v as SubscriptionFiltersState["plan"] })}
          options={PLAN_OPTIONS}
          label="Plan"
        />
        <StatusFilter
          value={filters.billingCycle}
          onValueChange={(v) => onChange({ ...filters, billingCycle: v as SubscriptionFiltersState["billingCycle"] })}
          options={BILLING_CYCLE_OPTIONS}
          label="Billing Cycle"
        />
        <StatusFilter
          value={filters.autoRenew}
          onValueChange={(v) => onChange({ ...filters, autoRenew: v as SubscriptionFiltersState["autoRenew"] })}
          options={AUTO_RENEW_OPTIONS}
          label="Auto-Renew"
        />
        <StatusFilter
          value={filters.paymentStatus}
          onValueChange={(v) => onChange({ ...filters, paymentStatus: v as SubscriptionFiltersState["paymentStatus"] })}
          options={PAYMENT_STATUS_OPTIONS}
          label="Payment Status"
        />
        <StatusFilter
          value={filters.expiry}
          onValueChange={(v) => onChange({ ...filters, expiry: v as SubscriptionFiltersState["expiry"] })}
          options={EXPIRY_OPTIONS}
          label="Expiry Date"
        />

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="xs"
            onClick={onClear}
            className="text-xs text-primary font-medium h-auto p-0 ml-auto"
          >
            Clear Filters
          </Button>
        )}
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-1.5 pt-2.5 border-t">
          <span className="text-[11px] text-muted-foreground font-medium">
            {activeChips.length} {activeChips.length === 1 ? "Filter" : "Filters"} Applied
          </span>
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

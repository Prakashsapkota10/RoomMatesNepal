import { formatCurrency } from "@/lib/utils";
import { BILLING_CYCLE_LABELS } from "./constants";
import type { BillingCycle, SubscriptionFiltersState, SubscriptionRow, SubscriptionTab } from "./types";

export { formatCurrency };

/** Format an ISO-ish date string as "Oct 24, 2026". Falls back to the raw string if unparsable. */
export function formatSubscriptionDate(dateStr: string | null | undefined): string {
  if (!dateStr) return "—";
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString("en-NP", { year: "numeric", month: "short", day: "numeric" });
}

/** Format an ISO-ish date string as "Feb 12, 2026 · 3:45 PM" for timeline timestamps. */
export function formatSubscriptionDateTime(dateStr: string): string {
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return dateStr;
  return `${date.toLocaleDateString("en-NP", { year: "numeric", month: "short", day: "numeric" })} · ${date.toLocaleTimeString(
    "en-NP",
    { hour: "numeric", minute: "2-digit" }
  )}`;
}

/** "NPR 499 / month" style recurring-amount label — always pairs the figure with its billing context. */
export function formatRecurringAmount(amount: number, cycle: BillingCycle): string {
  const unit = cycle === "monthly" ? "month" : cycle === "quarterly" ? "quarter" : "year";
  return `${formatCurrency(amount)} / ${unit}`;
}

/** Compact "NPR 4.2M" style formatting for KPI cards. */
export function formatCompactCurrency(amount: number): string {
  if (amount >= 1_000_000) return `NPR ${(amount / 1_000_000).toFixed(1)}M`;
  if (amount >= 1_000) return `NPR ${(amount / 1_000).toFixed(1)}K`;
  return formatCurrency(amount);
}

function daysUntil(dateStr: string | null): number | null {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return null;
  const now = new Date();
  return Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

function matchesExpiry(row: SubscriptionRow, expiry: SubscriptionFiltersState["expiry"]): boolean {
  if (expiry === "all") return true;
  if (expiry === "expired") return row.status === "expired";
  const days = daysUntil(row.nextBillingAt);
  if (days === null) return false;
  const max = expiry === "7d" ? 7 : expiry === "30d" ? 30 : 90;
  return days >= 0 && days <= max;
}

/** Whether a subscription row matches the current category chip/tab selection. */
export function matchesTab(row: SubscriptionRow, tab: SubscriptionTab): boolean {
  if (tab === "all") return true;
  return row.status === tab;
}

/** Applies the Type / Status / Plan / Billing Cycle / Auto-Renew / Payment Status / Expiry filters to a single row. */
export function matchesFilters(row: SubscriptionRow, filters: SubscriptionFiltersState): boolean {
  if (filters.type !== "all" && row.subscriber.role !== (filters.type === "seeker" ? "user" : "tenant")) return false;
  if (filters.status !== "all" && row.status !== filters.status) return false;
  if (filters.plan !== "all" && row.planId !== filters.plan) return false;
  if (filters.billingCycle !== "all" && row.billingCycle !== filters.billingCycle) return false;
  if (filters.autoRenew !== "all" && (filters.autoRenew === "on") !== row.autoRenew) return false;
  if (filters.paymentStatus !== "all" && row.lastPayment.status !== filters.paymentStatus) return false;
  if (!matchesExpiry(row, filters.expiry)) return false;
  return true;
}

/** Full-text search across user name, email, user ID, subscription ID, and plan name. */
export function matchesSearch(row: SubscriptionRow, query: string, planLabel: string): boolean {
  if (!query.trim()) return true;
  const q = query.trim().toLowerCase();
  const haystack = [row.id, row.subscriber.displayId, row.subscriber.name, row.subscriber.email, planLabel]
    .join(" ")
    .toLowerCase();
  return haystack.includes(q);
}

export function billingCycleUnitLabel(cycle: BillingCycle): string {
  return BILLING_CYCLE_LABELS[cycle];
}

/** Days remaining until next billing — used for the "Expiring Soon" KPI card and expiry filter. */
export function isExpiringWithin(row: SubscriptionRow, days: number): boolean {
  const remaining = daysUntil(row.nextBillingAt);
  return remaining !== null && remaining >= 0 && remaining <= days;
}

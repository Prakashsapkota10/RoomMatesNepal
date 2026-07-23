import { formatCurrency } from "@/lib/utils";
import { PAYMENT_STATUS_OPTIONS_BY_TYPE } from "./constants";
import type { PaymentFiltersState, PaymentRow, PaymentTab } from "./types";

export { formatCurrency };

/** Format an ISO-ish date string as "Oct 24, 2023". Falls back to the raw string if unparsable. */
export function formatPaymentDate(dateStr: string | null): string {
  if (!dateStr) return "—";
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString("en-NP", { year: "numeric", month: "short", day: "numeric" });
}

/** Compact "Rs. 4.2M" style formatting for KPI cards — full formatCurrency is too verbose at that scale. */
export function formatCompactCurrency(amount: number): string {
  if (amount >= 1_000_000) return `Rs. ${(amount / 1_000_000).toFixed(1)}M`;
  if (amount >= 1_000) return `Rs. ${(amount / 1_000).toFixed(1)}K`;
  return formatCurrency(amount);
}

/** Whether a payment row matches the current tab selection. */
export function matchesTab(row: PaymentRow, tab: PaymentTab): boolean {
  if (tab === "all") return true;
  if (tab === "invoices") return row.invoiceId !== null;
  return row.type === tab;
}

function isWithinDateRange(dateStr: string | null, range: PaymentFiltersState["dateRange"]): boolean {
  if (range === "all") return true;
  if (!dateStr) return false;
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return false;

  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  switch (range) {
    case "today":
      return date >= startOfToday;
    case "7d": {
      const from = new Date(startOfToday);
      from.setDate(from.getDate() - 7);
      return date >= from;
    }
    case "30d": {
      const from = new Date(startOfToday);
      from.setDate(from.getDate() - 30);
      return date >= from;
    }
    case "this_month":
      return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth();
    case "last_month": {
      const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      return date.getFullYear() === lastMonth.getFullYear() && date.getMonth() === lastMonth.getMonth();
    }
    default:
      return true;
  }
}

/** Applies the Payment Type / Status / Method / Date Range / Amount filters to a single row. */
export function matchesFilters(row: PaymentRow, filters: PaymentFiltersState): boolean {
  if (filters.type !== "all" && row.type !== filters.type) return false;
  if (filters.status !== "all" && row.status !== filters.status) return false;
  if (filters.method !== "all" && row.method !== filters.method) return false;
  if (!isWithinDateRange(row.paidAt ?? row.createdAt, filters.dateRange)) return false;

  const min = filters.minAmount ? Number(filters.minAmount) : undefined;
  const max = filters.maxAmount ? Number(filters.maxAmount) : undefined;
  if (min !== undefined && !Number.isNaN(min) && row.amount < min) return false;
  if (max !== undefined && !Number.isNaN(max) && row.amount > max) return false;

  return true;
}

/** Context-aware "related property / context" label shown in the table's context column. */
export function getContextLabel(row: PaymentRow): string {
  switch (row.type) {
    case "subscription":
      return row.context.planName;
    case "monthly_rent":
      return row.context.propertyTitle;
    case "security_deposit":
      return row.context.propertyTitle;
  }
}

/** Full-text search across payment ID, transaction reference, payer, property, and invoice ID. */
export function matchesSearch(row: PaymentRow, query: string): boolean {
  if (!query.trim()) return true;
  const q = query.trim().toLowerCase();
  const haystack = [
    row.id,
    row.transactionReference,
    row.payer.name,
    row.payer.email ?? "",
    row.invoiceId ?? "",
    getContextLabel(row),
  ]
    .join(" ")
    .toLowerCase();
  return haystack.includes(q);
}

/** Status options relevant to the currently-selected Payment Type filter. */
export function getStatusOptionsForType(type: PaymentFiltersState["type"]) {
  return PAYMENT_STATUS_OPTIONS_BY_TYPE[type];
}

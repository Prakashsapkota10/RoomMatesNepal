import type { PaymentMethod, PaymentStatus, PaymentType } from "./types";

/**
 * Central configuration for the payments feature — labels, per-type status
 * option lists, and semantic color mapping. Kept here (rather than scattered
 * across badges/filters) so adding a future payment type or status is a
 * one-file change.
 */

// ─── Payment type labels ───────────────────────────────────────────────────

export const PAYMENT_TYPE_LABELS: Record<PaymentType, string> = {
  subscription: "Subscription",
  monthly_rent: "Monthly Rent",
  security_deposit: "Security Deposit",
};

// The "all" option label is just the bare category name (e.g. "Type"), so the
// trigger reads as a simple, unambiguous placeholder until the admin picks a
// specific value — matches the convention used by UserFiltersBar.
export const PAYMENT_TYPE_OPTIONS: { value: "all" | PaymentType; label: string }[] = [
  { value: "all", label: "Type" },
  { value: "subscription", label: "Subscription" },
  { value: "monthly_rent", label: "Monthly Rent" },
  { value: "security_deposit", label: "Security Deposit" },
];

// ─── Payment method labels ─────────────────────────────────────────────────

export const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  esewa: "eSewa",
  khalti: "Khalti",
  bank_transfer: "Bank Transfer",
  connectips: "ConnectIPS",
  card: "Card",
  other: "Other",
};

export const PAYMENT_METHOD_OPTIONS: { value: "all" | PaymentMethod; label: string }[] = [
  { value: "all", label: "Method" },
  { value: "esewa", label: "eSewa" },
  { value: "khalti", label: "Khalti" },
  { value: "bank_transfer", label: "Bank Transfer" },
  { value: "connectips", label: "ConnectIPS" },
  { value: "card", label: "Card" },
  { value: "other", label: "Other" },
];

// ─── Status labels + per-type status options ───────────────────────────────

export const PAYMENT_STATUS_LABELS: Record<PaymentStatus, string> = {
  pending: "Pending",
  processing: "Processing",
  paid: "Paid",
  failed: "Failed",
  cancelled: "Cancelled",
  refunded: "Refunded",
  expired: "Expired",
  upcoming: "Upcoming",
  due: "Due",
  overdue: "Overdue",
  partial: "Partial",
  held: "Held",
  partially_refunded: "Partially Refunded",
  forfeited: "Forfeited",
};

/** Semantic tone used to drive PaymentStatusBadge coloring — mapped to existing design tokens. */
export type StatusTone = "success" | "warning" | "error" | "info" | "neutral";

export const PAYMENT_STATUS_TONE: Record<PaymentStatus, StatusTone> = {
  pending: "warning",
  processing: "info",
  paid: "success",
  failed: "error",
  cancelled: "neutral",
  refunded: "neutral",
  expired: "neutral",
  upcoming: "info",
  due: "warning",
  overdue: "error",
  partial: "warning",
  held: "info",
  partially_refunded: "neutral",
  forfeited: "error",
};

/** Status options relevant to each payment type, shown in the Payment Status filter once a type is selected. */
export const PAYMENT_STATUS_OPTIONS_BY_TYPE: Record<"all" | PaymentType, PaymentStatus[]> = {
  all: ["pending", "processing", "paid", "failed", "cancelled", "refunded"],
  subscription: ["pending", "paid", "failed", "expired", "cancelled", "refunded"],
  monthly_rent: ["upcoming", "due", "paid", "overdue", "partial"],
  security_deposit: ["pending", "paid", "held", "refunded", "partially_refunded", "forfeited"],
};

// ─── Date range options ────────────────────────────────────────────────────

export const DATE_RANGE_OPTIONS: { value: string; label: string }[] = [
  { value: "all", label: "All Time" },
  { value: "today", label: "Today" },
  { value: "7d", label: "Last 7 Days" },
  { value: "30d", label: "Last 30 Days" },
  { value: "this_month", label: "This Month" },
  { value: "last_month", label: "Last Month" },
];

// ─── Tabs ───────────────────────────────────────────────────────────────────

export const PAYMENT_TABS: { value: "all" | PaymentType | "invoices"; label: string }[] = [
  { value: "all", label: "All Payments" },
  { value: "subscription", label: "Subscriptions" },
  { value: "monthly_rent", label: "Monthly Rent" },
  { value: "security_deposit", label: "Security Deposits" },
  { value: "invoices", label: "Invoices" },
];

export const PAGE_SIZE = 8;

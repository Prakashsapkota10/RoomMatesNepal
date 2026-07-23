import type {
  BillingCycle,
  PaymentStatus,
  PlanDefinition,
  PlanId,
  SubscriberType,
  SubscriptionStatus,
} from "./types";

/**
 * Central configuration for the Subscription Management feature — plan
 * catalog, labels, per-status tone mapping, and filter option lists. Kept
 * here (rather than scattered across badges/filters/table) so adding a
 * future plan or status is a one-file change.
 */

// ─── Plan catalog ───────────────────────────────────────────────────────────

/**
 * RoomMate Nepal currently sells two paid plans. Free tier users have no
 * subscription row at all, so it's intentionally excluded here.
 * TODO: Replace with the real plan catalog from the backend / plan management system.
 */
export const PLAN_CATALOG: Record<PlanId, PlanDefinition> = {
  premium_seeker: {
    id: "premium_seeker",
    name: "Premium Seeker",
    subscriberType: "seeker",
    description: "For room seekers who want priority placement and direct landlord access.",
    monthlyPrice: 499,
    features: [
      "Priority Listing Placement",
      "Direct Landlord Contact",
      "Verified Badge",
      "Advanced Roommate Matching",
    ],
  },
  pro_owner: {
    id: "pro_owner",
    name: "Pro Owner",
    subscriberType: "owner",
    description: "For property owners managing multiple listings with analytics and featured tools.",
    monthlyPrice: 999,
    features: [
      "Multiple Active Listings",
      "Priority Listing Placement",
      "Listing Analytics",
      "Featured Listing Tools",
    ],
  },
};

export const PLAN_LABELS: Record<PlanId, string> = {
  premium_seeker: "Premium Seeker",
  pro_owner: "Pro Owner",
};

// ─── Subscriber type (Type filter) ─────────────────────────────────────────

export const SUBSCRIBER_TYPE_LABELS: Record<SubscriberType, string> = {
  seeker: "Seeker",
  owner: "Property Owner",
};

export const TYPE_OPTIONS: { value: "all" | SubscriberType; label: string }[] = [
  { value: "all", label: "Type" },
  { value: "seeker", label: "Seeker" },
  { value: "owner", label: "Property Owner" },
];

// ─── Plan (filter — dynamically generated from PLAN_CATALOG) ──────────────

export const PLAN_OPTIONS: { value: "all" | PlanId; label: string }[] = [
  { value: "all", label: "Plan" },
  ...Object.values(PLAN_CATALOG).map((plan) => ({ value: plan.id, label: plan.name })),
];

// ─── Billing cycle ──────────────────────────────────────────────────────────

export const BILLING_CYCLE_LABELS: Record<BillingCycle, string> = {
  monthly: "Monthly",
  quarterly: "Quarterly",
  yearly: "Yearly",
};

export const BILLING_CYCLE_OPTIONS: { value: "all" | BillingCycle; label: string }[] = [
  { value: "all", label: "Billing Cycle" },
  { value: "monthly", label: "Monthly" },
  { value: "quarterly", label: "Quarterly" },
  { value: "yearly", label: "Yearly" },
];

// ─── Auto-renew ─────────────────────────────────────────────────────────────

export const AUTO_RENEW_OPTIONS: { value: "all" | "on" | "off"; label: string }[] = [
  { value: "all", label: "Auto-Renew" },
  { value: "on", label: "On" },
  { value: "off", label: "Off" },
];

// ─── Subscription status ───────────────────────────────────────────────────

export const SUBSCRIPTION_STATUS_LABELS: Record<SubscriptionStatus, string> = {
  active: "Active",
  past_due: "Past Due",
  cancelled: "Cancelled",
  expired: "Expired",
  paused: "Paused",
};

/** Semantic tone used to drive status badge coloring — mapped to existing design tokens. */
export type StatusTone = "success" | "warning" | "error" | "info" | "neutral";

export const SUBSCRIPTION_STATUS_TONE: Record<SubscriptionStatus, StatusTone> = {
  active: "success",
  past_due: "warning",
  cancelled: "neutral",
  expired: "neutral",
  paused: "info",
};

export const SUBSCRIPTION_STATUS_ICON: Record<SubscriptionStatus, string> = {
  active: "CheckCircle2",
  past_due: "AlertTriangle",
  cancelled: "XCircle",
  expired: "Clock",
  paused: "PauseCircle",
};

export const STATUS_OPTIONS: { value: "all" | SubscriptionStatus; label: string }[] = [
  { value: "all", label: "Status" },
  { value: "active", label: "Active" },
  { value: "past_due", label: "Past Due" },
  { value: "cancelled", label: "Cancelled" },
  { value: "expired", label: "Expired" },
  { value: "paused", label: "Paused" },
];

// ─── Payment status ─────────────────────────────────────────────────────────

export const PAYMENT_STATUS_LABELS: Record<PaymentStatus, string> = {
  paid: "Paid",
  pending: "Pending",
  failed: "Failed",
  refunded: "Refunded",
};

export const PAYMENT_STATUS_TONE: Record<PaymentStatus, StatusTone> = {
  paid: "success",
  pending: "warning",
  failed: "error",
  refunded: "neutral",
};

export const PAYMENT_STATUS_OPTIONS: { value: "all" | PaymentStatus; label: string }[] = [
  { value: "all", label: "Payment Status" },
  { value: "paid", label: "Paid" },
  { value: "pending", label: "Pending" },
  { value: "failed", label: "Failed" },
  { value: "refunded", label: "Refunded" },
];

// ─── Expiry date ────────────────────────────────────────────────────────────

export const EXPIRY_OPTIONS: { value: "all" | "7d" | "30d" | "90d" | "expired"; label: string }[] = [
  { value: "all", label: "Expiry Date" },
  { value: "7d", label: "Next 7 Days" },
  { value: "30d", label: "Next 30 Days" },
  { value: "90d", label: "Next 90 Days" },
  { value: "expired", label: "Expired" },
];

// ─── MRR range ──────────────────────────────────────────────────────────────

export const MRR_RANGE_OPTIONS: { value: "6m" | "12m"; label: string }[] = [
  { value: "6m", label: "Last 6 Months" },
  { value: "12m", label: "Last 12 Months" },
];

// ─── Category chips (tabs above the table) ─────────────────────────────────

/** Mirrors the tab pattern used on /admin/payments and /admin/verifications — quick status-based slices of the table above the filter bar. */
export const SUBSCRIPTION_TABS: { value: "all" | SubscriptionStatus; label: string }[] = [
  { value: "all", label: "All Subscriptions" },
  { value: "active", label: "Active" },
  { value: "past_due", label: "Past Due" },
  { value: "cancelled", label: "Cancelled" },
  { value: "expired", label: "Expired" },
  { value: "paused", label: "Paused" },
];

export const PAGE_SIZE = 8;

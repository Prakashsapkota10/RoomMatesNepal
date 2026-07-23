import type { UserRole } from "@/types";

/**
 * Shared types for the admin Subscription Management page.
 *
 * Subscription Management owns the ongoing subscription lifecycle (plan,
 * billing cycle, renewal, auto-renew, cancellation). It deliberately does
 * NOT duplicate the Payment Management page — each subscription only
 * carries a lightweight `lastPayment` summary and a `relatedPaymentId` you
 * can jump to in /admin/payments, rather than a full transaction record.
 *
 * TODO: Replace with the real Subscription + Plan DTOs returned by the
 * backend (`GET /api/admin/subscriptions`), keeping this same shape.
 */

// ─── Core enums ────────────────────────────────────────────────────────────

/** Currently supported plans. Designed to grow without reshaping existing rows or components. */
export type PlanId = "premium_seeker" | "pro_owner";

/** Broad subscriber category — distinct from `PlanId` so a future role can offer more than one plan tier. */
export type SubscriberType = "seeker" | "owner";

export type BillingCycle = "monthly" | "quarterly" | "yearly";

export type SubscriptionStatus = "active" | "past_due" | "cancelled" | "expired" | "paused";

/**
 * Payment status is intentionally its own type — a subscription can be
 * "Active" while its most recent payment is "Failed" (past-due), so the two
 * must never be combined into a single status value.
 */
export type PaymentStatus = "paid" | "pending" | "failed" | "refunded";

// ─── Plan catalog ───────────────────────────────────────────────────────────

export interface PlanDefinition {
  id: PlanId;
  name: string;
  subscriberType: SubscriberType;
  description: string;
  monthlyPrice: number;
  features: string[];
}

// ─── Last payment summary (link out to Payment Management, not a duplicate) ─

export interface LastPaymentSummary {
  amount: number;
  status: PaymentStatus;
  method: "esewa" | "khalti" | "bank_transfer" | "connectips" | "card" | "other";
  paidAt: string | null;
  transactionId: string;
  /** Payment Management's payment ID — used to deep-link via "View Payment Details". */
  relatedPaymentId: string;
}

// ─── Subscription history ───────────────────────────────────────────────────

export interface SubscriptionHistoryStep {
  label: string;
  timestamp: string;
  actor?: string;
  detail?: string;
}

// ─── Subscriber (lightweight — full user record lives in /admin/users) ─────

export interface SubscriberSummary {
  id: string;
  displayId: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
}

// ─── Subscription row ───────────────────────────────────────────────────────

export interface SubscriptionRow {
  id: string; // e.g. "SUB-20492"
  subscriber: SubscriberSummary;
  planId: PlanId;
  status: SubscriptionStatus;
  billingCycle: BillingCycle;
  recurringAmount: number;
  startedAt: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  nextBillingAt: string | null; // null once cancelled/expired
  autoRenew: boolean;
  cancelledAt: string | null;
  cancelAtPeriodEnd: boolean;
  lastPayment: LastPaymentSummary;
  history: SubscriptionHistoryStep[];
}

// ─── Filters ────────────────────────────────────────────────────────────────

export interface SubscriptionFiltersState {
  type: "all" | SubscriberType;
  status: "all" | SubscriptionStatus;
  plan: "all" | PlanId;
  billingCycle: "all" | BillingCycle;
  autoRenew: "all" | "on" | "off";
  paymentStatus: "all" | PaymentStatus;
  expiry: "all" | "7d" | "30d" | "90d" | "expired";
}

export const DEFAULT_SUBSCRIPTION_FILTERS: SubscriptionFiltersState = {
  type: "all",
  status: "all",
  plan: "all",
  billingCycle: "all",
  autoRenew: "all",
  paymentStatus: "all",
  expiry: "all",
};

// ─── MRR analytics point ────────────────────────────────────────────────────

export interface MrrPoint {
  month: string; // e.g. "Jun 2026"
  mrr: number;
  activeSubscriptions: number;
}

export type MrrRange = "6m" | "12m";

/** Category chips shown above the subscription table — mirrors the tab pattern used on the Payments and Verification pages. */
export type SubscriptionTab = "all" | SubscriptionStatus;

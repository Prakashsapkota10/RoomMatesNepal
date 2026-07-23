/**
 * Shared types for the admin Payment Management page.
 *
 * The model is intentionally generic — a single `PaymentRow` shape carries a
 * `type`-specific `context` payload — so new payment types (refunds, utility
 * payments, shared expenses, platform fees, ...) can be added later without
 * reshaping the table, filters, or detail drawer.
 *
 * TODO: Replace with the real Payment DTO returned by the backend
 * (`GET /api/admin/payments`), keeping this same discriminated-union shape.
 */

// ─── Core enums ────────────────────────────────────────────────────────────

/**
 * Payment types currently supported. Designed to grow — e.g. "refund",
 * "utility_payment", "shared_expense", "platform_fee" — without changing
 * existing rows or components.
 */
export type PaymentType = "subscription" | "monthly_rent" | "security_deposit";

export type PaymentMethod = "esewa" | "khalti" | "bank_transfer" | "connectips" | "card" | "other";

/**
 * Union of every status used across payment types. Individual filters/badges
 * narrow this down per-type (see PAYMENT_STATUS_OPTIONS_BY_TYPE in constants.ts).
 */
export type PaymentStatus =
  | "pending"
  | "processing"
  | "paid"
  | "failed"
  | "cancelled"
  | "refunded"
  | "expired"
  | "upcoming"
  | "due"
  | "overdue"
  | "partial"
  | "held"
  | "partially_refunded"
  | "forfeited";

// ─── Payment parties ───────────────────────────────────────────────────────

export interface PaymentParty {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  role: "Tenant" | "Owner" | "Platform";
}

// ─── Type-specific context payloads ────────────────────────────────────────

export interface SubscriptionContext {
  planName: string;
  billingCycle: "monthly" | "yearly";
  subscriptionStatus: "active" | "cancelled" | "expired";
  startDate: string;
  endDate: string;
}

export interface MonthlyRentContext {
  propertyTitle: string;
  propertyLocation: string;
  propertyId: string;
  owner: PaymentParty;
  rentPeriod: string; // e.g. "October 2026"
  rentAmount: number;
  dueDate: string;
}

export interface SecurityDepositContext {
  propertyTitle: string;
  propertyLocation: string;
  propertyId: string;
  owner: PaymentParty;
  bookingId: string;
  bookingDate: string;
  depositAmount: number;
  depositStatus: PaymentStatus;
}

// ─── Payment timeline ───────────────────────────────────────────────────────

export interface PaymentTimelineStep {
  label: string;
  timestamp: string;
  /** Whether this step has occurred yet — future/inapplicable steps are omitted entirely, not just disabled. */
  completed: boolean;
}

// ─── Discriminated PaymentRow ──────────────────────────────────────────────

interface BasePaymentRow {
  id: string; // e.g. "PAY-1001"
  transactionReference: string; // e.g. "TRX-99821"
  payer: PaymentParty;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  paidAt: string | null; // null when not yet paid
  createdAt: string;
  invoiceId: string | null;
  invoiceGeneratedAt: string | null;
  timeline: PaymentTimelineStep[];
}

export interface SubscriptionPaymentRow extends BasePaymentRow {
  type: "subscription";
  context: SubscriptionContext;
}

export interface MonthlyRentPaymentRow extends BasePaymentRow {
  type: "monthly_rent";
  context: MonthlyRentContext;
}

export interface SecurityDepositPaymentRow extends BasePaymentRow {
  type: "security_deposit";
  context: SecurityDepositContext;
}

export type PaymentRow = SubscriptionPaymentRow | MonthlyRentPaymentRow | SecurityDepositPaymentRow;

// ─── Filters ────────────────────────────────────────────────────────────────

export interface PaymentFiltersState {
  type: "all" | PaymentType;
  status: "all" | PaymentStatus;
  method: "all" | PaymentMethod;
  dateRange: "all" | "today" | "7d" | "30d" | "this_month" | "last_month";
  minAmount: string;
  maxAmount: string;
}

export const DEFAULT_PAYMENT_FILTERS: PaymentFiltersState = {
  type: "all",
  status: "all",
  method: "all",
  dateRange: "all",
  minAmount: "",
  maxAmount: "",
};

/** Tabs shown above the transaction table. "invoices" reuses the same table, filtered to rows that have an invoice. */
export type PaymentTab = "all" | PaymentType | "invoices";

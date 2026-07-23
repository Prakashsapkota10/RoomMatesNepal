import type { UserRole } from "@/types";
import type { VerificationPriority, VerificationStatus, VerificationType } from "./types";

/**
 * Central configuration for the Trust & Verification feature — labels,
 * per-status tone mapping, and filter option lists. Kept here (rather than
 * scattered across badges/filters/table) so adding a future verification
 * type or status is a one-file change.
 */

// ─── Verification type labels ──────────────────────────────────────────────

export const VERIFICATION_TYPE_LABELS: Record<VerificationType, string> = {
  email: "Email Verification",
  phone: "Phone Verification",
  profile: "Profile Verification",
  manual_review: "Manual Review",
};

// The "all" option label is the bare category name, so the trigger reads as
// a simple placeholder until the admin picks a specific value.
export const VERIFICATION_TYPE_OPTIONS: { value: "all" | VerificationType; label: string }[] = [
  { value: "all", label: "Type" },
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
  { value: "profile", label: "Profile" },
  { value: "manual_review", label: "Manual Review" },
];

// ─── Status labels + tone ───────────────────────────────────────────────────

export const VERIFICATION_STATUS_LABELS: Record<VerificationStatus, string> = {
  not_started: "Not Started",
  pending: "Pending",
  under_review: "Under Review",
  verified: "Verified",
  needs_attention: "Needs Attention",
  rejected: "Rejected",
  suspended: "Suspended",
};

/** Semantic tone used to drive VerificationStatusBadge coloring — mapped to existing design tokens. */
export type StatusTone = "success" | "warning" | "error" | "info" | "neutral";

export const VERIFICATION_STATUS_TONE: Record<VerificationStatus, StatusTone> = {
  not_started: "neutral",
  pending: "warning",
  under_review: "info",
  verified: "success",
  needs_attention: "warning",
  rejected: "error",
  suspended: "error",
};

/** lucide-react icon name per status — status is never communicated by color alone. */
export const VERIFICATION_STATUS_ICON: Record<VerificationStatus, string> = {
  not_started: "Circle",
  pending: "Clock",
  under_review: "Eye",
  verified: "CheckCircle2",
  needs_attention: "AlertTriangle",
  rejected: "XCircle",
  suspended: "Ban",
};

export const VERIFICATION_STATUS_OPTIONS: { value: "all" | VerificationStatus; label: string }[] = [
  { value: "all", label: "Status" },
  { value: "pending", label: "Pending" },
  { value: "under_review", label: "Under Review" },
  { value: "verified", label: "Verified" },
  { value: "needs_attention", label: "Needs Attention" },
  { value: "rejected", label: "Rejected" },
  { value: "suspended", label: "Suspended" },
];

// ─── Priority labels + tone ─────────────────────────────────────────────────

export const PRIORITY_LABELS: Record<VerificationPriority, string> = {
  low: "Low",
  normal: "Normal",
  high: "High",
  urgent: "Urgent",
};

export const PRIORITY_TONE: Record<VerificationPriority, StatusTone> = {
  low: "neutral",
  normal: "info",
  high: "warning",
  urgent: "error",
};

export const PRIORITY_OPTIONS: { value: "all" | VerificationPriority; label: string }[] = [
  { value: "all", label: "Priority" },
  { value: "low", label: "Low" },
  { value: "normal", label: "Normal" },
  { value: "high", label: "High" },
  { value: "urgent", label: "Urgent" },
];

// ─── Role labels (reuses the app-wide UserRole type) ───────────────────────

export const ROLE_LABELS: Record<UserRole, string> = {
  user: "Seeker",
  tenant: "Property Owner",
  admin: "Admin",
};

export const ROLE_OPTIONS: { value: "all" | UserRole; label: string }[] = [
  { value: "all", label: "Role" },
  { value: "user", label: "Seeker" },
  { value: "tenant", label: "Property Owner" },
  { value: "admin", label: "Admin" },
];

// ─── Trust score range options ─────────────────────────────────────────────

export const TRUST_RANGE_OPTIONS: { value: "all" | "0-40" | "41-60" | "61-80" | "81-100"; label: string }[] = [
  { value: "all", label: "Trust Score" },
  { value: "0-40", label: "0 – 40" },
  { value: "41-60", label: "41 – 60" },
  { value: "61-80", label: "61 – 80" },
  { value: "81-100", label: "81 – 100" },
];

// ─── Date range options ────────────────────────────────────────────────────

export const DATE_RANGE_OPTIONS: { value: string; label: string }[] = [
  { value: "all", label: "Date Range" },
  { value: "today", label: "Today" },
  { value: "7d", label: "Last 7 Days" },
  { value: "30d", label: "Last 30 Days" },
  { value: "this_month", label: "This Month" },
  { value: "last_month", label: "Last Month" },
];

// ─── Tabs ───────────────────────────────────────────────────────────────────

export const VERIFICATION_TABS: { value: string; label: string }[] = [
  { value: "overview", label: "Overview" },
  { value: "requests", label: "Verification Requests" },
  { value: "verified", label: "Verified Users" },
  { value: "trust_reviews", label: "Trust Reviews" },
  { value: "history", label: "Verification History" },
];

// ─── Additional verification request reasons ───────────────────────────────

export const ADDITIONAL_VERIFICATION_REASONS = [
  { value: "incomplete_profile", label: "Incomplete Profile" },
  { value: "contact_issue", label: "Contact Verification Issue" },
  { value: "suspicious_activity", label: "Suspicious Account Activity" },
  { value: "conflicting_info", label: "Conflicting Information" },
  { value: "safety_review", label: "Safety Review Required" },
  { value: "other", label: "Other" },
] as const;

export const PAGE_SIZE = 8;

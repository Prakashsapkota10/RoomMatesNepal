import type { UserRole } from "@/types";

/**
 * Shared types for the admin Trust & Verification page.
 *
 * Deliberately built around account/profile/activity/safety signals rather
 * than government documents or biometrics — see verification.utils.ts and
 * mock-verifications.ts for how trust scores and signals are derived.
 * TODO: Replace with the real Verification + TrustScore DTOs returned by the
 * backend (`GET /api/admin/verifications`), keeping this same shape so the
 * UI doesn't need to change when the backend lands.
 */

// ─── Core enums ────────────────────────────────────────────────────────────

/**
 * Verification types currently supported. Designed to grow — e.g.
 * "identity_document", "business_verification", "address_verification" —
 * without reshaping existing rows or components.
 */
export type VerificationType = "email" | "phone" | "profile" | "manual_review";

/** Overall verification/case status shown in the table and drawer. */
export type VerificationStatus =
  | "not_started"
  | "pending"
  | "under_review"
  | "verified"
  | "needs_attention"
  | "rejected"
  | "suspended";

export type VerificationPriority = "low" | "normal" | "high" | "urgent";

export type EmailPhoneStatus = "verified" | "pending" | "failed";
export type ProfileStatus = "complete" | "incomplete" | "under_review";

// ─── Verification signals ──────────────────────────────────────────────────

export type SignalKey =
  | "email"
  | "phone"
  | "profile"
  | "history"
  | "reviews"
  | "bookings"
  | "no_reports"
  | "community";

export interface VerificationSignal {
  key: SignalKey;
  label: string;
  active: boolean;
}

// ─── Trust score ────────────────────────────────────────────────────────────

/**
 * Explainable trust score breakdown — every factor here is shown to the
 * admin with its own percentage, so the total score is never a black box.
 * Weights: Profile Completeness 25%, Contact Verification 35% (email +
 * phone combined), Account History 15%, Reviews & Ratings 15%, Community
 * Safety 10%.
 */
export interface TrustScoreBreakdown {
  profileCompleteness: number; // 0–100
  contactVerification: number;
  accountHistory: number;
  reviewsRatings: number;
  communitySafety: number;
}

export const TRUST_BREAKDOWN_WEIGHTS: Record<keyof TrustScoreBreakdown, number> = {
  profileCompleteness: 25,
  contactVerification: 35,
  accountHistory: 15,
  reviewsRatings: 15,
  communitySafety: 10,
};

// ─── Safety & activity summary ─────────────────────────────────────────────

export interface SafetyActivitySummary {
  accountAge: string; // e.g. "2 years, 4 months"
  successfulBookings: number;
  activeListings: number;
  completedConnections: number;
  reviewsReceived: number;
  activeReports: number;
  resolvedReports: number;
  previousWarnings: number;
  suspiciousActivityNote?: string;
}

// ─── History + notes ───────────────────────────────────────────────────────

export interface VerificationHistoryStep {
  label: string;
  timestamp: string;
  actor?: string; // e.g. "System" or an admin's name
}

export interface ReviewNote {
  id: string;
  authorName: string;
  message: string;
  createdAt: string;
}

// ─── Per-channel verification statuses ─────────────────────────────────────

export interface VerificationChannelStatuses {
  email: EmailPhoneStatus;
  phone: EmailPhoneStatus;
  profile: ProfileStatus;
  /** "not_started" when the user has never required a manual review. */
  manualReview: VerificationStatus;
}

// ─── Verification row ───────────────────────────────────────────────────────

export interface VerificationRow {
  id: string; // e.g. "VER-1001" — the verification case ID
  userId: string;
  userDisplayId: string; // e.g. "USR-89322"
  userName: string;
  userAvatar?: string;
  userEmail: string;
  userPhone: string;
  role: UserRole;
  memberSince: string;
  /** The verification type most relevant to why this row needs admin attention right now. */
  primaryType: VerificationType;
  status: VerificationStatus;
  priority: VerificationPriority;
  trustScore: number; // 0–100
  trustScoreSummary: string;
  signals: VerificationSignal[];
  channels: VerificationChannelStatuses;
  trustBreakdown: TrustScoreBreakdown;
  safety: SafetyActivitySummary;
  history: VerificationHistoryStep[];
  notes: ReviewNote[];
  submittedAt: string;
}

// ─── Filters ────────────────────────────────────────────────────────────────

export interface VerificationFiltersState {
  type: "all" | VerificationType;
  status: "all" | VerificationStatus;
  role: "all" | UserRole;
  trustRange: "all" | "0-40" | "41-60" | "61-80" | "81-100";
  priority: "all" | VerificationPriority;
  dateRange: "all" | "today" | "7d" | "30d" | "this_month" | "last_month";
}

export const DEFAULT_VERIFICATION_FILTERS: VerificationFiltersState = {
  type: "all",
  status: "all",
  role: "all",
  trustRange: "all",
  priority: "all",
  dateRange: "all",
};

/** Tabs shown on the Trust & Verification page. */
export type VerificationTab = "overview" | "requests" | "verified" | "trust_reviews" | "history";

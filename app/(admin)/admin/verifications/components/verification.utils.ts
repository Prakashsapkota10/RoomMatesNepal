import { TRUST_BREAKDOWN_WEIGHTS } from "./types";
import type { TrustScoreBreakdown, VerificationFiltersState, VerificationRow } from "./types";

/** Format an ISO-ish date string as "Feb 12, 2026". Falls back to the raw string if unparsable. */
export function formatVerificationDate(dateStr: string | null | undefined): string {
  if (!dateStr) return "—";
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString("en-NP", { year: "numeric", month: "short", day: "numeric" });
}

/** Format an ISO-ish date string as "Feb 12, 2026 · 3:45 PM" for timeline/notes timestamps. */
export function formatVerificationDateTime(dateStr: string): string {
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return dateStr;
  return `${date.toLocaleDateString("en-NP", { year: "numeric", month: "short", day: "numeric" })} · ${date.toLocaleTimeString(
    "en-NP",
    { hour: "numeric", minute: "2-digit" }
  )}`;
}

/**
 * Weighted total from the explainable trust score breakdown. Kept as a pure
 * function (rather than hardcoding `trustScore` in mock data) so the UI and
 * the underlying factors can never silently drift apart.
 */
export function computeTrustScore(breakdown: TrustScoreBreakdown): number {
  const weighted =
    (breakdown.profileCompleteness * TRUST_BREAKDOWN_WEIGHTS.profileCompleteness +
      breakdown.contactVerification * TRUST_BREAKDOWN_WEIGHTS.contactVerification +
      breakdown.accountHistory * TRUST_BREAKDOWN_WEIGHTS.accountHistory +
      breakdown.reviewsRatings * TRUST_BREAKDOWN_WEIGHTS.reviewsRatings +
      breakdown.communitySafety * TRUST_BREAKDOWN_WEIGHTS.communitySafety) /
    100;
  return Math.round(weighted);
}

function isWithinDateRange(dateStr: string, range: VerificationFiltersState["dateRange"]): boolean {
  if (range === "all") return true;
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

function matchesTrustRange(score: number, range: VerificationFiltersState["trustRange"]): boolean {
  if (range === "all") return true;
  const [min, max] = range.split("-").map(Number);
  return score >= min && score <= max;
}

/** Applies the Type / Status / Role / Trust Score / Priority / Date Range filters to a single row. */
export function matchesFilters(row: VerificationRow, filters: VerificationFiltersState): boolean {
  if (filters.type !== "all" && row.primaryType !== filters.type) return false;
  if (filters.status !== "all" && row.status !== filters.status) return false;
  if (filters.role !== "all" && row.role !== filters.role) return false;
  if (!matchesTrustRange(row.trustScore, filters.trustRange)) return false;
  if (filters.priority !== "all" && row.priority !== filters.priority) return false;
  if (!isWithinDateRange(row.submittedAt, filters.dateRange)) return false;
  return true;
}

/** Full-text search across user name, email, phone, user ID, and verification case ID. */
export function matchesSearch(row: VerificationRow, query: string): boolean {
  if (!query.trim()) return true;
  const q = query.trim().toLowerCase();
  const haystack = [row.id, row.userDisplayId, row.userName, row.userEmail, row.userPhone].join(" ").toLowerCase();
  return haystack.includes(q);
}

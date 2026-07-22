/**
 * Shared types for the admin Report Management page.
 * TODO: Replace with the real report DTO returned by the backend moderation API.
 */

export type ReportPriority = "high" | "medium" | "low";

export type ReportQueueStatus = "pending" | "in_review" | "resolved" | "dismissed";

export type ReportReasonTag =
  | "abuse"
  | "spam"
  | "false_info"
  | "fake_listing"
  | "scam"
  | "other";

export interface AdminReportRow {
  id: string;
  displayId: string;
  reporterName: string;
  reporterAvatar?: string;
  reportedUserName: string;
  reportedUserAvatar?: string;
  reason: ReportReasonTag;
  /** Evidence filename, or undefined if none was provided */
  evidenceFile?: string;
  evidenceType?: "image" | "chat" | "document";
  priority: ReportPriority;
  /** Short activity label shown in the Status column, e.g. "New" or "Active 2m ago" */
  lastActivity: string;
  queueStatus: ReportQueueStatus;
  createdAt: string;
}

/**
 * Shared types for the admin Announcements page.
 * TODO: Replace with the real announcement DTO returned by the backend.
 */

export type AnnouncementScope = "community" | "system";

export type AnnouncementAudience = "all" | "seekers" | "owners" | "admins";

export type AnnouncementPriority = "info" | "warning" | "critical";

export type AnnouncementStatus = "draft" | "scheduled" | "published" | "archived";

export type AnnouncementChannel = "in_app" | "email" | "push";

export interface AnnouncementRow {
  id: string;
  title: string;
  body: string;
  scope: AnnouncementScope;
  audience: AnnouncementAudience;
  priority: AnnouncementPriority;
  status: AnnouncementStatus;
  channels: AnnouncementChannel[];
  isPinned: boolean;
  views: number;
  createdAgo: string;
  scheduledFor?: string;
}

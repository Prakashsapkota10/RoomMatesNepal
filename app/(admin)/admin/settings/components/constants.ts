import type { PermissionKey, SystemTimezone } from "./types";

export const TIMEZONE_OPTIONS: { value: SystemTimezone; label: string }[] = [
  { value: "asia_kathmandu", label: "Kathmandu (GMT +5:45)" },
  { value: "utc", label: "UTC" },
  { value: "asia_kolkata", label: "Asia/Kolkata" },
  { value: "asia_dhaka", label: "Asia/Dhaka" },
  { value: "asia_dubai", label: "Asia/Dubai" },
  { value: "asia_singapore", label: "Asia/Singapore" },
];

export const SESSION_TIMEOUT_OPTIONS = [
  { value: "15", label: "15 minutes" },
  { value: "30", label: "30 minutes" },
  { value: "60", label: "1 hour" },
  { value: "240", label: "4 hours" },
  { value: "720", label: "12 hours" },
];

export const LOGIN_ATTEMPT_OPTIONS = [
  { value: "3", label: "3 attempts" },
  { value: "5", label: "5 attempts" },
  { value: "10", label: "10 attempts" },
];

export const AUTO_EXPIRE_DAY_OPTIONS = [
  { value: "7", label: "7 days" },
  { value: "14", label: "14 days" },
  { value: "30", label: "30 days" },
  { value: "60", label: "60 days" },
  { value: "90", label: "90 days" },
];

export const REVIEW_MODERATION_OPTIONS = [
  { value: "manual", label: "Manual Approval" },
  { value: "automatic", label: "Automatic" },
  { value: "community", label: "Community Moderated" },
];

export const MATCHING_ALGORITHM_OPTIONS = [
  { value: "compatibility", label: "Compatibility Based" },
  { value: "preference", label: "Preference Based" },
  { value: "balanced", label: "Balanced" },
];

export const PERMISSION_LABELS: Record<PermissionKey, string> = {
  view_users: "View Users",
  manage_users: "Manage Users",
  view_listings: "View Listings",
  manage_listings: "Manage Listings",
  view_reports: "View Reports",
  manage_reports: "Manage Reports",
  manage_community: "Manage Community",
  manage_verification: "Manage Verification",
  manage_settings: "Manage Settings",
  manage_announcements: "Manage Announcements",
};

export const ALL_PERMISSIONS: PermissionKey[] = Object.keys(PERMISSION_LABELS) as PermissionKey[];

/** Static searchable index for the settings search bar — section names, setting labels, and descriptions. */
export interface SearchableSection {
  key: string;
  sectionLabel: string;
  items: { label: string; description: string }[];
}

export const SETTINGS_SEARCH_INDEX: SearchableSection[] = [
  {
    key: "general",
    sectionLabel: "General Configuration",
    items: [
      { label: "Platform Name", description: "The public name of the platform" },
      { label: "System Timezone", description: "Default timezone used across the admin panel" },
      { label: "Platform Logo", description: "Upload a high-resolution PNG or SVG" },
    ],
  },
  {
    key: "security",
    sectionLabel: "Security",
    items: [
      { label: "2FA Authentication", description: "Two-factor authentication method for admins" },
      { label: "Password Policy", description: "Required characters, alphanumeric, symbols" },
      { label: "Session Timeout", description: "Automatically log out inactive sessions" },
      { label: "Maximum Login Attempts", description: "Lock accounts after repeated failed logins" },
    ],
  },
  {
    key: "listing",
    sectionLabel: "Listing & Moderation",
    items: [
      { label: "Listing Approval", description: "Require admin approval before publishing listings" },
      { label: "Auto Expire Listings", description: "Automatically expire old listings" },
      { label: "Report Threshold", description: "Automatically flag content after a number of reports" },
      { label: "Duplicate Listing Detection", description: "Detect potentially duplicated listings" },
      { label: "Featured Listing Approval", description: "Require admin approval before featuring listings" },
    ],
  },
  {
    key: "verification",
    sectionLabel: "Verification & Trust",
    items: [
      { label: "Email Verification", description: "Require verified email addresses" },
      { label: "Phone Verification", description: "Require verified phone numbers" },
      { label: "Profile Verification", description: "Require verified profile details" },
      { label: "Trust Score", description: "Enable the trust score system" },
      { label: "Trust Score Configuration", description: "Verification, review, report, and profile weights" },
      { label: "Review Moderation", description: "Manual, automatic, or community moderated reviews" },
    ],
  },
  {
    key: "notifications",
    sectionLabel: "Notification Preferences",
    items: [
      { label: "Critical System Alerts", description: "Push notifications for server downtime or security breaches" },
      { label: "Listing Reports", description: "Notify administrators when a listing is reported" },
      { label: "User Reports", description: "Notify moderators when a user is reported" },
      { label: "Verification Requests", description: "Notify administrators when users submit verification requests" },
      { label: "Weekly Growth Reports", description: "Email summaries of user registrations and listing performance" },
      { label: "User Activity Summaries", description: "Push notifications for high-volume listing interactions" },
    ],
  },
  {
    key: "aiMatching",
    sectionLabel: "AI Matching",
    items: [
      { label: "AI Matching Status", description: "Enable AI-powered roommate compatibility recommendations" },
      { label: "Minimum Match Score", description: "Minimum compatibility score required to surface a match" },
      { label: "AI Recommendations", description: "Show AI-recommended roommates to users" },
      { label: "Match Feedback Collection", description: "Collect user feedback on match quality" },
      { label: "Matching Algorithm", description: "Compatibility based, preference based, or balanced" },
      { label: "Configure Matching Preferences", description: "Lifestyle, budget, location, and personality weights" },
    ],
  },
  {
    key: "roles",
    sectionLabel: "Roles & Access Control",
    items: [
      { label: "Super Admin", description: "Full access role" },
      { label: "Support Moderator", description: "Limited views role" },
      { label: "Content Moderator", description: "Community & reports role" },
      { label: "Verification Moderator", description: "Verification access role" },
    ],
  },
  {
    key: "maintenance",
    sectionLabel: "Maintenance",
    items: [
      { label: "Last System Backup", description: "Time since the last successful backup" },
      { label: "Database Load", description: "Current database load percentage" },
      { label: "Purge System Cache", description: "Clear cached platform data" },
      { label: "Maintenance Mode", description: "Temporarily restrict platform access" },
    ],
  },
  {
    key: "danger",
    sectionLabel: "Danger Zone",
    items: [
      { label: "Download Database Backup", description: "Download a full backup of the platform database" },
      { label: "Delete Test Data", description: "Remove seeded or test-only records" },
      { label: "Reset Platform Data", description: "Irreversibly reset all platform data" },
    ],
  },
];

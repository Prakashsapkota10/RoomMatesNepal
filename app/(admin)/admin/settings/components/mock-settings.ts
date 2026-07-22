import type { AdminRole, PlatformSettings } from "./types";

/**
 * Initial "saved" platform settings state.
 * TODO: Replace with: await settingsService.getPlatformSettings()
 */
export const INITIAL_SETTINGS: PlatformSettings = {
  general: {
    platformName: "RoomMate Nepal",
    timezone: "asia_kathmandu",
    logoUrl: null,
  },
  security: {
    twoFactorEnabled: true,
    twoFactorMethod: "Google Authenticator",
    passwordPolicy: {
      minLength: 12,
      requireUppercase: true,
      requireLowercase: true,
      requireNumber: true,
      requireSpecialChar: true,
    },
    sessionTimeoutMinutes: 30,
    maxLoginAttempts: 5,
  },
  listing: {
    requireApproval: true,
    autoExpireEnabled: true,
    autoExpireDays: 30,
    reportThreshold: 3,
    duplicateDetectionEnabled: true,
    featuredApprovalRequired: true,
  },
  verification: {
    emailVerificationEnabled: true,
    phoneVerificationEnabled: true,
    profileVerificationEnabled: true,
    trustScoreEnabled: true,
    trustScoreWeights: {
      verification: 40,
      review: 25,
      report: 20,
      profileCompletion: 15,
    },
    reviewModeration: "manual",
  },
  notifications: {
    criticalAlerts: true,
    listingReports: true,
    userReports: true,
    verificationRequests: true,
    weeklyGrowthReports: false,
    userActivitySummaries: true,
  },
  aiMatching: {
    enabled: true,
    minMatchScore: 60,
    recommendationsEnabled: true,
    feedbackCollectionEnabled: true,
    algorithm: "balanced",
    weights: {
      lifestyle: 30,
      budget: 30,
      location: 25,
      personality: 15,
    },
  },
  maintenance: {
    lastBackupLabel: "2h ago",
    databaseLoadPercent: 42,
    maintenanceModeEnabled: false,
  },
};

/**
 * Initial admin roles.
 * TODO: Replace with: await settingsService.getRoles()
 */
export const INITIAL_ROLES: AdminRole[] = [
  {
    id: "role-super-admin",
    name: "Super Admin",
    description: "Unrestricted access to every part of the platform.",
    activeUsers: 3,
    permissions: [
      "view_users",
      "manage_users",
      "view_listings",
      "manage_listings",
      "view_reports",
      "manage_reports",
      "manage_community",
      "manage_verification",
      "manage_settings",
      "manage_announcements",
    ],
    isProtected: true,
  },
  {
    id: "role-support-moderator",
    name: "Support Moderator",
    description: "Read-only access for handling support tickets.",
    activeUsers: 12,
    permissions: ["view_users", "view_listings", "view_reports"],
  },
  {
    id: "role-content-moderator",
    name: "Content Moderator",
    description: "Moderates community posts and user reports.",
    activeUsers: 5,
    permissions: ["view_reports", "manage_reports", "manage_community"],
  },
  {
    id: "role-verification-moderator",
    name: "Verification Moderator",
    description: "Reviews and approves identity verification requests.",
    activeUsers: 4,
    permissions: ["view_users", "manage_verification"],
  },
];

/**
 * Shared types for the admin Platform Settings page.
 * TODO: Replace with real DTOs once a backend settings API exists.
 */

export type SystemTimezone =
  | "asia_kathmandu"
  | "utc"
  | "asia_kolkata"
  | "asia_dhaka"
  | "asia_dubai"
  | "asia_singapore";

export interface PasswordPolicy {
  minLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumber: boolean;
  requireSpecialChar: boolean;
}

export type ReviewModeration = "manual" | "automatic" | "community";

export type MatchingAlgorithm = "compatibility" | "preference" | "balanced";

export interface TrustScoreWeights {
  verification: number;
  review: number;
  report: number;
  profileCompletion: number;
}

export interface MatchingWeights {
  lifestyle: number;
  budget: number;
  location: number;
  personality: number;
}

export interface NotificationPreferenceState {
  criticalAlerts: boolean;
  listingReports: boolean;
  userReports: boolean;
  verificationRequests: boolean;
  weeklyGrowthReports: boolean;
  userActivitySummaries: boolean;
}

export interface PlatformSettings {
  general: {
    platformName: string;
    timezone: SystemTimezone;
    logoUrl: string | null;
  };
  security: {
    twoFactorEnabled: boolean;
    twoFactorMethod: string;
    passwordPolicy: PasswordPolicy;
    sessionTimeoutMinutes: number;
    maxLoginAttempts: number;
  };
  listing: {
    requireApproval: boolean;
    autoExpireEnabled: boolean;
    autoExpireDays: number;
    reportThreshold: number;
    duplicateDetectionEnabled: boolean;
    featuredApprovalRequired: boolean;
  };
  verification: {
    emailVerificationEnabled: boolean;
    phoneVerificationEnabled: boolean;
    profileVerificationEnabled: boolean;
    trustScoreEnabled: boolean;
    trustScoreWeights: TrustScoreWeights;
    reviewModeration: ReviewModeration;
  };
  notifications: NotificationPreferenceState;
  aiMatching: {
    enabled: boolean;
    minMatchScore: number;
    recommendationsEnabled: boolean;
    feedbackCollectionEnabled: boolean;
    algorithm: MatchingAlgorithm;
    weights: MatchingWeights;
  };
  maintenance: {
    lastBackupLabel: string;
    databaseLoadPercent: number;
    maintenanceModeEnabled: boolean;
  };
}

export type PermissionKey =
  | "view_users"
  | "manage_users"
  | "view_listings"
  | "manage_listings"
  | "view_reports"
  | "manage_reports"
  | "manage_community"
  | "manage_verification"
  | "manage_settings"
  | "manage_announcements";

export interface AdminRole {
  id: string;
  name: string;
  description: string;
  activeUsers: number;
  permissions: PermissionKey[];
  isProtected?: boolean;
}

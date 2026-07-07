// ─── User & Auth ────────────────────────────────────────────────────────────

export type UserRole = "user" | "tenant" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  isVerified: boolean;
  trustScore: number;
  createdAt: string;
}

export interface Session {
  userId: string;
  role: UserRole;
  isVerified: boolean;
  expiresAt: string;
}

// ─── Listing ─────────────────────────────────────────────────────────────────

export type ListingType = "room" | "apartment" | "house" | "hostel" | "pg";
export type ListingStatus = "active" | "inactive" | "pending" | "rejected";
export type FurnishingType = "furnished" | "semi-furnished" | "unfurnished";
export type GenderPreference = "any" | "male" | "female";

export interface ListingLocation {
  address: string;
  city: string;
  district: string;
  province: string;
  coordinates?: { lat: number; lng: number };
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  type: ListingType;
  status: ListingStatus;
  price: number;
  priceUnit: "monthly" | "daily";
  location: ListingLocation;
  furnishing: FurnishingType;
  bedrooms: number;
  bathrooms: number;
  availableFrom: string;
  images: string[];
  amenities: string[];
  genderPreference: GenderPreference;
  maxOccupants: number;
  currentOccupants: number;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Roommate Post ────────────────────────────────────────────────────────────

export type RoommatePostStatus = "active" | "closed" | "draft";

export interface RoommatePost {
  id: string;
  userId: string;
  title: string;
  description: string;
  budget: number;
  budgetMax?: number;
  preferredLocations: string[];
  moveInDate: string;
  duration: string;
  lifestyle: LifestylePreferences;
  genderPreference: GenderPreference;
  status: RoommatePostStatus;
  createdAt: string;
}

// ─── AI Match ────────────────────────────────────────────────────────────────

export interface MatchProfile {
  id: string;
  userId: string;
  name: string;
  avatar?: string;
  compatibilityScore: number;
  sharedInterests: string[];
  matchReasons: string[];
  lifestyle: LifestylePreferences;
}

// ─── Lifestyle / Preferences ─────────────────────────────────────────────────

export interface LifestylePreferences {
  sleepSchedule: "early-bird" | "night-owl" | "flexible";
  cleanliness: 1 | 2 | 3 | 4 | 5;
  noiseTolerance: "quiet" | "moderate" | "loud";
  smokingAllowed: boolean;
  petsAllowed: boolean;
  guestPolicy: "no-guests" | "occasional" | "frequent";
  cookingFrequency: "never" | "sometimes" | "daily";
  workFromHome: boolean;
  studyEnvironment: boolean;
}

// ─── Application ─────────────────────────────────────────────────────────────

export type ApplicationStatus =
  | "pending"
  | "accepted"
  | "rejected"
  | "withdrawn";

export interface Application {
  id: string;
  listingId: string;
  applicantId: string;
  ownerId: string;
  message: string;
  status: ApplicationStatus;
  createdAt: string;
  updatedAt: string;
}

// ─── Message ──────────────────────────────────────────────────────────────────

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  type: "text" | "image" | "file";
  fileUrl?: string;
  readBy: string[];
  createdAt: string;
}

// ─── Notification ─────────────────────────────────────────────────────────────

export type NotificationType =
  | "application_received"
  | "application_accepted"
  | "application_rejected"
  | "new_message"
  | "match_found"
  | "listing_approved"
  | "listing_rejected"
  | "payment_success"
  | "verification_approved"
  | "system";

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  href?: string;
  isRead: boolean;
  createdAt: string;
}

// ─── Payment & Subscription ──────────────────────────────────────────────────

export type SubscriptionPlan = "free" | "basic" | "premium" | "enterprise";
export type PaymentStatus = "success" | "pending" | "failed" | "refunded";

export interface Subscription {
  id: string;
  userId: string;
  plan: SubscriptionPlan;
  status: "active" | "cancelled" | "expired";
  startDate: string;
  endDate: string;
  features: string[];
}

export interface PaymentRecord {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  description: string;
  createdAt: string;
}

// ─── Admin ────────────────────────────────────────────────────────────────────

export type ReportReason =
  | "spam"
  | "fake_listing"
  | "inappropriate"
  | "scam"
  | "other";
export type ReportStatus = "open" | "under_review" | "resolved" | "dismissed";

export interface Report {
  id: string;
  reporterId: string;
  targetId: string;
  targetType: "listing" | "user" | "review";
  reason: ReportReason;
  description: string;
  status: ReportStatus;
  createdAt: string;
}

export interface VerificationRequest {
  id: string;
  userId: string;
  documentType: "citizenship" | "passport" | "license";
  documentUrl: string;
  status: "pending" | "approved" | "rejected";
  reviewedBy?: string;
  createdAt: string;
}

// ─── Navigation ───────────────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  badge?: number;
  children?: NavItem[];
  roles?: UserRole[];
  requiresAuth?: boolean;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

// ─── Shared ───────────────────────────────────────────────────────────────────

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiError {
  message: string;
  code?: string;
  field?: string;
}

export interface SearchFilters {
  query?: string;
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  type?: ListingType;
  furnishing?: FurnishingType;
  genderPreference?: GenderPreference;
  bedrooms?: number;
  availableFrom?: string;
}

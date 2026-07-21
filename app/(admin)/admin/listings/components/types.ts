/**
 * Shared types for the admin Listings page (Rooms + Roommate Requests tabs).
 * TODO: Replace with real DTOs returned by the backend listings/roommates APIs.
 */

export type ListingModerationStatus =
  | "pending"
  | "approved"
  | "reported"
  | "rejected"
  | "expired";

export interface RoomListingRow {
  kind: "room";
  id: string;
  title: string;
  image: string;
  images: string[];
  listedAgo: string;
  ownerName: string;
  ownerAvatar?: string;
  ownerVerified: boolean;
  ownerVerifiedDate: string;
  location: string;
  city: string;
  rent: number;
  status: ListingModerationStatus;
  amenities: string[];
  description: string;
}

export interface RoommateRequestRow {
  kind: "roommate";
  id: string;
  title: string;
  image: string;
  images: string[];
  listedAgo: string;
  requesterName: string;
  requesterAvatar?: string;
  requesterVerified: boolean;
  requesterVerifiedDate: string;
  location: string;
  city: string;
  budget: number;
  status: ListingModerationStatus;
  preferences: string[];
  description: string;
}

export type AdminListingRow = RoomListingRow | RoommateRequestRow;

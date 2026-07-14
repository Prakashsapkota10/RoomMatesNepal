import type { UserRole } from "@/types";

// ─── Permission Keys ──────────────────────────────────────────────────────────

/**
 * Granular permission keys that control sidebar item visibility.
 * Sidebar renders items based on these permissions, not raw role strings.
 */
export type SidebarPermission =
  | "dashboard"
  | "discover"
  | "manage_requirements"
  | "manage_listings"
  | "messages"
  | "saved"
  | "ai_match"
  | "trust_score"
  | "reviews"
  | "community"
  | "subscription"
  | "profile"
  | "settings";

// ─── Role → Permission Map ────────────────────────────────────────────────────

const ROLE_PERMISSIONS: Record<UserRole, SidebarPermission[]> = {
  user: [
    "dashboard",
    "discover",
    "manage_requirements",
    "messages",
    "saved",
    "ai_match",
    "trust_score",
    "reviews",
    "community",
    "profile",
    "settings",
  ],
  tenant: [
    "dashboard",
    "manage_listings",
    "messages",
    "reviews",
    "community",
    "subscription",
    "profile",
    "settings",
  ],
  admin: [],
};

/**
 * Get permissions for a given role.
 */
export function getPermissionsForRole(role: UserRole): SidebarPermission[] {
  return ROLE_PERMISSIONS[role] ?? [];
}

/**
 * Check if a role has a specific permission.
 */
export function hasPermission(role: UserRole, permission: SidebarPermission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

// ─── Sidebar Nav Item Type ────────────────────────────────────────────────────

export interface SidebarNavItem {
  /** Display label */
  label: string;
  /** Route path */
  href: string;
  /** Lucide icon name */
  icon: string;
  /** Permission required to show this item */
  permission: SidebarPermission;
  /** Optional child items (collapsible submenu) */
  children?: SidebarNavChild[];
  /** Badge key — used to show unread counts */
  badgeKey?: "messages" | "notifications";
}

export interface SidebarNavChild {
  label: string;
  href: string;
  icon?: string;
}

// ─── Sidebar Configuration ────────────────────────────────────────────────────

/**
 * Complete sidebar navigation definition.
 * Items are filtered at render time based on user permissions.
 * This is the single source of truth for all sidebar navigation.
 */
export const SIDEBAR_NAV: SidebarNavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: "LayoutDashboard",
    permission: "dashboard",
  },
  {
    label: "Discover",
    href: "/discover",
    icon: "Search",
    permission: "discover",
    children: [
      { label: "Rooms", href: "/discover", icon: "Building2" },
      { label: "Roommates", href: "/discover?tab=roommates", icon: "Users" },
    ],
  },
  {
    label: "My Activities",
    href: "/activities",
    icon: "ClipboardList",
    permission: "manage_requirements",
    children: [
      { label: "My Requirements", href: "/activities", icon: "FileText" },
      { label: "Drafts", href: "/activities?tab=drafts", icon: "PenLine" },
      { label: "Archived", href: "/activities?tab=archived", icon: "Archive" },
    ],
  },
  {
    label: "My Activities",
    href: "/activities",
    icon: "ClipboardList",
    permission: "manage_listings",
    children: [
      { label: "My Listings", href: "/activities", icon: "Home" },
      { label: "Drafts", href: "/activities?tab=drafts", icon: "PenLine" },
      { label: "Archived", href: "/activities?tab=archived", icon: "Archive" },
    ],
  },
  {
    label: "Messages",
    href: "/messages",
    icon: "MessageSquare",
    permission: "messages",
    badgeKey: "messages",
  },
  {
    label: "Saved",
    href: "/saved",
    icon: "Bookmark",
    permission: "saved",
  },
  {
    label: "AI Match",
    href: "/ai-match",
    icon: "Sparkles",
    permission: "ai_match",
  },
  {
    label: "Trust Score",
    href: "/trust-score",
    icon: "ShieldCheck",
    permission: "trust_score",
  },
  {
    label: "Reviews",
    href: "/reviews",
    icon: "Star",
    permission: "reviews",
  },
  {
    label: "Community",
    href: "/my-community",
    icon: "Users",
    permission: "community",
  },
  {
    label: "Subscription",
    href: "/subscription",
    icon: "CreditCard",
    permission: "subscription",
  },
  {
    label: "Profile",
    href: "/profile",
    icon: "User",
    permission: "profile",
  },
  {
    label: "Settings",
    href: "/settings",
    icon: "Settings",
    permission: "settings",
  },
];

// ─── Sidebar Generation Utility ───────────────────────────────────────────────

/**
 * Returns the filtered sidebar nav items for a given role.
 * Only items whose permission is granted to the role are included.
 */
export function getSidebarNavForRole(role: UserRole): SidebarNavItem[] {
  const permissions = getPermissionsForRole(role);
  return SIDEBAR_NAV.filter((item) => permissions.includes(item.permission));
}

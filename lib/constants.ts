import type { NavItem } from "@/types";

// ─── App Meta ─────────────────────────────────────────────────────────────────

export const APP_NAME = "RoomMate Nepal";
export const APP_TAGLINE = "Find your perfect roommate with AI";
export const APP_DESCRIPTION =
  "Nepal's first AI-powered roommate finder, room rental, and shared living management platform.";
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

// ─── Nepal Locations ──────────────────────────────────────────────────────────

export const NEPAL_CITIES = [
  "Kathmandu",
  "Lalitpur",
  "Bhaktapur",
  "Pokhara",
  "Biratnagar",
  "Birgunj",
  "Bharatpur",
  "Butwal",
  "Dharan",
  "Hetauda",
  "Itahari",
  "Janakpur",
  "Nepalgunj",
  "Dhangadhi",
] as const;

export const POPULAR_LOCATIONS = [
  { name: "Thamel, Kathmandu", slug: "thamel-kathmandu", listingCount: 124 },
  { name: "Lazimpat, Kathmandu", slug: "lazimpat-kathmandu", listingCount: 98 },
  { name: "Patan, Lalitpur", slug: "patan-lalitpur", listingCount: 87 },
  { name: "Lakeside, Pokhara", slug: "lakeside-pokhara", listingCount: 76 },
  { name: "Chabahil, Kathmandu", slug: "chabahil-kathmandu", listingCount: 65 },
  { name: "Baluwatar, Kathmandu", slug: "baluwatar-kathmandu", listingCount: 54 },
];

// ─── Listing Constants ────────────────────────────────────────────────────────

export const LISTING_TYPES = [
  { value: "room", label: "Single Room" },
  { value: "apartment", label: "Apartment" },
  { value: "house", label: "House" },
  { value: "hostel", label: "Hostel" },
  { value: "pg", label: "PG / Paying Guest" },
] as const;

export const FURNISHING_TYPES = [
  { value: "furnished", label: "Fully Furnished" },
  { value: "semi-furnished", label: "Semi Furnished" },
  { value: "unfurnished", label: "Unfurnished" },
] as const;

export const GENDER_PREFERENCES = [
  { value: "any", label: "Any Gender" },
  { value: "male", label: "Male Only" },
  { value: "female", label: "Female Only" },
] as const;

export const AMENITIES_LIST = [
  "WiFi",
  "Parking",
  "Water Supply",
  "Electricity Backup",
  "Security Guard",
  "CCTV",
  "Laundry",
  "Kitchen",
  "Air Conditioning",
  "Heating",
  "Gym",
  "Terrace",
  "Garden",
  "Lift / Elevator",
] as const;

// ─── Subscription Plans ───────────────────────────────────────────────────────

export const SUBSCRIPTION_PLANS = [
  {
    id: "free",
    name: "Free",
    price: 0,
    currency: "NPR",
    billingCycle: "forever",
    features: [
      "3 active listings",
      "Basic search filters",
      "5 applications per month",
      "Standard support",
    ],
    highlighted: false,
  },
  {
    id: "basic",
    name: "Basic",
    price: 499,
    currency: "NPR",
    billingCycle: "monthly",
    features: [
      "10 active listings",
      "Advanced search filters",
      "Unlimited applications",
      "AI match suggestions (5/month)",
      "Priority support",
    ],
    highlighted: false,
  },
  {
    id: "premium",
    name: "Premium",
    price: 999,
    currency: "NPR",
    billingCycle: "monthly",
    features: [
      "Unlimited listings",
      "Full AI matching engine",
      "Featured listing badge",
      "Trust score boost",
      "Analytics dashboard",
      "24/7 dedicated support",
    ],
    highlighted: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 4999,
    currency: "NPR",
    billingCycle: "monthly",
    features: [
      "Everything in Premium",
      "Multiple property management",
      "Tenant management tools",
      "Custom branding",
      "API access",
      "Dedicated account manager",
    ],
    highlighted: false,
  },
] as const;

// ─── Route Constants ──────────────────────────────────────────────────────────

export const PUBLIC_ROUTES = [
  "/",
  "/about",
  "/contact",
  "/privacy-policy",
  "/terms",
  "/help",
  "/listings",
  "/roommates",
  "/pricing",
] as const;

export const AUTH_ROUTES = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
] as const;

export const PROTECTED_ROUTES = [
  "/dashboard",
  "/profile",
  "/listings/create",
  "/my-listings",
  "/roommates/create",
  "/my-roommate-posts",
  "/matches",
  "/applications",
  "/messages",
  "/saved-listings",
  "/notifications",
  "/subscription",
  "/payment-history",
] as const;

export const ADMIN_ROUTES = ["/admin"] as const;
export const TENANT_ROUTES = ["/my-listings", "/listings/create"] as const;

// ─── Public Navigation ────────────────────────────────────────────────────────

export const PUBLIC_NAV_ITEMS: NavItem[] = [
  { label: "Browse Rooms", href: "/listings", icon: "Building2" },
  { label: "Find Roommates", href: "/roommates", icon: "Users" },
  { label: "AI Matching", href: "/matches", icon: "Sparkles" },
  { label: "Pricing", href: "/pricing", icon: "CreditCard" },
];

// ─── User Dashboard Sidebar ───────────────────────────────────────────────────

export const USER_SIDEBAR_NAV: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: "LayoutDashboard",
  },
  {
    label: "Browse",
    href: "/listings",
    icon: "Search",
    children: [
      { label: "Room Listings", href: "/listings", icon: "Building2" },
      { label: "Find Roommates", href: "/roommates", icon: "Users" },
    ],
  },
  {
    label: "My Listings",
    href: "/my-listings",
    icon: "Home",
    roles: ["tenant"],
    children: [
      { label: "All Listings", href: "/my-listings", icon: "List" },
      { label: "Create Listing", href: "/listings/create", icon: "Plus" },
    ],
  },
  {
    label: "Roommate Posts",
    href: "/my-roommate-posts",
    icon: "UserPlus",
    children: [
      { label: "My Posts", href: "/my-roommate-posts", icon: "FileText" },
      { label: "Create Post", href: "/roommates/create", icon: "Plus" },
    ],
  },
  {
    label: "AI Matches",
    href: "/matches",
    icon: "Sparkles",
  },
  {
    label: "Applications",
    href: "/applications",
    icon: "ClipboardList",
    children: [
      { label: "Sent", href: "/applications/sent", icon: "Send" },
      { label: "Received", href: "/applications/received", icon: "Inbox" },
    ],
  },
  {
    label: "Messages",
    href: "/messages",
    icon: "MessageSquare",
  },
  {
    label: "Saved Listings",
    href: "/saved-listings",
    icon: "Bookmark",
  },
  {
    label: "Notifications",
    href: "/notifications",
    icon: "Bell",
  },
  {
    label: "Profile",
    href: "/profile",
    icon: "User",
    children: [
      { label: "View Profile", href: "/profile", icon: "User" },
      { label: "Edit Profile", href: "/profile/edit", icon: "Pencil" },
      { label: "Preferences", href: "/profile/preferences", icon: "SlidersHorizontal" },
      { label: "Verification", href: "/profile/verification", icon: "ShieldCheck" },
      { label: "Reviews", href: "/profile/reviews", icon: "Star" },
      { label: "Subscription", href: "/profile/subscription", icon: "CreditCard" },
    ],
  },
];

// ─── Admin Sidebar ────────────────────────────────────────────────────────────

export const ADMIN_SIDEBAR_NAV: NavItem[] = [
  { label: "Dashboard", href: "/admin", icon: "LayoutDashboard" },
  {
    label: "Users",
    href: "/admin/users",
    icon: "Users",
  },
  {
    label: "Listings",
    href: "/admin/listings",
    icon: "Building2",
  },
  {
    label: "Reports",
    href: "/admin/reports",
    icon: "Flag",
  },
  {
    label: "Verifications",
    href: "/admin/verifications",
    icon: "ShieldCheck",
  },
  {
    label: "Payments",
    href: "/admin/payments",
    icon: "DollarSign",
  },
  {
    label: "Subscriptions",
    href: "/admin/subscriptions",
    icon: "CreditCard",
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: "Settings",
  },
];

// ─── Footer Navigation ────────────────────────────────────────────────────────

export const FOOTER_NAV = {
  product: [
    { label: "Browse Rooms", href: "/listings" },
    { label: "Find Roommates", href: "/roommates" },
    { label: "AI Matching", href: "/matches" },
    { label: "Pricing", href: "/pricing" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Help Center", href: "/help" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms" },
  ],
};

// ─── Misc ─────────────────────────────────────────────────────────────────────

export const TRUST_SCORE_LABELS: Record<string, string> = {
  "0-20": "Unverified",
  "21-40": "Basic",
  "41-60": "Trusted",
  "61-80": "Verified",
  "81-100": "Elite",
};

export const CURRENCY = "NPR";
export const ITEMS_PER_PAGE = 12;
export const MAX_IMAGES_PER_LISTING = 10;

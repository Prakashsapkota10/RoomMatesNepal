import type {
  CommunityCategory,
  CommunityStat,
  Contributor,
  TrendingTag,
  PopularCity,
  CommunityGuideline,
  AIAction,
} from "../types";

// ─── Categories ───────────────────────────────────────────────────────────────

export const COMMUNITY_CATEGORIES: CommunityCategory[] = [
  { id: "all", name: "All", slug: "all", color: "bg-primary text-white" },
  { id: "questions", name: "Questions", slug: "questions", color: "bg-muted text-foreground" },
  { id: "roommates", name: "Roommates", slug: "roommates", color: "bg-muted text-foreground" },
  { id: "rooms", name: "Rooms", slug: "rooms", color: "bg-muted text-foreground" },
  { id: "safety", name: "Safety", slug: "safety", color: "bg-muted text-foreground" },
  { id: "budget", name: "Budget", slug: "budget", color: "bg-muted text-foreground" },
  { id: "city-guides", name: "City Guides", slug: "city-guides", color: "bg-muted text-foreground" },
  { id: "living-tips", name: "Living Tips", slug: "living-tips", color: "bg-muted text-foreground" },
  { id: "success-stories", name: "Success Stories", slug: "success-stories", color: "bg-muted text-foreground" },
  { id: "announcements", name: "Announcements", slug: "announcements", color: "bg-muted text-foreground" },
];

// ─── Statistics ───────────────────────────────────────────────────────────────

export const COMMUNITY_STATS: CommunityStat[] = [
  { id: "members", value: "42k+", label: "MEMBERS" },
  { id: "discussions", value: "15k+", label: "DISCUSSIONS" },
  { id: "solved", value: "8.2k", label: "SOLVED" },
  { id: "active-today", value: "1.4k", label: "ACTIVE TODAY" },
];

// ─── Top Contributors ─────────────────────────────────────────────────────────

export const TOP_CONTRIBUTORS: Contributor[] = [
  { id: "1", name: "Bibek Giri", avatar: "/photo-1519085360753-af0119f7cbe7.avif", role: "Community Guru", points: 2400 },
  { id: "2", name: "Deepa Rai", avatar: "/photo-1573496359142-b8d87734a5a2.avif", role: "Trust Expert", points: 1800 },
  { id: "3", name: "Suraj Kc", avatar: "/photo-1612320648993-61c1cd604b71.avif", role: "Helpful Member", points: 1200 },
];

// ─── Trending Tags ────────────────────────────────────────────────────────────

export const TRENDING_TAGS: TrendingTag[] = [
  { id: "1", name: "#KathmanduRentals", slug: "kathmandu-rentals" },
  { id: "2", name: "#SafetyFirst", slug: "safety-first" },
  { id: "3", name: "#RoommateWanted", slug: "roommate-wanted" },
  { id: "4", name: "#SanepaLiving", slug: "sanepa-living" },
  { id: "5", name: "#BudgetRooms", slug: "budget-rooms" },
  { id: "6", name: "#LalitpurGuide", slug: "lalitpur-guide" },
];

// ─── Popular Cities ───────────────────────────────────────────────────────────

export const POPULAR_CITIES: PopularCity[] = [
  { id: "1", name: "Kathmandu", members: "8.4k members" },
  { id: "2", name: "Lalitpur", members: "3.2k members" },
  { id: "3", name: "Pokhara", members: "1.1k members" },
  { id: "4", name: "Bhaktapur", members: "842 members" },
];

// ─── Community Guidelines ─────────────────────────────────────────────────────

export const COMMUNITY_GUIDELINES: CommunityGuideline[] = [
  {
    id: "1",
    icon: "Shield",
    title: "Keep it Safe",
    description: "Always follow our community guidelines to ensure a safe experience for everyone.",
  },
];

// ─── AI Actions ───────────────────────────────────────────────────────────────

export const AI_ACTIONS: AIAction[] = [
  { id: "ask-ai", label: "Ask AI", icon: "MessageSquare", variant: "primary" },
  { id: "detect-scam", label: "Detect Rental Scam", icon: "Shield", variant: "destructive" },
];

// ─── Skeleton Counts ──────────────────────────────────────────────────────────

export const SKELETON_COUNTS = {
  categories: 8,
  trendingDiscussions: 2,
  latestDiscussions: 3,
  contributors: 3,
  tags: 6,
  cities: 4,
} as const;

// ─── Empty State Messages ─────────────────────────────────────────────────────

export const EMPTY_MESSAGES = {
  discussions: {
    title: "No discussions found",
    description: "Be the first to start a discussion in this category.",
  },
  search: {
    title: "No results found",
    description: "Try adjusting your search terms or browse by category.",
  },
} as const;

// ─── Category Badge Colors ────────────────────────────────────────────────────

export const CATEGORY_BADGE_COLORS: Record<string, string> = {
  safety: "bg-blue-100 text-blue-700 border-blue-200",
  budget: "bg-blue-100 text-blue-700 border-blue-200",
  roommates: "bg-blue-100 text-blue-700 border-blue-200",
  rooms: "bg-blue-100 text-blue-700 border-blue-200",
  "city-guides": "bg-blue-100 text-blue-700 border-blue-200",
  "living-tips": "bg-blue-100 text-blue-700 border-blue-200",
  "success-stories": "bg-blue-100 text-blue-700 border-blue-200",
  announcements: "bg-blue-100 text-blue-700 border-blue-200",
  questions: "bg-blue-100 text-blue-700 border-blue-200",
  all: "bg-primary text-white",
};

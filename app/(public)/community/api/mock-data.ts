import type { Discussion, Contributor, TrendingTag, PopularCity, CommunityCategory } from "../types";
import { COMMUNITY_CATEGORIES, TOP_CONTRIBUTORS, TRENDING_TAGS, POPULAR_CITIES } from "../constants";

// ─── Mock Discussions ─────────────────────────────────────────────────────────

const now = new Date();

function hoursAgo(h: number): string {
  return new Date(now.getTime() - h * 60 * 60 * 1000).toISOString();
}

function minutesAgo(m: number): string {
  return new Date(now.getTime() - m * 60 * 1000).toISOString();
}

export const MOCK_FEATURED_DISCUSSION: Discussion = {
  id: "featured-1",
  title: "Essential Guide: Finding Your First Apartment in Lalitpur",
  description:
    "Moving to Lalitpur? From understanding local ward systems to negotiating rent in Jhamsikhel, we've compiled everything you need to know about navigating the local real estate market safely...",
  category: COMMUNITY_CATEGORIES.find((c) => c.slug === "city-guides")!,
  author: {
    id: "author-1",
    name: "Priyanka Sharma",
    avatar: "/photo-1573496359142-b8d87734a5a2.avif",
    trustScore: 98,
    isVerified: true,
  },
  views: 5200,
  replies: 48,
  likes: 234,
  createdAt: hoursAgo(6),
  isFeatured: true,
  isSolved: false,
  isBookmarked: false,
  image: "/photo-1616594039964-ae9021a400a0.avif",
};

export const MOCK_TRENDING_DISCUSSIONS: Discussion[] = [
  {
    id: "trending-1",
    title: "Is it safe to share contact numbers on public listings?",
    category: COMMUNITY_CATEGORIES.find((c) => c.slug === "safety")!,
    author: {
      id: "author-2",
      name: "Anish K.",
      avatar: "/photo-1519085360753-af0119f7cbe7.avif",
      trustScore: 92,
      isVerified: true,
    },
    views: 1200,
    replies: 24,
    likes: 56,
    createdAt: hoursAgo(2),
    isFeatured: false,
    isSolved: false,
    isBookmarked: false,
  },
  {
    id: "trending-2",
    title: "Cost of living comparison: Baneshwor vs. Kupondole",
    category: COMMUNITY_CATEGORIES.find((c) => c.slug === "budget")!,
    author: {
      id: "author-3",
      name: "Sita Maya",
      avatar: "/premium_photo-1664471481572-c59a951a7755.avif",
      trustScore: 99,
      isVerified: true,
    },
    views: 3400,
    replies: 56,
    likes: 89,
    createdAt: hoursAgo(5),
    isFeatured: false,
    isSolved: false,
    isBookmarked: false,
  },
];

export const MOCK_LATEST_DISCUSSIONS: Discussion[] = [
  {
    id: "latest-1",
    title: "Looking for a vegetarian roommate in Sanepa. Budget 15k.",
    category: COMMUNITY_CATEGORIES.find((c) => c.slug === "roommates")!,
    author: {
      id: "author-4",
      name: "Rohan Shrestha",
      avatar: "/photo-1612320648993-61c1cd604b71.avif",
      trustScore: 85,
      isVerified: true,
    },
    views: 320,
    replies: 4,
    likes: 12,
    createdAt: minutesAgo(15),
    isFeatured: false,
    isSolved: false,
    isBookmarked: false,
  },
];

export const MOCK_SOLVED_DISCUSSIONS: Discussion[] = [
  {
    id: "solved-1",
    title: "Found my perfect match! Here's how I vetted my current roommate.",
    category: COMMUNITY_CATEGORIES.find((c) => c.slug === "success-stories")!,
    author: {
      id: "author-5",
      name: "Maya Tamang",
      avatar: "/premium_photo-1683887034491-f58b4c4fca72.avif",
      trustScore: 91,
      isVerified: true,
    },
    views: 2100,
    replies: 18,
    likes: 67,
    createdAt: hoursAgo(1),
    isFeatured: false,
    isSolved: true,
    isBookmarked: false,
  },
];

// ─── Re-exports for API layer ─────────────────────────────────────────────────

export const MOCK_CATEGORIES: CommunityCategory[] = COMMUNITY_CATEGORIES;
export const MOCK_CONTRIBUTORS: Contributor[] = TOP_CONTRIBUTORS;
export const MOCK_TRENDING_TAGS: TrendingTag[] = TRENDING_TAGS;
export const MOCK_POPULAR_CITIES: PopularCity[] = POPULAR_CITIES;

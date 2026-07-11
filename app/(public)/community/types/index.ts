// ─── Community Types ──────────────────────────────────────────────────────────

export interface CommunityCategory {
  id: string;
  name: string;
  slug: string;
  color: string;
  icon?: string;
}

export interface DiscussionAuthor {
  id: string;
  name: string;
  avatar?: string;
  trustScore: number;
  isVerified: boolean;
  role?: string;
}

export interface Discussion {
  id: string;
  title: string;
  description?: string;
  category: CommunityCategory;
  author: DiscussionAuthor;
  views: number;
  replies: number;
  likes: number;
  createdAt: string;
  isFeatured: boolean;
  isSolved: boolean;
  isBookmarked: boolean;
  image?: string;
}

export interface Contributor {
  id: string;
  name: string;
  avatar?: string;
  role: string;
  points: number;
}

export interface CommunityStat {
  id: string;
  value: string;
  label: string;
}

export interface CommunityGuideline {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface TrendingTag {
  id: string;
  name: string;
  slug: string;
}

export interface PopularCity {
  id: string;
  name: string;
  members: string;
}

export interface AIAction {
  id: string;
  label: string;
  icon: string;
  variant: "primary" | "destructive";
}

export type SortBy = "newest" | "trending" | "most-liked" | "most-viewed";

export interface CommunityFilters {
  category: string | null;
  search: string;
  sortBy: SortBy;
}

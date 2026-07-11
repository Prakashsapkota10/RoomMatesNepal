import { z } from "zod";

// ─── Category Schema ──────────────────────────────────────────────────────────

export const CategorySchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  slug: z.string().min(1),
  color: z.string(),
  icon: z.string().optional(),
});

// ─── Discussion Author Schema ─────────────────────────────────────────────────

export const DiscussionAuthorSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  avatar: z.string().optional(),
  trustScore: z.number().min(0).max(100),
  isVerified: z.boolean(),
  role: z.string().optional(),
});

// ─── Discussion Schema ────────────────────────────────────────────────────────

export const DiscussionSchema = z.object({
  id: z.string(),
  title: z.string().min(1).max(200),
  description: z.string().optional(),
  category: CategorySchema,
  author: DiscussionAuthorSchema,
  views: z.number().min(0),
  replies: z.number().min(0),
  likes: z.number().min(0),
  createdAt: z.string(),
  isFeatured: z.boolean(),
  isSolved: z.boolean(),
  isBookmarked: z.boolean(),
  image: z.string().optional(),
});

// ─── Search Schema ────────────────────────────────────────────────────────────

export const SearchSchema = z.object({
  query: z.string().max(200),
  category: z.string().nullable().optional(),
  sortBy: z.enum(["newest", "trending", "most-liked", "most-viewed"]).optional(),
});

// ─── Contributor Schema ───────────────────────────────────────────────────────

export const ContributorSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  avatar: z.string().optional(),
  role: z.string(),
  points: z.number().min(0),
});

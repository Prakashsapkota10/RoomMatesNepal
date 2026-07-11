/**
 * Community API layer.
 * Currently returns mock data via Promise.resolve().
 * When backend is ready, replace with actual fetch calls.
 */

import type { Discussion, CommunityCategory, Contributor, TrendingTag, PopularCity } from "../types";
import {
  MOCK_FEATURED_DISCUSSION,
  MOCK_TRENDING_DISCUSSIONS,
  MOCK_LATEST_DISCUSSIONS,
  MOCK_SOLVED_DISCUSSIONS,
  MOCK_CATEGORIES,
  MOCK_CONTRIBUTORS,
  MOCK_TRENDING_TAGS,
  MOCK_POPULAR_CITIES,
} from "./mock-data";

// ─── Categories ───────────────────────────────────────────────────────────────

export async function getCategories(): Promise<CommunityCategory[]> {
  return Promise.resolve(MOCK_CATEGORIES);
}

// ─── Featured Discussion ──────────────────────────────────────────────────────

export async function getFeaturedDiscussion(): Promise<Discussion> {
  return Promise.resolve(MOCK_FEATURED_DISCUSSION);
}

// ─── Trending Discussions ─────────────────────────────────────────────────────

export async function getTrendingDiscussions(): Promise<Discussion[]> {
  return Promise.resolve(MOCK_TRENDING_DISCUSSIONS);
}

// ─── Latest Discussions ───────────────────────────────────────────────────────

export async function getLatestDiscussions(category?: string | null): Promise<Discussion[]> {
  if (category && category !== "all") {
    const filtered = MOCK_LATEST_DISCUSSIONS.filter(
      (d) => d.category.slug === category
    );
    return Promise.resolve(filtered);
  }
  return Promise.resolve(MOCK_LATEST_DISCUSSIONS);
}

// ─── Solved Discussions ───────────────────────────────────────────────────────

export async function getSolvedDiscussions(): Promise<Discussion[]> {
  return Promise.resolve(MOCK_SOLVED_DISCUSSIONS);
}

// ─── Top Contributors ─────────────────────────────────────────────────────────

export async function getTopContributors(): Promise<Contributor[]> {
  return Promise.resolve(MOCK_CONTRIBUTORS);
}

// ─── Trending Tags ────────────────────────────────────────────────────────────

export async function getTrendingTags(): Promise<TrendingTag[]> {
  return Promise.resolve(MOCK_TRENDING_TAGS);
}

// ─── Popular Cities ───────────────────────────────────────────────────────────

export async function getPopularCities(): Promise<PopularCity[]> {
  return Promise.resolve(MOCK_POPULAR_CITIES);
}

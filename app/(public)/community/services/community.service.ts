/**
 * Community Service — business logic layer.
 * All hooks communicate through this service, never directly to API.
 */

import {
  getCategories,
  getFeaturedDiscussion,
  getTrendingDiscussions,
  getLatestDiscussions,
  getSolvedDiscussions,
  getTopContributors,
  getTrendingTags,
  getPopularCities,
} from "../api";
import type { Discussion, CommunityCategory, Contributor, TrendingTag, PopularCity } from "../types";

export const communityService = {
  /** Fetch all community categories */
  async fetchCategories(): Promise<CommunityCategory[]> {
    return getCategories();
  },

  /** Fetch the featured/pinned discussion */
  async fetchFeaturedDiscussion(): Promise<Discussion> {
    return getFeaturedDiscussion();
  },

  /** Fetch trending discussions */
  async fetchTrendingDiscussions(): Promise<Discussion[]> {
    return getTrendingDiscussions();
  },

  /** Fetch latest discussions, optionally filtered by category */
  async fetchLatestDiscussions(category?: string | null): Promise<Discussion[]> {
    return getLatestDiscussions(category);
  },

  /** Fetch solved/answered discussions */
  async fetchSolvedDiscussions(): Promise<Discussion[]> {
    return getSolvedDiscussions();
  },

  /** Fetch top contributors */
  async fetchTopContributors(): Promise<Contributor[]> {
    return getTopContributors();
  },

  /** Fetch trending tags */
  async fetchTrendingTags(): Promise<TrendingTag[]> {
    return getTrendingTags();
  },

  /** Fetch popular cities */
  async fetchPopularCities(): Promise<PopularCity[]> {
    return getPopularCities();
  },
};

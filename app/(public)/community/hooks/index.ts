"use client";

import { useQuery } from "@tanstack/react-query";
import { communityService } from "../services/community.service";

// ─── useCategories ────────────────────────────────────────────────────────────

export function useCategories() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["community", "categories"],
    queryFn: () => communityService.fetchCategories(),
    staleTime: 5 * 60 * 1000,
  });

  return { data: data ?? [], isLoading, error, refetch };
}

// ─── useFeaturedDiscussion ────────────────────────────────────────────────────

export function useFeaturedDiscussion() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["community", "featured"],
    queryFn: () => communityService.fetchFeaturedDiscussion(),
    staleTime: 5 * 60 * 1000,
  });

  return { data: data ?? null, isLoading, error, refetch };
}

// ─── useTrendingDiscussions ───────────────────────────────────────────────────

export function useTrendingDiscussions() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["community", "trending"],
    queryFn: () => communityService.fetchTrendingDiscussions(),
    staleTime: 2 * 60 * 1000,
  });

  return { data: data ?? [], isLoading, error, refetch };
}

// ─── useLatestDiscussions ─────────────────────────────────────────────────────

export function useLatestDiscussions(category?: string | null) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["community", "latest", category],
    queryFn: () => communityService.fetchLatestDiscussions(category),
    staleTime: 1 * 60 * 1000,
  });

  return { data: data ?? [], isLoading, error, refetch };
}

// ─── useSolvedDiscussions ─────────────────────────────────────────────────────

export function useSolvedDiscussions() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["community", "solved"],
    queryFn: () => communityService.fetchSolvedDiscussions(),
    staleTime: 5 * 60 * 1000,
  });

  return { data: data ?? [], isLoading, error, refetch };
}

// ─── useTopContributors ───────────────────────────────────────────────────────

export function useTopContributors() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["community", "contributors"],
    queryFn: () => communityService.fetchTopContributors(),
    staleTime: 10 * 60 * 1000,
  });

  return { data: data ?? [], isLoading, error, refetch };
}

// ─── useTrendingTags ──────────────────────────────────────────────────────────

export function useTrendingTags() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["community", "tags"],
    queryFn: () => communityService.fetchTrendingTags(),
    staleTime: 10 * 60 * 1000,
  });

  return { data: data ?? [], isLoading, error, refetch };
}

// ─── usePopularCities ─────────────────────────────────────────────────────────

export function usePopularCities() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["community", "cities"],
    queryFn: () => communityService.fetchPopularCities(),
    staleTime: 10 * 60 * 1000,
  });

  return { data: data ?? [], isLoading, error, refetch };
}

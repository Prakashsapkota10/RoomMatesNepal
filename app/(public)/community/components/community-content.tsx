"use client";

import { useState } from "react";
import { TrendingUp, MessageSquare } from "lucide-react";
import { CommunityHero } from "./community-hero";
import { CommunityStats } from "./community-stats";
import { CategoryList } from "./category-list";
import { FeaturedDiscussionCard } from "./featured-discussion-card";
import { TrendingDiscussionCard } from "./trending-discussion-card";
import { DiscussionCard } from "./discussion-card";
import { Sidebar } from "./sidebar";
import { EmptyState } from "./empty-state";
import { ErrorState } from "./error-state";
import {
  HeroSkeleton,
  CategorySkeleton,
  FeaturedDiscussionSkeleton,
  TrendingCardSkeleton,
  DiscussionCardSkeleton,
} from "./skeletons";
import {
  useCategories,
  useFeaturedDiscussion,
  useTrendingDiscussions,
  useLatestDiscussions,
  useSolvedDiscussions,
  useTopContributors,
  useTrendingTags,
  usePopularCities,
} from "../hooks";
import { COMMUNITY_STATS, COMMUNITY_GUIDELINES, EMPTY_MESSAGES } from "../constants";

export function CommunityContent() {
  const [searchValue, setSearchValue] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  // Data hooks
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const { data: featured, isLoading: featuredLoading, error: featuredError } = useFeaturedDiscussion();
  const { data: trending, isLoading: trendingLoading, error: trendingError, refetch: refetchTrending } = useTrendingDiscussions();
  const { data: latest, isLoading: latestLoading, error: latestError, refetch: refetchLatest } = useLatestDiscussions(activeCategory);
  const { data: solved, isLoading: solvedLoading } = useSolvedDiscussions();
  const { data: contributors, isLoading: contributorsLoading } = useTopContributors();
  const { data: tags, isLoading: tagsLoading } = useTrendingTags();
  const { data: cities, isLoading: citiesLoading } = usePopularCities();

  const sidebarLoading = contributorsLoading || tagsLoading || citiesLoading;

  return (
    <div className="flex flex-col">
      {/* Hero */}
      {categoriesLoading ? (
        <HeroSkeleton />
      ) : (
        <CommunityHero onSearch={setSearchValue} searchValue={searchValue} />
      )}

      {/* Main Content */}
      <section className="py-8 lg:py-10">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Stats */}
          <div className="mb-8">
            <CommunityStats stats={COMMUNITY_STATS} />
          </div>

          {/* Category chips */}
          <div className="mb-8">
            {categoriesLoading ? (
              <CategorySkeleton />
            ) : (
              <CategoryList
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />
            )}
          </div>

          {/* Featured Discussion */}
          <div className="mb-10">
            {featuredLoading ? (
              <FeaturedDiscussionSkeleton />
            ) : featuredError ? (
              <ErrorState title="Could not load featured discussion" />
            ) : featured ? (
              <FeaturedDiscussionCard discussion={featured} />
            ) : null}
          </div>

          {/* Two-column layout: Main + Sidebar */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main column */}
            <div className="flex-1 min-w-0 flex flex-col gap-10">
              {/* Trending Now */}
              <div>
                <h2 className="flex items-center gap-2 text-lg font-bold mb-4">
                  <TrendingUp className="h-5 w-5 text-red-500" />
                  Trending Now
                </h2>
                {trendingLoading ? (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {Array.from({ length: 2 }).map((_, i) => (
                      <TrendingCardSkeleton key={i} />
                    ))}
                  </div>
                ) : trendingError ? (
                  <ErrorState onRetry={() => refetchTrending()} />
                ) : trending.length === 0 ? (
                  <EmptyState {...EMPTY_MESSAGES.discussions} />
                ) : (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {trending.map((d) => (
                      <TrendingDiscussionCard key={d.id} discussion={d} />
                    ))}
                  </div>
                )}
              </div>

              {/* Latest Discussions */}
              <div>
                <h2 className="flex items-center gap-2 text-lg font-bold mb-4">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Latest Discussions
                </h2>
                {latestLoading ? (
                  <div className="flex flex-col gap-3">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <DiscussionCardSkeleton key={i} />
                    ))}
                  </div>
                ) : latestError ? (
                  <ErrorState onRetry={() => refetchLatest()} />
                ) : latest.length === 0 ? (
                  <EmptyState {...EMPTY_MESSAGES.discussions} />
                ) : (
                  <div className="flex flex-col gap-3">
                    {latest.map((d) => (
                      <DiscussionCard key={d.id} discussion={d} />
                    ))}
                  </div>
                )}
              </div>

              {/* Solved Discussions */}
              {!solvedLoading && solved.length > 0 && (
                <div>
                  <div className="flex flex-col gap-3">
                    {solved.map((d) => (
                      <DiscussionCard key={d.id} discussion={d} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:w-80 shrink-0">
              <Sidebar
                contributors={contributors}
                tags={tags}
                cities={cities}
                guidelines={COMMUNITY_GUIDELINES}
                isLoading={sidebarLoading}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

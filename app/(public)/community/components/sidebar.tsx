"use client";

import { AIAssistantCard } from "./ai-assistant-card";
import { TopContributors } from "./top-contributors";
import { TrendingTags } from "./trending-tags";
import { PopularCities } from "./popular-cities";
import { CommunityGuidelines } from "./community-guidelines";
import { SidebarSkeleton } from "./skeletons";
import type { Contributor, TrendingTag, PopularCity, CommunityGuideline } from "../types";

interface SidebarProps {
  contributors: Contributor[];
  tags: TrendingTag[];
  cities: PopularCity[];
  guidelines: CommunityGuideline[];
  isLoading: boolean;
}

export function Sidebar({ contributors, tags, cities, guidelines, isLoading }: SidebarProps) {
  if (isLoading) return <SidebarSkeleton />;

  return (
    <aside className="flex flex-col gap-5">
      <AIAssistantCard />
      <TopContributors contributors={contributors} />
      <TrendingTags tags={tags} />
      <PopularCities cities={cities} />
      <CommunityGuidelines guidelines={guidelines} />
    </aside>
  );
}

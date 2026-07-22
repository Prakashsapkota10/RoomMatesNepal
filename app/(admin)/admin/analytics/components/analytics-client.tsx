"use client";

import { Download, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnalyticsStatsRow } from "./analytics-stats-row";
import { UserGrowthTrendsChart } from "./user-growth-trends-chart";
import { EngagementSourceChart } from "./engagement-source-chart";
import { TopLocationsCard } from "./top-locations-card";
import { ModerationPerformanceCard } from "./moderation-performance-card";
import {
  USER_GROWTH_DATA,
  ENGAGEMENT_SOURCE_DATA,
  TOP_LOCATIONS,
  MODERATION_MINI_STATS,
} from "./mock-analytics";

/**
 * Client shell for /admin/analytics — stat cards, User Growth Trends bar
 * chart, Engagement Source donut, Top Locations ranking, and Moderation
 * Performance (mini stats + efficiency scatter chart).
 * All chart data below is mock — TODO: replace with real analytics queries.
 */
export function AnalyticsClient() {
  return (
    <div className="flex flex-col gap-6 page-enter">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">System Analytics</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Real-time platform performance and growth metrics.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Button variant="outline" size="sm" className="btn-secondary-motion gap-1.5 font-medium">
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Filter Range
          </Button>
          <Button size="sm" className="btn-primary-motion gap-1.5 font-semibold">
            <Download className="h-3.5 w-3.5" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Stat cards */}
      <AnalyticsStatsRow />

      {/* User Growth Trends + Engagement Source */}
      <div className="grid lg:grid-cols-[1fr_320px] gap-5">
        <UserGrowthTrendsChart data={USER_GROWTH_DATA} />
        <EngagementSourceChart data={ENGAGEMENT_SOURCE_DATA} />
      </div>

      {/* Top Locations + Moderation Performance */}
      <div className="grid lg:grid-cols-[320px_1fr] gap-5">
        <TopLocationsCard data={TOP_LOCATIONS} />
        <ModerationPerformanceCard
          slaCompliance={98.2}
          miniStats={MODERATION_MINI_STATS}
        />
      </div>
    </div>
  );
}

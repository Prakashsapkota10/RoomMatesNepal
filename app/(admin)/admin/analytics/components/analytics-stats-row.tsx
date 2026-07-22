"use client";

import { StatCard, type StatCardData } from "../../components";
import { SYSTEM_STATS } from "./mock-analytics";

/**
 * Top-level platform stat cards for System Analytics — reuses the same
 * StatCard used on the main admin dashboard for visual consistency.
 * TODO: Replace with real aggregates, e.g. await analyticsService.getSummary()
 */
const ICONS: Record<string, { icon: string; iconColor: string; iconBg: string; sparklineColor: string }> = {
  "Total Users": {
    icon: "Users",
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
    sparklineColor: "var(--color-chart-1)",
  },
  "Active Listings": {
    icon: "Building2",
    iconColor: "text-ai-dark",
    iconBg: "bg-ai-light",
    sparklineColor: "var(--color-chart-2)",
  },
  "Community Posts": {
    icon: "MessageSquare",
    iconColor: "text-community",
    iconBg: "bg-community-light",
    sparklineColor: "var(--color-chart-5)",
  },
  "Avg. Resolution": {
    icon: "Timer",
    iconColor: "text-muted-foreground",
    iconBg: "bg-muted",
    sparklineColor: "var(--color-chart-4)",
  },
};

const STATS: StatCardData[] = SYSTEM_STATS.map((stat) => ({
  label: stat.label,
  value: stat.value,
  trend: stat.trend,
  sparkline: [4, 5, 5, 6, 7, 7, 8, 9, 10],
  ...ICONS[stat.label],
}));

export function AnalyticsStatsRow() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {STATS.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
}

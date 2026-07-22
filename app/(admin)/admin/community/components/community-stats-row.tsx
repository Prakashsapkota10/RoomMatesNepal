"use client";

import { StatCard, type StatCardData } from "../../components";

/**
 * Quick summary stats for the Community Management page — reuses the same
 * StatCard used on the main admin dashboard for visual consistency.
 * TODO: Replace with real aggregates, e.g. await db.communityPost.count({ where: ... })
 */
const COMMUNITY_STATS: StatCardData[] = [
  {
    label: "Total Active Posts",
    value: "1,284",
    icon: "MessageSquare",
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
    trend: 12,
    sparkline: [8, 9, 10, 10, 11, 12, 13, 14, 15],
    sparklineColor: "var(--color-chart-1)",
  },
  {
    label: "Pending Reports",
    value: "14",
    icon: "AlertCircle",
    iconColor: "text-destructive",
    iconBg: "bg-destructive/10",
    trend: 2,
    sparkline: [10, 11, 10, 12, 11, 13, 12, 13, 14],
    sparklineColor: "var(--color-error)",
  },
  {
    label: "Contributors",
    value: "452",
    icon: "Users",
    iconColor: "text-[color:var(--community-dark)]",
    iconBg: "bg-[color:var(--community-light)]",
    trend: 8,
    sparkline: [30, 32, 34, 36, 38, 40, 43, 47, 50],
    sparklineColor: "var(--color-chart-5)",
  },
  {
    label: "Engagement Rate",
    value: "64.2%",
    icon: "TrendingUp",
    iconColor: "text-[color:var(--trust)]",
    iconBg: "bg-[color:var(--trust-light)]",
    trend: 5,
    sparkline: [50, 52, 55, 54, 58, 60, 61, 63, 64],
    sparklineColor: "var(--color-chart-2)",
  },
];

export function CommunityStatsRow() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {COMMUNITY_STATS.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
}

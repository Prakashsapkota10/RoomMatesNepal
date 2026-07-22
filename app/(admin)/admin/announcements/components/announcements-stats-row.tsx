"use client";

import { StatCard, type StatCardData } from "../../components";

/**
 * Quick summary stats for the Announcements page — reuses the same
 * StatCard used elsewhere in the admin panel for visual consistency.
 * TODO: Replace with real aggregates, e.g. await db.announcement.count({ where: ... })
 */
const ANNOUNCEMENT_STATS: StatCardData[] = [
  {
    label: "Active Announcements",
    value: "3",
    icon: "Megaphone",
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
    trend: 1,
    sparkline: [2, 2, 3, 2, 3, 3, 4, 3, 3],
    sparklineColor: "var(--color-chart-1)",
  },
  {
    label: "Scheduled",
    value: "1",
    icon: "CalendarClock",
    iconColor: "text-[color:var(--trust)]",
    iconBg: "bg-[color:var(--trust-light)]",
    trend: 0,
    sparkline: [1, 1, 0, 1, 1, 1, 0, 1, 1],
    sparklineColor: "var(--color-chart-2)",
  },
  {
    label: "Total Views (30d)",
    value: "25.6k",
    icon: "Eye",
    iconColor: "text-[color:var(--community-dark)]",
    iconBg: "bg-[color:var(--community-light)]",
    trend: 18,
    sparkline: [10, 12, 14, 15, 18, 20, 22, 24, 26],
    sparklineColor: "var(--color-chart-5)",
  },
  {
    label: "Avg. Acknowledgment",
    value: "76%",
    icon: "CheckCheck",
    iconColor: "text-[color:var(--success-dark)]",
    iconBg: "bg-[color:var(--success-light)]",
    trend: 5,
    sparkline: [60, 63, 65, 68, 70, 72, 74, 75, 76],
    sparklineColor: "var(--color-chart-4)",
  },
];

export function AnnouncementsStatsRow() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {ANNOUNCEMENT_STATS.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
}

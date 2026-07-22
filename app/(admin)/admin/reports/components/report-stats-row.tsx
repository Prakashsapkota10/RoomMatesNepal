"use client";

import { StatCard, type StatCardData } from "../../components";

/**
 * Quick summary stats for the Report Management page — reuses the same
 * StatCard used on the main admin dashboard for visual consistency.
 * TODO: Replace with real aggregates, e.g. await db.report.count({ where: ... })
 */
const REPORT_STATS: StatCardData[] = [
  {
    label: "Pending Reports",
    value: "148",
    icon: "AlertTriangle",
    iconColor: "text-destructive",
    iconBg: "bg-destructive/10",
    trend: 12,
    sparkline: [8, 9, 10, 9, 11, 12, 13, 14, 15],
    sparklineColor: "var(--color-error)",
  },
  {
    label: "Under Review",
    value: "24",
    icon: "Eye",
    iconColor: "text-[color:var(--community-dark)]",
    iconBg: "bg-[color:var(--community-light)]",
    trend: 3,
    sparkline: [5, 6, 5, 6, 7, 6, 7, 8, 8],
    sparklineColor: "var(--color-chart-5)",
  },
  {
    label: "Resolved (30d)",
    value: "1,204",
    icon: "ShieldCheck",
    iconColor: "text-[color:var(--trust)]",
    iconBg: "bg-[color:var(--trust-light)]",
    trend: 65,
    sparkline: [40, 45, 50, 55, 58, 62, 65, 70, 72],
    sparklineColor: "var(--color-chart-2)",
  },
  {
    label: "Avg. Resolve Time",
    value: "4.2h",
    icon: "Timer",
    iconColor: "text-muted-foreground",
    iconBg: "bg-muted",
    trend: -8,
    sparkline: [7, 6.5, 6, 5.5, 5, 4.8, 4.5, 4.3, 4.2],
    sparklineColor: "var(--color-chart-4)",
  },
];

export function ReportStatsRow() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {REPORT_STATS.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
}

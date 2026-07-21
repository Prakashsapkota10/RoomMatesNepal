"use client";

import { StatCard, type StatCardData } from "../../components";

/**
 * Quick summary stats for the User Management page — reuses the same
 * StatCard used on the main admin dashboard for visual consistency.
 * TODO: Replace with real aggregates, e.g. await db.user.count({ where: ... })
 */
const USER_STATS: StatCardData[] = [
  {
    label: "Total Users",
    value: "1,240",
    icon: "Users",
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
    trend: 6,
    sparkline: [8, 9, 8, 10, 11, 10, 12, 13, 14],
    sparklineColor: "var(--color-chart-1)",
  },
  {
    label: "Verified Users",
    value: "980",
    icon: "ShieldCheck",
    iconColor: "text-[color:var(--trust)]",
    iconBg: "bg-[color:var(--trust-light)]",
    trend: 4,
    sparkline: [6, 7, 7, 8, 8, 9, 9, 10, 11],
    sparklineColor: "var(--color-chart-2)",
  },
  {
    label: "Pending Verification",
    value: "156",
    icon: "Clock",
    iconColor: "text-[color:var(--warning-dark)]",
    iconBg: "bg-[color:var(--warning-light)]",
    trend: -3,
    sparkline: [10, 9, 9, 8, 8, 7, 7, 6, 6],
    sparklineColor: "var(--color-error)",
  },
  {
    label: "Suspended Accounts",
    value: "24",
    icon: "ShieldOff",
    iconColor: "text-destructive",
    iconBg: "bg-destructive/10",
    trend: -8,
    sparkline: [5, 5, 4, 4, 3, 3, 3, 2, 2],
    sparklineColor: "var(--color-chart-4)",
  },
];

export function UserStatsRow() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {USER_STATS.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
}

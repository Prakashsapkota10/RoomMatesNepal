"use client";

import { StatCard, type StatCardData } from "../../components";

/**
 * Four KPI cards for /admin/subscriptions — business + operational
 * summary, not a card per plan (see PlanBreakdown for the per-plan view).
 * TODO: Replace with real aggregates, e.g.
 *   await db.subscription.count({ where: { status: "active" } })
 */
const SUBSCRIPTION_STATS: StatCardData[] = [
  {
    label: "Active Subscriptions",
    value: "1,285",
    icon: "Users",
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
    trend: 12,
    sparkline: [980, 1040, 1085, 1140, 1195, 1240, 1285],
    sparklineColor: "var(--color-chart-1)",
  },
  {
    label: "Monthly Recurring Revenue",
    value: "NPR 4.2M",
    icon: "TrendingUp",
    iconColor: "text-[color:var(--success-dark)]",
    iconBg: "bg-[color:var(--success-light)]",
    trend: 5.4,
    sparkline: [3120, 3340, 3510, 3680, 3920, 4050, 4200],
    sparklineColor: "var(--color-chart-3)",
  },
  {
    label: "Expiring Soon",
    value: "48",
    icon: "Clock",
    iconColor: "text-[color:var(--warning-dark)]",
    iconBg: "bg-[color:var(--warning-light)]",
    trend: 8,
    sparkline: [30, 34, 38, 40, 43, 46, 48],
    sparklineColor: "var(--color-chart-4)",
  },
  {
    label: "Churn Rate",
    value: "2.1%",
    icon: "TrendingDown",
    iconColor: "text-destructive",
    iconBg: "bg-destructive/10",
    trend: -0.4,
    sparkline: [2.8, 2.6, 2.5, 2.4, 2.3, 2.2, 2.1],
    sparklineColor: "var(--color-error)",
  },
];

interface SubscriptionSummaryCardsProps {
  onExpiringSoonClick?: () => void;
}

export function SubscriptionSummaryCards({ onExpiringSoonClick }: SubscriptionSummaryCardsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {SUBSCRIPTION_STATS.map((stat) =>
        stat.label === "Expiring Soon" && onExpiringSoonClick ? (
          <button
            key={stat.label}
            type="button"
            onClick={onExpiringSoonClick}
            className="text-left rounded-xl focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
            aria-label="Filter subscriptions expiring in the next 30 days"
          >
            <StatCard {...stat} />
          </button>
        ) : (
          <StatCard key={stat.label} {...stat} />
        )
      )}
    </div>
  );
}

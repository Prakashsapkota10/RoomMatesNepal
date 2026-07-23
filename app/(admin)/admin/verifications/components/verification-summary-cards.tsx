"use client";

import { StatCard, type StatCardData } from "../../components";

/**
 * Four KPI cards for /admin/verifications. Metrics focus on account/trust
 * signals rather than document-processing throughput, matching the
 * platform's "no biometrics, no gov docs" verification strategy.
 * TODO: Replace with real aggregates, e.g.
 *   await db.verification.count({ where: { status: "pending" } })
 */
const VERIFICATION_STATS: StatCardData[] = [
  {
    label: "Pending Reviews",
    value: "48",
    icon: "Clock",
    iconColor: "text-[color:var(--warning-dark)]",
    iconBg: "bg-[color:var(--warning-light)]",
    trend: 8,
    sparkline: [30, 34, 32, 38, 40, 42, 44, 46, 48],
    sparklineColor: "var(--color-chart-4)",
  },
  {
    label: "Verified Users",
    value: "12,480",
    icon: "ShieldCheck",
    iconColor: "text-[color:var(--success-dark)]",
    iconBg: "bg-[color:var(--success-light)]",
    trend: 4,
    sparkline: [80, 82, 84, 85, 87, 89, 90, 92, 94],
    sparklineColor: "var(--color-chart-3)",
  },
  {
    label: "Needs Attention",
    value: "12",
    icon: "AlertTriangle",
    iconColor: "text-destructive",
    iconBg: "bg-destructive/10",
    trend: -3,
    sparkline: [18, 17, 16, 15, 14, 13, 13, 12, 12],
    sparklineColor: "var(--color-error)",
  },
  {
    label: "Verified Today",
    value: "124",
    icon: "CheckCircle2",
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
    trend: 12,
    sparkline: [60, 70, 75, 80, 90, 100, 110, 118, 124],
    sparklineColor: "var(--color-chart-1)",
  },
];

export function VerificationSummaryCards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {VERIFICATION_STATS.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
}

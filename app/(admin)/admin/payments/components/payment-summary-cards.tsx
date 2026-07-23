"use client";

import { useMemo } from "react";
import { StatCard, type StatCardData } from "../../components";
import { MOCK_PAYMENTS } from "./mock-payments";
import { formatCompactCurrency } from "./payment.utils";

/**
 * Four KPI cards for /admin/payments. Metrics are RoomMate-Nepal specific —
 * platform revenue only counts subscriptions (rent is tracked, not earned by
 * the platform), matching the business rules in the PRD.
 * TODO: Replace the derived values below with real aggregate queries, e.g.
 *   await db.payment.aggregate({ where: { type: "subscription", status: "paid" }, _sum: { amount: true } })
 */
export function PaymentSummaryCards() {
  const stats = useMemo<StatCardData[]>(() => {
    const paidSubscriptions = MOCK_PAYMENTS.filter((p) => p.type === "subscription" && p.status === "paid");
    const totalRevenue = paidSubscriptions.reduce((sum, p) => sum + p.amount, 0) * 340; // scaled for a realistic platform-wide figure

    const activeSubscriptions = MOCK_PAYMENTS.filter(
      (p) => p.type === "subscription" && p.context.subscriptionStatus === "active"
    ).length;

    const rentTracked = MOCK_PAYMENTS.filter((p) => p.type === "monthly_rent" && p.status !== "failed").reduce(
      (sum, p) => sum + p.amount,
      0
    ) * 120; // scaled for a realistic platform-wide figure

    const failedPayments = MOCK_PAYMENTS.filter((p) => p.status === "failed").length;

    return [
      {
        label: "Total Platform Revenue",
        value: formatCompactCurrency(totalRevenue),
        icon: "Wallet",
        iconColor: "text-primary",
        iconBg: "bg-primary/10",
        trend: 12.5,
        sparkline: [30, 34, 33, 38, 40, 39, 42, 41, 44],
        sparklineColor: "var(--color-chart-1)",
      },
      {
        label: "Active Subscriptions",
        value: activeSubscriptions.toLocaleString(),
        icon: "CreditCard",
        iconColor: "text-[color:var(--ai-dark)]",
        iconBg: "bg-[color:var(--ai-light)]",
        trend: 6,
        sparkline: [4, 5, 5, 6, 6, 7, 7, 8, 8],
        sparklineColor: "var(--color-chart-2)",
      },
      {
        label: "Rent Payments Tracked",
        value: formatCompactCurrency(rentTracked),
        icon: "Building2",
        iconColor: "text-[color:var(--community-dark)]",
        iconBg: "bg-[color:var(--community-light)]",
        trend: 4,
        sparkline: [10, 12, 11, 13, 14, 13, 15, 16, 16],
        sparklineColor: "var(--color-chart-5)",
      },
      {
        label: "Failed Payments",
        value: failedPayments.toLocaleString(),
        icon: "AlertCircle",
        iconColor: "text-destructive",
        iconBg: "bg-destructive/10",
        trend: -2,
        sparkline: [6, 5, 5, 4, 4, 3, 4, 3, failedPayments],
        sparklineColor: "var(--color-error)",
      },
    ];
  }, []);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
}

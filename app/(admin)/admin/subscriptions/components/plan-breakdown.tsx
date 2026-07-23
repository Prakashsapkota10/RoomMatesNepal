"use client";

import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PLAN_CATALOG } from "./constants";
import { formatCurrency } from "./subscription.utils";
import type { SubscriptionRow } from "./types";

interface PlanBreakdownProps {
  subscriptions: SubscriptionRow[];
}

/**
 * Per-plan distribution — deliberately separate from the KPI cards (which
 * summarize business/operational health, not per-plan counts). Only shows
 * plans that actually exist in PLAN_CATALOG, so adding a future plan here
 * requires no changes to this component.
 */
export function PlanBreakdown({ subscriptions }: PlanBreakdownProps) {
  const rows = useMemo(() => {
    return Object.values(PLAN_CATALOG).map((plan) => {
      const planSubs = subscriptions.filter((s) => s.planId === plan.id && s.status === "active");
      const mrr = planSubs.reduce((sum, s) => {
        // Normalize to a monthly figure for a fair cross-plan comparison.
        const monthly =
          s.billingCycle === "monthly" ? s.recurringAmount : s.billingCycle === "quarterly" ? s.recurringAmount / 3 : s.recurringAmount / 12;
        return sum + monthly;
      }, 0);
      return { plan, count: planSubs.length, mrr };
    });
  }, [subscriptions]);

  const maxCount = Math.max(1, ...rows.map((r) => r.count));

  return (
    <Card>
      <CardContent className="p-5 flex flex-col gap-4">
        <h3 className="text-sm font-bold text-foreground">Plan Breakdown</h3>
        <div className="flex flex-col gap-3">
          {rows.map(({ plan, count, mrr }) => (
            <div key={plan.id} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground">{plan.name}</p>
                  <p className="text-[11px] text-muted-foreground">{count.toLocaleString()} active subscriptions</p>
                </div>
                <p className="text-xs text-muted-foreground shrink-0">{formatCurrency(mrr)} MRR</p>
              </div>
              <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${(count / maxCount) * 100}%` }}
                />
              </div>
            </div>
          ))}
          <p className="text-[11px] text-muted-foreground pt-1 border-t">
            Free-tier users are not included — this view only covers paid subscription plans.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

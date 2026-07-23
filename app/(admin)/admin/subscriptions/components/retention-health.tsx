"use client";

import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { isExpiringWithin } from "./subscription.utils";
import type { SubscriptionRow } from "./types";

interface RetentionHealthProps {
  subscriptions: SubscriptionRow[];
}

function healthLabel(renewalRate: number): { label: string; tone: "success" | "warning" | "error" } {
  if (renewalRate >= 90) return { label: "Excellent", tone: "success" };
  if (renewalRate >= 75) return { label: "Healthy", tone: "warning" };
  return { label: "Needs Attention", tone: "error" };
}

/**
 * Compact retention section — renewal rate, churn rate, and expiring-soon
 * count derived from the current subscription set, with a plain-language
 * health label (never a fabricated causal explanation).
 */
export function RetentionHealth({ subscriptions }: RetentionHealthProps) {
  const stats = useMemo(() => {
    const total = subscriptions.length;
    const cancelledOrExpired = subscriptions.filter((s) => s.status === "cancelled" || s.status === "expired").length;
    const active = subscriptions.filter((s) => s.status === "active").length;
    const renewalRate = total > 0 ? (active / total) * 100 : 0;
    const churnRate = total > 0 ? (cancelledOrExpired / total) * 100 : 0;
    const expiringSoon = subscriptions.filter((s) => isExpiringWithin(s, 30)).length;
    return { renewalRate, churnRate, expiringSoon };
  }, [subscriptions]);

  const health = healthLabel(stats.renewalRate);
  const toneClass =
    health.tone === "success"
      ? "bg-[color:var(--success-light)] text-[color:var(--success-dark)]"
      : health.tone === "warning"
      ? "bg-[color:var(--warning-light)] text-[color:var(--warning-dark)]"
      : "bg-[color:var(--error-light)] text-[color:var(--error-dark)]";

  return (
    <Card>
      <CardContent className="p-5 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-foreground">Retention Health</h3>
          <span className={`text-[10px] font-semibold uppercase tracking-wide rounded-full px-2 py-0.5 ${toneClass}`}>
            {health.label}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <p className="text-lg font-bold text-foreground">{stats.renewalRate.toFixed(1)}%</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">Renewal Rate</p>
          </div>
          <div>
            <p className="text-lg font-bold text-destructive">{stats.churnRate.toFixed(1)}%</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">Churn Rate</p>
          </div>
          <div>
            <p className="text-lg font-bold text-[color:var(--warning-dark)]">{stats.expiringSoon}</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">Expiring Next 30 Days</p>
          </div>
        </div>

        <p className="text-[11px] text-muted-foreground border-t pt-3">
          Retention is calculated from the current subscription set shown below.
        </p>
      </CardContent>
    </Card>
  );
}

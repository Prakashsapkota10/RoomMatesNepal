"use client";

import { useMemo } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { VERIFICATION_STATUS_LABELS } from "./constants";
import { formatVerificationDateTime } from "./verification.utils";
import type { VerificationRow, VerificationStatus } from "./types";

interface VerificationOverviewProps {
  verifications: VerificationRow[];
}

const STATUS_COLORS: Record<VerificationStatus, string> = {
  verified: "var(--color-chart-3)",
  pending: "var(--color-chart-4)",
  under_review: "var(--color-chart-2)",
  needs_attention: "var(--color-warning)",
  rejected: "var(--color-error)",
  suspended: "var(--muted-foreground)",
  not_started: "var(--muted)",
};

const TRUST_BUCKETS = [
  { label: "High Trust (81–100)", min: 81, max: 100, color: "var(--color-chart-3)" },
  { label: "Medium Trust (41–80)", min: 41, max: 80, color: "var(--color-chart-4)" },
  { label: "Low Trust (0–40)", min: 0, max: 40, color: "var(--color-error)" },
];

/**
 * Overview tab content — verification status distribution (donut),
 * trust score distribution (simple bars), and a compact recent activity
 * feed derived from each case's most recent history step. Kept intentionally
 * light — this is a summary view, not a full analytics dashboard.
 */
export function VerificationOverview({ verifications }: VerificationOverviewProps) {
  const statusData = useMemo(() => {
    const counts = new Map<VerificationStatus, number>();
    for (const v of verifications) {
      counts.set(v.status, (counts.get(v.status) ?? 0) + 1);
    }
    return Array.from(counts.entries())
      .filter(([, count]) => count > 0)
      .map(([status, count]) => ({
        name: VERIFICATION_STATUS_LABELS[status],
        value: count,
        color: STATUS_COLORS[status],
      }));
  }, [verifications]);

  const trustBuckets = useMemo(() => {
    return TRUST_BUCKETS.map((bucket) => ({
      ...bucket,
      count: verifications.filter((v) => v.trustScore >= bucket.min && v.trustScore <= bucket.max).length,
    }));
  }, [verifications]);

  const maxBucketCount = Math.max(1, ...trustBuckets.map((b) => b.count));

  const recentActivity = useMemo(() => {
    return verifications
      .map((v) => {
        const lastStep = v.history[v.history.length - 1];
        return lastStep ? { verification: v, step: lastStep } : null;
      })
      .filter((entry): entry is { verification: VerificationRow; step: (typeof verifications)[number]["history"][number] } => !!entry)
      .sort((a, b) => new Date(b.step.timestamp).getTime() - new Date(a.step.timestamp).getTime())
      .slice(0, 5);
  }, [verifications]);

  const totalStatusCount = statusData.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="grid lg:grid-cols-[1fr_1fr_1.2fr] gap-4">
      {/* Verification Status Distribution */}
      <Card>
        <CardContent className="p-5 flex flex-col h-full">
          <h3 className="text-sm font-bold text-foreground mb-4">Verification Status Distribution</h3>
          <div className="relative flex-1 min-h-36">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={statusData} dataKey="value" nameKey="name" innerRadius="62%" outerRadius="98%" paddingAngle={2} stroke="none">
                  {statusData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xl font-bold text-foreground">{totalStatusCount}</span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Cases</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-1.5 mt-3 justify-center">
            {statusData.map((s) => (
              <span key={s.name} className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                {s.name} ({s.value})
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Trust Score Distribution */}
      <Card>
        <CardContent className="p-5 flex flex-col gap-3">
          <h3 className="text-sm font-bold text-foreground mb-1">Trust Score Distribution</h3>
          {trustBuckets.map((bucket) => (
            <div key={bucket.label} className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-foreground font-medium">{bucket.label}</span>
                <span className="text-muted-foreground">{bucket.count}</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${(bucket.count / maxBucketCount) * 100}%`, backgroundColor: bucket.color }}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recent Verification Activity */}
      <Card>
        <CardContent className="p-5">
          <h3 className="text-sm font-bold text-foreground mb-3">Recent Verification Activity</h3>
          <div className="flex flex-col">
            {recentActivity.length === 0 && (
              <p className="text-xs text-muted-foreground py-4 text-center">No recent activity.</p>
            )}
            {recentActivity.map((entry, index) => (
              <div key={`${entry.verification.id}-${index}`} className="flex gap-3 relative">
                <div className="flex flex-col items-center">
                  <span className="h-2 w-2 rounded-full shrink-0 mt-1 bg-primary" />
                  {index < recentActivity.length - 1 && <span className="w-px flex-1 bg-border my-1" />}
                </div>
                <div className="pb-3.5 min-w-0">
                  <p className="text-sm text-foreground leading-snug">
                    <strong>{entry.verification.userName}</strong> — {entry.step.label.toLowerCase()}
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    {formatVerificationDateTime(entry.step.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

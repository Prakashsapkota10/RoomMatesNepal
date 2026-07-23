"use client";

import { useMemo, useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MRR_RANGE_OPTIONS } from "./constants";
import { MOCK_MRR_TREND, MOCK_MRR_TREND_12M } from "./mock-subscriptions";
import { formatCompactCurrency, formatCurrency } from "./subscription.utils";
import type { MrrPoint, MrrRange } from "./types";

function MrrTooltip({ active, payload }: { active?: boolean; payload?: { payload: MrrPoint }[] }) {
  if (!active || !payload?.length) return null;
  const point = payload[0].payload;
  return (
    <div className="rounded-lg bg-popover border p-2.5 shadow-md text-xs">
      <p className="font-semibold text-foreground">{point.month}</p>
      <p className="text-muted-foreground mt-1">
        MRR: <span className="text-foreground font-medium">{formatCurrency(point.mrr)}</span>
      </p>
      <p className="text-muted-foreground">
        Active Subscriptions: <span className="text-foreground font-medium">{point.activeSubscriptions.toLocaleString()}</span>
      </p>
    </div>
  );
}

/**
 * Monthly Recurring Revenue analytics — current MRR, period-over-period
 * change, and an interactive trend chart with a date-range selector.
 * TODO: replace MOCK_MRR_TREND / MOCK_MRR_TREND_12M with a real
 *   time-series query, e.g. await analyticsService.getMrrTrend({ range }).
 */
export function SubscriptionAnalytics() {
  const [range, setRange] = useState<MrrRange>("6m");

  const data = range === "6m" ? MOCK_MRR_TREND : MOCK_MRR_TREND_12M;

  const { current, changePct } = useMemo(() => {
    const latest = data[data.length - 1];
    const previous = data[data.length - 2];
    const pct = previous ? ((latest.mrr - previous.mrr) / previous.mrr) * 100 : 0;
    return { current: latest.mrr, changePct: pct };
  }, [data]);

  const isPositive = changePct >= 0;

  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div>
            <h3 className="text-sm font-bold text-foreground">Monthly Recurring Revenue</h3>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-foreground">{formatCompactCurrency(current)}</span>
              <span className={`text-xs font-semibold ${isPositive ? "text-success" : "text-destructive"}`}>
                {isPositive ? "+" : ""}
                {changePct.toFixed(1)}% vs. previous period
              </span>
            </div>
          </div>
          <Select value={range} onValueChange={(v) => setRange((v as MrrRange) ?? "6m")}>
            <SelectTrigger size="sm" className="text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {MRR_RANGE_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="h-56 sm:h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
              <defs>
                <linearGradient id="mrrFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              />
              <Tooltip content={<MrrTooltip />} />
              <Area
                type="monotone"
                dataKey="mrr"
                stroke="var(--color-chart-1)"
                strokeWidth={2.5}
                fill="url(#mrrFill)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

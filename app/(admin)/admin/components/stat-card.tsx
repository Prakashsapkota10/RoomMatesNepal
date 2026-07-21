"use client";

import * as Icons from "lucide-react";
import { TrendingUp, TrendingDown, type LucideIcon } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface StatCardData {
  label: string;
  value: string;
  /** lucide-react icon name, e.g. "Users" — resolved client-side to avoid
   *  passing non-serializable component references across the RSC boundary. */
  icon: string;
  iconColor: string;
  iconBg: string;
  trend: number;
  /** Mini sparkline points — TODO: replace with real time-series data */
  sparkline: number[];
  sparklineColor: string;
}

/**
 * Single admin dashboard stat card — icon, trend badge, value, and a small
 * sparkline chart (recharts AreaChart) echoing the trend direction.
 */
export function StatCard({
  label,
  value,
  icon,
  iconColor,
  iconBg,
  trend,
  sparkline,
  sparklineColor,
}: StatCardData) {
  const Icon = (Icons as unknown as Record<string, LucideIcon>)[icon];
  const isPositive = trend >= 0;
  const chartData = sparkline.map((v, i) => ({ i, v }));
  const gradientId = `spark-${label.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <Card className="card-dashboard">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg shrink-0", iconBg)}>
            {Icon && <Icon className={cn("h-4.5 w-4.5", iconColor)} />}
          </div>
          <span
            className={cn(
              "flex items-center gap-0.5 text-xs font-semibold",
              isPositive ? "text-success" : "text-destructive"
            )}
          >
            {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {isPositive ? "+" : ""}
            {trend}%
          </span>
        </div>

        <div className="mt-3 flex items-end justify-between gap-2">
          <div>
            <p className="text-xs text-muted-foreground font-medium">{label}</p>
            <p className="text-xl font-bold text-foreground mt-0.5">{value}</p>
          </div>
          <div className="h-9 w-16 shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={sparklineColor} stopOpacity={0.35} />
                    <stop offset="100%" stopColor={sparklineColor} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="v"
                  stroke={sparklineColor}
                  strokeWidth={1.75}
                  fill={`url(#${gradientId})`}
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import type { UserGrowthPoint } from "./types";

interface UserGrowthTrendsChartProps {
  data: UserGrowthPoint[];
}

const LEGEND = [
  { label: "New Users", color: "var(--color-chart-1)" },
  { label: "Active Users", color: "var(--color-chart-5)" },
];

/**
 * User Growth Trends — grouped bar chart (New Users vs Active Users) built
 * with recharts BarChart, rounded bars matching the reference design.
 * TODO: replace `data` with a real monthly growth query.
 */
export function UserGrowthTrendsChart({ data }: UserGrowthTrendsChartProps) {
  return (
    <Card className="h-full">
      <CardContent className="p-5 flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-foreground">User Growth Trends</h3>
          <div className="flex items-center gap-3">
            {LEGEND.map((item) => (
              <span key={item.label} className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                {item.label}
              </span>
            ))}
          </div>
        </div>

        <div className="flex-1 min-h-52">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -20 }} barGap={4}>
              <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              />
              <Tooltip
                cursor={{ fill: "var(--muted)", opacity: 0.4 }}
                contentStyle={{
                  background: "var(--popover)",
                  border: "1px solid var(--border)",
                  borderRadius: "0.5rem",
                  fontSize: "12px",
                }}
                labelStyle={{ color: "var(--muted-foreground)" }}
              />
              <Bar
                dataKey="newUsers"
                name="New Users"
                fill="var(--color-chart-1)"
                radius={[4, 4, 0, 0]}
                maxBarSize={28}
              />
              <Bar
                dataKey="activeUsers"
                name="Active Users"
                fill="var(--color-chart-5)"
                radius={[4, 4, 0, 0]}
                maxBarSize={28}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

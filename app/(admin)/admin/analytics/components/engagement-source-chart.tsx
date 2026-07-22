"use client";

import { useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import type { EngagementSlice } from "./types";

interface EngagementSourceChartProps {
  data: EngagementSlice[];
}

/**
 * Engagement Source — donut chart built with recharts PieChart, showing
 * overall "Stickiness" in the center and a breakdown legend below.
 * TODO: replace `data` with real session-source analytics.
 */
export function EngagementSourceChart({ data }: EngagementSourceChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const stickiness = 84;

  return (
    <Card className="h-full">
      <CardContent className="p-5 flex flex-col h-full">
        <h3 className="text-sm font-bold text-foreground mb-4">Engagement Source</h3>

        <div className="relative flex-1 min-h-40">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius="70%"
                outerRadius="98%"
                paddingAngle={2}
                stroke="none"
                onMouseEnter={(_, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={entry.color}
                    opacity={activeIndex === null || activeIndex === index ? 1 : 0.5}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-bold text-foreground">{stickiness}%</span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
              Stickiness
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-4">
          {data.map((slice) => (
            <div key={slice.name} className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: slice.color }} />
                {slice.name}
              </span>
              <span className="font-semibold text-foreground">{slice.value}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

"use client";

import { useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { Card, CardContent } from "@/components/ui/card";

export interface CityShare {
  name: string;
  value: number;
  color: string;
}

interface PopularCitiesChartProps {
  data: CityShare[];
}

/**
 * Popular Cities — donut chart built with recharts PieChart.
 * Hovering/clicking a legend dot highlights that city's share in the center label.
 * TODO: replace `data` with real listing/user location aggregates from backend.
 */
export function PopularCitiesChart({ data }: PopularCitiesChartProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = data[activeIndex] ?? data[0];
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const percent = total > 0 ? Math.round((active.value / total) * 100) : 0;

  return (
    <Card>
      <CardContent className="p-5 flex flex-col h-full">
        <h3 className="text-sm font-bold text-foreground mb-4">Popular Cities</h3>

        <div className="relative flex-1 min-h-40">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius="68%"
                outerRadius="98%"
                paddingAngle={2}
                stroke="none"
                activeIndex={activeIndex}
                onMouseEnter={(_, index) => setActiveIndex(index)}
              >
                {data.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-bold text-foreground">{percent}%</span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
              {active.name}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4 justify-center">
          {data.map((city, index) => (
            <button
              key={city.name}
              type="button"
              onClick={() => setActiveIndex(index)}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <span
                className="h-2 w-2 rounded-full shrink-0"
                style={{ backgroundColor: city.color }}
              />
              {city.name}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

"use client";

import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";

// ─── Mock Data — TODO: Replace with real AI scores from backend ───────────────

const INITIAL_DATA = [
  { axis: "Lifestyle", value: 78 },
  { axis: "Budget", value: 85 },
  { axis: "Schedule", value: 65 },
  { axis: "Personality", value: 72 },
  { axis: "Location", value: 90 },
];

/**
 * Alignment Matrix — radar chart showing compatibility across dimensions.
 * Uses recharts RadarChart. Re-calculate button shuffles scores (mock).
 * TODO: Replace with real AI-computed alignment data.
 */
export function AlignmentMatrix() {
  const [data, setData] = useState(INITIAL_DATA);
  const [isRecalculating, setIsRecalculating] = useState(false);

  async function handleRecalculate() {
    setIsRecalculating(true);
    // Simulate AI re-calculation
    await new Promise((r) => setTimeout(r, 800));
    setData(
      INITIAL_DATA.map((d) => ({
        ...d,
        value: Math.floor(Math.random() * 30) + 60,
      }))
    );
    setIsRecalculating(false);
  }

  return (
    <Card className="bg-gradient-to-br from-muted/30 via-background to-community-light/20">
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-base font-bold text-foreground">Alignment Matrix</h3>
          <Button
            variant="ghost"
            size="xs"
            className="gap-1.5 text-xs text-primary font-medium"
            onClick={handleRecalculate}
            disabled={isRecalculating}
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isRecalculating ? "animate-spin" : ""}`} />
            Re-calculate
          </Button>
        </div>

        <div className="h-64 sm:h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={data} cx="50%" cy="50%" outerRadius="70%">
              <PolarGrid stroke="var(--border)" strokeDasharray="3 3" />
              <PolarAngleAxis
                dataKey="axis"
                tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              />
              <Radar
                name="Score"
                dataKey="value"
                stroke="#14B8A6"
                fill="#14B8A6"
                fillOpacity={0.2}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

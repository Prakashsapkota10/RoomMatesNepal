"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ModerationMiniStat } from "./moderation-mini-stat";
import type { ModerationMiniStat as ModerationMiniStatData } from "./types";

interface ModerationPerformanceCardProps {
  slaCompliance: number;
  miniStats: ModerationMiniStatData[];
}

/**
 * Moderation Performance — SLA compliance headline plus three mini stat
 * tiles (Avg. Response / Resolutions / Pending Review).
 * TODO: replace mock data with real moderation performance aggregates.
 */
export function ModerationPerformanceCard({
  slaCompliance,
  miniStats,
}: ModerationPerformanceCardProps) {
  return (
    <Card className="h-full">
      <CardContent className="p-5 flex flex-col h-full">
        <div className="flex items-start justify-between gap-2 mb-4">
          <div>
            <h3 className="text-sm font-bold text-foreground">Moderation Performance</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Response times for flagged content</p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-lg font-bold text-primary">{slaCompliance}%</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wide font-semibold">
              SLA Compliance
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {miniStats.map((stat) => (
            <ModerationMiniStat key={stat.label} {...stat} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

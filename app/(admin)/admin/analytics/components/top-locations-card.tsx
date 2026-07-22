"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Maximize2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { FullMapDialog } from "./full-map-dialog";
import type { LocationStat } from "./types";

interface TopLocationsCardProps {
  data: LocationStat[];
}

// Leaflet touches `window` on import, so the map must be client-only with no SSR.
const UserDensityMap = dynamic(
  () => import("./user-density-map").then((mod) => mod.UserDensityMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-muted">
        <div className="h-5 w-5 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    ),
  }
);

/**
 * Top Locations — ranked horizontal bar list by user count, plus a real
 * interactive Leaflet map with a user-density heatmap layer, both in one
 * card. The map preview is click-to-expand: clicking it opens the same map
 * full-size in a modal (with scroll-wheel zoom enabled there, since it's no
 * longer competing with page scroll). The preview itself keeps
 * scrollWheelZoom off so it never traps the page's mouse-wheel scroll.
 * TODO: replace `data` with real location aggregates from the backend.
 */
export function TopLocationsCard({ data }: TopLocationsCardProps) {
  const [isMapOpen, setIsMapOpen] = useState(false);
  const max = Math.max(...data.map((d) => d.users));

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-5">
        <h3 className="text-sm font-bold text-foreground mb-4">Top Locations</h3>

        <div className="flex flex-col gap-4">
          {data.map((loc) => (
            <div key={loc.city}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-medium text-foreground">{loc.city}</span>
                <span className="text-xs text-muted-foreground tabular-nums">
                  {loc.users.toLocaleString()} users
                </span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${(loc.users / max) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      {/* Map preview — click to open full-size in a modal */}
      <button
        type="button"
        onClick={() => setIsMapOpen(true)}
        aria-label="Open full user density map"
        className="group relative block h-48 w-full mt-1 border-t isolate cursor-pointer"
      >
        <div className="absolute inset-0 pointer-events-none">
          <UserDensityMap data={data} />
        </div>
        <div className="absolute inset-0 z-[500] flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors">
          <span className="flex items-center gap-1.5 rounded-lg bg-background px-3 py-1.5 text-xs font-medium text-foreground opacity-0 group-hover:opacity-100 shadow-md transition-opacity">
            <Maximize2 className="h-3.5 w-3.5" />
            Expand Map
          </span>
        </div>
      </button>

      <FullMapDialog open={isMapOpen} onOpenChange={setIsMapOpen} data={data} />
    </Card>
  );
}

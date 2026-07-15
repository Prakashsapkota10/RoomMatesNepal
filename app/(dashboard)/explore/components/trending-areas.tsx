"use client";

import { ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

// TODO: Replace with real data from backend
const MOCK_TRENDING_AREAS = [
  { id: "1", name: "Baneshwor", initial: "B", listings: 142 },
  { id: "2", name: "Pulchowk", initial: "P", listings: 89 },
  { id: "3", name: "Koteshwor", initial: "K", listings: 215 },
];

/**
 * Trending Areas card — shows popular location with listing counts.
 * TODO: Replace mock data with real API call.
 */
export function TrendingAreas() {
  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="text-sm font-bold text-foreground mb-3">Trending Areas</h3>
        <div className="flex flex-col gap-2">
          {MOCK_TRENDING_AREAS.map((area) => (
            <button
              key={area.id}
              className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted transition-colors w-full text-left"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-sm font-bold text-foreground shrink-0">
                {area.initial}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">{area.name}</p>
                <p className="text-[11px] text-muted-foreground">{area.listings} active listings</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

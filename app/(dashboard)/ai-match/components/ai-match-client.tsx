"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CompatibilityScore } from "./compatibility-score";
import { AlignmentMatrix } from "./alignment-matrix";
import { BoostMatchScore } from "./boost-match-score";
import { TopRecommendations } from "./top-recommendations";

/**
 * AI Match client component — shows compatibility core score,
 * alignment matrix radar chart, boost tips, and top recommendations.
 */
export function AIMatchClient() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex flex-col gap-8 page-enter">
      {/* Search bar */}
      <div className="relative max-w-lg">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search matches or areas..."
          className="pl-9 h-10 text-sm bg-muted/50 border-none rounded-lg"
        />
      </div>

      {/* Compatibility Core Section */}
      <CompatibilityScore />

      {/* Alignment Matrix + Boost Score */}
      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        <AlignmentMatrix />
        <BoostMatchScore />
      </div>

      {/* Top AI Recommendations */}
      <TopRecommendations />
    </div>
  );
}

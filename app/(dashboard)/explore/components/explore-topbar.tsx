"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

/**
 * Explore page header with title + search bar.
 */
export function ExploreTopbar() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Explore</h1>
      <p className="text-sm text-muted-foreground mt-0.5">
        Find rooms and compatible roommates across Nepal.
      </p>
      <div className="relative mt-4 max-w-lg">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search areas (e.g. Baneshwor, Lalitpur)..."
          className="pl-9 h-10 text-sm bg-muted/50 border-none rounded-lg"
        />
      </div>
    </div>
  );
}

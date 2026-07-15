"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  RoomsTab,
  RoommatesTab,
  ExploreTopbar,
  FiltersSidebar,
  TrendingAreas,
  MapPreview,
} from "./components";

/**
 * Explore page — tabbed view for browsing Rooms and Roommates.
 * Tab is driven by URL ?tab= param so sidebar links work correctly.
 * Data is fetched client-side inside each tab component.
 */
export default function ExplorePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeTab: "rooms" | "roommates" =
    searchParams.get("tab") === "roommates" ? "roommates" : "rooms";

  function switchTab(tab: "rooms" | "roommates") {
    if (tab === "rooms") {
      router.replace(pathname);
    } else {
      router.replace(`${pathname}?tab=roommates`);
    }
  }

  return (
    <div className="flex flex-col gap-6 page-enter">
      {/* Page header with search */}
      <ExploreTopbar />

      {/* Tab navigation */}
      <div className="flex items-center gap-6 border-b">
        <button
          type="button"
          onClick={() => switchTab("rooms")}
          className={`flex items-center gap-2 pb-2.5 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "rooms"
              ? "border-foreground text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <span className="text-base">🏠</span>
          Rooms
        </button>
        <button
          type="button"
          onClick={() => switchTab("roommates")}
          className={`flex items-center gap-2 pb-2.5 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "roommates"
              ? "border-foreground text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <span className="text-base">👥</span>
          Roommates
        </button>
      </div>

      {/* Main content: Left (listings) + Right (filters/map/trending) */}
      <div className="grid lg:grid-cols-[1fr_300px] gap-6">
        {/* Left column — Tab content */}
        <div>
          {activeTab === "rooms" && <RoomsTab />}
          {activeTab === "roommates" && <RoommatesTab />}
        </div>

        {/* Right column — Filters + Map + Trending */}
        <aside className="flex flex-col gap-5">
          <FiltersSidebar activeTab={activeTab} />
          <MapPreview />
          <TrendingAreas />
        </aside>
      </div>
    </div>
  );
}

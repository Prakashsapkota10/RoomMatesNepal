"use client";

import { useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatsCards } from "./stats-cards";
import { ListingsTab } from "./listings-tab";
import { RequirementsTab } from "./requirements-tab";
import { DraftsTab } from "./drafts-tab";
import { ArchivedTab } from "./archived-tab";

const TABS = [
  { key: "listings", label: "My Listings" },
  { key: "requirements", label: "My Requirements" },
  { key: "drafts", label: "Drafts" },
  { key: "archived", label: "Archived" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

export function ActivitiesClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const paramTab = searchParams.get("tab");
  const activeTab: TabKey =
    paramTab === "requirements" || paramTab === "drafts" || paramTab === "archived"
      ? paramTab
      : "listings";

  const [draftsCount] = useState(3); // TODO: fetch from backend

  function switchTab(tab: TabKey) {
    if (tab === "listings") {
      router.replace(pathname);
    } else {
      router.replace(`${pathname}?tab=${tab}`);
    }
  }

  return (
    <div className="flex flex-col gap-6 page-enter">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Activities</h1>
          <p className="text-sm text-muted-foreground">
            Track performance and manage your active listings.
          </p>
        </div>
        <Button className="btn-primary-motion gap-2 font-semibold rounded-lg shrink-0">
          <Plus className="h-4 w-4" />
          New Listing
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search activities..."
          className="pl-9 h-9 text-sm bg-muted/50 border-none rounded-lg"
        />
      </div>

      {/* Stats Cards */}
      <StatsCards />

      {/* Tab navigation */}
      <div className="flex items-center gap-6 border-b overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => switchTab(tab.key)}
            className={`pb-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              activeTab === tab.key
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
            {tab.key === "drafts" && draftsCount > 0 && (
              <span className="ml-1 text-muted-foreground">({draftsCount})</span>
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "listings" && <ListingsTab />}
      {activeTab === "requirements" && <RequirementsTab />}
      {activeTab === "drafts" && <DraftsTab />}
      {activeTab === "archived" && <ArchivedTab />}
    </div>
  );
}

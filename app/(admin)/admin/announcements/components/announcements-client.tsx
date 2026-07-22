"use client";

import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AdminSearchBar } from "@/components/admin/admin-search-bar";
import { AnnouncementsStatsRow } from "./announcements-stats-row";
import { AnnouncementComposer, EMPTY_COMPOSER_STATE, type ComposerState } from "./announcement-composer";
import { LivePreviewPanel } from "./live-preview-panel";
import { AnnouncementsTable } from "./announcements-table";
import { AnnouncementsPagination } from "./announcements-pagination";
import { MOCK_ANNOUNCEMENTS } from "./mock-announcements";
import type { AnnouncementRow, AnnouncementScope } from "./types";

const PAGE_SIZE = 5;

const SCOPE_TABS: { value: AnnouncementScope | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "community", label: "Community" },
  { value: "system", label: "System" },
];

/**
 * Client shell for /admin/announcements — stats row, composer + live
 * preview (matching the reference design), and the Recent Announcements
 * table with scope tabs, search, and pagination.
 * All state below is client-side over mock data.
 * TODO: replace with server-driven create/list/update announcement APIs.
 */
export function AnnouncementsClient() {
  const [composer, setComposer] = useState<ComposerState>(EMPTY_COMPOSER_STATE);
  const [scopeTab, setScopeTab] = useState<AnnouncementScope | "all">("all");
  const [page, setPage] = useState(1);

  const filteredAnnouncements = useMemo(() => {
    if (scopeTab === "all") return MOCK_ANNOUNCEMENTS;
    return MOCK_ANNOUNCEMENTS.filter((a) => a.scope === scopeTab);
  }, [scopeTab]);

  const totalPages = Math.max(1, Math.ceil(filteredAnnouncements.length / PAGE_SIZE));
  const pagedAnnouncements = filteredAnnouncements.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleScopeChange(next: string) {
    setScopeTab(next as AnnouncementScope | "all");
    setPage(1);
  }

  function handleEdit(announcement: AnnouncementRow) {
    setComposer({
      title: announcement.title,
      body: announcement.body,
      scope: announcement.scope,
      audience: announcement.audience,
      priority: announcement.priority,
      channels: announcement.channels,
      scheduledFor: announcement.scheduledFor ?? "",
      isPinned: announcement.isPinned,
    });
  }

  function handleSaveDraft() {
    // TODO: POST /api/admin/announcements with status: "draft"
  }

  function handlePublish() {
    // TODO: POST /api/admin/announcements with status: "published" (or "scheduled" if scheduledFor is set)
  }

  return (
    <div className="flex flex-col gap-6 page-enter">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Announcements</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Create and manage announcements for the community and the wider platform.
        </p>
      </div>

      {/* Stats summary */}
      <AnnouncementsStatsRow />

      {/* Composer + Live Preview */}
      <div className="grid lg:grid-cols-[1fr_340px] gap-5">
        <AnnouncementComposer
          value={composer}
          onChange={setComposer}
          onSaveDraft={handleSaveDraft}
          onPublish={handlePublish}
        />
        <LivePreviewPanel value={composer} />
      </div>

      {/* Search */}
      <AdminSearchBar placeholder="Search broadcasts..." />

      {/* Recent Announcements */}
      <Tabs value={scopeTab} onValueChange={handleScopeChange}>
        <TabsList>
          {SCOPE_TABS.map((t) => (
            <TabsTrigger key={t.value} value={t.value}>
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {SCOPE_TABS.map((t) => (
          <TabsContent key={t.value} value={t.value} className="mt-4">
            <Card className="overflow-hidden py-0">
              <CardContent className="p-4 pb-2">
                <h3 className="text-sm font-bold text-foreground">Recent Announcements</h3>
              </CardContent>
              <CardContent className="p-0">
                <AnnouncementsTable announcements={pagedAnnouncements} onEdit={handleEdit} />
              </CardContent>
              <AnnouncementsPagination
                page={page}
                totalPages={totalPages}
                totalResults={filteredAnnouncements.length}
                pageSize={PAGE_SIZE}
                onPageChange={setPage}
              />
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

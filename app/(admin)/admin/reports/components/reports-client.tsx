"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AdminSearchBar } from "@/components/admin/admin-search-bar";
import { ReportStatsRow } from "./report-stats-row";
import { ReportsTable } from "./reports-table";
import { ReportsPagination } from "./reports-pagination";
import { ModerationGuidelines } from "./moderation-guidelines";
import { ActivityStream, type ActivityStreamEntry } from "./activity-stream";
import { MOCK_REPORTS } from "./mock-reports";
import type { ReportQueueStatus } from "./types";

const PAGE_SIZE = 3;

const TABS: { value: ReportQueueStatus; label: string }[] = [
  { value: "pending", label: "Pending" },
  { value: "in_review", label: "In Review" },
  { value: "resolved", label: "Resolved" },
  { value: "dismissed", label: "Dismissed" },
];

// TODO: Replace with a real moderation activity-log query.
const ACTIVITY_ENTRIES: ActivityStreamEntry[] = [
  {
    id: "a1",
    color: "bg-[color:var(--trust)]",
    message: "<strong>System:</strong> 12 reports auto-dismissed",
    time: "20 minutes ago",
  },
  {
    id: "a2",
    color: "bg-destructive",
    message: "<strong>Admin:</strong> User @ramesh banned",
    time: "1 hour ago",
  },
  {
    id: "a3",
    color: "bg-[color:var(--community)]",
    message: "Anil Karki updated evidence",
    time: "2 hours ago",
  },
];

/**
 * Client shell for /admin/reports — stats row, search, status tabs, table,
 * pagination, moderation guidelines, and the activity stream.
 * All filtering/pagination below is client-side over mock data.
 * TODO: replace with server-driven search + filtered/paginated queries.
 */
export function ReportsClient() {
  const [tab, setTab] = useState<ReportQueueStatus>("pending");
  const [page, setPage] = useState(1);

  const reportsByStatus = useMemo(() => {
    const map = {} as Record<ReportQueueStatus, typeof MOCK_REPORTS>;
    for (const t of TABS) {
      map[t.value] = MOCK_REPORTS.filter((r) => r.queueStatus === t.value);
    }
    return map;
  }, []);

  const activeReports = reportsByStatus[tab];
  const totalPages = Math.max(1, Math.ceil(activeReports.length / PAGE_SIZE));

  function handleTabChange(next: string) {
    setTab(next as ReportQueueStatus);
    setPage(1);
  }

  return (
    <div className="flex flex-col gap-6 page-enter">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Report Management</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Review and manage reported users and community violations.
        </p>
      </div>

      {/* Stats summary */}
      <ReportStatsRow />

      {/* Search */}
      <AdminSearchBar placeholder="Search reports, users..." />

      <Tabs value={tab} onValueChange={handleTabChange}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <TabsList>
            {TABS.map((t) => (
              <TabsTrigger key={t.value} value={t.value}>
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <Button variant="outline" size="sm" className="btn-secondary-motion gap-1.5 font-medium">
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Filter
          </Button>
        </div>

        {TABS.map((t) => {
          const tabReports = reportsByStatus[t.value];
          const tabPaged =
            t.value === tab
              ? tabReports.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
              : tabReports.slice(0, PAGE_SIZE);

          return (
            <TabsContent key={t.value} value={t.value} className="mt-4">
              <Card className="overflow-hidden py-0">
                <CardContent className="p-0">
                  <ReportsTable reports={tabPaged} />
                </CardContent>
                <ReportsPagination
                  page={page}
                  totalPages={totalPages}
                  totalResults={tabReports.length}
                  pageSize={PAGE_SIZE}
                  onPageChange={setPage}
                />
              </Card>
            </TabsContent>
          );
        })}
      </Tabs>

      {/* Guidelines + Activity Stream */}
      <div className="grid lg:grid-cols-[1fr_320px] gap-5">
        <ModerationGuidelines />
        <ActivityStream entries={ACTIVITY_ENTRIES} />
      </div>
    </div>
  );
}

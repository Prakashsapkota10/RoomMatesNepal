"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { StatusFilter } from "@/components/admin/status-filter";

export type ActivityType = "user" | "listing" | "report" | "community";

export interface AdminActivity {
  id: string;
  type: ActivityType;
  message: string;
  time: string;
}

interface RecentActivitiesProps {
  activities: AdminActivity[];
}

const TYPE_FILTER_OPTIONS = [
  { value: "all", label: "All Activities" },
  { value: "user", label: "Users" },
  { value: "listing", label: "Listings" },
  { value: "report", label: "Reports" },
  { value: "community", label: "Community" },
];

const TYPE_DOT_COLOR: Record<ActivityType, string> = {
  user: "bg-success",
  listing: "bg-trust",
  report: "bg-warning",
  community: "bg-community",
};

/**
 * Recent Activities feed — filterable by activity type via StatusFilter.
 * TODO: replace `activities` with a real activity-log query and wire the
 * type filter to backend pagination/filtering instead of client-side filter.
 */
export function RecentActivities({ activities }: RecentActivitiesProps) {
  const [typeFilter, setTypeFilter] = useState("all");

  const filtered = useMemo(
    () =>
      typeFilter === "all"
        ? activities
        : activities.filter((a) => a.type === typeFilter),
    [activities, typeFilter]
  );

  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-4 gap-2">
          <h3 className="text-sm font-bold text-foreground">Recent Activities</h3>
          <div className="flex items-center gap-2">
            <StatusFilter
              value={typeFilter}
              onValueChange={setTypeFilter}
              options={TYPE_FILTER_OPTIONS}
              label="Filter"
            />
            <Link href="/admin/reports" className="text-xs text-primary font-medium hover:underline shrink-0">
              View All
            </Link>
          </div>
        </div>

        <div className="flex flex-col">
          {filtered.length === 0 && (
            <p className="text-xs text-muted-foreground py-4 text-center">
              No activities match this filter.
            </p>
          )}
          {filtered.map((activity, index) => (
            <div key={activity.id} className="flex gap-3 relative">
              <div className="flex flex-col items-center">
                <span className={`h-2.5 w-2.5 rounded-full shrink-0 mt-1 ${TYPE_DOT_COLOR[activity.type]}`} />
                {index < filtered.length - 1 && (
                  <span className="w-px flex-1 bg-border my-1" />
                )}
              </div>
              <div className="pb-4 min-w-0">
                <p
                  className="text-sm text-foreground leading-snug"
                  dangerouslySetInnerHTML={{ __html: activity.message }}
                />
                <p className="text-[11px] text-muted-foreground mt-0.5">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

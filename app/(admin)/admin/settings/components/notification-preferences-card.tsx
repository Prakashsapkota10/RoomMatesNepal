"use client";

import { Bell } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SettingToggleRow } from "./setting-toggle-row";
import type { NotificationPreferenceState, PlatformSettings } from "./types";

interface NotificationPreferencesCardProps {
  value: PlatformSettings["notifications"];
  onChange: (value: PlatformSettings["notifications"]) => void;
}

const ROWS: {
  key: keyof NotificationPreferenceState;
  label: string;
  description: string;
}[] = [
  {
    key: "criticalAlerts",
    label: "Critical System Alerts",
    description: "Push notifications for server downtime or security breaches.",
  },
  {
    key: "listingReports",
    label: "Listing Reports",
    description: "Notify administrators when a listing is reported.",
  },
  {
    key: "userReports",
    label: "User Reports",
    description: "Notify moderators when a user is reported.",
  },
  {
    key: "verificationRequests",
    label: "Verification Requests",
    description: "Notify administrators when users submit verification requests.",
  },
  {
    key: "weeklyGrowthReports",
    label: "Weekly Growth Reports",
    description: "Email summaries of user registrations and listing performance.",
  },
  {
    key: "userActivitySummaries",
    label: "User Activity Summaries",
    description: "Push notifications for high-volume listing interactions.",
  },
];

/** Notification Preferences card — six toggle rows for admin alert channels. */
export function NotificationPreferencesCard({ value, onChange }: NotificationPreferencesCardProps) {
  return (
    <Card>
      <CardContent className="p-5 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
            <Bell className="h-3.5 w-3.5 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground">Notification Preferences</h3>
            <p className="text-xs text-muted-foreground">
              Choose which platform events trigger admin notifications.
            </p>
          </div>
        </div>

        {ROWS.map((row) => (
          <SettingToggleRow
            key={row.key}
            id={row.key}
            label={row.label}
            description={row.description}
            checked={value[row.key]}
            onCheckedChange={(checked) => onChange({ ...value, [row.key]: checked })}
          />
        ))}
      </CardContent>
    </Card>
  );
}

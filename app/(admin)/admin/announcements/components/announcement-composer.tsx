"use client";

import { useState } from "react";
import { Bold, Italic, Link2, Plus, Pin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type {
  AnnouncementScope,
  AnnouncementAudience,
  AnnouncementPriority,
  AnnouncementChannel,
} from "./types";

export interface ComposerState {
  title: string;
  body: string;
  scope: AnnouncementScope;
  audience: AnnouncementAudience;
  priority: AnnouncementPriority;
  channels: AnnouncementChannel[];
  scheduledFor: string;
  isPinned: boolean;
}

export const EMPTY_COMPOSER_STATE: ComposerState = {
  title: "",
  body: "",
  scope: "system",
  audience: "all",
  priority: "info",
  channels: ["in_app"],
  scheduledFor: "",
  isPinned: false,
};

interface AnnouncementComposerProps {
  value: ComposerState;
  onChange: (value: ComposerState) => void;
  onSaveDraft: () => void;
  onPublish: () => void;
}

const SCOPE_OPTIONS: { value: AnnouncementScope; label: string }[] = [
  { value: "system", label: "System-wide" },
  { value: "community", label: "Community" },
];

const AUDIENCE_OPTIONS: { value: AnnouncementAudience; label: string }[] = [
  { value: "all", label: "All Users" },
  { value: "seekers", label: "Room Seekers" },
  { value: "owners", label: "Room Owners" },
  { value: "admins", label: "Admins Only" },
];

const PRIORITY_OPTIONS: { value: AnnouncementPriority; label: string }[] = [
  { value: "info", label: "Info" },
  { value: "warning", label: "Warning" },
  { value: "critical", label: "Critical" },
];

const CHANNEL_OPTIONS: { value: AnnouncementChannel; label: string }[] = [
  { value: "in_app", label: "In-App Banner" },
  { value: "email", label: "Email" },
  { value: "push", label: "Push Notification" },
];

/**
 * Announcement composer — title, scope (community vs system-wide), target
 * audience, priority level, delivery channels, optional schedule date, pin
 * to top toggle, and markdown-supported message body. Save Draft / Publish
 * Now actions mirror the reference design.
 * TODO: wire onSaveDraft/onPublish to the real announcements API.
 */
export function AnnouncementComposer({
  value,
  onChange,
  onSaveDraft,
  onPublish,
}: AnnouncementComposerProps) {
  const [scheduleEnabled, setScheduleEnabled] = useState(!!value.scheduledFor);

  function update<K extends keyof ComposerState>(key: K, val: ComposerState[K]) {
    onChange({ ...value, [key]: val });
  }

  function toggleChannel(channel: AnnouncementChannel) {
    const has = value.channels.includes(channel);
    update(
      "channels",
      has ? value.channels.filter((c) => c !== channel) : [...value.channels, channel]
    );
  }

  return (
    <Card>
      <CardContent className="p-5 flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="flex items-center gap-1.5 text-sm font-bold text-foreground">
            <Plus className="h-4 w-4 text-primary" />
            Draft New Announcement
          </h3>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="btn-secondary-motion font-medium" onClick={onSaveDraft}>
              Save Draft
            </Button>
            <Button size="sm" className="btn-primary-motion font-semibold" onClick={onPublish}>
              Publish Now
            </Button>
          </div>
        </div>

        {/* Title */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="announcement-title" className="text-xs text-muted-foreground font-medium">
            Announcement Title
          </Label>
          <Input
            id="announcement-title"
            placeholder="e.g., Important System Update regarding Verification"
            value={value.title}
            onChange={(e) => update("title", e.target.value)}
            className="h-10"
          />
        </div>

        {/* Scope + Audience + Priority */}
        <div className="grid sm:grid-cols-3 gap-3">
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-muted-foreground font-medium">Scope</Label>
            <Select value={value.scope} onValueChange={(v) => update("scope", (v ?? "system") as AnnouncementScope)}>
              <SelectTrigger className="h-10 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SCOPE_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-muted-foreground font-medium">Target Audience</Label>
            <Select
              value={value.audience}
              onValueChange={(v) => update("audience", (v ?? "all") as AnnouncementAudience)}
            >
              <SelectTrigger className="h-10 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {AUDIENCE_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-muted-foreground font-medium">Priority</Label>
            <Select
              value={value.priority}
              onValueChange={(v) => update("priority", (v ?? "info") as AnnouncementPriority)}
            >
              <SelectTrigger className="h-10 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PRIORITY_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Delivery channels */}
        <div className="flex flex-col gap-1.5">
          <Label className="text-xs text-muted-foreground font-medium">Delivery Channels</Label>
          <div className="flex flex-wrap gap-2">
            {CHANNEL_OPTIONS.map((opt) => {
              const active = value.channels.includes(opt.value);
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => toggleChannel(opt.value)}
                  className={
                    active
                      ? "rounded-lg border border-primary bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary transition-colors"
                      : "rounded-lg border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:border-primary/40 transition-colors"
                  }
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Schedule + Pin */}
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="schedule-toggle" className="text-xs text-muted-foreground font-medium">
                Schedule Date (Optional)
              </Label>
              <Switch
                id="schedule-toggle"
                size="sm"
                checked={scheduleEnabled}
                onCheckedChange={(checked) => {
                  setScheduleEnabled(checked === true);
                  if (!checked) update("scheduledFor", "");
                }}
              />
            </div>
            <Input
              type="datetime-local"
              disabled={!scheduleEnabled}
              value={value.scheduledFor}
              onChange={(e) => update("scheduledFor", e.target.value)}
              className="h-10"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-muted-foreground font-medium">Pin to Top</Label>
            <button
              type="button"
              onClick={() => update("isPinned", !value.isPinned)}
              className={
                value.isPinned
                  ? "flex h-10 items-center justify-center gap-1.5 rounded-lg border border-primary bg-primary/10 text-xs font-medium text-primary transition-colors"
                  : "flex h-10 items-center justify-center gap-1.5 rounded-lg border text-xs font-medium text-muted-foreground hover:border-primary/40 transition-colors"
              }
            >
              <Pin className="h-3.5 w-3.5" />
              {value.isPinned ? "Pinned" : "Pin this announcement"}
            </button>
          </div>
        </div>

        {/* Message body */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="announcement-body" className="text-xs text-muted-foreground font-medium">
              Message Body (Markdown Supported)
            </Label>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon-sm" aria-label="Bold" type="button">
                <Bold className="h-3.5 w-3.5" />
              </Button>
              <Button variant="ghost" size="icon-sm" aria-label="Italic" type="button">
                <Italic className="h-3.5 w-3.5" />
              </Button>
              <Button variant="ghost" size="icon-sm" aria-label="Insert link" type="button">
                <Link2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
          <Textarea
            id="announcement-body"
            placeholder="Write your announcement details here..."
            value={value.body}
            onChange={(e) => update("body", e.target.value)}
            className="min-h-32"
          />
        </div>
      </CardContent>
    </Card>
  );
}

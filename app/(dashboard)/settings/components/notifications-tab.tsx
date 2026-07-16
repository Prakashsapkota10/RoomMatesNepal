"use client";

import { useState } from "react";
import {
  MessageSquare,
  Users,
  Home,
  MessageCircle,
  ClipboardList,
  Sparkles,
  Shield,
  Clock,
  ExternalLink,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

interface NotificationCategory {
  key: string;
  label: string;
  description: string;
  icon: React.ElementType;
  push: boolean;
  email: boolean;
  sms: boolean;
}

const DEFAULT_NOTIFICATIONS: NotificationCategory[] = [
  {
    key: "messages",
    label: "Messages",
    description: "Direct messages from potential roommates or landlords.",
    icon: MessageSquare,
    push: true,
    email: true,
    sms: false,
  },
  {
    key: "roommate-requests",
    label: "Roommate Requests",
    description: "Alerts when someone wants to team up or join your listing.",
    icon: Users,
    push: true,
    email: true,
    sms: true,
  },
  {
    key: "room-listing-updates",
    label: "Room Listing Updates",
    description: "New listings matching your search criteria or price drops.",
    icon: Home,
    push: true,
    email: false,
    sms: false,
  },
  {
    key: "community-replies",
    label: "Community Replies",
    description: "Notifications for comments on your community posts or threads.",
    icon: MessageCircle,
    push: false,
    email: false,
    sms: false,
  },
  {
    key: "application-updates",
    label: "Application Updates",
    description: "Stay informed about the status of your rental applications.",
    icon: ClipboardList,
    push: true,
    email: true,
    sms: true,
  },
];

export function NotificationsTab() {
  const [notifications, setNotifications] = useState(DEFAULT_NOTIFICATIONS);

  function toggleChannel(
    key: string,
    channel: "push" | "email" | "sms"
  ) {
    setNotifications((prev) =>
      prev.map((n) =>
        n.key === key ? { ...n, [channel]: !n[channel] } : n
      )
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Notification Preferences</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Choose how you want to receive updates.
        </p>
      </div>

      {/* Main content grid */}
      <div className="grid lg:grid-cols-[1fr_280px] gap-6">
        {/* Left column — Notification categories */}
        <div className="flex flex-col gap-4">
          {notifications.map((category) => {
            const Icon = category.icon;
            return (
              <Card key={category.key}>
                <CardContent className="p-5">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{category.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  {/* Channel toggles */}
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground w-9">Push</span>
                      <Switch
                        checked={category.push}
                        onCheckedChange={() => toggleChannel(category.key, "push")}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground w-9">Email</span>
                      <Switch
                        checked={category.email}
                        onCheckedChange={() => toggleChannel(category.key, "email")}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground w-9">SMS</span>
                      <Switch
                        checked={category.sms}
                        onCheckedChange={() => toggleChannel(category.key, "sms")}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {/* Save button */}
          <Button className="btn-primary-motion font-semibold w-fit">
            Save Preferences
          </Button>
        </div>

        {/* Right column — Info cards */}
        <aside className="flex flex-col gap-4">
          {/* Smart Alerts */}
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-4 w-4" />
                <p className="text-xs font-bold uppercase tracking-wider">Smart Alerts</p>
              </div>
              <p className="text-xs opacity-90 leading-relaxed">
                Our AI can automatically filter notifications so you only see the most relevant room
                matches and roommate requests.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-3 text-xs bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white"
              >
                Enable AI Filtering
              </Button>
            </CardContent>
          </Card>

          {/* Privacy & Security */}
          <Card>
            <CardContent className="p-4">
              <p className="text-sm font-semibold text-foreground mb-2">Privacy & Security</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Your contact details are never shared with third parties. SMS and Email
                notifications are managed via our secure gateway.
              </p>
              <button
                type="button"
                className="flex items-center gap-1 mt-2.5 text-xs font-medium text-primary hover:underline"
              >
                Read Privacy Policy
                <ExternalLink className="h-3 w-3" />
              </button>
            </CardContent>
          </Card>

          {/* Recent History */}
          <Card>
            <CardContent className="p-4">
              <p className="text-sm font-semibold text-foreground mb-3">Recent History</p>
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-2.5">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-success/10 shrink-0 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-success" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-foreground">Email Sent</p>
                    <p className="text-[10px] text-muted-foreground">
                      New roommate request from Binod.
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-0.5 flex items-center gap-1">
                      <Clock className="h-2.5 w-2.5" />
                      2 hours ago
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-muted shrink-0 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-foreground">Push Notification</p>
                    <p className="text-[10px] text-muted-foreground">
                      Price drop on &apos;Cozy Koteshwor Apartment&apos;.
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-0.5 flex items-center gap-1">
                      <Clock className="h-2.5 w-2.5" />
                      5 hours ago
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}

"use client";

import { Home, FileText, Eye, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

// TODO: Replace with real stats from backend
const MOCK_STATS = [
  { label: "Active Listings", value: "12", icon: Home, badge: "+2 this week", badgeColor: "text-success" },
  { label: "Requirements", value: "5", icon: FileText, badge: "8 Active", badgeColor: "text-primary" },
  { label: "Total Views", value: "2.4k", icon: Eye, badge: "+15%", badgeColor: "text-success" },
  { label: "Bookmarks", value: "186", icon: Heart, badge: "High Interest", badgeColor: "text-warning" },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {MOCK_STATS.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label} className="card-dashboard">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <span className={`text-[10px] font-semibold ${stat.badgeColor}`}>
                  {stat.badge}
                </span>
              </div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
                {stat.label}
              </p>
              <p className="text-xl font-bold text-foreground mt-0.5">{stat.value}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

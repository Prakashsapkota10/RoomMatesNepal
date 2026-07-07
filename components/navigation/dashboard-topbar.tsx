"use client";

import Link from "next/link";
import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/navigation/theme-toggle";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { SidebarTrigger } from "@/components/ui/sidebar";
import type { BreadcrumbItem } from "@/types";

interface DashboardTopbarProps {
  breadcrumbs?: BreadcrumbItem[];
  unreadNotifications?: number;
  showSearch?: boolean;
}

export function DashboardTopbar({
  breadcrumbs,
  unreadNotifications = 0,
  showSearch = true,
}: DashboardTopbarProps) {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:px-6 shrink-0">
      {/* Sidebar toggle */}
      <SidebarTrigger className="-ml-1" aria-label="Toggle sidebar" />

      {/* Breadcrumbs */}
      <div className="flex-1 min-w-0">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        {showSearch && (
          <div className="hidden md:flex relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Quick search..."
              className="pl-9 w-48 lg:w-64 h-8 text-sm"
            />
          </div>
        )}

        <ThemeToggle />

        <Link href="/notifications">
          <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
            <Bell className="h-5 w-5" />
            {unreadNotifications > 0 && (
              <Badge className="absolute -top-1 -right-1 h-4 min-w-4 rounded-full px-0.5 text-xs flex items-center justify-center">
                {unreadNotifications > 99 ? "99+" : unreadNotifications}
              </Badge>
            )}
          </Button>
        </Link>
      </div>
    </header>
  );
}

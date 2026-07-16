"use client";

import Link from "next/link";
import { Bell, MessageSquare, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface DashboardTopbarProps {
  /** User display name for avatar fallback */
  userName?: string;
  /** User avatar URL */
  userAvatar?: string;
  /** Unread notification count */
  unreadNotifications?: number;
  /** Unread message count */
  unreadMessages?: number;
}

export function DashboardTopbar({
  userName = "User",
  userAvatar,
  unreadNotifications = 0,
  unreadMessages = 0,
}: DashboardTopbarProps) {
  return (
    <header className="flex h-14 items-center gap-3 border-b bg-card px-4 lg:px-6 shrink-0">
      {/* Sidebar toggle */}
      <SidebarTrigger className="-ml-1" aria-label="Toggle sidebar" />

      {/* Spacer */}
      <div className="flex-1" />

      {/* Right side actions */}
      <div className="flex items-center gap-1">
        {/* Notifications */}
        <Link href="/notifications">
          <Button
            variant="ghost"
            size="icon"
            className="relative h-9 w-9"
            aria-label="Notifications"
          >
            <Bell className="h-[18px] w-[18px] text-muted-foreground" />
            {unreadNotifications > 0 && (
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive" />
            )}
          </Button>
        </Link>

        {/* Messages */}
        <Link href="/messages">
          <Button
            variant="ghost"
            size="icon"
            className="relative h-9 w-9"
            aria-label="Messages"
          >
            <MessageSquare className="h-[18px] w-[18px] text-muted-foreground" />
            {unreadMessages > 0 && (
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary" />
            )}
          </Button>
        </Link>

        {/* Dark mode toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9"
          aria-label="Toggle dark mode"
        >
          <Moon className="h-[18px] w-[18px] text-muted-foreground" />
        </Button>

        {/* User avatar — linked to profile */}
        <Link href="/profile" className="ml-1">
          <Avatar className="h-8 w-8 cursor-pointer ring-2 ring-border">
            <AvatarImage src={userAvatar} alt={userName} />
            <AvatarFallback className="text-xs font-semibold bg-primary/10 text-primary">
              {userName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </header>
  );
}

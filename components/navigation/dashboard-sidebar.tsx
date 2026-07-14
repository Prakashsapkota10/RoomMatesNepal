"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Sparkles, LogOut } from "lucide-react";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { APP_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { getSidebarNavForRole } from "@/lib/sidebar.config";
import type { SidebarNavItem } from "@/lib/sidebar.config";
import type { UserRole } from "@/types";

// ─── Props ────────────────────────────────────────────────────────────────────

interface DashboardSidebarProps {
  userName: string;
  userEmail: string;
  userAvatar?: string;
  userRole: UserRole;
  trustScore?: number;
  unreadMessages?: number;
  unreadNotifications?: number;
}

// ─── Icon Resolver ────────────────────────────────────────────────────────────

function NavIcon({ name }: { name: string }) {
  const Icon = (Icons as unknown as Record<string, LucideIcon>)[name];
  if (!Icon) return null;
  return <Icon className="h-4 w-4 shrink-0" />;
}

// ─── Single Nav Item Row ──────────────────────────────────────────────────────

function NavItemRow({
  item,
  unreadMessages,
  unreadNotifications,
}: {
  item: SidebarNavItem;
  unreadMessages?: number;
  unreadNotifications?: number;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(() =>
    item.children?.some((c) => pathname.startsWith(c.href.split("?")[0])) ?? false
  );

  const isActive =
    pathname === item.href ||
    (item.href !== "/dashboard" && pathname.startsWith(item.href));

  const badge =
    item.badgeKey === "messages"
      ? unreadMessages
      : item.badgeKey === "notifications"
      ? unreadNotifications
      : undefined;

  // Collapsible item with children
  if (item.children) {
    return (
      <Collapsible open={open} onOpenChange={setOpen}>
        <SidebarMenuItem>
          <CollapsibleTrigger
            render={
              <SidebarMenuButton isActive={isActive} className="w-full justify-between" />
            }
          >
            <span className="flex items-center gap-2">
              <NavIcon name={item.icon} />
              {item.label}
            </span>
            <ChevronRight
              className={cn(
                "h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform",
                open && "rotate-90"
              )}
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              {item.children.map((child) => (
                <SidebarMenuSubItem key={child.href}>
                  <SidebarMenuSubButton
                    isActive={pathname === child.href.split("?")[0]}
                    render={<Link href={child.href} />}
                  >
                    {child.icon && <NavIcon name={child.icon} />}
                    {child.label}
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    );
  }

  // Flat item
  return (
    <SidebarMenuItem>
      <SidebarMenuButton isActive={isActive} render={<Link href={item.href} />}>
        <span className="flex items-center gap-2">
          <NavIcon name={item.icon} />
          {item.label}
        </span>
        {badge && badge > 0 && (
          <Badge className="ml-auto h-5 min-w-5 rounded-full px-1 text-xs">
            {badge > 99 ? "99+" : badge}
          </Badge>
        )}
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

// ─── Main Sidebar Component ───────────────────────────────────────────────────

export function DashboardSidebar({
  userName,
  userEmail,
  userAvatar,
  userRole,
  trustScore = 0,
  unreadMessages = 0,
  unreadNotifications = 0,
}: DashboardSidebarProps) {
  // Get navigation items filtered by role permissions
  const navItems = getSidebarNavForRole(userRole);

  return (
    <Sidebar>
      {/* Header */}
      <SidebarHeader className="border-b px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-bold text-base">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Sparkles className="h-3.5 w-3.5" />
          </div>
          {APP_NAME}
        </Link>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <NavItemRow
                  key={`${item.permission}-${item.href}`}
                  item={item}
                  unreadMessages={unreadMessages}
                  unreadNotifications={unreadNotifications}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer — user card */}
      <SidebarFooter className="border-t p-3">
        <div className="flex items-center gap-3 rounded-lg p-2 hover:bg-accent transition-colors">
          <Avatar className="h-8 w-8 shrink-0">
            <AvatarImage src={userAvatar} alt={userName} />
            <AvatarFallback className="text-xs">
              {userName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium leading-none truncate">{userName}</p>
            <p className="text-xs text-muted-foreground truncate mt-0.5">{userEmail}</p>
            <div className="flex items-center gap-1 mt-1">
              <div className="h-1.5 flex-1 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${trustScore}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground shrink-0">{trustScore}</span>
            </div>
          </div>
        </div>
        <Separator className="my-1" />
        <form action="/api/auth/logout" method="POST">
          <button
            type="submit"
            className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </form>
      </SidebarFooter>
    </Sidebar>
  );
}

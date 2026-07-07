"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldCheck, Sparkles, LogOut } from "lucide-react";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
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
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ADMIN_SIDEBAR_NAV, APP_NAME } from "@/lib/constants";

interface AdminSidebarProps {
  adminName: string;
  adminEmail: string;
  adminAvatar?: string;
  pendingReports?: number;
  pendingVerifications?: number;
}

function NavIcon({ name }: { name: string }) {
  const Icon = (Icons as unknown as Record<string, LucideIcon>)[name];
  if (!Icon) return null;
  return <Icon className="h-4 w-4 shrink-0" />;
}

export function AdminSidebar({
  adminName,
  adminEmail,
  adminAvatar,
  pendingReports = 0,
  pendingVerifications = 0,
}: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <Sidebar>
      {/* Header */}
      <SidebarHeader className="border-b px-4 py-3">
        <Link href="/admin" className="flex items-center gap-2 font-bold text-base">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Sparkles className="h-3.5 w-3.5" />
          </div>
          <span>{APP_NAME}</span>
        </Link>
        <div className="flex items-center gap-1.5 mt-1">
          <ShieldCheck className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs font-medium text-primary">Admin Panel</span>
        </div>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {ADMIN_SIDEBAR_NAV.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/admin" && pathname.startsWith(item.href));

                const badge =
                  item.href === "/admin/reports"
                    ? pendingReports
                    : item.href === "/admin/verifications"
                    ? pendingVerifications
                    : undefined;

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      isActive={isActive}
                      render={<Link href={item.href} />}
                    >
                      <span className="flex items-center gap-2 flex-1">
                        {item.icon && <NavIcon name={item.icon} />}
                        {item.label}
                      </span>
                      {badge && badge > 0 && (
                        <Badge
                          variant="destructive"
                          className="ml-auto h-5 min-w-5 rounded-full px-1 text-xs"
                        >
                          {badge > 99 ? "99+" : badge}
                        </Badge>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t p-3">
        <div className="flex items-center gap-3 rounded-lg p-2">
          <Avatar className="h-8 w-8 shrink-0">
            <AvatarImage src={adminAvatar} alt={adminName} />
            <AvatarFallback className="text-xs">
              {adminName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium leading-none truncate">{adminName}</p>
            <p className="text-xs text-muted-foreground truncate mt-0.5">{adminEmail}</p>
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

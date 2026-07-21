import type { Metadata } from "next";
import Link from "next/link";
import { Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buildMeta } from "@/lib/metadata";
import { verifyRole } from "@/lib/auth";
import {
  StatCard,
  UserGrowthChart,
  PopularCitiesChart,
  RecentActivities,
  PendingActions,
  type StatCardData,
  type UserGrowthPoint,
  type CityShare,
  type AdminActivity,
  type PendingAction,
} from "./components";

export const metadata: Metadata = buildMeta({
  title: "Admin Dashboard",
  noIndex: true,
});

// ─── Data Fetching — mock data below, replace with real DB/API queries ───────

/**
 * Fetch top-level platform stat cards.
 * TODO: Replace with aggregated queries, e.g.:
 *   await db.user.count(), await db.listing.count({ where: { status: "active" } }), ...
 */
async function getDashboardStats(): Promise<StatCardData[]> {
  return [
    {
      label: "Total Users",
      value: "12,450",
      icon: "Users",
      iconColor: "text-primary",
      iconBg: "bg-primary/10",
      trend: 12,
      sparkline: [4, 6, 5, 8, 7, 9, 11, 10, 13],
      sparklineColor: "var(--color-chart-1)",
    },
    {
      label: "Active Listings",
      value: "3,120",
      icon: "Building2",
      iconColor: "text-ai-dark",
      iconBg: "bg-ai-light",
      trend: 8,
      sparkline: [5, 5, 6, 6, 7, 6, 8, 7, 9],
      sparklineColor: "var(--color-chart-2)",
    },
    {
      label: "Pending Reports",
      value: "42",
      icon: "Clock",
      iconColor: "text-destructive",
      iconBg: "bg-destructive/10",
      trend: -5,
      sparkline: [9, 8, 8, 7, 6, 7, 6, 5, 5],
      sparklineColor: "var(--color-error)",
    },
    {
      label: "Community Posts",
      value: "890",
      icon: "MessageSquare",
      iconColor: "text-community",
      iconBg: "bg-community-light",
      trend: 15,
      sparkline: [3, 4, 4, 6, 5, 7, 8, 9, 10],
      sparklineColor: "var(--color-chart-5)",
    },
  ];
}

/**
 * Fetch user registration growth series for the selected range.
 * TODO: Replace with: await analyticsService.getUserGrowth({ range })
 */
async function getUserGrowth(): Promise<UserGrowthPoint[]> {
  return [
    { date: "1 Jun", users: 120 },
    { date: "4 Jun", users: 180 },
    { date: "7 Jun", users: 150 },
    { date: "10 Jun", users: 220 },
    { date: "14 Jun", users: 190 },
    { date: "17 Jun", users: 260 },
    { date: "21 Jun", users: 230 },
    { date: "24 Jun", users: 310 },
    { date: "28 Jun", users: 280 },
    { date: "30 Jun", users: 340 },
  ];
}

/**
 * Fetch listing/user distribution by city for the donut chart.
 * TODO: Replace with: await analyticsService.getLocationBreakdown()
 */
async function getPopularCities(): Promise<CityShare[]> {
  return [
    { name: "Kathmandu", value: 45, color: "var(--color-chart-1)" },
    { name: "Lalitpur", value: 25, color: "var(--color-chart-5)" },
    { name: "Pokhara", value: 18, color: "var(--brand-light)" },
    { name: "Others", value: 12, color: "var(--muted)" },
  ];
}

/**
 * Fetch recent platform activity feed.
 * TODO: Replace with: await activityService.getRecent({ scope: "admin", limit: 10 })
 */
async function getRecentActivities(): Promise<AdminActivity[]> {
  return [
    {
      id: "act-1",
      type: "user",
      message: "User <strong>&apos;Suresh K.&apos;</strong> registered as a tenant.",
      time: "2 minutes ago",
    },
    {
      id: "act-2",
      type: "listing",
      message: "Listing <strong>&apos;City Apartment&apos;</strong> approved by admin.",
      time: "18 minutes ago",
    },
    {
      id: "act-3",
      type: "report",
      message: "New report filed against listing <strong>&apos;Cozy Room, Patan&apos;</strong>.",
      time: "1 hour ago",
    },
    {
      id: "act-4",
      type: "community",
      message: "Post <strong>&apos;Best areas near Balkhu&apos;</strong> flagged for review.",
      time: "3 hours ago",
    },
    {
      id: "act-5",
      type: "user",
      message: "User <strong>&apos;Anita G.&apos;</strong> completed identity verification.",
      time: "5 hours ago",
    },
  ];
}

/**
 * Fetch queues that require admin action (verification requests, escalations, etc.)
 * TODO: Replace with: await queueService.getPendingActions()
 */
async function getPendingActions(): Promise<PendingAction[]> {
  return [
    {
      id: "pa-1",
      label: "Verification Requests",
      count: 156,
      icon: "ShieldCheck",
      iconColor: "text-primary",
      iconBg: "bg-primary/10",
      progress: 62,
      note: "Next review in 15 mins",
      href: "/admin/users",
    },
    {
      id: "pa-2",
      label: "Reported Listings",
      count: 24,
      icon: "Building2",
      iconColor: "text-warning-dark",
      iconBg: "bg-warning-light",
      progress: 40,
      note: "SLA: 24 hours",
      href: "/admin/listings",
    },
    {
      id: "pa-3",
      label: "Community Escalations",
      count: 9,
      icon: "MessageSquare",
      iconColor: "text-community-dark",
      iconBg: "bg-community-light",
      progress: 20,
      note: "Awaiting moderator",
      href: "/admin/community",
    },
  ];
}

// ─── Page Component ───────────────────────────────────────────────────────────

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
}

export default async function AdminDashboardPage() {
  // Route already gated by app/(admin)/layout.tsx — verifyRole is a defense-in-depth
  // check at the page level in case this page is ever reached via a different layout.
  await verifyRole("admin");

  const [stats, userGrowth, popularCities, activities, pendingActions] = await Promise.all([
    getDashboardStats(),
    getUserGrowth(),
    getPopularCities(),
    getRecentActivities(),
    getPendingActions(),
  ]);

  return (
    <div className="flex flex-col gap-6 page-enter">
      {/* ── Header ─────────────────────────────────────────────────── */}
      <section className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
            {getGreeting()}, Admin.
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Here&apos;s what&apos;s happening on the platform today.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="btn-secondary-motion gap-1.5 font-medium">
            <Download className="h-3.5 w-3.5" />
            Export Data
          </Button>
          <Link href="/admin/announcements">
            <Button size="sm" className="btn-primary-motion gap-1.5 font-semibold">
              <Plus className="h-3.5 w-3.5" />
              New Announcement
            </Button>
          </Link>
        </div>
      </section>

      {/* ── Stat Cards ─────────────────────────────────────────────── */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </section>

      {/* ── User Growth + Popular Cities ──────────────────────────── */}
      <section className="grid lg:grid-cols-[1fr_320px] gap-5">
        <UserGrowthChart data={userGrowth} />
        <PopularCitiesChart data={popularCities} />
      </section>

      {/* ── Recent Activities + Pending Actions ───────────────────── */}
      <section className="grid lg:grid-cols-[1fr_320px] gap-5">
        <RecentActivities activities={activities} />
        <PendingActions actions={pendingActions} />
      </section>
    </div>
  );
}

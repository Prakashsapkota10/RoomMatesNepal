import type { Metadata } from "next";
import Link from "next/link";
import {
  Home,
  Bookmark,
  Sparkles,
  MessageSquare,
  Bell,
  ShieldCheck,
  TrendingUp,
  Clock,
  ArrowRight,
  Send,
  Inbox,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { verifySession } from "@/lib/auth";
import { buildMeta } from "@/lib/metadata";
import { timeAgo, getTrustColor, getTrustLabel } from "@/lib/utils";

export const metadata: Metadata = buildMeta({
  title: "Dashboard",
  noIndex: true,
});

// ─── Mock data — replace with real DB queries ─────────────────────────────────
const MOCK_STATS = {
  trustScore: 72,
  activeListings: 2,
  savedListings: 8,
  compatibilityMatches: 14,
  unreadMessages: 3,
  unreadNotifications: 5,
};

const MOCK_RECENT_MATCHES = [
  { id: "1", name: "Sita Thapa", score: 92, avatar: null, location: "Thamel" },
  { id: "2", name: "Anil Gurung", score: 87, avatar: null, location: "Lazimpat" },
  { id: "3", name: "Priya Rai", score: 81, avatar: null, location: "Patan" },
];

const MOCK_RECENT_NOTIFICATIONS = [
  {
    id: "1",
    type: "application_received",
    title: "New application received",
    message: "Ravi Shrestha applied for your room in Thamel",
    href: "/applications/received",
    time: new Date(Date.now() - 30 * 60_000).toISOString(),
  },
  {
    id: "2",
    type: "match_found",
    title: "New AI match found",
    message: "You have a 92% compatibility match with Sita Thapa",
    href: "/matches",
    time: new Date(Date.now() - 2 * 3600_000).toISOString(),
  },
  {
    id: "3",
    type: "new_message",
    title: "New message",
    message: "Anil Gurung: 'Is the room still available?'",
    href: "/messages",
    time: new Date(Date.now() - 5 * 3600_000).toISOString(),
  },
];

export default async function DashboardPage() {
  const session = await verifySession();

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Welcome back! Here&apos;s an overview of your activity.
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/listings/create">
            <Button size="sm" className="gap-2">
              <Home className="h-4 w-4" />
              Post a Room
            </Button>
          </Link>
        </div>
      </div>

      {/* Trust Score card */}
      <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
        <CardContent className="p-5">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Trust Score</span>
                <Badge
                  variant="secondary"
                  className={`text-xs ${getTrustColor(MOCK_STATS.trustScore)}`}
                >
                  {getTrustLabel(MOCK_STATS.trustScore)}
                </Badge>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold">
                  {MOCK_STATS.trustScore}
                  <span className="text-base font-normal text-muted-foreground">
                    /100
                  </span>
                </span>
              </div>
              <Progress value={MOCK_STATS.trustScore} className="mt-2 h-2" />
            </div>
            <div className="flex flex-col gap-1.5 text-sm text-muted-foreground">
              <p className="text-xs font-medium text-foreground">Boost your score:</p>
              {[
                { done: true, label: "Email verified" },
                { done: true, label: "Profile photo added" },
                { done: false, label: "Phone number verified" },
                { done: false, label: "ID document uploaded" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <div
                    className={`h-3.5 w-3.5 rounded-full flex items-center justify-center ${
                      item.done ? "bg-primary" : "bg-muted border"
                    }`}
                  >
                    {item.done && (
                      <svg className="h-2 w-2 text-primary-foreground" fill="none" viewBox="0 0 12 12">
                        <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <span className={item.done ? "line-through opacity-60" : ""}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Active Listings",
            value: MOCK_STATS.activeListings,
            icon: Home,
            href: "/my-listings",
            color: "text-blue-500",
          },
          {
            label: "Saved Listings",
            value: MOCK_STATS.savedListings,
            icon: Bookmark,
            href: "/saved-listings",
            color: "text-purple-500",
          },
          {
            label: "AI Matches",
            value: MOCK_STATS.compatibilityMatches,
            icon: Sparkles,
            href: "/matches",
            color: "text-yellow-500",
          },
          {
            label: "Unread Messages",
            value: MOCK_STATS.unreadMessages,
            icon: MessageSquare,
            href: "/messages",
            color: "text-green-500",
          },
        ].map(({ label, value, icon: Icon, href, color }) => (
          <Link key={label} href={href}>
            <Card className="hover:border-primary/50 hover:shadow-sm transition-all">
              <CardContent className="p-4 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{label}</span>
                  <Icon className={`h-4 w-4 ${color}`} />
                </div>
                <span className="text-2xl font-bold">{value}</span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Two-column: Matches + Notifications */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Matches */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                Top Compatibility Matches
              </CardTitle>
              <Link href="/matches">
                <Button variant="ghost" size="sm" className="gap-1 text-xs">
                  View all
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
            <CardDescription>Your highest AI compatibility scores</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {MOCK_RECENT_MATCHES.map((match) => (
                <Link key={match.id} href={`/matches/${match.id}`}>
                  <div className="flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={match.avatar ?? undefined} />
                      <AvatarFallback className="text-xs font-semibold">
                        {match.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{match.name}</p>
                      <p className="text-xs text-muted-foreground">{match.location}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="h-1.5 w-16 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${match.score}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-primary">
                        {match.score}%
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Notifications */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <Bell className="h-4 w-4 text-primary" />
                Recent Activity
              </CardTitle>
              <Link href="/notifications">
                <Button variant="ghost" size="sm" className="gap-1 text-xs">
                  View all
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
            <CardDescription>Your latest notifications and updates</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {MOCK_RECENT_NOTIFICATIONS.map((n) => (
                <Link key={n.id} href={n.href}>
                  <div className="flex items-start gap-3 px-4 py-3 hover:bg-muted/50 transition-colors">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      {n.type === "new_message" ? (
                        <MessageSquare className="h-4 w-4 text-primary" />
                      ) : n.type === "match_found" ? (
                        <Sparkles className="h-4 w-4 text-primary" />
                      ) : (
                        <Bell className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{n.title}</p>
                      <p className="text-xs text-muted-foreground truncate">{n.message}</p>
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {timeAgo(n.time)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick actions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Post a Room", icon: Home, href: "/listings/create", desc: "List your space" },
              { label: "Find Roommate", icon: Sparkles, href: "/roommates/create", desc: "Post your requirement" },
              { label: "Sent Apps", icon: Send, href: "/applications/sent", desc: "Track your applications" },
              { label: "Received Apps", icon: Inbox, href: "/applications/received", desc: "Review applicants" },
            ].map(({ label, icon: Icon, href, desc }) => (
              <Link key={label} href={href}>
                <div className="flex flex-col items-center gap-2 rounded-xl border p-4 text-center hover:border-primary hover:bg-accent transition-all">
                  <Icon className="h-6 w-6 text-primary" />
                  <div>
                    <p className="text-sm font-medium">{label}</p>
                    <p className="text-xs text-muted-foreground">{desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

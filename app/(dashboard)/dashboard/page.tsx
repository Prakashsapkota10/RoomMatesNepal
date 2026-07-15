import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Users,
  Home,
  FileText,
  Heart,
  Bed,
  Wifi,
  Wind,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Lightbulb,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { verifySession } from "@/lib/auth";
import { buildMeta } from "@/lib/metadata";

export const metadata: Metadata = buildMeta({
  title: "Dashboard",
  noIndex: true,
});

// ─── Data Fetching — replace implementations with real DB/API queries ─────────

/**
 * Fetch current user's dashboard summary.
 * TODO: Replace with: await db.user.findUnique({ where: { id: session.userId } })
 */
async function getDashboardUser(_userId: string) {
  return {
    name: "Sameer",
    profileCompletion: 85,
    newMatches: 3,
  };
}

/**
 * Fetch user stats for the dashboard cards.
 * TODO: Replace with aggregated queries from your database.
 */
async function getDashboardStats(_userId: string) {
  return {
    profileSetup: 85,
    trustScore: 92,
    aiCompatibility: 98,
    unreadChats: 4,
  };
}

/**
 * Fetch the user's top AI compatibility match.
 * TODO: Replace with: await aiMatchingService.getBestMatch(userId)
 */
async function getBestMatch(_userId: string) {
  return {
    id: "1",
    name: "Priya Sharma",
    matchPercent: 98,
    avatar: null as string | null,
    isVerified: true,
    traits: ["Non-smoker", "Early Bird"],
    preferredLocation: "Prefers Patan/Bakhundole",
  };
}

/**
 * Fetch recommended rooms for the user.
 * TODO: Replace with: await listingService.getRecommended(userId, { limit: 2 })
 */
async function getRecommendedRooms(_userId: string) {
  return [
    {
      id: "room-1",
      title: "Sun-drenched Loft, Lalitpur",
      image: "https://images.unsplash.com/photo-1522771739289-72998db70261?w=400&q=80",
      price: 15000,
      features: ["1 Bed", "Fiber WiFi"],
      featureIcons: ["bed", "wifi"],
    },
    {
      id: "room-2",
      title: "Premium Co-living, Baluwatar",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80",
      price: 12500,
      features: ["1 Room", "AC Included"],
      featureIcons: ["home", "wind"],
    },
  ];
}

/**
 * Fetch AI-suggested roommates.
 * TODO: Replace with: await aiMatchingService.getSuggestedRoommates(userId, { limit: 3 })
 */
async function getSuggestedRoommates(_userId: string) {
  return [
    {
      id: "rm-1",
      name: "Anmol KC",
      matchPercent: 92,
      avatar: null as string | null,
      isVerified: true,
      tags: ["Techie", "Gym"],
    },
    {
      id: "rm-2",
      name: "Ritika Rai",
      matchPercent: 88,
      avatar: null as string | null,
      isVerified: true,
      tags: ["Med Student", "Cook"],
    },
    {
      id: "rm-3",
      name: "Saugat Malla",
      matchPercent: 85,
      avatar: null as string | null,
      isVerified: false,
      tags: ["Designer", "Music"],
    },
  ];
}

/**
 * Fetch recent activity feed.
 * TODO: Replace with: await activityService.getRecent(userId, { limit: 3 })
 */
async function getRecentActivity(_userId: string) {
  return [
    {
      id: "act-1",
      type: "verification",
      color: "bg-success",
      title: "Verification Success",
      message: "Your Citizenship document has been verified by our team.",
      time: "2 HOURS AGO",
    },
    {
      id: "act-2",
      type: "connection",
      color: "bg-trust",
      title: "New Connection",
      message: "You and Priya Sharma liked each other's profiles.",
      time: "YESTERDAY",
    },
    {
      id: "act-3",
      type: "match",
      color: "bg-community",
      title: "Match Suggested",
      message: "AI found a 95% match for your 'Bakhundole' requirement.",
      time: "2 DAYS AGO",
    },
  ];
}

// ─── Helper: Get greeting based on time of day ────────────────────────────────

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
}

// ─── Helper: Feature icon resolver ────────────────────────────────────────────

function FeatureIcon({ type }: { type: string }) {
  switch (type) {
    case "bed":
      return <Bed className="h-3.5 w-3.5 text-muted-foreground" />;
    case "wifi":
      return <Wifi className="h-3.5 w-3.5 text-muted-foreground" />;
    case "home":
      return <Home className="h-3.5 w-3.5 text-muted-foreground" />;
    case "wind":
      return <Wind className="h-3.5 w-3.5 text-muted-foreground" />;
    default:
      return null;
  }
}

// ─── Page Component ───────────────────────────────────────────────────────────

export default async function DashboardPage() {
  const session = await verifySession();

  // Fetch all dashboard data in parallel
  const [user, stats, bestMatch, rooms, roommates, activities] = await Promise.all([
    getDashboardUser(session.userId),
    getDashboardStats(session.userId),
    getBestMatch(session.userId),
    getRecommendedRooms(session.userId),
    getSuggestedRoommates(session.userId),
    getRecentActivity(session.userId),
  ]);

  return (
    <div className="flex flex-col gap-6 page-enter">
      {/* ── Hero: Greeting + Stats (left) + AI Best Match (right) ── */}
      <section className="grid lg:grid-cols-[1fr_280px] gap-5">
        {/* Left column — Greeting + Stats */}
        <div className="flex flex-col gap-5">
          {/* Greeting */}
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
              {getGreeting()}, {user.name} 👋
            </h1>
            <p className="text-sm text-muted-foreground mt-1.5">
              Your house-hunting journey is {user.profileCompletion}% complete.
              You have {user.newMatches} new roommate matches waiting for your review.
            </p>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Profile Setup */}
            <Card className="card-dashboard">
              <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                <div className="relative h-12 w-12">
                  <svg className="h-12 w-12 -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className="text-muted"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeDasharray={`${stats.profileSetup}, 100`}
                      className="text-primary"
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-bold">
                    {stats.profileSetup}%
                  </span>
                </div>
                <span className="text-xs text-muted-foreground font-medium">Profile Setup</span>
              </CardContent>
            </Card>

            {/* Trust Score */}
            <Card className="card-dashboard">
              <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="h-5 w-5 text-trust" />
                  <span className="text-2xl font-bold">{stats.trustScore}</span>
                </div>
                <span className="text-xs text-muted-foreground font-medium">Trust Score</span>
              </CardContent>
            </Card>

            {/* AI Compatibility */}
            <Card className="card-dashboard">
              <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="h-5 w-5 text-ai" />
                  <span className="text-2xl font-bold">{stats.aiCompatibility}%</span>
                </div>
                <span className="text-xs text-muted-foreground font-medium">AI Compatibility</span>
              </CardContent>
            </Card>

            {/* Unread Chats */}
            <Card className="card-dashboard">
              <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded bg-error-light dark:bg-error/20">
                    <span className="h-2.5 w-2.5 rounded-sm bg-error" />
                  </span>
                  <span className="text-2xl font-bold">
                    {String(stats.unreadChats).padStart(2, "0")}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground font-medium">Unread Chats</span>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right column — AI Best Match Card */}
        <Card className="h-fit">
          <CardContent className="p-4">
            <div className="flex items-center gap-1.5 mb-3">
              <Badge variant="secondary" className="text-[10px] uppercase tracking-wider font-semibold bg-primary/10 text-primary border-0">
                <Sparkles className="h-3 w-3 mr-1" />
                AI Best Match
              </Badge>
            </div>
            <div className="flex items-center gap-3">
              <Avatar className="h-11 w-11">
                <AvatarImage src={bestMatch.avatar ?? undefined} />
                <AvatarFallback className="text-sm font-bold bg-primary/10 text-primary">
                  {bestMatch.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-semibold text-foreground">{bestMatch.name}</p>
                <p className="text-xs text-muted-foreground">
                  {bestMatch.matchPercent}% Match Probability
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-1.5 mt-3 text-xs text-muted-foreground">
              {bestMatch.isVerified && (
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                  Verified Student
                </span>
              )}
              {bestMatch.traits.map((trait) => (
                <span key={trait} className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                  {trait}
                </span>
              ))}
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                {bestMatch.preferredLocation}
              </span>
            </div>
            <Link href="/ai-match">
              <Button className="w-full mt-4 btn-primary-motion gap-2 rounded-lg text-sm font-semibold">
                View Full Profile
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* ── Quick Actions ──────────────────────────────────────────── */}
      <section>
        <h2 className="text-lg font-bold text-foreground mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: "Find Room", desc: "Browse available rooms", icon: Search, href: "/explore", color: "text-brand bg-brand-light" },
            { label: "Find Roommate", desc: "Match with individuals", icon: Users, href: "/explore", color: "text-ai-dark bg-ai-light" },
            { label: "Post Listing", desc: "Rent out your space", icon: Home, href: "/activities", color: "text-foreground bg-muted" },
            { label: "Create Requirement", desc: "Tell us what you need", icon: FileText, href: "/activities", color: "text-community bg-community-light", highlighted: true },
          ].map(({ label, desc, icon: Icon, href, color, highlighted }) => (
            <Link key={label} href={href}>
              <Card className={`card-listing h-full ${highlighted ? "border-primary/40" : ""}`}>
                <CardContent className="p-4 flex flex-col gap-2.5">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{label}</p>
                    <p className="text-xs text-muted-foreground">{desc}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Main Content: Rooms + Activity Sidebar ─────────────────── */}
      <div className="grid lg:grid-cols-[1fr_280px] gap-6">
        {/* Left column */}
        <div className="flex flex-col gap-6">
          {/* Recommended Rooms */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold text-foreground">Recommended Rooms</h2>
              <Link href="/explore" className="text-sm text-primary font-medium flex items-center gap-1 hover:underline">
                See all <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {rooms.map((room) => (
                <Link key={room.id} href="/explore">
                  <Card className="card-listing overflow-hidden">
                    <div className="relative">
                      <Image
                        src={room.image}
                        alt={room.title}
                        width={400}
                        height={200}
                        className="w-full h-40 object-cover"
                      />
                      <span className="absolute top-3 left-3 bg-foreground/80 text-background text-xs font-bold px-2 py-1 rounded">
                        Rs. {room.price.toLocaleString()}/mo
                      </span>
                      <button
                        className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/80 dark:bg-card/80 flex items-center justify-center hover:bg-white transition-colors"
                        aria-label="Save listing"
                      >
                        <Heart className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </div>
                    <CardContent className="p-3">
                      <p className="text-sm font-semibold text-foreground">{room.title}</p>
                      <div className="flex items-center gap-3 mt-1.5">
                        {room.features.map((feature, i) => (
                          <span key={feature} className="flex items-center gap-1 text-xs text-muted-foreground">
                            <FeatureIcon type={room.featureIcons[i]} />
                            {feature}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          {/* Suggested Roommates */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold text-foreground">Suggested Roommates</h2>
              <Link href="/ai-match" className="text-sm text-primary font-medium flex items-center gap-1 hover:underline">
                Match more <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {roommates.map((mate) => (
                <Card key={mate.id} className="card-ai-match">
                  <CardContent className="p-4 flex flex-col items-center text-center gap-2.5">
                    <div className="relative">
                      <Avatar className="h-14 w-14">
                        <AvatarImage src={mate.avatar ?? undefined} />
                        <AvatarFallback className="text-lg font-bold bg-primary/10 text-primary">
                          {mate.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      {mate.isVerified && (
                        <span className="absolute -bottom-0.5 -right-0.5 h-5 w-5 rounded-full bg-success flex items-center justify-center ring-2 ring-card">
                          <CheckCircle2 className="h-3 w-3 text-white" />
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{mate.name}</p>
                      <p className="text-xs text-primary font-medium">{mate.matchPercent}% Match</p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-1.5">
                      {mate.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-[10px] px-2 py-0.5 font-medium">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-1 btn-secondary-motion text-xs font-semibold">
                      Say Hello
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>

        {/* Right column — Activity + Safety Tip */}
        <aside className="flex flex-col gap-5">
          {/* Recent Activity */}
          <Card>
            <CardContent className="p-4">
              <h3 className="text-sm font-bold text-foreground mb-4">Recent Activity</h3>
              <div className="flex flex-col gap-4">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex gap-3">
                    <span className={`mt-1 h-2.5 w-2.5 rounded-full shrink-0 ${activity.color}`} />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-foreground leading-tight">
                        {activity.title}
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">
                        {activity.message}
                      </p>
                      <p className="text-[10px] text-muted-foreground/60 uppercase tracking-wide mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Safety Tip */}
          <Card className="bg-warning-light dark:bg-warning/10 border-warning/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="h-4 w-4 text-warning-dark dark:text-warning" />
                <h3 className="text-xs font-bold text-warning-dark dark:text-warning">AI Safety Tip</h3>
              </div>
              <p className="text-[11px] text-warning-dark/80 dark:text-warning/80 leading-relaxed">
                Always meet potential roommates in a public space like a cafe before
                finalizing any agreements. Check for the &quot;Verified&quot; badge for
                extra security.
              </p>
              <Link
                href="/trust-score"
                className="inline-block mt-2 text-[11px] text-primary font-semibold hover:underline"
              >
                Learn more about Trust
              </Link>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}

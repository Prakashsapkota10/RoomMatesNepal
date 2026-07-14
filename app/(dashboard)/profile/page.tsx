import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Pencil,
  Share2,
  MapPin,
  Camera,
  CheckCircle2,
  Circle,
  Lock,
  Info,
  DollarSign,
  Moon as MoonIcon,
  Ban,
  PawPrint,
  UtensilsCrossed,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { verifySession } from "@/lib/auth";
import { buildMeta } from "@/lib/metadata";

export const metadata: Metadata = buildMeta({ title: "My Profile", noIndex: true });

// ─── Data Fetching — replace with real DB/API queries ─────────────────────────

/**
 * Fetch user profile data.
 * TODO: Replace with: await db.user.findUnique({ where: { id: userId }, include: { ... } })
 */
async function getProfileData(_userId: string) {
  return {
    name: "Arjun Prajapati",
    email: "arjun@example.com",
    phone: "+977 9801234567",
    avatar: null as string | null,
    coverImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&q=80",
    location: "Kathmandu, Nepal",
    isPremium: true,
    isVerified: true,
    bio: "I'm a software engineer working remotely for a tech firm. I value a clean workspace and a quiet environment during the day. I enjoy weekend treks and occasional cooking sessions. Looking for someone respectful, tidy, and career-focused to share a premium flat in the Sanepa or Jhamsikhel area.",
    budget: { min: 15000, max: 25000, note: "Flexible for prime locations" },
    sleepSchedule: { type: "Night Owl", activeHours: "11 PM — 8 AM" },
    lifestyle: [
      { label: "No Smoking", icon: "ban" },
      { label: "Pet Friendly", icon: "paw" },
      { label: "Vegetarian Preferred", icon: "utensils" },
    ],
    profileCompletion: 85,
    profileViews: 124,
    totalSaves: 48,
    verifications: {
      phone: true,
      govtId: true,
      linkedin: false,
      socialMedia: false,
    },
  };
}

// ─── Lifestyle Icon Resolver ──────────────────────────────────────────────────

function LifestyleIcon({ type }: { type: string }) {
  switch (type) {
    case "ban":
      return <Ban className="h-4 w-4" />;
    case "paw":
      return <PawPrint className="h-4 w-4" />;
    case "utensils":
      return <UtensilsCrossed className="h-4 w-4" />;
    default:
      return null;
  }
}

// ─── Page Component ───────────────────────────────────────────────────────────

export default async function ProfilePage() {
  const session = await verifySession();
  const profile = await getProfileData(session.userId);

  return (
    <div className="flex flex-col gap-6 page-enter">
      {/* Page heading */}
      <h1 className="text-lg font-bold text-primary">Profile Management</h1>

      {/* ── Cover Photo + Avatar Hero ──────────────────────────────── */}
      <div className="relative">
        {/* Cover image */}
        <div className="relative h-44 sm:h-56 rounded-xl overflow-hidden bg-muted">
          <Image
            src={profile.coverImage}
            alt="Profile cover"
            fill
            className="object-cover"
            priority
          />
          {/* Watermark */}
          <span className="absolute bottom-4 right-4 text-white/40 text-sm font-bold tracking-wider select-none">
            ROOMMATE NEPAL
          </span>
          {/* Edit cover button */}
          <Button
            variant="secondary"
            size="sm"
            className="absolute top-3 right-3 gap-1.5 bg-white/80 dark:bg-card/80 backdrop-blur-sm text-xs font-medium"
          >
            <Camera className="h-3.5 w-3.5" />
            Edit Cover
          </Button>
        </div>

        {/* Avatar — overlapping bottom-left */}
        <div className="absolute -bottom-10 left-5 sm:left-8">
          <div className="relative">
            <Avatar className="h-24 w-24 ring-4 ring-background">
              <AvatarImage src={profile.avatar ?? undefined} />
              <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary">
                {profile.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            {profile.isVerified && (
              <span className="absolute bottom-0 right-0 h-7 w-7 rounded-full bg-success flex items-center justify-center ring-3 ring-background">
                <CheckCircle2 className="h-4 w-4 text-white" />
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── Name + Actions row ─────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-8 sm:mt-6 pl-1">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-foreground">{profile.name}</h2>
            {profile.isPremium && (
              <Badge className="text-[10px] bg-primary/10 text-primary border-0 font-semibold">
                Premium
              </Badge>
            )}
          </div>
          <span className="flex items-center gap-1 text-sm text-muted-foreground mt-0.5">
            <MapPin className="h-3.5 w-3.5" />
            {profile.location}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/profile/edit">
            <Button size="sm" className="btn-primary-motion gap-1.5 font-semibold">
              <Pencil className="h-3.5 w-3.5" />
              Edit Profile
            </Button>
          </Link>
          <Button variant="outline" size="sm" className="btn-secondary-motion h-8 w-8 p-0" aria-label="Share profile">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* ── Tab Navigation ─────────────────────────────────────────── */}
      <div className="border-b">
        <nav className="flex gap-6 overflow-x-auto">
          {["Personal Info", "Living Preferences", "Verification", "Privacy", "Analytics"].map((tab, i) => (
            <button
              key={tab}
              className={`pb-2.5 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                i === 0
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* ── Main Content: Left (Info) + Right (Analytics Sidebar) ─── */}
      <div className="grid lg:grid-cols-[1fr_280px] gap-6">
        {/* Left column — Personal Info tab content */}
        <div className="flex flex-col gap-5">
          {/* Budget + Sleep Schedule cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Monthly Budget */}
            <Card className="card-dashboard">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                    <DollarSign className="h-4.5 w-4.5 text-primary" />
                  </div>
                  <Button variant="ghost" size="icon-xs" aria-label="Edit budget">
                    <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground font-medium">Monthly Budget</p>
                <p className="text-base font-bold text-foreground mt-0.5">
                  Rs. {profile.budget.min.toLocaleString()} – {profile.budget.max.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{profile.budget.note}</p>
              </CardContent>
            </Card>

            {/* Sleep Schedule */}
            <Card className="card-dashboard">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-ai-light">
                    <MoonIcon className="h-4.5 w-4.5 text-ai" />
                  </div>
                  <Button variant="ghost" size="icon-xs" aria-label="Edit schedule">
                    <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground font-medium">Sleep Schedule</p>
                <p className="text-base font-bold text-foreground mt-0.5">{profile.sleepSchedule.type}</p>
                <p className="text-xs text-muted-foreground mt-1">Active {profile.sleepSchedule.activeHours}</p>
              </CardContent>
            </Card>
          </div>

          {/* Lifestyle badges */}
          <div className="flex flex-wrap gap-3">
            {profile.lifestyle.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-card ring-1 ring-foreground/5 text-sm font-medium text-foreground"
              >
                <span className="text-primary">
                  <LifestyleIcon type={item.icon} />
                </span>
                {item.label}
              </div>
            ))}
          </div>

          {/* Bio & Living Style */}
          <Card>
            <CardContent className="p-5">
              <h3 className="text-sm font-bold text-foreground mb-3">Bio & Living Style</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {profile.bio}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Right column — Profile Analytics & Trust */}
        <aside className="flex flex-col gap-5">
          {/* Profile Analytics */}
          <Card>
            <CardContent className="p-4">
              <h3 className="text-sm font-bold text-foreground mb-4">Profile Analytics</h3>

              {/* Stats row */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="text-center p-3 rounded-lg bg-muted/50">
                  <p className="text-2xl font-bold text-primary">{profile.profileViews}</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide mt-0.5">Profile Views</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-muted/50">
                  <p className="text-2xl font-bold text-primary">{profile.totalSaves}</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide mt-0.5">Total Saves</p>
                </div>
              </div>

              {/* Profile completion */}
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-muted-foreground font-medium">Profile Completion</span>
                <span className="font-bold text-foreground">{profile.profileCompletion}%</span>
              </div>
              <Progress value={profile.profileCompletion} className="h-2" />
            </CardContent>
          </Card>

          {/* Trust & Verification */}
          <Card>
            <CardContent className="p-4">
              <h3 className="text-sm font-bold text-foreground mb-4">Trust & Verification</h3>
              <div className="flex flex-col gap-3">
                {[
                  { label: "Phone Verified", done: profile.verifications.phone },
                  { label: "Govt ID Uploaded", done: profile.verifications.govtId },
                  { label: "LinkedIn Connect", done: profile.verifications.linkedin, action: "Verify" },
                  { label: "Social Media", done: profile.verifications.socialMedia, action: "Verify" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2.5">
                    {item.done ? (
                      <CheckCircle2 className="h-4.5 w-4.5 text-success shrink-0" />
                    ) : (
                      <Circle className="h-4.5 w-4.5 text-muted-foreground/40 shrink-0" />
                    )}
                    <span className={`flex-1 text-sm ${item.done ? "text-foreground" : "text-muted-foreground"}`}>
                      {item.label}
                    </span>
                    {!item.done && item.action && (
                      <Button variant="ghost" size="xs" className="text-primary text-xs font-medium h-auto p-0">
                        {item.action}
                      </Button>
                    )}
                    {!item.done && !item.action && (
                      <Lock className="h-3.5 w-3.5 text-muted-foreground/40" />
                    )}
                  </div>
                ))}
              </div>

              {/* Verification CTA */}
              <div className="mt-4 p-3 rounded-lg bg-muted/50 flex items-start gap-2">
                <Info className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                <p className="text-[11px] text-muted-foreground leading-snug">
                  Complete all verifications to boost your Trust Score by{" "}
                  <span className="font-bold text-primary">+25 points</span>.
                </p>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}

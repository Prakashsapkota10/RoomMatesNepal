import type { Metadata } from "next";
import Link from "next/link";
import {
  Search,
  MapPin,
  Sparkles,
  Star,
  Shield,
  ArrowRight,
  Users,
  Home,
  MessageSquare,
  ChevronRight,
  CheckCircle2,
  TrendingUp,
  Moon,
  Utensils,
  PawPrint,
  Wind,
  Lock,
  Smartphone,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  BadgeCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { APP_NAME, POPULAR_LOCATIONS, SUBSCRIPTION_PLANS } from "@/lib/constants";
import { RoommateCard } from "@/components/roommates/roommate-card";
import { RoomCard } from "@/components/roo/room-card/page";
import { MOCK_ROOMMATES, MOCK_LISTINGS } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: `${APP_NAME} — AI-Powered Roommate Finder in Nepal`,
  description:
    "Find your perfect roommate or room in Nepal with AI-powered compatibility matching. Browse verified listings in Kathmandu, Pokhara, and across Nepal.",
};

// ─── Static data ─────────────────────────────────────────────────────────────

// Featured roommates: top 4 by compatibility score
const FEATURED_ROOMMATES = MOCK_ROOMMATES.filter((r) => r.compatibilityScore).slice(0, 4);

// Premium rooms: first 3 verified listings with a high landlord trust score
const PREMIUM_ROOMS = MOCK_LISTINGS.filter((l) => l.isVerified).slice(0, 3);

const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    location: "Kathmandu",
    text: "Found my perfect roommate within a week! The AI matching is incredibly accurate — we have the same sleep schedule and cleanliness standards.",
    rating: 5,
    avatar: "P",
  },
  {
    name: "Rohan Thapa",
    location: "Pokhara",
    text: "As a student from Biratnagar, I was nervous about finding safe housing. RoomMate Nepal made it easy and safe with verified listings.",
    rating: 5,
    avatar: "R",
  },
  {
    name: "Sita Gurung",
    location: "Lalitpur",
    text: "Listed my apartment and had 3 quality applications in 2 days. The platform weeds out mismatched applicants automatically.",
    rating: 5,
    avatar: "S",
  },
];

const FAQS = [
  {
    q: "How does AI matching work?",
    a: "Our AI analyses your lifestyle preferences — sleep schedule, cleanliness, noise tolerance, and over 20 other factors — then computes compatibility scores with other users. Scores above 80% are highlighted as top matches.",
  },
  {
    q: "Is the platform free to use?",
    a: "Yes! The Free plan lets you browse listings, apply to rooms, and get basic AI matches. Premium plans unlock unlimited applications, featured listings, and full compatibility reports.",
  },
  {
    q: "How do I verify my listing?",
    a: "Upload your citizenship card or property documents in Profile → Verification. Our team reviews within 24 hours and awards a Verified badge, boosting your listing visibility.",
  },
  {
    q: "Can I manage multiple rental properties?",
    a: "Yes — the Tenant role (and Enterprise plan) supports multiple property listings, tenant management, and an analytics dashboard. Switch your role in Profile → Settings.",
  },
  {
    q: "How secure is messaging?",
    a: "All messages are end-to-end encrypted. You can also report suspicious users. Our trust score system ranks verified users higher, so you always see who you're dealing with.",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-background via-muted/20 to-background pt-28 pb-20 lg:pt-36 lg:pb-28 flex items-center">
        {/* Subtle radial background glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute top-1/3 right-0 h-[400px] w-[500px] rounded-full bg-[color:var(--ai)]/5 blur-3xl" />
        </div>

        <div className="container relative mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

            {/* ── Left: Copy ─────────────────────────────────────────── */}
            <div className="flex flex-col gap-6">
              {/* Trust badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--success)]/30 bg-[color:var(--success-light)] px-3.5 py-1.5 text-xs font-semibold text-[color:var(--success-dark)] w-fit">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[color:var(--success)] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[color:var(--success)]" />
                </span>
                TRUSTED BY 10,000+ STUDENTS
              </div>

              <div className="flex flex-col gap-3">
                <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight leading-[1.1]">
                  Find Your Perfect
                  <br />
                  <span className="text-primary">Roommate</span> in Nepal
                </h1>
                <p className="text-base lg:text-lg text-muted-foreground max-w-md leading-relaxed">
                  AI-powered roommate matching, verified profiles, trusted
                  reviews, secure chat, and thousands of room listings across
                  Nepal.
                </p>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-3">
                <Link href="/listings">
                  <Button size="lg" className="btn-primary-motion gap-2 rounded-xl px-6 font-semibold shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/25">
                    Find a Room
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/roommates">
                  <Button size="lg" variant="outline" className="btn-secondary-motion gap-2 rounded-xl px-6 font-semibold">
                    Find a Roommate
                  </Button>
                </Link>
              </div>

              {/* Trust signals */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-1">
                <span className="flex items-center gap-1.5">
                  <Shield className="h-3.5 w-3.5 text-primary" />
                  Verified Listings
                </span>
                <Separator orientation="vertical" className="h-3.5" />
                <span className="flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                  AI Compatibility Scores
                </span>
                <Separator orientation="vertical" className="h-3.5" />
                <span className="flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5 text-primary" />
                  10,000+ Users
                </span>
              </div>
            </div>

            {/* ── Right: Floating Cards ───────────────────────────────── */}
            <div className="relative flex flex-col items-center lg:items-end gap-4 lg:pl-8">

              {/* Decorative glow behind card 1 */}
              <div className="pointer-events-none absolute -top-8 right-0 h-64 w-64 rounded-full bg-primary/8 blur-3xl" aria-hidden />

              {/* ────────────────────────────────────────────────────────
                  Card 1 — 94% Compatible Match (Prerana S.)
              ──────────────────────────────────────────────────────── */}
              <div
                className="w-full max-w-[340px]"
                style={{ animation: "floatIn 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.15s both" }}
              >
                <div className="card-ai-match group relative rounded-2xl border border-border/60 bg-card/95 dark:bg-card/85 backdrop-blur-md p-5 shadow-2xl shadow-black/8 dark:shadow-black/30 overflow-hidden cursor-default">

                  {/* Corner accent gradient — morphs on hover */}
                  <div className="pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full bg-primary/10 blur-2xl transition-all duration-300 group-hover:bg-primary/18 group-hover:scale-110" />
                  <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gradient-to-br from-primary/[0.04] via-transparent to-[color:var(--ai)]/[0.04]" />

                  {/* ── Top row: badge + ring ── */}
                  <div className="relative flex items-center justify-between mb-4">
                    {/* AI badge */}
                    <div className="flex items-center gap-1.5 rounded-full bg-primary/10 dark:bg-primary/20 px-3 py-1 text-xs font-bold text-primary border border-primary/15">
                      <Sparkles className="h-3 w-3" />
                      94% Compatible Match
                    </div>

                    {/* Animated SVG ring — uses dashDraw keyframe */}
                    <div className="relative h-11 w-11 shrink-0">
                      {/* Outer glow ring */}
                      <div className="absolute inset-0 rounded-full ring-pulse"
                           style={{ background: "radial-gradient(circle, var(--primary) 0%, transparent 70%)", opacity: 0.12 }} />
                      <svg
                        className="h-11 w-11"
                        viewBox="0 0 44 44"
                        style={{ transform: "rotate(-90deg)" }}
                      >
                        {/* Track */}
                        <circle
                          cx="22" cy="22" r="18"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          className="text-muted/25 dark:text-muted/20"
                        />
                        {/* Progress arc */}
                        <circle
                          cx="22" cy="22" r="18"
                          fill="none"
                          stroke="url(#matchGradient)"
                          strokeWidth="3"
                          strokeLinecap="round"
                          style={{
                            strokeDasharray: `${(2 * Math.PI * 18 * 94) / 100} ${2 * Math.PI * 18}`,
                            strokeDashoffset: "0",
                            animation: "dashDraw 1.4s cubic-bezier(0.34,1.56,0.64,1) 0.6s both",
                          }}
                        />
                        <defs>
                          <linearGradient id="matchGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="var(--primary)" />
                            <stop offset="100%" stopColor="var(--trust)" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-[10px] font-extrabold text-primary">
                        94%
                      </span>
                    </div>
                  </div>

                  {/* ── User row ── */}
                  <div className="relative flex items-center gap-3 mb-4">
                    {/* Avatar with gradient background */}
                    <div className="relative h-12 w-12 shrink-0 rounded-full overflow-hidden shadow-md">
                      <div className="h-full w-full bg-gradient-to-br from-[color:var(--community-light)] via-[color:var(--community)] to-[color:var(--ai)] flex items-center justify-center text-white font-extrabold text-lg select-none">
                        P
                      </div>
                      {/* Online indicator */}
                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-[color:var(--success)] border-2 border-card" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-sm text-foreground leading-tight">Prerana S.</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Kathmandu</p>
                    </div>
                  </div>

                  {/* ── Compatibility bar ── */}
                  <div className="relative mb-4">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-medium text-muted-foreground">Compatibility</span>
                      <span className="text-xs font-extrabold text-primary">94%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted/60 dark:bg-muted/40 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary via-primary to-[color:var(--trust)]"
                        style={{
                          "--bar-fill": "94%",
                          animation: "barFill 1s cubic-bezier(0.22,1,0.36,1) 0.8s both",
                        } as React.CSSProperties}
                      />
                    </div>
                  </div>

                  {/* ── Trait chips ── */}
                  <div className="relative flex flex-wrap gap-1.5">
                    {(["Clean", "Non-Smoker", "Same Budget"] as const).map((trait) => (
                      <span
                        key={trait}
                        className="inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary/6 dark:bg-primary/12 px-2.5 py-0.5 text-[11px] font-semibold text-primary transition-colors duration-150 hover:bg-primary/12 dark:hover:bg-primary/20"
                      >
                        <CheckCircle2 className="h-3 w-3 shrink-0" />
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* ────────────────────────────────────────────────────────
                  Card 2 — Horizontal Stats (Users / Listings / Matches)
              ──────────────────────────────────────────────────────── */}
              <div
                className="w-full max-w-[340px]"
                style={{ animation: "floatIn 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.28s both" }}
              >
                <div className="card-dashboard stat-shimmer relative rounded-2xl border border-border/60 bg-card/95 dark:bg-card/85 backdrop-blur-md overflow-hidden shadow-xl shadow-black/6 dark:shadow-black/25 cursor-default">

                  {/* Subtle gradient wash */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[color:var(--trust)]/[0.035] via-transparent to-[color:var(--success)]/[0.035]" />

                  <div className="relative flex items-stretch">
                    {([
                      { value: "12,000+", label: "Users",    icon: Users,      color: "var(--trust)",     bg: "var(--trust-light)"     },
                      { value: "3,500+",  label: "Listings", icon: Home,       color: "var(--community)", bg: "var(--community-light)" },
                      { value: "2,100+",  label: "Matches",  icon: TrendingUp, color: "var(--success)",   bg: "var(--success-light)"   },
                    ] as const).map((stat, idx) => (
                      <div
                        key={stat.label}
                        className="flex-1 flex flex-col items-center justify-center gap-2 px-2 py-4"
                        style={{
                          borderRight: idx < 2 ? "1px solid var(--border)" : "none",
                        }}
                      >
                        {/* Icon badge */}
                        <div
                          className="flex h-8 w-8 items-center justify-center rounded-xl transition-transform duration-200 hover:scale-110"
                          style={{ backgroundColor: stat.bg }}
                        >
                          <stat.icon
                            className="h-4 w-4"
                            style={{ color: stat.color }}
                          />
                        </div>
                        {/* Value */}
                        <span
                          className="text-[15px] font-extrabold tracking-tight leading-none"
                          style={{ color: stat.color }}
                        >
                          {stat.value}
                        </span>
                        {/* Label */}
                        <span className="text-[11px] text-muted-foreground font-medium text-center leading-tight">
                          {stat.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* ── Search bar (below hero columns) ────────────────────────── */}
          <div className="mt-14 animate-in fade-in slide-in-from-bottom-4 duration-300 ease-out fill-mode-both [animation-delay:350ms]">
            <div className="rounded-2xl border bg-card/80 backdrop-blur-sm shadow-lg shadow-black/5 dark:shadow-black/15 p-3">
              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                {/* Location */}
                <div className="input-container flex flex-1 items-center gap-2 rounded-xl bg-background px-3 py-2.5 border">
                  <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                  <input
                    type="text"
                    placeholder="Kathmandu, Pokhara..."
                    className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                    aria-label="Location"
                  />
                </div>

                {/* Category */}
                <div className="input-container flex items-center gap-2 rounded-xl bg-background px-3 py-2.5 border min-w-[130px]">
                  <Home className="h-4 w-4 text-muted-foreground shrink-0" />
                  <select className="flex-1 bg-transparent text-sm outline-none text-foreground" aria-label="Category">
                    <option value="">Any Type</option>
                    <option value="room">Single Room</option>
                    <option value="apartment">Apartment</option>
                    <option value="hostel">Hostel</option>
                    <option value="pg">PG</option>
                  </select>
                </div>

                {/* Budget */}
                <div className="input-container flex items-center gap-2 rounded-xl bg-background px-3 py-2.5 border min-w-[140px]">
                  <span className="text-xs font-semibold text-muted-foreground shrink-0">NPR</span>
                  <input
                    type="number"
                    placeholder="Budget (Max)"
                    className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground w-20"
                    aria-label="Max budget"
                  />
                </div>

                {/* Gender */}
                <div className="input-container flex items-center gap-2 rounded-xl bg-background px-3 py-2.5 border min-w-[110px]">
                  <Users className="h-4 w-4 text-muted-foreground shrink-0" />
                  <select className="flex-1 bg-transparent text-sm outline-none text-foreground" aria-label="Gender preference">
                    <option value="">Any</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                {/* Search button */}
                <Link href="/listings">
                  <Button size="default" className="btn-primary-motion gap-2 w-full sm:w-auto rounded-xl px-6 font-semibold shadow-md shadow-primary/20">
                    <Search className="h-4 w-4" />
                    Search
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* ── I Need a Room / I Need a Roommate ───────────────────────────── */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-5">
            {/* I Need a Room */}
            <Link href="/listings" className="card-listing group relative overflow-hidden rounded-2xl min-h-[220px] flex flex-col justify-end">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-primary/60" />
              {/* real apartment photo */}
              <img
                src="/pexels-szafran-37485325.jpg"
                alt="Apartment building"
                className="absolute inset-0 h-full w-full object-cover opacity-40 transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="relative p-6 text-white">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl">🏠</span>
                  <h2 className="text-xl font-bold">I Need a Room</h2>
                </div>
                <p className="text-sm text-white/80 mb-4">Browse thousands of verified rooms across Nepal's major cities.</p>
                <Button size="sm" className="btn-primary-motion bg-white text-primary hover:bg-white/90 font-semibold rounded-lg px-4">
                  Explore Rooms
                </Button>
              </div>
            </Link>

            {/* I Need a Roommate */}
            <Link href="/roommates" className="card-listing group relative overflow-hidden rounded-2xl min-h-[220px] flex flex-col justify-end">
              <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--community)]/80 to-[color:var(--community)]/60" />
              {/* real apartment photo */}
              <img
                src="/pexels-alinaskazka-20094613.jpg"
                alt="Residential building"
                className="absolute inset-0 h-full w-full object-cover opacity-40 transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="relative p-6 text-white">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl">🤝</span>
                  <h2 className="text-xl font-bold">I Need a Roommate</h2>
                </div>
                <p className="text-sm text-white/80 mb-4">Find someone who shares your lifestyle, budget, and vibes.</p>
                <Button size="sm" className="btn-primary-motion bg-white text-[color:var(--community)] hover:bg-white/90 font-semibold rounded-lg px-4">
                  Find Partners
                </Button>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── AI Smart Matching ─────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-block rounded-full border border-[color:var(--ai)]/40 bg-[color:var(--ai-light)] px-3 py-1 text-xs font-semibold text-[color:var(--ai-dark)] mb-3 tracking-wide">
              SMART MATCHING
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold mb-3">AI Finds Roommates That Match Your Lifestyle</h2>
            <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Our advanced algorithm analyzes <span className="text-primary font-medium">20+ lifestyle factors</span> to find you a roommate you'll actually get along with.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Left: lifestyle factor cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Moon,     title: "Sleep Schedule",  desc: "Early birds or night owls — we've got you matched.",          color: "var(--primary)"   },
                { icon: Utensils, title: "Dietary Habits",  desc: "Vegetarian? Love to cook? Shared meals or solo vibes.",        color: "var(--ai)"        },
                { icon: PawPrint, title: "Pet Friendly",    desc: "Animal lovers or allergy-safe zones, strictly filtered.",      color: "var(--success)"   },
                { icon: Wind,     title: "Cleanliness",     desc: "Set your expectations for shared spaces and cleaning days.",    color: "var(--trust)"     },
              ].map(({ icon: Icon, title, desc, color }) => (
                <div key={title} className="card-dashboard rounded-2xl border bg-card p-5">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: `color-mix(in srgb, ${color} 12%, transparent)` }}>
                    <Icon className="h-5 w-5" style={{ color }} />
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>

            {/* Right: Compatibility score card */}
            <div className="card-dashboard rounded-2xl border bg-card p-6 shadow-lg">
              <h3 className="text-lg font-bold mb-5">Compatibility Score</h3>
              <div className="flex flex-col gap-5">
                {[
                  { label: "Vibe Match",       pct: 98, color: "var(--primary)" },
                  { label: "Budget Alignment", pct: 85, color: "var(--primary)" },
                ].map(({ label, pct, color }) => (
                  <div key={label}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{label}</span>
                      <span className="text-sm font-bold" style={{ color }}>{pct}%</span>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700 ease-out"
                        style={{ width: `${pct}%`, backgroundColor: color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <blockquote className="mt-6 rounded-xl bg-muted/50 px-4 py-3 text-sm text-muted-foreground italic border-l-2 border-primary">
                "It's like they read my mind. Found the perfect roommate in 3 days!"
              </blockquote>
              <Link href="/matches" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline underline-offset-4">
                See how AI works <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Roommates ────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold">Featured Roommates</h2>
              <p className="text-muted-foreground mt-1">Top-rated profiles looking for a home.</p>
            </div>
            <div className="flex items-center gap-2">
              <button aria-label="Previous" className="flex h-8 w-8 items-center justify-center rounded-full border bg-card btn-secondary-motion hover:border-primary hover:text-primary transition-colors duration-150">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button aria-label="Next" className="flex h-8 w-8 items-center justify-center rounded-full border bg-card btn-secondary-motion hover:border-primary hover:text-primary transition-colors duration-150">
                <ChevronRightIcon className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
            {FEATURED_ROOMMATES.map((roommate, i) => (
              <div
                key={roommate.id}
                className="flex animate-in fade-in slide-in-from-bottom-3 duration-300 fill-mode-both"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <RoommateCard roommate={roommate} equalHeight className="w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Premium Rooms ─────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-muted/20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold">Premium Rooms</h2>
              <p className="text-muted-foreground mt-1">Verified listings in prime locations.</p>
            </div>
            <Link href="/listings" className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary hover:underline underline-offset-4">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
            {PREMIUM_ROOMS.map((listing, i) => (
              <div
                key={listing.id}
                className="flex animate-in fade-in slide-in-from-bottom-3 duration-300 fill-mode-both"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <RoomCard listing={listing} equalHeight className="w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ── Safety Section ────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold mb-2">Your Safety is Our Priority</h2>
          <p className="text-primary-foreground/75 mb-12 max-w-lg mx-auto text-sm">
            We've built a community based on trust, verification, and real human interactions.
          </p>
          <div className="grid sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              { icon: Shield,      title: "Identity Verification", desc: "Mandatory Citizenship or Student ID verification for all premium users." },
              { icon: Star,        title: "Trust Score",           desc: "Advanced rating system based on past roommate experiences and reviews."  },
              { icon: Lock,        title: "Secure Messaging",      desc: "Chat without sharing personal numbers until you're ready to meet."       },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex flex-col items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-foreground/10 border border-primary-foreground/20">
                  <Icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-bold text-sm">{title}</h3>
                <p className="text-xs text-primary-foreground/70 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How RoomMate Nepal Works ──────────────────────────────────────── */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-center mb-14">How RoomMate Nepal Works</h2>
          <div className="relative">
            <div className="absolute top-8 left-0 right-0 h-px bg-border hidden sm:block" aria-hidden />
            <div className="grid sm:grid-cols-4 gap-8 text-center">
              {[
                { n: 1, title: "Create Profile", desc: "Tell us about your lifestyle and budget preferences.",                             active: false },
                { n: 2, title: "Get Matched",    desc: "AI suggests roommates with similar lifestyles and locations.",                     active: false },
                { n: 3, title: "Secure Chat",    desc: "Message potential roommates through our encrypted app platform.",                 active: false },
                { n: 4, title: "Move In",        desc: "Finalize details, sign agreements, and move into your new home.",                 active: true  },
              ].map(({ n, title, desc, active }) => (
                <div key={n} className="flex flex-col items-center gap-3">
                  <div className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-2 text-lg font-bold transition-colors duration-200 ${
                    active ? "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/25" : "bg-background border-primary text-primary"
                  }`}>
                    {n}
                  </div>
                  <h3 className="font-bold text-sm">{title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed max-w-[140px]">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-muted/20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl lg:text-3xl font-bold">What People Are Saying</h2>
            <p className="text-muted-foreground mt-2">
              Thousands of successful roommate placements across Nepal
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <Card key={t.name} className="card-dashboard">
                <CardContent className="p-6 flex flex-col gap-4">
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 mt-auto">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold text-sm">
                      {t.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing preview ──────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-muted/20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl lg:text-3xl font-bold">Simple, Transparent Pricing</h2>
            <p className="text-muted-foreground mt-2">Start free, upgrade when you need more</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {SUBSCRIPTION_PLANS.map((plan) => (
              <Card
                key={plan.id}
                className={plan.highlighted
                  ? "card-ai-match ring-2 ring-primary"
                  : "card-listing"
                }
              >
                <CardContent className="p-5 flex flex-col gap-4">
                  {plan.highlighted && (
                    <Badge className="w-fit">Most Popular</Badge>
                  )}
                  <div>
                    <h3 className="font-bold text-lg">{plan.name}</h3>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-2xl font-bold">
                        {plan.price === 0 ? "Free" : `NPR ${plan.price}`}
                      </span>
                      {plan.price > 0 && (
                        <span className="text-xs text-muted-foreground">/mo</span>
                      )}
                    </div>
                  </div>
                  <ul className="flex flex-col gap-2">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs">
                        <Star className="h-3 w-3 text-primary mt-0.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href={plan.price === 0 ? "/register" : "/pricing"} className="mt-auto">
                    <Button
                      variant={plan.highlighted ? "default" : "outline"}
                      className="w-full"
                      size="sm"
                    >
                      {plan.price === 0 ? "Get Started Free" : "View Plan"}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link href="/pricing" className="text-sm text-primary hover:underline underline-offset-4">
              Compare all plan features →
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl lg:text-3xl font-bold">Frequently Asked Questions</h2>
          </div>
          <Accordion multiple>
            {FAQS.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger>{faq.q}</AccordionTrigger>
                <AccordionContent>{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ── App Download ──────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-muted/20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="rounded-2xl border bg-card shadow-sm overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0 items-center">
              {/* Left */}
              <div className="p-8 lg:p-12">
                <h2 className="text-2xl lg:text-3xl font-bold mb-1">
                  {APP_NAME} App
                </h2>
                <h3 className="text-xl font-bold text-primary mb-4">Coming Soon</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-sm">
                  Get real-time alerts, browse rooms on the go, and manage your roommate search directly from your smartphone.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button className="btn-secondary-motion inline-flex items-center gap-3 rounded-xl bg-foreground text-background px-5 py-3 text-sm font-medium">
                    <Smartphone className="h-5 w-5" />
                    <div className="text-left">
                      <div className="text-[10px] opacity-70 leading-none">GET IT ON</div>
                      <div className="font-bold text-sm leading-tight">Google Play</div>
                    </div>
                  </button>
                  <button className="btn-secondary-motion inline-flex items-center gap-3 rounded-xl bg-foreground text-background px-5 py-3 text-sm font-medium">
                    <Smartphone className="h-5 w-5" />
                    <div className="text-left">
                      <div className="text-[10px] opacity-70 leading-none">DOWNLOAD ON</div>
                      <div className="font-bold text-sm leading-tight">App Store</div>
                    </div>
                  </button>
                </div>
              </div>
              {/* Right: phone mockup */}
              <div className="flex items-center justify-center bg-muted/30 py-10 lg:py-0 min-h-[260px]">
                <div className="relative w-32 h-56 rounded-[2rem] border-4 border-foreground/20 bg-background shadow-2xl flex flex-col overflow-hidden">
                  <div className="h-6 bg-muted/60 flex items-center justify-center gap-1 px-3">
                    <div className="h-2 w-2 rounded-full bg-muted-foreground/30" />
                    <div className="h-1.5 flex-1 rounded-full bg-muted-foreground/20" />
                  </div>
                  <div className="flex-1 p-2 flex flex-col gap-1.5">
                    <div className="h-16 rounded-lg bg-muted/60" />
                    <div className="h-2 w-3/4 rounded bg-muted/40" />
                    <div className="h-2 w-1/2 rounded bg-muted/30" />
                    <div className="h-2 w-2/3 rounded bg-muted/30 mt-1" />
                    <div className="h-2 w-1/2 rounded bg-muted/30" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-3">
            Ready to Find Your Perfect Roommate?
          </h2>
          <p className="text-primary-foreground/80 text-base mb-8 max-w-md mx-auto leading-relaxed">
            Join the largest community of room hunters in Nepal and start your stress-free living journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" variant="secondary" className="btn-primary-motion min-w-44 rounded-xl font-semibold">
                Create Free Account
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="btn-secondary-motion min-w-44 rounded-xl border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold">
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

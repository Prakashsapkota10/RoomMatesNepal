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

export const metadata: Metadata = {
  title: `${APP_NAME} — AI-Powered Roommate Finder in Nepal`,
  description:
    "Find your perfect roommate or room in Nepal with AI-powered compatibility matching. Browse verified listings in Kathmandu, Pokhara, and across Nepal.",
};

// ─── Static data ─────────────────────────────────────────────────────────────

const FEATURED_LISTINGS = [
  {
    id: "1",
    title: "Cozy Room in Thamel",
    location: "Thamel, Kathmandu",
    price: 8000,
    type: "Single Room",
    image: "/public/globe.svg",
    badges: ["WiFi", "Furnished"],
  },
  {
    id: "2",
    title: "Modern Apartment Share",
    location: "Lazimpat, Kathmandu",
    price: 15000,
    type: "Apartment",
    image: "/public/globe.svg",
    badges: ["Parking", "Kitchen"],
  },
  {
    id: "3",
    title: "Peaceful PG in Patan",
    location: "Patan, Lalitpur",
    price: 6500,
    type: "PG",
    image: "/public/globe.svg",
    badges: ["Security", "Water"],
  },
  {
    id: "4",
    title: "Student Hostel Room",
    location: "Chabahil, Kathmandu",
    price: 4500,
    type: "Hostel",
    image: "/public/globe.svg",
    badges: ["WiFi", "Laundry"],
  },
];

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
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-muted/30 to-background py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col items-center text-center gap-6 max-w-3xl mx-auto">
            <Badge variant="secondary" className="gap-1.5 px-3 py-1">
              <Sparkles className="h-3.5 w-3.5" />
              AI-Powered Roommate Matching
            </Badge>

            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight leading-tight">
              Find Your Perfect{" "}
              <span className="text-primary">Roommate</span>{" "}
              in Nepal
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl">
              Nepal's first AI-powered platform for finding compatible
              roommates, verified rentals, and managing shared living.
            </p>

            {/* Search bar */}
            <div className="w-full max-w-2xl">
              <div className="flex flex-col sm:flex-row gap-2 p-2 rounded-xl border bg-background shadow-sm">
                <div className="flex flex-1 items-center gap-2 px-3">
                  <Search className="h-4 w-4 text-muted-foreground shrink-0" />
                  <input
                    type="text"
                    placeholder="Search by location, area, or keyword..."
                    className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                    aria-label="Search listings"
                  />
                </div>
                <Link href="/listings">
                  <Button className="w-full sm:w-auto gap-2">
                    Search Rooms
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Shield className="h-4 w-4 text-primary" />
                Verified Listings
              </span>
              <Separator orientation="vertical" className="h-4" />
              <span className="flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-primary" />
                AI Compatibility Scores
              </span>
              <Separator orientation="vertical" className="h-4" />
              <span className="flex items-center gap-1.5">
                <Users className="h-4 w-4 text-primary" />
                10,000+ Users
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────────────────── */}
      <section className="border-y bg-muted/30 py-10">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              { value: "10,000+", label: "Active Users" },
              { value: "3,500+", label: "Verified Listings" },
              { value: "8,200+", label: "Successful Matches" },
              { value: "25+", label: "Cities Covered" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <span className="text-3xl font-bold">{stat.value}</span>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Popular Locations ─────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold">Popular Locations</h2>
              <p className="text-muted-foreground mt-1">
                Browse rooms in Nepal's most in-demand neighbourhoods
              </p>
            </div>
            <Link href="/listings" className="hidden sm:flex items-center gap-1 text-sm text-primary hover:underline">
              View all <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {POPULAR_LOCATIONS.map((loc) => (
              <Link
                key={loc.slug}
                href={`/listings?location=${loc.slug}`}
                className="group rounded-xl border bg-card p-4 text-center hover:border-primary hover:shadow-sm transition-all"
              >
                <MapPin className="h-6 w-6 mx-auto text-muted-foreground group-hover:text-primary transition-colors" />
                <p className="mt-2 text-sm font-medium leading-tight">{loc.name}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {loc.listingCount} listings
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Listings ─────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-muted/20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold">Featured Listings</h2>
              <p className="text-muted-foreground mt-1">
                Hand-picked verified rooms across Nepal
              </p>
            </div>
            <Link href="/listings" className="hidden sm:flex items-center gap-1 text-sm text-primary hover:underline">
              View all <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURED_LISTINGS.map((listing) => (
              <Link key={listing.id} href={`/listings/${listing.id}`}>
                <Card className="group hover:shadow-md transition-shadow overflow-hidden">
                  <div className="h-40 bg-muted flex items-center justify-center">
                    <Home className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <CardContent className="p-4">
                    <Badge variant="secondary" className="mb-2 text-xs">
                      {listing.type}
                    </Badge>
                    <h3 className="font-semibold leading-snug group-hover:text-primary transition-colors">
                      {listing.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {listing.location}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="font-bold text-sm">
                        NPR {listing.price.toLocaleString()}
                        <span className="font-normal text-muted-foreground text-xs">/mo</span>
                      </span>
                      <div className="flex gap-1">
                        {listing.badges.map((b) => (
                          <Badge key={b} variant="outline" className="text-xs px-1.5 py-0">
                            {b}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI Matching Introduction ──────────────────────────────────────── */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Illustration placeholder */}
            <div className="rounded-2xl border bg-gradient-to-br from-primary/5 to-primary/10 p-8 flex items-center justify-center min-h-64">
              <div className="text-center">
                <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 mb-4">
                  <Sparkles className="h-10 w-10 text-primary" />
                </div>
                <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                  {["Sleep Schedule", "Cleanliness", "Noise Tolerance", "Guest Policy"].map((f) => (
                    <div key={f} className="flex items-center gap-2 rounded-lg bg-background/80 px-3 py-1.5">
                      <div className="h-2 flex-1 rounded-full bg-muted overflow-hidden">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${Math.random() * 60 + 40}%` }} />
                      </div>
                      <span className="text-xs">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <Badge variant="secondary" className="w-fit gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                AI Matching Engine
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold leading-tight">
                Find a roommate you'll actually get along with
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Our AI analyses 20+ lifestyle factors — from sleep schedules to
                cooking habits — and computes a real compatibility score between
                you and potential roommates. No more awkward surprises.
              </p>
              <ul className="flex flex-col gap-3">
                {[
                  "20+ lifestyle compatibility factors",
                  "Detailed match report with reasons",
                  "Side-by-side preference comparison",
                  "Continuously improves as you use it",
                ].map((feat) => (
                  <li key={feat} className="flex items-center gap-3 text-sm">
                    <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Star className="h-3 w-3 text-primary" />
                    </div>
                    {feat}
                  </li>
                ))}
              </ul>
              <div className="flex gap-3">
                <Link href="/register">
                  <Button className="gap-2">
                    Try AI Matching
                    <Sparkles className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline">Learn More</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-muted/20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold">How It Works</h2>
            <p className="text-muted-foreground mt-2">
              Find your perfect room in 3 simple steps
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                icon: Users,
                title: "Create Your Profile",
                desc: "Fill out your lifestyle preferences, budget, and move-in timeline to get the most accurate matches.",
              },
              {
                step: "02",
                icon: Sparkles,
                title: "Get AI Matches",
                desc: "Our AI scans thousands of listings and roommate profiles to find your top compatibility matches.",
              },
              {
                step: "03",
                icon: MessageSquare,
                title: "Connect & Move In",
                desc: "Chat with matches, schedule viewings, apply directly, and confirm with confidence.",
              },
            ].map(({ step, icon: Icon, title, desc }) => (
              <div key={step} className="flex flex-col items-center text-center gap-4">
                <div className="relative">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                    {step}
                  </span>
                </div>
                <h3 className="font-semibold text-lg">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl lg:text-3xl font-bold">What People Are Saying</h2>
            <p className="text-muted-foreground mt-2">
              Thousands of successful roommate placements across Nepal
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <Card key={t.name}>
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
                className={plan.highlighted ? "ring-2 ring-primary" : ""}
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

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-80" />
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to find your perfect roommate?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
            Join 10,000+ people across Nepal who found their ideal living
            situation through {APP_NAME}.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button
                size="lg"
                variant="secondary"
                className="gap-2 min-w-40"
              >
                Get Started Free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/listings">
              <Button
                size="lg"
                variant="outline"
                className="gap-2 min-w-40 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              >
                Browse Rooms
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

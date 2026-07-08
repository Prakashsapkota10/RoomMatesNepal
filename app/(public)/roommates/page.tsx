"use client";

import { useState } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Search,
  MapPin,
  Sparkles,
  Users,
  Home,
  TrendingUp,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RoommateCard, type RoommateData } from "@/components/roommates/roommate-card";
import { FiltersDrawer, type RoommateFilters } from "@/components/roommates/filters-drawer";
import { ProfilePreviewDrawer } from "@/components/roommates/profile-preview-drawer";
import { APP_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

// ─── Mock Data ───────────────────────────────────────────────────────────────

const STATS = [
  { value: "12,000+", label: "Verified Users", icon: Users, color: "var(--trust)" },
  { value: "4,300", label: "Active Roommate Posts", icon: Home, color: "var(--community)" },
  { value: "2,900", label: "Successful Matches", icon: TrendingUp, color: "var(--success)" },
  { value: "92%", label: "Average Compatibility", icon: Sparkles, color: "var(--ai)" },
];

// Human portrait photos from /public (Unsplash / Pexels avif/jpg)
const PHOTOS = {
  manSuit:        "/photo-1519085360753-af0119f7cbe7.avif",   // man professional
  womanProf:      "/photo-1573496359142-b8d87734a5a2.avif",   // woman professional
  person1:        "/photo-1612320648993-61c1cd604b71.avif",   // person
  womanPortrait:  "/premium_photo-1664471481572-c59a951a7755.avif", // woman portrait
  person2:        "/premium_photo-1677368597077-009727e906db.avif", // person
  person3:        "/premium_photo-1683887034491-f58b4c4fca72.avif", // person
  person4:        "/premium_photo-1689609950112-d66095626efb.avif", // person
  person5:        "/premium_photo-1658506656752-4f1b1c1d5916.avif", // person
  istockPerson:   "/istockphoto-1149822847-612x612.webp",      // person (istock)
};

const MOCK_ROOMMATES: RoommateData[] = [
  {
    id: "1",
    name: "Sagar Kumar",
    age: 24,
    occupation: "Medical Student at TUTH",
    location: "Thamel, Kathmandu",
    budget: 8000,
    moveInDate: "April 2025",
    photo: PHOTOS.manSuit,
    bio: "I'm a medical student looking for a clean, quiet roommate. I usually study late nights and wake up early. Non-smoker, vegetarian, and I love keeping shared spaces organized.",
    compatibilityScore: 94,
    trustScore: 88,
    isVerified: true,
    rating: 4.8,
    reviewCount: 12,
    responseTime: "< 1 hour",
    lifestyleChips: ["Non-Smoker", "Vegetarian", "Gym Freak", "Early Bird"],
    compatibilityReasons: ["Same Budget Range", "Similar Work Schedule", "Both Non-Smokers", "Same Preferred Area"],
  },
  {
    id: "2",
    name: "Nikita Rai",
    age: 22,
    occupation: "Graphic Designer at Tech Co",
    location: "Lazimpat, Kathmandu",
    budget: 12000,
    moveInDate: "May 2025",
    photo: PHOTOS.womanProf,
    bio: "Creative professional working remotely. I appreciate a clean space and love cooking. Looking for someone chill and respectful of work hours.",
    compatibilityScore: 87,
    trustScore: 92,
    isVerified: true,
    rating: 4.9,
    reviewCount: 18,
    responseTime: "< 2 hours",
    lifestyleChips: ["Art Lover", "Quiet", "Remote Worker", "Clean"],
    compatibilityReasons: ["Similar Lifestyle", "Compatible Work Hours", "Both Value Cleanliness"],
  },
  {
    id: "3",
    name: "Arun Magar",
    age: 26,
    occupation: "Software Engineer",
    location: "Patan, Lalitpur",
    budget: 15000,
    moveInDate: "March 2025",
    photo: PHOTOS.person1,
    compatibilityScore: 76,
    trustScore: 85,
    isVerified: true,
    rating: 4.7,
    reviewCount: 9,
    responseTime: "< 3 hours",
    lifestyleChips: ["Early Bird", "Clean", "Tech Enthusiast", "Gym"],
  },
  {
    id: "4",
    name: "Priya Sharma",
    age: 23,
    occupation: "MBA Student",
    location: "Chabahil, Kathmandu",
    budget: 10000,
    moveInDate: "April 2025",
    photo: PHOTOS.womanPortrait,
    compatibilityScore: undefined,
    trustScore: 78,
    isVerified: false,
    rating: 4.5,
    reviewCount: 6,
    responseTime: "< 4 hours",
    lifestyleChips: ["Vegetarian", "Neat", "Night Owl", "Foodie"],
  },
  {
    id: "5",
    name: "Ramesh Thapa",
    age: 27,
    occupation: "Marketing Manager",
    location: "Baluwatar, Kathmandu",
    budget: 18000,
    moveInDate: "June 2025",
    photo: PHOTOS.person2,
    compatibilityScore: 91,
    trustScore: 95,
    isVerified: true,
    rating: 5.0,
    reviewCount: 24,
    responseTime: "< 30 min",
    lifestyleChips: ["Clean", "Professional", "Non-Smoker", "Pet Friendly"],
    compatibilityReasons: ["Excellent Budget Match", "Similar Professional Background", "Both Pet Friendly"],
  },
  {
    id: "6",
    name: "Anita Rai",
    age: 25,
    occupation: "Content Writer",
    location: "Lakeside, Pokhara",
    budget: 9000,
    moveInDate: "April 2025",
    photo: PHOTOS.person3,
    compatibilityScore: 83,
    trustScore: 81,
    isVerified: true,
    rating: 4.6,
    reviewCount: 11,
    responseTime: "< 2 hours",
    lifestyleChips: ["Quiet", "Remote Worker", "Bookworm", "Vegetarian"],
  },
  {
    id: "7",
    name: "Suresh Basnet",
    age: 28,
    occupation: "Civil Engineer",
    location: "Bhaktapur",
    budget: 11000,
    moveInDate: "May 2025",
    photo: PHOTOS.person4,
    compatibilityScore: 79,
    trustScore: 87,
    isVerified: true,
    rating: 4.4,
    reviewCount: 8,
    responseTime: "< 3 hours",
    lifestyleChips: ["Non-Smoker", "Gym", "Early Bird", "Clean"],
  },
  {
    id: "8",
    name: "Meera Poudel",
    age: 24,
    occupation: "Nurse at Teaching Hospital",
    location: "Maharajgunj, Kathmandu",
    budget: 7500,
    moveInDate: "June 2025",
    photo: PHOTOS.person5,
    compatibilityScore: 88,
    trustScore: 90,
    isVerified: true,
    rating: 4.8,
    reviewCount: 15,
    responseTime: "< 1 hour",
    lifestyleChips: ["Quiet", "Non-Smoker", "Vegetarian", "Early Bird"],
    compatibilityReasons: ["Same Lifestyle Values", "Compatible Schedules", "Both Non-Smokers"],
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function RoommatesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [selectedRoommate, setSelectedRoommate] = useState<RoommateData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const [filters, setFilters] = useState<RoommateFilters>({
    location: "all",
    budgetMin: 0,
    budgetMax: 50000,
    gender: "any",
    occupation: [],
    lifestyle: {
      nonSmoker: false,
      noAlcohol: false,
      vegetarian: false,
      petFriendly: false,
      earlyBird: false,
      nightOwl: false,
      clean: false,
      quiet: false,
    },
    moveInDate: "",
    verifiedOnly: false,
    minTrustScore: 0,
    minCompatibility: 0,
    sortBy: "newest",
  });

  const clearFilters = () => {
    setFilters({
      location: "all",
      budgetMin: 0,
      budgetMax: 50000,
      gender: "any",
      occupation: [],
      lifestyle: {
        nonSmoker: false,
        noAlcohol: false,
        vegetarian: false,
        petFriendly: false,
        earlyBird: false,
        nightOwl: false,
        clean: false,
        quiet: false,
      },
      moveInDate: "",
      verifiedOnly: false,
      minTrustScore: 0,
      minCompatibility: 0,
      sortBy: "newest",
    });
  };

  // Filter and sort roommates
  let filteredRoommates = MOCK_ROOMMATES.filter((r) => {
    if (filters.verifiedOnly && !r.isVerified) return false;
    if (r.trustScore < filters.minTrustScore) return false;
    if (filters.minCompatibility > 0 && (!r.compatibilityScore || r.compatibilityScore < filters.minCompatibility)) return false;
    if (r.budget < filters.budgetMin || r.budget > filters.budgetMax) return false;
    return true;
  });

  // Sort
  if (filters.sortBy === "highestMatch") {
    filteredRoommates.sort((a, b) => (b.compatibilityScore || 0) - (a.compatibilityScore || 0));
  } else if (filters.sortBy === "highestTrust") {
    filteredRoommates.sort((a, b) => b.trustScore - a.trustScore);
  } else if (filters.sortBy === "lowestBudget") {
    filteredRoommates.sort((a, b) => a.budget - b.budget);
  } else if (filters.sortBy === "highestRated") {
    filteredRoommates.sort((a, b) => b.rating - a.rating);
  }

  // AI Recommended (high compatibility only)
  const recommendedRoommates = MOCK_ROOMMATES.filter((r) => r.compatibilityScore && r.compatibilityScore >= 85).slice(0, 6);

  // Verified only
  const verifiedRoommates = MOCK_ROOMMATES.filter((r) => r.isVerified).slice(0, 8);

  // Pagination
  const totalPages = Math.ceil(filteredRoommates.length / itemsPerPage);
  const paginatedRoommates = filteredRoommates.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleViewProfile = (id: string) => {
    const roommate = MOCK_ROOMMATES.find((r) => r.id === id);
    if (roommate) setSelectedRoommate(roommate);
  };

  const handleMessage = (id: string) => {
    console.log("Message roommate:", id);
    // Navigate to messages or open chat
  };

  return (
    <div className="flex flex-col page-enter">
      {/* ── Hero Search Section ───────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-muted/20 to-background pt-28 pb-16 lg:pt-36 lg:pb-20">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-[color:var(--ai)]/5 blur-3xl" />
          <div className="absolute top-1/3 right-0 h-[300px] w-[400px] rounded-full bg-primary/5 blur-3xl" />
        </div>

        <div className="container relative mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            {/* Badge */}
            <Badge variant="secondary" className="mb-4 gap-1.5 bg-[color:var(--ai-light)] text-[color:var(--ai-dark)] border-[color:var(--ai)]/20">
              <Sparkles className="h-3.5 w-3.5" />
              AI-Powered Matching
            </Badge>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-4">
              Find Your Ideal <span className="text-[color:var(--ai)]">Roommate</span>
            </h1>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
              Search verified roommates based on lifestyle, budget, location, and AI compatibility.
              <br />
              Find someone you'll actually get along with.
            </p>

            {/* Search Bar */}
            <div className="rounded-2xl border bg-card/80 backdrop-blur-sm shadow-lg p-3 mb-6">
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Search Input */}
                <div className="input-container flex flex-1 items-center gap-2 rounded-xl bg-background px-3 py-2.5 border">
                  <Search className="h-4 w-4 text-muted-foreground shrink-0" />
                  <Input
                    type="text"
                    placeholder="Search by name, occupation, university, company..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 border-0 bg-transparent p-0 text-sm outline-none focus-visible:ring-0"
                  />
                </div>

                {/* Location */}
                <div className="input-container flex items-center gap-2 rounded-xl bg-background px-3 py-2.5 border sm:w-48">
                  <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                  <Select value={searchLocation} onValueChange={(value) => setSearchLocation(value as string)}>
                    <SelectTrigger className="border-0 p-0 h-auto focus:ring-0">
                      <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="kathmandu">Kathmandu</SelectItem>
                      <SelectItem value="pokhara">Pokhara</SelectItem>
                      <SelectItem value="lalitpur">Lalitpur</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Search Button */}
                <Button className="btn-primary-motion gap-2 rounded-xl px-6 font-semibold">
                  <Search className="h-4 w-4" />
                  Search
                </Button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              <span className="text-muted-foreground">Popular:</span>
              {["Students", "Professionals", "Pet Friendly", "Non-Smoker"].map((tag) => (
                <button
                  key={tag}
                  className="rounded-full border bg-background px-3 py-1 text-xs font-medium transition-colors duration-150 hover:border-primary hover:text-primary"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Quick Statistics ──────────────────────────────────────────────── */}
      <section className="py-12 border-y bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className="card-dashboard flex flex-col items-center gap-3 rounded-2xl border bg-card p-6 text-center animate-in fade-in slide-in-from-bottom-2 duration-300 fill-mode-both"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `color-mix(in srgb, ${stat.color} 12%, transparent)` }}
                >
                  <stat.icon className="h-6 w-6" style={{ color: stat.color }} />
                </div>
                <div>
                  <p className="text-3xl font-extrabold tracking-tight">{stat.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI Recommended Section ────────────────────────────────────────── */}
      {recommendedRoommates.length > 0 && (
        <section className="py-16 lg:py-20 bg-gradient-to-br from-[color:var(--ai-light)] to-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex items-end justify-between mb-8">
              <div>
                <Badge className="mb-3 gap-1.5 bg-[color:var(--ai)] text-white">
                  <Sparkles className="h-3.5 w-3.5" />
                  AI Powered
                </Badge>
                <h2 className="text-3xl lg:text-4xl font-bold">Recommended For You</h2>
                <p className="text-muted-foreground mt-2">
                  Based on your profile and preferences
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedRoommates.map((roommate) => (
                <RoommateCard
                  key={roommate.id}
                  roommate={roommate}
                  onViewProfile={handleViewProfile}
                  onMessage={handleMessage}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Verified Roommates — 4-column equal-height grid ──────────── */}
      {verifiedRoommates.length > 0 && (
        <section className="py-16 lg:py-20 border-y bg-muted/20">
          <div className="container mx-auto px-4 lg:px-8">
            {/* Section header */}
            <div className="flex items-end justify-between mb-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[color:var(--success-light)]">
                    <ShieldCheck className="h-3.5 w-3.5 text-[color:var(--success)]" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[color:var(--success)]">
                    Identity Verified
                  </span>
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold">Verified Roommates</h2>
                <p className="text-muted-foreground mt-1 text-sm">
                  {verifiedRoommates.length} roommates with verified identity &amp; high trust scores
                </p>
              </div>
              <Link href="/roommates">
                <Button variant="outline" size="sm" className="btn-secondary-motion gap-1.5 rounded-xl hidden sm:flex">
                  View All
                  <ChevronRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>

            {/*
              4-column grid on xl, 3 on lg, 2 on sm, 1 on mobile.
              items-stretch makes every cell fill the row height.
              Each card uses equalHeight so the action row stays pinned bottom.
            */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 items-stretch">
              {verifiedRoommates.map((roommate, i) => (
                <div
                  key={roommate.id}
                  className="animate-in fade-in slide-in-from-bottom-3 duration-300 fill-mode-both flex"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <RoommateCard
                    roommate={roommate}
                    onViewProfile={handleViewProfile}
                    onMessage={handleMessage}
                    equalHeight
                    className="w-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── All Roommates Grid with Filters ───────────────────────────────── */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold">All Roommates</h2>
              <p className="text-muted-foreground mt-1">
                {filteredRoommates.length} roommate{filteredRoommates.length !== 1 && "s"} available
              </p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <aside className="lg:w-80 shrink-0">
              <FiltersDrawer
                filters={filters}
                onFiltersChange={setFilters}
                onClearFilters={clearFilters}
              />
            </aside>

            {/* Roommates Grid */}
            <div className="flex-1">
              {paginatedRoommates.length > 0 ? (
                <>
                  <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                    {paginatedRoommates.map((roommate) => (
                      <RoommateCard
                        key={roommate.id}
                        roommate={roommate}
                        onViewProfile={handleViewProfile}
                        onMessage={handleMessage}
                      />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="btn-secondary-motion"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="icon"
                          onClick={() => setCurrentPage(page)}
                          className={cn(
                            "btn-secondary-motion",
                            currentPage === page && "btn-primary-motion"
                          )}
                        >
                          {page}
                        </Button>
                      ))}

                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="btn-secondary-motion"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-4">
                    <Users className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">No roommates found</h3>
                  <p className="text-muted-foreground mb-6 max-w-md">
                    Try adjusting your filters or search criteria to find more results.
                  </p>
                  <Button onClick={clearFilters} variant="outline" className="btn-secondary-motion">
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ─────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-primary/5 via-[color:var(--ai)]/5 to-primary/5 border-y">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Can't Find the Right Roommate?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Create your own roommate requirement and let compatible people find you.
              Our AI will match you with the best candidates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard/roommates/create">
                <Button size="lg" className="btn-primary-motion gap-2 rounded-xl px-8 font-semibold">
                  <Users className="h-5 w-5" />
                  Create Requirement
                </Button>
              </Link>
              <Link href="/help">
                <Button
                  size="lg"
                  variant="outline"
                  className="btn-secondary-motion rounded-xl px-8 font-semibold"
                >
                  How It Works
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Preview Drawer */}
      <ProfilePreviewDrawer
        roommate={selectedRoommate}
        open={!!selectedRoommate}
        onOpenChange={(open) => !open && setSelectedRoommate(null)}
        onMessage={handleMessage}
        onViewFullProfile={(id) => {
          // Navigate to full profile page
          window.location.href = `/roommates/${id}`;
        }}
      />
    </div>
  );
}

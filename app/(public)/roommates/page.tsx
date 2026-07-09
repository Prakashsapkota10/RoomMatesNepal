"use client";

import { useState } from "react";
import {
  Search,
  MapPin,
  Users,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RoommateCard, type RoommateData } from "@/components/roommates/roommate-card";
import { FiltersDrawer, type RoommateFilters } from "@/components/roommates/filters-drawer";
import { ProfilePreviewDrawer } from "@/components/roommates/profile-preview-drawer";
import { cn } from "@/lib/utils";
import { StaggerGrid, StaggerItem } from "@/components/motion/stagger-grid";

// ─── Photos ──────────────────────────────────────────────────────────────────

const PHOTOS = {
  manSuit:      "/photo-1519085360753-af0119f7cbe7.avif",
  womanProf:    "/photo-1573496359142-b8d87734a5a2.avif",
  person1:      "/photo-1612320648993-61c1cd604b71.avif",
  womanPortrait:"/premium_photo-1664471481572-c59a951a7755.avif",
  person2:      "/premium_photo-1677368597077-009727e906db.avif",
  person3:      "/premium_photo-1683887034491-f58b4c4fca72.avif",
  person4:      "/premium_photo-1689609950112-d66095626efb.avif",
  person5:      "/premium_photo-1658506656752-4f1b1c1d5916.avif",
  istockPerson: "/istockphoto-1149822847-612x612.webp",
};

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_ROOMMATES: RoommateData[] = [
  { id: "1", name: "Sagar Kumar", age: 24, occupation: "Medical Student at TUTH", location: "Thamel, Kathmandu", budget: 8000, moveInDate: "April 2025", photo: PHOTOS.manSuit, compatibilityScore: 94, trustScore: 88, isVerified: true, rating: 4.8, reviewCount: 12, responseTime: "< 1 hour", lifestyleChips: ["Non-Smoker", "Vegetarian", "Gym Freak", "Early Bird"], compatibilityReasons: ["Same Budget Range", "Similar Work Schedule", "Both Non-Smokers"] },
  { id: "2", name: "Nikita Rai", age: 22, occupation: "Graphic Designer", location: "Lazimpat, Kathmandu", budget: 12000, moveInDate: "May 2025", photo: PHOTOS.womanProf, compatibilityScore: 87, trustScore: 92, isVerified: true, rating: 4.9, reviewCount: 18, responseTime: "< 2 hours", lifestyleChips: ["Art Lover", "Quiet", "Remote Worker", "Clean"], compatibilityReasons: ["Similar Lifestyle", "Compatible Work Hours"] },
  { id: "3", name: "Arun Magar", age: 26, occupation: "Software Engineer", location: "Patan, Lalitpur", budget: 15000, moveInDate: "March 2025", photo: PHOTOS.person1, compatibilityScore: 76, trustScore: 85, isVerified: true, rating: 4.7, reviewCount: 9, responseTime: "< 3 hours", lifestyleChips: ["Early Bird", "Clean", "Tech Enthusiast", "Gym"] },
  { id: "4", name: "Priya Sharma", age: 23, occupation: "MBA Student", location: "Chabahil, Kathmandu", budget: 10000, moveInDate: "April 2025", photo: PHOTOS.womanPortrait, compatibilityScore: undefined, trustScore: 78, isVerified: false, rating: 4.5, reviewCount: 6, responseTime: "< 4 hours", lifestyleChips: ["Vegetarian", "Neat", "Night Owl", "Foodie"] },
  { id: "5", name: "Ramesh Thapa", age: 27, occupation: "Marketing Manager", location: "Baluwatar, Kathmandu", budget: 18000, moveInDate: "June 2025", photo: PHOTOS.person2, compatibilityScore: 91, trustScore: 95, isVerified: true, rating: 5.0, reviewCount: 24, responseTime: "< 30 min", lifestyleChips: ["Clean", "Professional", "Non-Smoker", "Pet Friendly"], compatibilityReasons: ["Excellent Budget Match", "Both Pet Friendly"] },
  { id: "6", name: "Anita Rai", age: 25, occupation: "Content Writer", location: "Lakeside, Pokhara", budget: 9000, moveInDate: "April 2025", photo: PHOTOS.person3, compatibilityScore: 83, trustScore: 81, isVerified: true, rating: 4.6, reviewCount: 11, responseTime: "< 2 hours", lifestyleChips: ["Quiet", "Remote Worker", "Bookworm", "Vegetarian"] },
  { id: "7", name: "Suresh Basnet", age: 28, occupation: "Civil Engineer", location: "Bhaktapur", budget: 11000, moveInDate: "May 2025", photo: PHOTOS.person4, compatibilityScore: 79, trustScore: 87, isVerified: true, rating: 4.4, reviewCount: 8, responseTime: "< 3 hours", lifestyleChips: ["Non-Smoker", "Gym", "Early Bird", "Clean"] },
  { id: "8", name: "Meera Poudel", age: 24, occupation: "Nurse", location: "Maharajgunj, Kathmandu", budget: 7500, moveInDate: "June 2025", photo: PHOTOS.person5, compatibilityScore: 88, trustScore: 90, isVerified: true, rating: 4.8, reviewCount: 15, responseTime: "< 1 hour", lifestyleChips: ["Quiet", "Non-Smoker", "Vegetarian", "Early Bird"], compatibilityReasons: ["Same Lifestyle Values", "Both Non-Smokers"] },
  { id: "9", name: "Bikash Shrestha", age: 29, occupation: "Bank Officer", location: "Naxal, Kathmandu", budget: 14000, moveInDate: "July 2025", photo: PHOTOS.manSuit, compatibilityScore: 72, trustScore: 83, isVerified: true, rating: 4.3, reviewCount: 5, responseTime: "< 5 hours", lifestyleChips: ["Non-Smoker", "Clean", "Early Bird", "Gym"] },
  { id: "10", name: "Sushma Karki", age: 21, occupation: "BBA Student", location: "Dhulikhel, Kavre", budget: 6000, moveInDate: "August 2025", photo: PHOTOS.womanProf, compatibilityScore: 80, trustScore: 74, isVerified: false, rating: 4.2, reviewCount: 3, responseTime: "< 6 hours", lifestyleChips: ["Vegetarian", "Quiet", "Bookworm", "Night Owl"] },
  { id: "11", name: "Dipak Gurung", age: 30, occupation: "Hotel Manager", location: "Lakeside, Pokhara", budget: 13000, moveInDate: "May 2025", photo: PHOTOS.person2, compatibilityScore: 85, trustScore: 89, isVerified: true, rating: 4.7, reviewCount: 20, responseTime: "< 2 hours", lifestyleChips: ["Friendly", "Non-Smoker", "Clean", "Foodie"], compatibilityReasons: ["Similar Budget", "Both Non-Smokers"] },
  { id: "12", name: "Roshani Tamang", age: 23, occupation: "Pharmacy Student", location: "Kirtipur, Kathmandu", budget: 7000, moveInDate: "June 2025", photo: PHOTOS.womanPortrait, compatibilityScore: 78, trustScore: 82, isVerified: true, rating: 4.5, reviewCount: 7, responseTime: "< 3 hours", lifestyleChips: ["Vegetarian", "Quiet", "Early Bird", "Neat"] },
  { id: "13", name: "Nabin Adhikari", age: 25, occupation: "Data Analyst", location: "Bouddha, Kathmandu", budget: 16000, moveInDate: "April 2025", photo: PHOTOS.person1, compatibilityScore: 90, trustScore: 93, isVerified: true, rating: 4.9, reviewCount: 22, responseTime: "< 1 hour", lifestyleChips: ["Tech Enthusiast", "Gym", "Non-Smoker", "Clean"], compatibilityReasons: ["Top AI Match", "Same Industry"] },
  { id: "14", name: "Alisha Pradhan", age: 22, occupation: "Fashion Design Student", location: "Pulchowk, Lalitpur", budget: 9500, moveInDate: "July 2025", photo: PHOTOS.person3, compatibilityScore: 73, trustScore: 76, isVerified: false, rating: 4.1, reviewCount: 4, responseTime: "< 4 hours", lifestyleChips: ["Art Lover", "Night Owl", "Foodie", "Creative"] },
  { id: "15", name: "Kapil Dev Koirala", age: 31, occupation: "Journalist", location: "Baneshwor, Kathmandu", budget: 12500, moveInDate: "August 2025", photo: PHOTOS.istockPerson, compatibilityScore: 81, trustScore: 86, isVerified: true, rating: 4.6, reviewCount: 14, responseTime: "< 2 hours", lifestyleChips: ["Quiet", "Bookworm", "Non-Smoker", "Night Owl"] },
  { id: "16", name: "Sunita Maharjan", age: 26, occupation: "School Teacher", location: "Patan, Lalitpur", budget: 8500, moveInDate: "May 2025", photo: PHOTOS.person5, compatibilityScore: 86, trustScore: 91, isVerified: true, rating: 4.8, reviewCount: 17, responseTime: "< 1 hour", lifestyleChips: ["Early Bird", "Vegetarian", "Quiet", "Clean"], compatibilityReasons: ["Similar Schedules", "Both Vegetarian"] },
  { id: "17", name: "Rajendra Bhandari", age: 28, occupation: "Architect", location: "Lazimpat, Kathmandu", budget: 20000, moveInDate: "June 2025", photo: PHOTOS.person4, compatibilityScore: 77, trustScore: 84, isVerified: true, rating: 4.4, reviewCount: 10, responseTime: "< 3 hours", lifestyleChips: ["Creative", "Clean", "Non-Smoker", "Pet Friendly"] },
  { id: "18", name: "Kabita Limbu", age: 24, occupation: "IT Support", location: "Bhaktapur", budget: 10500, moveInDate: "July 2025", photo: PHOTOS.womanProf, compatibilityScore: 84, trustScore: 88, isVerified: true, rating: 4.7, reviewCount: 13, responseTime: "< 2 hours", lifestyleChips: ["Tech Enthusiast", "Non-Smoker", "Gym", "Early Bird"], compatibilityReasons: ["Same Field", "Both Non-Smokers"] },
];

const DEFAULT_FILTERS: RoommateFilters = {
  location: "all", budgetMin: 0, budgetMax: 50000, gender: "any", occupation: [],
  lifestyle: { nonSmoker: false, noAlcohol: false, vegetarian: false, petFriendly: false, earlyBird: false, nightOwl: false, clean: false, quiet: false },
  moveInDate: "", verifiedOnly: false, minTrustScore: 0, minCompatibility: 0, sortBy: "newest",
};

const ITEMS_PER_PAGE = 6;

export default function RoommatesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [selectedRoommate, setSelectedRoommate] = useState<RoommateData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<RoommateFilters>(DEFAULT_FILTERS);

  const clearFilters = () => { setCurrentPage(1); setFilters(DEFAULT_FILTERS); };

  let filteredRoommates = MOCK_ROOMMATES.filter((r) => {
    // Text search (name or occupation)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      if (!r.name.toLowerCase().includes(q) && !r.occupation.toLowerCase().includes(q)) return false;
    }

    // Location search from hero bar
    if (searchLocation && searchLocation !== "all") {
      const loc = r.location.toLowerCase();
      if (!loc.includes(searchLocation.toLowerCase())) return false;
    }

    // Sidebar location filter
    if (filters.location && filters.location !== "all") {
      const loc = r.location.toLowerCase();
      if (!loc.includes(filters.location.toLowerCase())) return false;
    }

    // Budget range
    if (r.budget < filters.budgetMin || r.budget > filters.budgetMax) return false;

    // Verified only
    if (filters.verifiedOnly && !r.isVerified) return false;

    // Trust score
    if (r.trustScore < filters.minTrustScore) return false;

    // Compatibility
    if (filters.minCompatibility > 0 && (!r.compatibilityScore || r.compatibilityScore < filters.minCompatibility)) return false;

    // Lifestyle filters
    const chips = r.lifestyleChips.map((c) => c.toLowerCase());
    if (filters.lifestyle.nonSmoker && !chips.includes("non-smoker")) return false;
    if (filters.lifestyle.vegetarian && !chips.includes("vegetarian")) return false;
    if (filters.lifestyle.petFriendly && !chips.includes("pet friendly")) return false;
    if (filters.lifestyle.earlyBird && !chips.includes("early bird")) return false;
    if (filters.lifestyle.nightOwl && !chips.includes("night owl")) return false;
    if (filters.lifestyle.clean && !chips.includes("clean")) return false;
    if (filters.lifestyle.quiet && !chips.includes("quiet")) return false;

    return true;
  });

  if (filters.sortBy === "highestMatch") filteredRoommates = [...filteredRoommates].sort((a, b) => (b.compatibilityScore || 0) - (a.compatibilityScore || 0));
  else if (filters.sortBy === "highestTrust") filteredRoommates = [...filteredRoommates].sort((a, b) => b.trustScore - a.trustScore);
  else if (filters.sortBy === "lowestBudget") filteredRoommates = [...filteredRoommates].sort((a, b) => a.budget - b.budget);
  else if (filters.sortBy === "highestRated") filteredRoommates = [...filteredRoommates].sort((a, b) => b.rating - a.rating);

  const totalPages = Math.ceil(filteredRoommates.length / ITEMS_PER_PAGE);
  const paginatedRoommates = filteredRoommates.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const goToPage = (page: number) => { setCurrentPage(page); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const handleViewProfile = (id: string) => { const r = MOCK_ROOMMATES.find((r) => r.id === id); if (r) setSelectedRoommate(r); };
  const handleMessage = (id: string) => { console.log("Message:", id); };

  const pageList: (number | "…")[] = [];
  if (totalPages <= 7) { for (let i = 1; i <= totalPages; i++) pageList.push(i); }
  else {
    pageList.push(1);
    if (currentPage > 3) pageList.push("…");
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) pageList.push(i);
    if (currentPage < totalPages - 2) pageList.push("…");
    pageList.push(totalPages);
  }

  return (
    <div className="flex flex-col">
      {/* ── Compact Hero ───────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-background via-muted/20 to-background pt-24 pb-8 lg:pt-28 lg:pb-10">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
              Find Your Ideal <span className="text-primary">Roommate</span>
            </h1>
            <p className="text-sm text-muted-foreground mb-5">
              Search verified roommates by lifestyle, budget, and location across Nepal.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 rounded-xl border bg-card shadow p-2">
              <div className="flex flex-1 items-center gap-2 rounded-lg bg-background px-3 py-2 border">
                <Search className="h-4 w-4 text-muted-foreground shrink-0" />
                <Input type="text" placeholder="Search by name, occupation..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="border-0 bg-transparent p-0 text-sm outline-none focus-visible:ring-0" />
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-background px-3 py-2 border sm:w-40">
                <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                <Select value={searchLocation} onValueChange={(v) => setSearchLocation(v ?? "")}>
                  <SelectTrigger className="border-0 p-0 h-auto focus:ring-0 text-sm"><SelectValue placeholder="Location" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="kathmandu">Kathmandu</SelectItem>
                    <SelectItem value="pokhara">Pokhara</SelectItem>
                    <SelectItem value="lalitpur">Lalitpur</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="gap-2 rounded-lg px-5 font-semibold"><Search className="h-4 w-4" />Search</Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Roommates Grid + Filters ──────────────────────────────── */}
      <section className="py-8 lg:py-10">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-bold">All Roommates</h2>
              <p className="text-xs text-muted-foreground mt-0.5">{filteredRoommates.length} result{filteredRoommates.length !== 1 && "s"}</p>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-72 shrink-0">
              <FiltersDrawer filters={filters} onFiltersChange={(f) => { setCurrentPage(1); setFilters(f); }} onClearFilters={clearFilters} />
            </aside>
            <div className="flex-1 min-w-0">
              {paginatedRoommates.length > 0 ? (
                <>
                  <StaggerGrid className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {paginatedRoommates.map((roommate) => (
                      <StaggerItem key={roommate.id}>
                        <RoommateCard roommate={roommate} onViewProfile={handleViewProfile} onMessage={handleMessage} />
                      </StaggerItem>
                    ))}
                  </StaggerGrid>

                  {totalPages > 1 && (
                    <div className="mt-8 flex flex-col items-center gap-3">
                      <p className="text-xs text-muted-foreground">
                        Showing <span className="font-semibold text-foreground">{(currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, filteredRoommates.length)}</span> of <span className="font-semibold text-foreground">{filteredRoommates.length}</span>
                      </p>
                      <div className="flex items-center gap-1">
                        <Button variant="outline" size="sm" onClick={() => goToPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className="gap-1 px-2.5"><ChevronLeft className="h-3.5 w-3.5" />Prev</Button>
                        {pageList.map((p, idx) => p === "…" ? <span key={`el-${idx}`} className="w-8 text-center text-sm text-muted-foreground">…</span> : (
                          <Button key={p} variant={currentPage === p ? "default" : "outline"} size="sm" onClick={() => goToPage(p as number)} className={cn("w-8 px-0", currentPage === p && "pointer-events-none")} aria-current={currentPage === p ? "page" : undefined}>{p}</Button>
                        ))}
                        <Button variant="outline" size="sm" onClick={() => goToPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} className="gap-1 px-2.5">Next<ChevronRight className="h-3.5 w-3.5" /></Button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted mb-3"><Users className="h-7 w-7 text-muted-foreground" /></div>
                  <h3 className="text-base font-bold mb-1">No roommates found</h3>
                  <p className="text-sm text-muted-foreground mb-4 max-w-xs">Try adjusting your filters.</p>
                  <Button onClick={clearFilters} variant="outline" size="sm">Clear Filters</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <ProfilePreviewDrawer roommate={selectedRoommate} open={!!selectedRoommate} onOpenChange={(open) => !open && setSelectedRoommate(null)} onMessage={handleMessage} onViewFullProfile={(id) => { window.location.href = `/roommates/${id}`; }} />
    </div>
  );
}

"use client";

import { useState } from "react";
import { Search, Grid3X3, List, Home, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RoomCard } from "@/components/roo/room-card/page";
import {
  FiltersDrawer,
  DEFAULT_LISTING_FILTERS,
  type ListingFilters,
} from "@/components/roommates/filters-drawer";
import { MOCK_LISTINGS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const ITEMS_PER_PAGE = 12;

export function ListingsContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<ListingFilters>(DEFAULT_LISTING_FILTERS);

  const clearFilters = () => {
    setFilters(DEFAULT_LISTING_FILTERS);
    setCurrentPage(1);
  };

  let filtered = MOCK_LISTINGS.filter((listing) => {
    if (filters.verifiedOnly && !listing.isVerified) return false;
    if (listing.price < filters.priceMin || listing.price > filters.priceMax) return false;
    if (filters.type !== "all" && listing.type !== filters.type) return false;
    if (filters.gender !== "any" && listing.genderPreference !== filters.gender && listing.genderPreference !== "any") {
      return false;
    }
    if (filters.location !== "all" && !listing.location.toLowerCase().includes(filters.location)) {
      return false;
    }
    if (typeof listing.landlordTrustScore === "number" && listing.landlordTrustScore < filters.minTrustScore) {
      return false;
    }
    if (filters.minMatchScore > 0 && (!listing.matchScore || listing.matchScore < filters.minMatchScore)) {
      return false;
    }
    if (filters.amenities.length > 0 && !filters.amenities.every((a) => listing.amenities.includes(a))) {
      return false;
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!listing.title.toLowerCase().includes(q) && !listing.location.toLowerCase().includes(q)) {
        return false;
      }
    }
    return true;
  });

  if (filters.sortBy === "lowestPrice") {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (filters.sortBy === "highestRated") {
    filtered = [...filtered].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
  } else if (filters.sortBy === "highestTrust") {
    filtered = [...filtered].sort(
      (a, b) => (b.landlordTrustScore ?? 0) - (a.landlordTrustScore ?? 0)
    );
  } else if (filters.sortBy === "bestMatch") {
    filtered = [...filtered].sort((a, b) => (b.matchScore ?? 0) - (a.matchScore ?? 0));
  } else {
    filtered = [...filtered].sort(
      (a, b) => (a.postedDaysAgo ?? 999) - (b.postedDaysAgo ?? 999)
    );
  }

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleFiltersChange = (next: ListingFilters) => {
    setFilters(next);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen page-enter">
      {/* ── Search Bar ──────────────────────────────────────────────────── */}
      <div className="sticky top-16 z-40 border-b bg-background/95 backdrop-blur py-3">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="input-container flex items-center gap-2 rounded-xl border bg-background px-3 py-2">
            <Search className="h-4 w-4 text-muted-foreground shrink-0" />
            <Input
              type="text"
              placeholder="Search by location or keyword..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="flex-1 border-0 bg-transparent p-0 text-sm outline-none focus-visible:ring-0"
              aria-label="Search listings"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-6">
        {/* Results header */}
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-medium text-foreground">{filtered.length}</span> listings
          </p>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Grid view">
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="List view">
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar — same pattern as Roommates page */}
          <aside className="lg:w-80 shrink-0">
            <FiltersDrawer
              variant="listing"
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onClearFilters={clearFilters}
            />
          </aside>

          {/* Listing grid */}
          <div className="flex-1">
            {paginated.length > 0 ? (
              <>
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5 items-stretch mb-8">
                  {paginated.map((listing, i) => (
                    <div
                      key={listing.id}
                      className="flex animate-in fade-in slide-in-from-bottom-3 duration-300 fill-mode-both"
                      style={{ animationDelay: `${i * 60}ms` }}
                    >
                      <RoomCard listing={listing} equalHeight className="w-full" />
                    </div>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="btn-secondary-motion"
                      aria-label="Previous page"
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
                        aria-label={`Page ${page}`}
                        aria-current={currentPage === page ? "page" : undefined}
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
                      aria-label="Next page"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-4">
                  <Home className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">No listings found</h3>
                <p className="text-muted-foreground mb-6 max-w-md">
                  Try adjusting your search or filters to find more results.
                </p>
                <Button variant="outline" onClick={clearFilters} className="btn-secondary-motion">
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Search, SlidersHorizontal, MapPin, Home, Grid3X3, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { buildMeta } from "@/lib/metadata";
import { LISTING_TYPES, FURNISHING_TYPES, NEPAL_CITIES } from "@/lib/constants";

export const metadata: Metadata = buildMeta({
  title: "Browse Room Listings",
  description: "Browse verified room listings, apartments, PGs, and hostels across Nepal.",
});

interface SearchParams {
  q?: string;
  city?: string;
  type?: string;
  minPrice?: string;
  maxPrice?: string;
  page?: string;
}

// Mock listings — replace with DB query using searchParams
const MOCK_LISTINGS = Array.from({ length: 12 }, (_, i) => ({
  id: `listing-${i + 1}`,
  title: ["Cozy Room in Thamel", "Modern Studio Flat", "Shared Apartment", "Spacious PG Room", "Furnished Hostel Room"][i % 5],
  location: ["Thamel, Kathmandu", "Lazimpat, Kathmandu", "Patan, Lalitpur", "Lakeside, Pokhara", "Chabahil, Kathmandu"][i % 5],
  price: [8000, 12000, 15000, 6500, 4500][i % 5],
  type: ["room", "apartment", "apartment", "pg", "hostel"][i % 5] as string,
  bedrooms: [1, 2, 1, 1, 1][i % 5],
  isVerified: i % 3 !== 0,
  genderPreference: ["any", "male", "female"][i % 3],
  badges: [["WiFi", "Furnished"], ["Parking", "Kitchen"], ["Security"], ["WiFi"], ["Laundry"]][i % 5],
}));

export default async function ListingsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  return (
    <div className="min-h-screen">
      {/* Search & Filters Bar */}
      <div className="sticky top-16 z-40 border-b bg-background/95 backdrop-blur py-3">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex flex-1 items-center gap-2 rounded-lg border bg-background px-3">
              <Search className="h-4 w-4 text-muted-foreground shrink-0" />
              <input
                type="text"
                placeholder="Search by location or keyword..."
                defaultValue={params.q}
                className="flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground"
                aria-label="Search listings"
              />
            </div>
            <div className="flex gap-2">
              <select
                className="h-9 rounded-lg border border-input bg-background px-2.5 text-sm outline-none focus-visible:border-ring"
                defaultValue={params.city ?? ""}
              >
                <option value="">All Cities</option>
                {NEPAL_CITIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <select
                className="h-9 rounded-lg border border-input bg-background px-2.5 text-sm outline-none focus-visible:border-ring"
                defaultValue={params.type ?? ""}
              >
                <option value="">All Types</option>
                {LISTING_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
              <Button variant="outline" size="sm" className="gap-2 shrink-0">
                <SlidersHorizontal className="h-4 w-4" />
                <span className="hidden sm:inline">Filters</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-6">
        {/* Results header */}
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-medium text-foreground">{MOCK_LISTINGS.length}</span> listings
            {params.city ? ` in ${params.city}` : ""}
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

        {/* Listing grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {MOCK_LISTINGS.map((listing) => (
            <Link key={listing.id} href={`/listings/${listing.id}`}>
              <Card className="group hover:shadow-md transition-shadow overflow-hidden h-full">
                <div className="h-44 bg-muted flex items-center justify-center relative">
                  <Home className="h-12 w-12 text-muted-foreground/40" />
                  {listing.isVerified && (
                    <Badge className="absolute top-2 left-2 text-xs gap-1 py-0.5">
                      ✓ Verified
                    </Badge>
                  )}
                  <Badge variant="secondary" className="absolute top-2 right-2 text-xs capitalize">
                    {listing.type}
                  </Badge>
                </div>
                <CardContent className="p-4 flex flex-col gap-2">
                  <h3 className="font-semibold text-sm leading-snug group-hover:text-primary transition-colors line-clamp-1">
                    {listing.title}
                  </h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3 shrink-0" />
                    {listing.location}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm">
                      NPR {listing.price.toLocaleString()}
                      <span className="font-normal text-muted-foreground text-xs">/mo</span>
                    </span>
                    <Badge
                      variant="outline"
                      className="text-xs capitalize py-0"
                    >
                      {listing.genderPreference === "any" ? "All" : listing.genderPreference}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {listing.badges.map((b) => (
                      <Badge key={b} variant="secondary" className="text-xs px-1.5 py-0">
                        {b}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-2 mt-10">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          {[1, 2, 3].map((p) => (
            <Button key={p} variant={p === 1 ? "default" : "outline"} size="sm">
              {p}
            </Button>
          ))}
          <Button variant="outline" size="sm">Next</Button>
        </div>
      </div>
    </div>
  );
}

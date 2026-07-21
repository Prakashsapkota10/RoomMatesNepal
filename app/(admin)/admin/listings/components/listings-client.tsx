"use client";

import { useMemo, useState } from "react";
import { Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AdminSearchBar } from "@/components/admin/admin-search-bar";
import {
  ListingFiltersBar,
  DEFAULT_LISTING_FILTERS,
  type ListingFiltersState,
} from "./listing-filters-bar";
import { RoomsTable } from "./rooms-table";
import { RoommateRequestsTable } from "./roommate-requests-table";
import { ListingsPagination } from "./listings-pagination";
import { ListingDetailsDialog } from "./listing-details-dialog";
import { MOCK_ROOM_LISTINGS, MOCK_ROOMMATE_REQUESTS } from "./mock-listings";
import type { AdminListingRow } from "./types";

const PAGE_SIZE = 3;

function matchesPriceRange(amount: number, range: string) {
  if (range === "all") return true;
  const [min, max] = range.split("-").map(Number);
  return amount >= min && amount <= max;
}

/**
 * Client shell for /admin/listings — Rooms / Roommate Requests tabs, search,
 * filters, tables, pagination, and the listing details dialog.
 * All filtering/pagination below is client-side over mock data.
 * TODO: replace with server-driven search + filtered/paginated queries.
 */
export function ListingsClient() {
  const [tab, setTab] = useState<"rooms" | "roommates">("rooms");
  const [filters, setFilters] = useState<ListingFiltersState>(DEFAULT_LISTING_FILTERS);
  const [page, setPage] = useState(1);
  const [selectedListing, setSelectedListing] = useState<AdminListingRow | null>(null);

  const filteredRooms = useMemo(() => {
    return MOCK_ROOM_LISTINGS.filter((room) => {
      if (filters.city !== "all" && room.city.toLowerCase() !== filters.city) return false;
      if (filters.status !== "all" && room.status !== filters.status) return false;
      if (!matchesPriceRange(room.rent, filters.price)) return false;
      return true;
    });
  }, [filters]);

  const filteredRoommates = useMemo(() => {
    return MOCK_ROOMMATE_REQUESTS.filter((req) => {
      if (filters.city !== "all" && req.city.toLowerCase() !== filters.city) return false;
      if (filters.status !== "all" && req.status !== filters.status) return false;
      if (!matchesPriceRange(req.budget, filters.price)) return false;
      return true;
    });
  }, [filters]);

  const activeList = tab === "rooms" ? filteredRooms : filteredRoommates;
  const totalPages = Math.max(1, Math.ceil(activeList.length / PAGE_SIZE));
  const pagedRooms = filteredRooms.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const pagedRoommates = filteredRoommates.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleTabChange(next: string) {
    setTab(next as "rooms" | "roommates");
    setPage(1);
  }

  function handleFiltersChange(next: ListingFiltersState) {
    setFilters(next);
    setPage(1);
  }

  function handleClearFilters() {
    setFilters(DEFAULT_LISTING_FILTERS);
    setPage(1);
  }

  return (
    <div className="flex flex-col gap-6 page-enter">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Listings</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Review, approve, and moderate room listings and roommate requests.
          </p>
        </div>
        <Button variant="outline" size="sm" className="btn-secondary-motion gap-1.5 font-medium shrink-0">
          <Download className="h-3.5 w-3.5" />
          Export Data
        </Button>
      </div>

      {/* Search */}
      <AdminSearchBar placeholder="Search listings by title, owner, or ID..." />

      <Tabs value={tab} onValueChange={handleTabChange}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <TabsList>
            <TabsTrigger value="rooms">Rooms</TabsTrigger>
            <TabsTrigger value="roommates">Roommate Requests</TabsTrigger>
          </TabsList>
        </div>

        {/* Filters */}
        <div className="mt-4">
          <ListingFiltersBar filters={filters} onChange={handleFiltersChange} onClear={handleClearFilters} />
        </div>

        <TabsContent value="rooms" className="mt-4">
          <Card className="overflow-hidden py-0">
            <CardContent className="p-0">
              <RoomsTable listings={pagedRooms} onView={setSelectedListing} />
            </CardContent>
            <ListingsPagination
              page={page}
              totalPages={totalPages}
              totalResults={filteredRooms.length}
              pageSize={PAGE_SIZE}
              onPageChange={setPage}
            />
          </Card>
        </TabsContent>

        <TabsContent value="roommates" className="mt-4">
          <Card className="overflow-hidden py-0">
            <CardContent className="p-0">
              <RoommateRequestsTable requests={pagedRoommates} onView={setSelectedListing} />
            </CardContent>
            <ListingsPagination
              page={page}
              totalPages={totalPages}
              totalResults={filteredRoommates.length}
              pageSize={PAGE_SIZE}
              onPageChange={setPage}
            />
          </Card>
        </TabsContent>
      </Tabs>

      <ListingDetailsDialog
        listing={selectedListing}
        onOpenChange={(open) => !open && setSelectedListing(null)}
      />
    </div>
  );
}

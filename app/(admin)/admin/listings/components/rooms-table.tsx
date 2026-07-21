"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ListingThumbnail } from "./listing-thumbnail";
import { ListingStatusBadge } from "./listing-status-badge";
import { ListingRowActions } from "./listing-row-actions";
import type { RoomListingRow, AdminListingRow } from "./types";

interface RoomsTableProps {
  listings: RoomListingRow[];
  onView: (listing: AdminListingRow) => void;
}

/**
 * Rooms table for /admin/listings — Listing (thumbnail + title + listed
 * time), Owner, Location, Rent, Status, Actions. Mirrors the reference
 * design's column layout (Stats column intentionally omitted).
 */
export function RoomsTable({ listings, onView }: RoomsTableProps) {
  if (listings.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-sm font-medium text-foreground">No room listings match these filters.</p>
        <p className="text-xs text-muted-foreground mt-1">Try adjusting or clearing your filters.</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Listing</TableHead>
          <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Owner</TableHead>
          <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Location</TableHead>
          <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Rent</TableHead>
          <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Status</TableHead>
          <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {listings.map((listing, index) => (
          <TableRow
            key={listing.id}
            className="animate-in fade-in slide-in-from-bottom-1 duration-300 fill-mode-both cursor-pointer"
            style={{ animationDelay: `${index * 40}ms` }}
            onClick={() => onView(listing)}
          >
            <TableCell>
              <div className="flex items-center gap-3">
                <ListingThumbnail src={listing.image} alt={listing.title} />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground leading-tight line-clamp-1 max-w-[220px]">
                    {listing.title}
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{listing.listedAgo}</p>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Avatar size="sm">
                  <AvatarImage src={listing.ownerAvatar} alt={listing.ownerName} />
                  <AvatarFallback className="text-[10px] font-semibold bg-primary/10 text-primary">
                    {listing.ownerName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-foreground">{listing.ownerName}</span>
              </div>
            </TableCell>
            <TableCell>
              <span className="text-sm text-foreground">{listing.location}</span>
            </TableCell>
            <TableCell>
              <span className="text-sm font-semibold text-primary">
                Rs. {listing.rent.toLocaleString()}
              </span>
            </TableCell>
            <TableCell>
              <ListingStatusBadge status={listing.status} />
            </TableCell>
            <TableCell onClick={(e) => e.stopPropagation()}>
              <ListingRowActions listing={listing} onView={onView} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

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
import type { RoommateRequestRow, AdminListingRow } from "./types";

interface RoommateRequestsTableProps {
  requests: RoommateRequestRow[];
  onView: (listing: AdminListingRow) => void;
}

/**
 * Roommate Requests table for /admin/listings — same column pattern as the
 * Rooms table (Listing, Requester, Location, Budget, Status, Actions), so
 * the admin experience feels identical across both listing types.
 */
export function RoommateRequestsTable({ requests, onView }: RoommateRequestsTableProps) {
  if (requests.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-sm font-medium text-foreground">No roommate requests match these filters.</p>
        <p className="text-xs text-muted-foreground mt-1">Try adjusting or clearing your filters.</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Listing</TableHead>
          <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Requester</TableHead>
          <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Location</TableHead>
          <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Budget</TableHead>
          <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Status</TableHead>
          <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {requests.map((request, index) => (
          <TableRow
            key={request.id}
            className="animate-in fade-in slide-in-from-bottom-1 duration-300 fill-mode-both cursor-pointer"
            style={{ animationDelay: `${index * 40}ms` }}
            onClick={() => onView(request)}
          >
            <TableCell>
              <div className="flex items-center gap-3">
                <ListingThumbnail src={request.image} alt={request.title} />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground leading-tight line-clamp-1 max-w-[220px]">
                    {request.title}
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{request.listedAgo}</p>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Avatar size="sm">
                  <AvatarImage src={request.requesterAvatar} alt={request.requesterName} />
                  <AvatarFallback className="text-[10px] font-semibold bg-primary/10 text-primary">
                    {request.requesterName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-foreground">{request.requesterName}</span>
              </div>
            </TableCell>
            <TableCell>
              <span className="text-sm text-foreground">{request.location}</span>
            </TableCell>
            <TableCell>
              <span className="text-sm font-semibold text-primary">
                Rs. {request.budget.toLocaleString()}
              </span>
            </TableCell>
            <TableCell>
              <ListingStatusBadge status={request.status} />
            </TableCell>
            <TableCell onClick={(e) => e.stopPropagation()}>
              <ListingRowActions listing={request} onView={onView} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

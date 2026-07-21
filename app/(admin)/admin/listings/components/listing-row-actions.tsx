"use client";

import { Eye, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import type { AdminListingRow } from "./types";

interface ListingRowActionsProps {
  listing: AdminListingRow;
  onView: (listing: AdminListingRow) => void;
}

/**
 * Row-level quick actions for the listings/roommate-requests tables: view
 * details, approve, and reject. Approve/Reject are disabled once a listing
 * is already in that state, matching the reference design's icon buttons.
 * TODO: wire approve/reject to the real moderation API.
 */
export function ListingRowActions({ listing, onView }: ListingRowActionsProps) {
  const isApproved = listing.status === "approved";
  const isRejected = listing.status === "rejected";

  return (
    <div className="flex items-center justify-end gap-1">
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label={`View ${listing.title}`}
              onClick={() => onView(listing)}
            >
              <Eye className="h-3.5 w-3.5 text-muted-foreground" />
            </Button>
          }
        />
        <TooltipContent>View Details</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              variant="outline"
              size="icon-sm"
              disabled={isApproved}
              aria-label={`Approve ${listing.title}`}
              className="border-[color:var(--trust)]/40 hover:bg-[color:var(--trust-light)]"
            >
              <Check className="h-3.5 w-3.5 text-[color:var(--trust)]" />
            </Button>
          }
        />
        <TooltipContent>Approve</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              variant="outline"
              size="icon-sm"
              disabled={isRejected}
              aria-label={`Reject ${listing.title}`}
              className="border-destructive/40 hover:bg-destructive/10"
            >
              <X className="h-3.5 w-3.5 text-destructive" />
            </Button>
          }
        />
        <TooltipContent>Reject</TooltipContent>
      </Tooltip>
    </div>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import { ShieldCheck, Check, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ListingStatusBadge } from "./listing-status-badge";
import { AmenityIcon } from "./amenity-icon";
import type { AdminListingRow } from "./types";

interface ListingDetailsDialogProps {
  listing: AdminListingRow | null;
  onOpenChange: (open: boolean) => void;
}

/**
 * Listing Details dialog — image carousel, price, owner/requester
 * verification banner, amenities/preferences grid, description, and
 * Approve/Reject actions. Mirrors the reference design for both room
 * listings and roommate requests.
 * TODO: wire Approve/Reject to the real moderation API.
 */
export function ListingDetailsDialog({ listing, onOpenChange }: ListingDetailsDialogProps) {
  const [activeImage, setActiveImage] = useState(0);

  if (!listing) return null;

  const isRoom = listing.kind === "room";
  const personName = isRoom ? listing.ownerName : listing.requesterName;
  const isVerified = isRoom ? listing.ownerVerified : listing.requesterVerified;
  const verifiedDate = isRoom ? listing.ownerVerifiedDate : listing.requesterVerifiedDate;
  const price = isRoom ? listing.rent : listing.budget;
  const tags = isRoom ? listing.amenities : listing.preferences;
  const isApproved = listing.status === "approved";
  const isRejected = listing.status === "rejected";

  return (
    <Dialog open={!!listing} onOpenChange={(open) => { if (!open) { setActiveImage(0); onOpenChange(false); } }}>
      <DialogContent className="sm:max-w-md p-0 gap-0 max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader className="px-4 pt-4 pb-2 flex-row items-center justify-between gap-2">
          <DialogTitle>Listing Details</DialogTitle>
        </DialogHeader>

        <div className="overflow-y-auto flex-1">
          {/* Image carousel */}
          <div className="relative h-48 bg-muted">
            <Image
              src={listing.images[activeImage] ?? listing.image}
              alt={listing.title}
              fill
              className="object-cover"
            />
            {listing.images.length > 1 && (
              <div className="absolute bottom-2.5 left-0 right-0 flex items-center justify-center gap-1.5">
                {listing.images.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Show image ${i + 1}`}
                    onClick={() => setActiveImage(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      i === activeImage ? "w-4 bg-white" : "w-1.5 bg-white/60"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="p-4 flex flex-col gap-4">
            {/* Title, price, status */}
            <div>
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-base font-bold text-foreground leading-snug">{listing.title}</h3>
                <ListingStatusBadge status={listing.status} />
              </div>
              <p className="text-lg font-bold text-primary mt-1">
                Rs. {price.toLocaleString()}
                <span className="text-xs font-normal text-muted-foreground">
                  {isRoom ? " / month" : " / month budget"}
                </span>
              </p>
            </div>

            {/* Verification banner */}
            <div className="flex items-start gap-2.5 rounded-xl bg-primary/5 border border-primary/15 p-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 shrink-0">
                <ShieldCheck className="h-4 w-4 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-primary">
                  {isVerified ? `${isRoom ? "Owner" : "Requester"} Verified` : `${isRoom ? "Owner" : "Requester"} Not Verified`}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {isVerified
                    ? `Identity & property documents verified on ${verifiedDate}.`
                    : `${personName} has not completed identity verification yet.`}
                </p>
              </div>
            </div>

            {/* Amenities / Preferences */}
            <div>
              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                {isRoom ? "Amenities" : "Preferences"}
              </p>
              <div className="grid grid-cols-2 gap-2">
                {tags.map((tag) => (
                  <div
                    key={tag}
                    className="flex items-center gap-2 rounded-lg border px-2.5 py-2 text-xs text-foreground"
                  >
                    <AmenityIcon label={tag} className="h-3.5 w-3.5 text-primary shrink-0" />
                    <span className="truncate">{tag}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                Description
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">{listing.description}</p>
            </div>
          </div>
        </div>

        {/* Approve / Reject actions */}
        <div className="flex items-center gap-2 p-4 border-t bg-muted/30">
          <Button
            className="flex-1 btn-primary-motion gap-1.5 font-semibold"
            disabled={isApproved}
          >
            <Check className="h-4 w-4" />
            Approve Listing
          </Button>
          <Button
            variant="outline"
            className="flex-1 btn-secondary-motion gap-1.5 font-semibold border-destructive/40 text-destructive hover:bg-destructive/10"
            disabled={isRejected}
          >
            <X className="h-4 w-4" />
            Reject / Flag
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

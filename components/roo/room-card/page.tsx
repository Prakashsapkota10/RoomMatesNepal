"use client";

import { useState } from "react";
import {
  MapPin,
  Calendar,
  ShieldCheck,
  Star,
  MessageSquare,
  Bookmark,
  BookmarkCheck,
  Clock,
  Sparkles,
  CheckCircle2,
  Home,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface RoomListingData {
  id: string;
  title: string;
  /** e.g. "private", "shared", "studio", "apartment" */
  type: string;
  location: string;
  price: number;
  photo?: string;
  isVerified: boolean;
  genderPreference: "male" | "female" | "any";
  amenities: string[];
  rating?: number;
  reviewCount?: number;
  availableFrom?: string;
  occupants?: { current: number; total: number };
  postedDaysAgo?: number;
  landlordTrustScore?: number;
  matchScore?: number;
  matchReasons?: string[];
}

interface RoomCardProps {
  listing: RoomListingData;
  onViewDetails?: (id: string) => void;
  onContact?: (id: string) => void;
  /** When true the card stretches to fill its grid cell height */
  equalHeight?: boolean;
  className?: string;
}

const DEFAULT_ROOM_PHOTO = "/photo-1512918728675-ed5a9ecdebfd.avif";

export function RoomCard({
  listing,
  onViewDetails,
  onContact,
  equalHeight = false,
  className,
}: RoomCardProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [imgError, setImgError] = useState(false);

  const photoSrc = !imgError && listing.photo ? listing.photo : null;

  const getTrustScoreColor = (score: number) => {
    if (score >= 80) return "text-[color:var(--success)] bg-[color:var(--success-light)]";
    if (score >= 60) return "text-[color:var(--trust)] bg-[color:var(--trust-light)]";
    if (score >= 40) return "text-[color:var(--warning)] bg-[color:var(--warning-light)]";
    return "text-muted-foreground bg-muted";
  };

  const getMatchBadge = (score?: number) => {
    if (!score) return null;
    if (score >= 85) return { label: "Perfect Fit", color: "bg-[color:var(--ai)] text-white" };
    if (score >= 70) return { label: "Great Fit", color: "bg-[color:var(--success)] text-white" };
    if (score >= 50) return { label: "Good Fit", color: "bg-[color:var(--trust)] text-white" };
    return null;
  };

  const matchBadge = getMatchBadge(listing.matchScore);

  return (
    <Card
      className={cn(
        "card-listing group relative overflow-hidden",
        equalHeight && "flex flex-col h-full",
        className
      )}
    >
      {/* ── Photo ──────────────────────────────────────────────────────── */}
      <div className="relative shrink-0">
        <div className="img-hover relative h-48 w-full overflow-hidden bg-gradient-to-br from-muted to-muted/60">
          {photoSrc ? (
            <img
              src={photoSrc}
              alt={listing.title}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br from-[color:var(--community-light)] via-[color:var(--community)]/30 to-[color:var(--ai-light)]">
              <img
                src={DEFAULT_ROOM_PHOTO}
                alt=""
                aria-hidden
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover opacity-40"
              />
              <Home className="relative h-12 w-12 text-[color:var(--community)]/60" />
            </div>
          )}

          {/* bottom-fade overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          {/* badges — top row */}
          <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
            {listing.isVerified && (
              <Badge className="gap-1 bg-[color:var(--success)] text-white shadow-md shrink-0">
                <ShieldCheck className="h-3 w-3" />
                Verified
              </Badge>
            )}
            <div className="ml-auto flex flex-col items-end gap-1.5">
              {matchBadge && (
                <Badge className={cn("gap-1 shadow-md shrink-0", matchBadge.color)}>
                  <Sparkles className="h-3 w-3" />
                  {matchBadge.label}
                </Badge>
              )}
              <Badge variant="secondary" className="text-xs capitalize shadow-md shrink-0">
                {listing.type}
              </Badge>
            </div>
          </div>

          {/* Bookmark */}
          <button
            onClick={() => setIsSaved((v) => !v)}
            className="btn-primary-motion absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-background/90 backdrop-blur-sm shadow-md transition-colors hover:bg-background"
            aria-label={isSaved ? "Remove bookmark" : "Bookmark"}
          >
            {isSaved ? (
              <BookmarkCheck className="h-4 w-4 fill-primary text-primary" />
            ) : (
              <Bookmark className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* ── Info (grows to fill height when equalHeight) ─────────────── */}
      <div className={cn("flex flex-col gap-3 p-5", equalHeight && "flex-1")}>
        {/* Title + rating */}
        <div>
          <div className="mb-1 flex items-start justify-between gap-2">
            <h3 className="font-bold text-base leading-snug transition-colors duration-150 group-hover:text-primary line-clamp-1">
              {listing.title}
            </h3>
            {!!listing.rating && listing.rating > 0 && (
              <div className="flex items-center gap-1 text-xs shrink-0">
                <Star className="h-3.5 w-3.5 fill-[color:var(--warning)] text-[color:var(--warning)]" />
                <span className="font-semibold">{listing.rating.toFixed(1)}</span>
                {!!listing.reviewCount && (
                  <span className="text-muted-foreground">({listing.reviewCount})</span>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-1 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{listing.location}</span>
            </div>
            {listing.availableFrom && (
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 shrink-0" />
                <span>Available: {listing.availableFrom}</span>
              </div>
            )}
            {listing.occupants && (
              <div className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5 shrink-0" />
                <span>
                  {listing.occupants.current}/{listing.occupants.total} spots filled
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-1">
          <span className="text-xl font-extrabold text-primary">
            NPR {listing.price.toLocaleString()}
          </span>
          <span className="text-xs text-muted-foreground">/month</span>
        </div>

        {/* Trust + gender preference + posted */}
        <div className="flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            {typeof listing.landlordTrustScore === "number" && (
              <div className="flex items-center gap-1.5">
                <span className="text-muted-foreground">Trust:</span>
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 font-semibold",
                    getTrustScoreColor(listing.landlordTrustScore)
                  )}
                >
                  {listing.landlordTrustScore}/100
                </span>
              </div>
            )}
            <Badge variant="outline" className="text-[11px] font-medium px-2 py-0.5 capitalize">
              {listing.genderPreference === "any" ? "All" : listing.genderPreference}
            </Badge>
          </div>
          {typeof listing.postedDaysAgo === "number" && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-3 w-3 shrink-0" />
              <span>
                Posted {listing.postedDaysAgo === 0 ? "today" : `${listing.postedDaysAgo}d ago`}
              </span>
            </div>
          )}
        </div>

        {/* Amenities chips */}
        {listing.amenities.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {listing.amenities.slice(0, 3).map((amenity) => (
              <Badge key={amenity} variant="outline" className="text-[11px] font-medium px-2 py-0.5">
                {amenity}
              </Badge>
            ))}
            {listing.amenities.length > 3 && (
              <Badge variant="outline" className="text-[11px] font-medium px-2 py-0.5">
                +{listing.amenities.length - 3}
              </Badge>
            )}
          </div>
        )}

        {/* Match reasons — push to bottom in equal-height mode */}
        {listing.matchReasons && listing.matchReasons.length > 0 && (
          <div className={cn("rounded-lg bg-[color:var(--ai-light)] p-3 text-xs", equalHeight && "mt-auto")}>
            <p className="mb-1.5 font-semibold text-[color:var(--ai-dark)]">Why This Fits You:</p>
            <ul className="space-y-1">
              {listing.matchReasons.slice(0, 2).map((reason, i) => (
                <li key={i} className="flex items-center gap-1.5 text-[color:var(--ai-dark)]">
                  <CheckCircle2 className="h-3 w-3 shrink-0" />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* ── Actions — always pinned at bottom ────────────────────────── */}
      <div className="border-t bg-muted/30 p-4 shrink-0">
        <div className="flex gap-2">
          <Button
            onClick={() => onViewDetails?.(listing.id)}
            variant="outline"
            size="sm"
            className="btn-secondary-motion flex-1 font-medium text-xs"
          >
            View Details
          </Button>
          <Button
            onClick={() => onContact?.(listing.id)}
            size="sm"
            className="btn-primary-motion flex-1 gap-1.5 font-medium text-xs"
          >
            <MessageSquare className="h-3.5 w-3.5" />
            Contact
          </Button>
        </div>
      </div>
    </Card>
  );
}
"use client";

import { useState } from "react";
import {
  MapPin,
  Briefcase,
  Calendar,
  ShieldCheck,
  Star,
  MessageSquare,
  Bookmark,
  BookmarkCheck,
  Clock,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface RoommateData {
  id: string;
  name: string;
  age: number;
  occupation: string;
  location: string;
  budget: number;
  moveInDate: string;
  photo?: string;
  bio?: string;
  compatibilityScore?: number;
  trustScore: number;
  isVerified: boolean;
  rating: number;
  reviewCount: number;
  responseTime: string;
  lifestyleChips: string[];
  compatibilityReasons?: string[];
}

interface RoommateCardProps {
  roommate: RoommateData;
  onViewProfile?: (id: string) => void;
  onMessage?: (id: string) => void;
  /** When true the card stretches to fill its grid cell height */
  equalHeight?: boolean;
  className?: string;
}

export function RoommateCard({
  roommate,
  onViewProfile,
  onMessage,
  equalHeight = false,
  className,
}: RoommateCardProps) {
  const [isSaved, setIsSaved] = useState(false);

  const getTrustScoreColor = (score: number) => {
    if (score >= 80) return "text-[color:var(--success)] bg-[color:var(--success-light)]";
    if (score >= 60) return "text-[color:var(--trust)] bg-[color:var(--trust-light)]";
    if (score >= 40) return "text-[color:var(--warning)] bg-[color:var(--warning-light)]";
    return "text-muted-foreground bg-muted";
  };

  const getCompatibilityBadge = (score?: number) => {
    if (!score) return null;
    if (score >= 85) return { label: "Excellent Match", color: "bg-[color:var(--ai)] text-white" };
    if (score >= 70) return { label: "Great Match", color: "bg-[color:var(--success)] text-white" };
    if (score >= 50) return { label: "Good Match", color: "bg-[color:var(--trust)] text-white" };
    return null;
  };

  const compatibilityBadge = getCompatibilityBadge(roommate.compatibilityScore);

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
          {roommate.photo ? (
            <img
              src={roommate.photo}
              alt={roommate.name}
              className="h-full w-full object-cover object-top"
            />
          ) : (
            /* Gradient avatar placeholder */
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[color:var(--community-light)] via-[color:var(--community)]/30 to-[color:var(--ai-light)]">
              <span className="text-5xl font-extrabold text-[color:var(--community)] select-none">
                {roommate.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}

          {/* bottom-fade overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          {/* badges — top row */}
          <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
            {roommate.isVerified && (
              <Badge className="gap-1 bg-[color:var(--success)] text-white shadow-md shrink-0">
                <ShieldCheck className="h-3 w-3" />
                Verified
              </Badge>
            )}
            {compatibilityBadge && (
              <Badge className={cn("gap-1 shadow-md ml-auto shrink-0", compatibilityBadge.color)}>
                <Sparkles className="h-3 w-3" />
                {compatibilityBadge.label}
              </Badge>
            )}
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
        {/* Name + rating */}
        <div>
          <div className="mb-1 flex items-start justify-between gap-2">
            <h3 className="font-bold text-base leading-snug transition-colors duration-150 group-hover:text-primary line-clamp-1">
              {roommate.name}, {roommate.age}
            </h3>
            {roommate.rating > 0 && (
              <div className="flex items-center gap-1 text-xs shrink-0">
                <Star className="h-3.5 w-3.5 fill-[color:var(--warning)] text-[color:var(--warning)]" />
                <span className="font-semibold">{roommate.rating.toFixed(1)}</span>
                <span className="text-muted-foreground">({roommate.reviewCount})</span>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-1 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Briefcase className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{roommate.occupation}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{roommate.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 shrink-0" />
              <span>Move-in: {roommate.moveInDate}</span>
            </div>
          </div>
        </div>

        {/* Budget */}
        <div className="flex items-baseline gap-1">
          <span className="text-xl font-extrabold text-primary">
            NPR {roommate.budget.toLocaleString()}
          </span>
          <span className="text-xs text-muted-foreground">/month</span>
        </div>

        {/* Trust + response */}
        <div className="flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-muted-foreground">Trust:</span>
            <span className={cn("rounded-full px-2 py-0.5 font-semibold", getTrustScoreColor(roommate.trustScore))}>
              {roommate.trustScore}/100
            </span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-3 w-3 shrink-0" />
            <span>{roommate.responseTime}</span>
          </div>
        </div>

        {/* Lifestyle chips */}
        {roommate.lifestyleChips.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {roommate.lifestyleChips.slice(0, 3).map((chip) => (
              <Badge key={chip} variant="outline" className="text-[11px] font-medium px-2 py-0.5">
                {chip}
              </Badge>
            ))}
            {roommate.lifestyleChips.length > 3 && (
              <Badge variant="outline" className="text-[11px] font-medium px-2 py-0.5">
                +{roommate.lifestyleChips.length - 3}
              </Badge>
            )}
          </div>
        )}

        {/* Compatibility reasons — push to bottom in equal-height mode */}
        {roommate.compatibilityReasons && roommate.compatibilityReasons.length > 0 && (
          <div className={cn("rounded-lg bg-[color:var(--ai-light)] p-3 text-xs", equalHeight && "mt-auto")}>
            <p className="mb-1.5 font-semibold text-[color:var(--ai-dark)]">Why You Match:</p>
            <ul className="space-y-1">
              {roommate.compatibilityReasons.slice(0, 2).map((reason, i) => (
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
            onClick={() => onViewProfile?.(roommate.id)}
            variant="outline"
            size="sm"
            className="btn-secondary-motion flex-1 font-medium text-xs"
          >
            View Profile
          </Button>
          <Button
            onClick={() => onMessage?.(roommate.id)}
            size="sm"
            className="btn-primary-motion flex-1 gap-1.5 font-medium text-xs"
          >
            <MessageSquare className="h-3.5 w-3.5" />
            Message
          </Button>
        </div>
      </div>
    </Card>
  );
}

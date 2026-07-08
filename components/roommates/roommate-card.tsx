"use client";

import { useState } from "react";
import Link from "next/link";
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
  CheckCircle2
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  className?: string;
}

export function RoommateCard({
  roommate,
  onViewProfile,
  onMessage,
  className,
}: RoommateCardProps) {
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveToggle = () => {
    setIsSaved(!isSaved);
  };

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
        className
      )}
    >
      {/* Top Section: Photo & Badges */}
      <div className="relative">
        {/* Photo */}
        <div className="img-hover relative h-48 w-full overflow-hidden bg-gradient-to-br from-muted to-muted/60">
          {roommate.photo ? (
            <img
              src={roommate.photo}
              alt={roommate.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="text-5xl font-bold text-muted-foreground/40">
                {roommate.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}

          {/* Overlay gradient for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          {/* Top badges */}
          <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
            {roommate.isVerified && (
              <Badge className="gap-1 bg-[color:var(--success)] text-white shadow-md">
                <ShieldCheck className="h-3 w-3" />
                Verified
              </Badge>
            )}
            {compatibilityBadge && (
              <Badge className={cn("gap-1 shadow-md", compatibilityBadge.color)}>
                <Sparkles className="h-3 w-3" />
                {compatibilityBadge.label}
              </Badge>
            )}
          </div>

          {/* Bookmark button */}
          <button
            onClick={handleSaveToggle}
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

      {/* Middle Section: Info */}
      <div className="flex flex-col gap-4 p-5">
        {/* Name & Basic Info */}
        <div>
          <div className="mb-1 flex items-start justify-between gap-2">
            <h3 className="font-bold text-lg leading-tight transition-colors duration-150 group-hover:text-primary">
              {roommate.name}, {roommate.age}
            </h3>
            {roommate.rating > 0 && (
              <div className="flex items-center gap-1 text-xs">
                <Star className="h-3.5 w-3.5 fill-[color:var(--warning)] text-[color:var(--warning)]" />
                <span className="font-semibold">{roommate.rating.toFixed(1)}</span>
                <span className="text-muted-foreground">({roommate.reviewCount})</span>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-1.5 text-sm text-muted-foreground">
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
          <span className="text-2xl font-bold text-primary">
            NPR {roommate.budget.toLocaleString()}
          </span>
          <span className="text-sm text-muted-foreground">/month</span>
        </div>

        {/* Trust Score & Response Time */}
        <div className="flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-muted-foreground">Trust Score:</span>
            <span className={cn("rounded-full px-2 py-0.5 font-semibold", getTrustScoreColor(roommate.trustScore))}>
              {roommate.trustScore}/100
            </span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>{roommate.responseTime}</span>
          </div>
        </div>

        {/* Lifestyle Chips */}
        {roommate.lifestyleChips.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {roommate.lifestyleChips.slice(0, 4).map((chip) => (
              <Badge
                key={chip}
                variant="outline"
                className="text-[11px] font-medium px-2 py-0.5"
              >
                {chip}
              </Badge>
            ))}
            {roommate.lifestyleChips.length > 4 && (
              <Badge
                variant="outline"
                className="text-[11px] font-medium px-2 py-0.5"
              >
                +{roommate.lifestyleChips.length - 4}
              </Badge>
            )}
          </div>
        )}

        {/* Compatibility Reasons */}
        {roommate.compatibilityReasons && roommate.compatibilityReasons.length > 0 && (
          <div className="rounded-lg bg-[color:var(--ai-light)] p-3 text-xs">
            <p className="mb-2 font-semibold text-[color:var(--ai-dark)]">
              Why You Match:
            </p>
            <ul className="space-y-1">
              {roommate.compatibilityReasons.slice(0, 3).map((reason, i) => (
                <li key={i} className="flex items-center gap-1.5 text-[color:var(--ai-dark)]">
                  <CheckCircle2 className="h-3 w-3 shrink-0" />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Bottom Section: Actions */}
      <div className="border-t bg-muted/30 p-4">
        <div className="flex gap-2">
          <Button
            onClick={() => onViewProfile?.(roommate.id)}
            variant="outline"
            size="sm"
            className="btn-secondary-motion flex-1 font-medium"
          >
            View Profile
          </Button>
          <Button
            onClick={() => onMessage?.(roommate.id)}
            size="sm"
            className="btn-primary-motion flex-1 gap-1.5 font-medium"
          >
            <MessageSquare className="h-4 w-4" />
            Message
          </Button>
        </div>
      </div>
    </Card>
  );
}

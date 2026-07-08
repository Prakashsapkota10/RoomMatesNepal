"use client";

import {
  MapPin,
  Briefcase,
  Calendar,
  ShieldCheck,
  Star,
  MessageSquare,
  CheckCircle2,
  Clock,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import type { RoommateData } from "./roommate-card";

interface ProfilePreviewDrawerProps {
  roommate: RoommateData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onMessage?: (id: string) => void;
  onViewFullProfile?: (id: string) => void;
}

interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

// Mock compatibility breakdown
const compatibilityFactors = [
  { label: "Budget Alignment", score: 95 },
  { label: "Lifestyle Match", score: 88 },
  { label: "Work Schedule", score: 92 },
  { label: "Cleanliness", score: 85 },
];

// Mock reviews
const mockReviews: Review[] = [
  {
    id: "1",
    author: "Ramesh K.",
    rating: 5,
    comment: "Great roommate! Very clean and respectful of shared spaces. Highly recommend!",
    date: "2 weeks ago",
  },
  {
    id: "2",
    author: "Sita M.",
    rating: 5,
    comment: "Lived together for 6 months. Always pays rent on time and very friendly.",
    date: "1 month ago",
  },
  {
    id: "3",
    author: "Prakash S.",
    rating: 4,
    comment: "Good person to live with. Quiet and maintains cleanliness.",
    date: "2 months ago",
  },
];

export function ProfilePreviewDrawer({
  roommate,
  open,
  onOpenChange,
  onMessage,
  onViewFullProfile,
}: ProfilePreviewDrawerProps) {
  if (!roommate) return null;

  const getTrustScoreColor = (score: number) => {
    if (score >= 80) return "text-[color:var(--success)] bg-[color:var(--success-light)]";
    if (score >= 60) return "text-[color:var(--trust)] bg-[color:var(--trust-light)]";
    if (score >= 40) return "text-[color:var(--warning)] bg-[color:var(--warning-light)]";
    return "text-muted-foreground bg-muted";
  };

  const getTrustScoreLabel = (score: number) => {
    if (score >= 80) return "Elite";
    if (score >= 60) return "Verified";
    if (score >= 40) return "Trusted";
    return "Basic";
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-lg p-0 flex flex-col gap-0"
        showCloseButton={true}
      >
        {/* Header: Large Photo */}
        <div className="relative h-64 w-full shrink-0">
          {roommate.photo ? (
            <img
              src={roommate.photo}
              alt={roommate.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-muted to-muted/60">
              <span className="text-7xl font-bold text-muted-foreground/40">
                {roommate.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Badges overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
            {roommate.isVerified && (
              <Badge className="gap-1 bg-[color:var(--success)] text-white shadow-md">
                <ShieldCheck className="h-3 w-3" />
                Verified
              </Badge>
            )}
            {roommate.compatibilityScore && roommate.compatibilityScore >= 70 && (
              <Badge className="gap-1 bg-[color:var(--ai)] text-white shadow-md">
                <Sparkles className="h-3 w-3" />
                {roommate.compatibilityScore}% Match
              </Badge>
            )}
            <Badge className="gap-1 bg-white/90 text-foreground shadow-md backdrop-blur-sm">
              <Star className="h-3 w-3 fill-[color:var(--warning)] text-[color:var(--warning)]" />
              {roommate.rating.toFixed(1)} ({roommate.reviewCount})
            </Badge>
          </div>
        </div>

        {/* Scrollable Content */}
        <ScrollArea className="flex-1">
          <div className="flex flex-col gap-6 p-6">
            {/* Basic Info */}
            <div>
              <h2 className="text-2xl font-bold mb-1">
                {roommate.name}, {roommate.age}
              </h2>
              <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 shrink-0" />
                  <span>{roommate.occupation}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 shrink-0" />
                  <span>{roommate.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 shrink-0" />
                  <span>Move-in: {roommate.moveInDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 shrink-0" />
                  <span>Responds in {roommate.responseTime}</span>
                </div>
              </div>
            </div>

            {/* Budget */}
            <div className="rounded-xl bg-primary/5 border border-primary/20 p-4">
              <p className="text-sm text-muted-foreground mb-1">Budget Range</p>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-primary">
                  NPR {roommate.budget.toLocaleString()}
                </span>
                <span className="text-sm text-muted-foreground">/month</span>
              </div>
            </div>

            <Separator />

            {/* Trust Score */}
            <div>
              <h3 className="font-semibold mb-3">Trust Score</h3>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">
                  {getTrustScoreLabel(roommate.trustScore)}
                </span>
                <span className={cn("rounded-full px-3 py-1 text-sm font-bold", getTrustScoreColor(roommate.trustScore))}>
                  {roommate.trustScore}/100
                </span>
              </div>
              <Progress value={roommate.trustScore} className="h-2" />
            </div>

            <Separator />

            {/* Compatibility Breakdown */}
            {roommate.compatibilityScore && (
              <>
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-[color:var(--ai)]" />
                    Compatibility Breakdown
                  </h3>
                  <div className="space-y-3">
                    {compatibilityFactors.map((factor) => (
                      <div key={factor.label}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-sm text-muted-foreground">{factor.label}</span>
                          <span className="text-sm font-semibold text-[color:var(--ai)]">{factor.score}%</span>
                        </div>
                        <Progress value={factor.score} className="h-1.5" />
                      </div>
                    ))}
                  </div>
                </div>

                {roommate.compatibilityReasons && roommate.compatibilityReasons.length > 0 && (
                  <div className="rounded-xl bg-[color:var(--ai-light)] p-4">
                    <p className="font-semibold text-sm text-[color:var(--ai-dark)] mb-3">
                      Why You're Compatible:
                    </p>
                    <ul className="space-y-2">
                      {roommate.compatibilityReasons.map((reason, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-[color:var(--ai-dark)]">
                          <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <Separator />
              </>
            )}

            {/* Bio */}
            {roommate.bio && (
              <>
                <div>
                  <h3 className="font-semibold mb-2">About</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {roommate.bio}
                  </p>
                </div>
                <Separator />
              </>
            )}

            {/* Lifestyle Preferences */}
            <div>
              <h3 className="font-semibold mb-3">Lifestyle Preferences</h3>
              <div className="flex flex-wrap gap-2">
                {roommate.lifestyleChips.map((chip) => (
                  <Badge
                    key={chip}
                    variant="outline"
                    className="text-xs font-medium px-3 py-1"
                  >
                    {chip}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Verification Status */}
            {roommate.isVerified && (
              <>
                <Separator />
                <div className="rounded-xl bg-[color:var(--success-light)] border border-[color:var(--success)]/20 p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <ShieldCheck className="h-5 w-5 text-[color:var(--success)]" />
                    <h3 className="font-semibold text-[color:var(--success-dark)]">Verified Profile</h3>
                  </div>
                  <p className="text-sm text-[color:var(--success-dark)]/80">
                    Identity verified with Citizenship ID
                  </p>
                </div>
              </>
            )}

            {/* Reviews */}
            {roommate.reviewCount > 0 && (
              <>
                <Separator />
                <div>
                  <h3 className="font-semibold mb-4">
                    Reviews ({roommate.reviewCount})
                  </h3>
                  <div className="space-y-4">
                    {mockReviews.map((review) => (
                      <div key={review.id} className="rounded-lg border bg-card p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-medium text-sm">{review.author}</p>
                            <p className="text-xs text-muted-foreground">{review.date}</p>
                          </div>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={cn(
                                  "h-3.5 w-3.5",
                                  i < review.rating
                                    ? "fill-[color:var(--warning)] text-[color:var(--warning)]"
                                    : "text-muted-foreground/30"
                                )}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {review.comment}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </ScrollArea>

        {/* Sticky Footer: Actions */}
        <div className="shrink-0 border-t bg-background p-4">
          <div className="flex gap-3">
            <Button
              onClick={() => onMessage?.(roommate.id)}
              className="btn-primary-motion flex-1 gap-2"
            >
              <MessageSquare className="h-4 w-4" />
              Message
            </Button>
            <Button
              onClick={() => onViewFullProfile?.(roommate.id)}
              variant="outline"
              className="btn-secondary-motion flex-1 gap-2"
            >
              View Full Profile
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

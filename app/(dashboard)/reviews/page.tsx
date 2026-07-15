"use client";

import { useState } from "react";
import {
  Star,
  ThumbsUp,
  MessageSquare,
  Filter,
  TrendingUp,
  Users,
  Clock,
  CheckCircle2,
  Quote,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const OVERVIEW = {
  averageRating: 4.7,
  totalReviews: 18,
  responseRate: 95,
  recommendRate: 94,
};

const RATING_DISTRIBUTION = [
  { stars: 5, count: 12 },
  { stars: 4, count: 4 },
  { stars: 3, count: 1 },
  { stars: 2, count: 1 },
  { stars: 1, count: 0 },
];

interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  tags: string[];
  helpful: number;
  verified: boolean;
}

const REVIEWS: Review[] = [
  {
    id: "1",
    author: "Nikita Rai",
    avatar: "N",
    rating: 5,
    date: "2 weeks ago",
    comment: "Amazing roommate! Very clean, respectful of shared spaces, and always pays rent on time. Would definitely recommend living with them.",
    tags: ["Clean", "Respectful", "Punctual"],
    helpful: 8,
    verified: true,
  },
  {
    id: "2",
    author: "Arun Magar",
    avatar: "A",
    rating: 5,
    date: "1 month ago",
    comment: "Shared a flat for 6 months. Great communication, very organized, and always willing to help with household chores. A pleasure to live with.",
    tags: ["Communicative", "Organized", "Helpful"],
    helpful: 12,
    verified: true,
  },
  {
    id: "3",
    author: "Priya Sharma",
    avatar: "P",
    rating: 4,
    date: "2 months ago",
    comment: "Good roommate overall. Quiet and keeps to themselves. Sometimes forgets about shared cleaning duties but always makes up for it when reminded.",
    tags: ["Quiet", "Friendly"],
    helpful: 5,
    verified: true,
  },
  {
    id: "4",
    author: "Ramesh Thapa",
    avatar: "R",
    rating: 5,
    date: "3 months ago",
    comment: "One of the best roommates I've had. Very considerate about noise levels, especially during exams. Highly trustworthy and honest.",
    tags: ["Considerate", "Trustworthy", "Honest"],
    helpful: 15,
    verified: true,
  },
  {
    id: "5",
    author: "Sushma Karki",
    avatar: "S",
    rating: 4,
    date: "4 months ago",
    comment: "Lived together for a semester. Friendly, pays bills on time, and respects boundaries. Would room with them again.",
    tags: ["Friendly", "Responsible"],
    helpful: 3,
    verified: false,
  },
  {
    id: "6",
    author: "Dipak Gurung",
    avatar: "D",
    rating: 3,
    date: "5 months ago",
    comment: "Decent roommate. Could improve on communication regarding guests and shared kitchen schedule. Otherwise fine.",
    tags: ["Okay"],
    helpful: 2,
    verified: true,
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  const dim = size === "md" ? "h-5 w-5" : "h-3.5 w-3.5";
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={cn(dim, i < rating ? "fill-[color:var(--warning)] text-[color:var(--warning)]" : "text-muted-foreground/30")}
        />
      ))}
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ReviewsPage() {
  const [filter, setFilter] = useState<"all" | "5" | "4" | "3">("all");

  const filteredReviews = filter === "all"
    ? REVIEWS
    : REVIEWS.filter((r) => r.rating === Number(filter));

  const totalCount = RATING_DISTRIBUTION.reduce((sum, r) => sum + r.count, 0);

  return (
    <div className="flex flex-col gap-6 page-enter max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Reviews</h1>
        <p className="text-sm text-muted-foreground mt-1">
          See what your past roommates have to say about living with you.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Avg Rating", value: OVERVIEW.averageRating.toFixed(1), icon: Star, color: "var(--warning)" },
          { label: "Total Reviews", value: OVERVIEW.totalReviews.toString(), icon: MessageSquare, color: "var(--primary)" },
          { label: "Response Rate", value: `${OVERVIEW.responseRate}%`, icon: Clock, color: "var(--trust)" },
          { label: "Recommend", value: `${OVERVIEW.recommendRate}%`, icon: ThumbsUp, color: "var(--success)" },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4 flex flex-col items-center text-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ backgroundColor: `color-mix(in srgb, ${stat.color} 12%, transparent)` }}>
                <stat.icon className="h-4 w-4" style={{ color: stat.color }} />
              </div>
              <div>
                <p className="text-xl font-extrabold" style={{ color: stat.color }}>{stat.value}</p>
                <p className="text-[11px] text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Rating Breakdown + Summary */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-8 items-center">
            {/* Big score */}
            <div className="flex flex-col items-center gap-1 shrink-0">
              <span className="text-5xl font-extrabold text-foreground">{OVERVIEW.averageRating}</span>
              <StarRating rating={Math.round(OVERVIEW.averageRating)} size="md" />
              <p className="text-xs text-muted-foreground mt-1">{totalCount} reviews</p>
            </div>

            {/* Bar chart */}
            <div className="flex-1 w-full flex flex-col gap-2">
              {RATING_DISTRIBUTION.map((row) => (
                <div key={row.stars} className="flex items-center gap-2">
                  <span className="text-xs font-medium w-3 text-right">{row.stars}</span>
                  <Star className="h-3 w-3 fill-[color:var(--warning)] text-[color:var(--warning)]" />
                  <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[color:var(--warning)] transition-all duration-500"
                      style={{ width: totalCount > 0 ? `${(row.count / totalCount) * 100}%` : "0%" }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground w-5 text-right">{row.count}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-muted-foreground" />
        {(["all", "5", "4", "3"] as const).map((f) => (
          <Button
            key={f}
            variant={filter === f ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(f)}
            className={cn("rounded-lg text-xs px-3", filter === f && "pointer-events-none")}
          >
            {f === "all" ? "All" : `${f} Stars`}
          </Button>
        ))}
      </div>

      {/* Reviews List */}
      <div className="flex flex-col gap-4">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review) => (
            <Card key={review.id} className="card-dashboard">
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-[color:var(--community)]/20 text-primary font-bold text-sm shrink-0">
                    {review.avatar}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {/* Author row */}
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-semibold text-sm">{review.author}</span>
                      {review.verified && (
                        <Badge variant="secondary" className="gap-1 text-[10px] py-0">
                          <CheckCircle2 className="h-2.5 w-2.5" />
                          Verified
                        </Badge>
                      )}
                      <span className="text-xs text-muted-foreground ml-auto">{review.date}</span>
                    </div>

                    {/* Stars */}
                    <StarRating rating={review.rating} />

                    {/* Comment */}
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                      <Quote className="h-3 w-3 inline-block text-primary/40 mr-1 -mt-0.5" />
                      {review.comment}
                    </p>

                    {/* Tags */}
                    {review.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {review.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-[10px] font-medium px-2 py-0.5">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Helpful */}
                    <div className="flex items-center gap-3 mt-3 pt-3 border-t">
                      <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                        <ThumbsUp className="h-3 w-3" />
                        Helpful ({review.helpful})
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted mb-3">
              <MessageSquare className="h-7 w-7 text-muted-foreground" />
            </div>
            <h3 className="text-base font-bold mb-1">No reviews yet</h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              No reviews match this filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

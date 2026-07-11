"use client";

import { ArrowRight, BadgeCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Discussion } from "../types";
import { CATEGORY_BADGE_COLORS } from "../constants";

interface FeaturedDiscussionCardProps {
  discussion: Discussion;
}

export function FeaturedDiscussionCard({ discussion }: FeaturedDiscussionCardProps) {
  const categoryColor = CATEGORY_BADGE_COLORS[discussion.category.slug] || "bg-muted text-foreground";

  return (
    <div className="rounded-2xl border bg-card overflow-hidden shadow-sm">
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <div className="relative md:w-72 lg:w-80 shrink-0">
          {discussion.image && (
            <img
              src={discussion.image}
              alt={discussion.title}
              className="h-48 md:h-full w-full object-cover"
              loading="lazy"
            />
          )}
          {/* Featured badge */}
          <span className="absolute top-3 left-3 inline-flex items-center rounded bg-red-600 px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wide">
            Featured
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col justify-between p-5 md:p-6">
          <div>
            {/* Category */}
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className={`text-[10px] font-bold uppercase tracking-wider ${categoryColor} border`}>
                <span className="mr-1">🏠</span>
                {discussion.category.name}
              </Badge>
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold leading-snug mb-2">
              {discussion.title}
            </h3>

            {/* Description */}
            {discussion.description && (
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {discussion.description}
              </p>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between">
            {/* Author */}
            <div className="flex items-center gap-2">
              {discussion.author.avatar ? (
                <img
                  src={discussion.author.avatar}
                  alt={discussion.author.name}
                  className="h-8 w-8 rounded-full object-cover"
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold">
                  {discussion.author.name.charAt(0)}
                </div>
              )}
              <div className="flex flex-col">
                <span className="text-xs font-semibold flex items-center gap-1">
                  {discussion.author.name}
                  {discussion.author.isVerified && (
                    <BadgeCheck className="h-3.5 w-3.5 text-primary" />
                  )}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  Trust Score: {discussion.author.trustScore}%
                </span>
              </div>
            </div>

            {/* Read link */}
            <button className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline underline-offset-4">
              Read Discussion
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

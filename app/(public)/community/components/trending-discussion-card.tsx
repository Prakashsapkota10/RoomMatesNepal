"use client";

import { Bookmark, MessageSquare, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Discussion } from "../types";
import { formatDate, formatNumber, calculateTrustColor } from "../utils";
import { CATEGORY_BADGE_COLORS } from "../constants";

interface TrendingDiscussionCardProps {
  discussion: Discussion;
}

export function TrendingDiscussionCard({ discussion }: TrendingDiscussionCardProps) {
  const categoryColor = CATEGORY_BADGE_COLORS[discussion.category.slug] || "bg-muted text-foreground";
  const trustColor = calculateTrustColor(discussion.author.trustScore);

  return (
    <div className="rounded-xl border bg-card p-4 flex flex-col justify-between h-full">
      {/* Top: Category + Bookmark */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <Badge variant="outline" className={`text-[10px] font-bold uppercase tracking-wider ${categoryColor} border`}>
            {discussion.category.name}
          </Badge>
          <button
            aria-label="Bookmark discussion"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Bookmark className="h-4 w-4" />
          </button>
        </div>

        {/* Title */}
        <h4 className="text-sm font-bold leading-snug mb-3">
          {discussion.title}
        </h4>
      </div>

      {/* Bottom: Author + Stats */}
      <div>
        {/* Author */}
        <div className="flex items-center gap-2 mb-3">
          {discussion.author.avatar ? (
            <img
              src={discussion.author.avatar}
              alt={discussion.author.name}
              className="h-6 w-6 rounded-full object-cover"
            />
          ) : (
            <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold">
              {discussion.author.name.charAt(0)}
            </div>
          )}
          <span className="text-xs text-muted-foreground">
            {discussion.author.name} • {formatDate(discussion.createdAt)}
          </span>
        </div>

        {/* Stats row */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <MessageSquare className="h-3 w-3" />
              {discussion.replies}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              {formatNumber(discussion.views)}
            </span>
          </div>
          <span className={`text-xs font-bold ${trustColor}`}>
            Trust {discussion.author.trustScore}%
          </span>
        </div>
      </div>
    </div>
  );
}

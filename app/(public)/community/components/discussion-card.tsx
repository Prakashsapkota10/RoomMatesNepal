"use client";

import { MessageSquare, Bookmark, Share2, BadgeCheck, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import type { Discussion } from "../types";
import { formatDate } from "../utils";

interface DiscussionCardProps {
  discussion: Discussion;
}

export function DiscussionCard({ discussion }: DiscussionCardProps) {
  return (
    <Link href={`/community/${discussion.id}`} className="block">
      <div className="rounded-xl border bg-card p-4 hover:border-primary/30 transition-colors">
      <div className="flex gap-3">
        {/* Likes counter / Solved indicator */}
        <div className="flex flex-col items-center shrink-0 pt-1">
          {discussion.isSolved ? (
            <CheckCircle2 className="h-5 w-5 text-primary" />
          ) : (
            <span className="text-sm font-bold text-foreground">{discussion.likes}</span>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Author row */}
          <div className="flex items-center gap-2 mb-1.5">
            {discussion.author.avatar ? (
              <img
                src={discussion.author.avatar}
                alt={discussion.author.name}
                className="h-5 w-5 rounded-full object-cover"
              />
            ) : (
              <div className="h-5 w-5 rounded-full bg-muted flex items-center justify-center text-[9px] font-bold">
                {discussion.author.name.charAt(0)}
              </div>
            )}
            <span className="text-xs font-medium flex items-center gap-1">
              {discussion.author.name}
              {discussion.author.isVerified && (
                <BadgeCheck className="h-3 w-3 text-primary" />
              )}
            </span>
            <span className="text-[11px] text-muted-foreground">
              • {formatDate(discussion.createdAt)} in{" "}
              <span className="font-bold text-primary uppercase text-[10px]">
                {discussion.category.name}
              </span>
            </span>
          </div>

          {/* Title */}
          <h4 className="text-sm font-bold leading-snug mb-2">
            {discussion.title}
          </h4>

          {/* Footer */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <MessageSquare className="h-3 w-3" />
              {discussion.replies} comments
            </span>
            {discussion.isSolved && (
              <span className="flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3 text-[color:var(--success)]" />
                Solved
              </span>
            )}
            {!discussion.isSolved && (
              <button className="flex items-center gap-1 hover:text-primary transition-colors">
                <Share2 className="h-3 w-3" />
                Share
              </button>
            )}
          </div>
        </div>

        {/* Bookmark */}
        <button
          aria-label="Bookmark discussion"
          className="text-muted-foreground hover:text-primary transition-colors shrink-0 self-start"
        >
          <Bookmark className="h-4 w-4" />
        </button>
      </div>
    </div>
    </Link>
  );
}

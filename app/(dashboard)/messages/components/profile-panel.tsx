"use client";

import { X, CheckCircle2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { Conversation } from "./types";

// ─── Mock Shared Assets — TODO: Replace with real API ─────────────────────────

const MOCK_SHARED_ASSETS = [
  { id: "a1", thumbnail: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=80&q=60", type: "image" as const },
  { id: "a2", thumbnail: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=80&q=60", type: "image" as const },
  { id: "a3", thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=80&q=60", type: "image" as const },
  { id: "a4", thumbnail: "", type: "document" as const },
];

// ─── Component ────────────────────────────────────────────────────────────────

interface ProfilePanelProps {
  conversation: Conversation;
  onClose: () => void;
}

export function ProfilePanel({ conversation, onClose }: ProfilePanelProps) {
  const { user } = conversation;

  return (
    <div className="flex flex-col h-full p-4 overflow-y-auto">
      {/* Close button */}
      <div className="flex justify-end mb-2">
        <Button variant="ghost" size="icon-xs" onClick={onClose} aria-label="Close profile">
          <X className="h-4 w-4 text-muted-foreground" />
        </Button>
      </div>

      {/* Avatar + Name */}
      <div className="flex flex-col items-center text-center mb-5">
        <div className="relative mb-3">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.avatar ?? undefined} />
            <AvatarFallback className="text-xl font-bold bg-primary/10 text-primary">
              {user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          {user.trustScore >= 90 && (
            <span className="absolute bottom-0 right-0 h-6 w-6 rounded-full bg-success flex items-center justify-center ring-2 ring-card">
              <CheckCircle2 className="h-3.5 w-3.5 text-white" />
            </span>
          )}
        </div>
        <h3 className="text-base font-bold text-foreground">{user.name}</h3>
        <p className="text-xs text-muted-foreground mt-0.5">{user.occupation}</p>
      </div>

      {/* Trust Score */}
      <div className="mb-5">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">Trust Score</span>
          <span className="font-bold text-foreground">{user.trustScore}/100</span>
        </div>
        <Progress value={user.trustScore} className="h-2" />
        <p className="text-[10px] text-muted-foreground mt-1.5 leading-snug">
          Exceptional profile with verified identity, work, and {Math.floor(user.trustScore / 8)} positive reviews.
        </p>
      </div>

      {/* Mutual Interests */}
      <div className="mb-5">
        <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-2">
          Mutual Interests
        </p>
        <div className="flex flex-wrap gap-1.5">
          {user.interests.map((interest) => (
            <Badge key={interest} variant="outline" className="text-[10px] px-2 py-0.5 font-medium">
              {interest}
            </Badge>
          ))}
        </div>
      </div>

      {/* Shared Assets */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
            Shared Assets
          </p>
          <button type="button" className="text-[10px] text-primary font-semibold hover:underline">
            View All
          </button>
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          {MOCK_SHARED_ASSETS.map((asset) => (
            <div
              key={asset.id}
              className="aspect-square rounded-lg bg-muted overflow-hidden flex items-center justify-center"
            >
              {asset.type === "image" && asset.thumbnail ? (
                <img src={asset.thumbnail} alt="" className="w-full h-full object-cover" />
              ) : (
                <svg className="h-5 w-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="mt-auto flex flex-col gap-2">
        <Button className="w-full btn-primary-motion font-semibold text-sm rounded-full bg-primary text-primary-foreground">
          Send Room Offer
        </Button>
        <Button variant="ghost" className="w-full text-sm font-semibold text-muted-foreground hover:text-destructive">
          Block / Report
        </Button>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { MapPin, Users, Pencil } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Requirement {
  id: string;
  title: string;
  budget: string;
  preferredArea: string;
  matchRate: number;
  matchCount: number;
  status: "active" | "pending_review";
  profileCompletion?: number;
  type: "room" | "roommate";
}

// ─── Data Fetching — TODO: Replace with real API ──────────────────────────────

async function fetchRequirements(): Promise<Requirement[]> {
  await new Promise((r) => setTimeout(r, 300));

  return [
    {
      id: "req-1",
      title: "Looking for a Shared Studio",
      budget: "Rs. 15k - 20k",
      preferredArea: "Jawlakhel",
      matchRate: 85,
      matchCount: 12,
      status: "active",
      type: "room",
    },
    {
      id: "req-2",
      title: "Roommate for 3BHK Villa",
      budget: "Any",
      preferredArea: "Lazimpat",
      matchRate: 0,
      matchCount: 0,
      status: "pending_review",
      profileCompletion: 60,
      type: "roommate",
    },
  ];
}

// ─── Component ────────────────────────────────────────────────────────────────

export function RequirementsTab() {
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchRequirements().then((data) => {
      setRequirements(data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="h-40 rounded-xl bg-muted animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {requirements.map((req) => (
        <Card
          key={req.id}
          className={`card-dashboard ${
            req.status === "active" ? "border-success/30 bg-success/5" : ""
          }`}
        >
          <CardContent className="p-5">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                  {req.type === "room" ? (
                    <MapPin className="h-4 w-4 text-primary" />
                  ) : (
                    <Users className="h-4 w-4 text-primary" />
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">{req.title}</h4>
                  <p className="text-xs text-muted-foreground">
                    Budget: {req.budget} • Preferred Area: {req.preferredArea}
                  </p>
                </div>
              </div>
              {req.status === "active" && (
                <Badge className="text-[9px] bg-success/10 text-success border-0 font-bold">
                  {req.matchRate}% Match Rate
                </Badge>
              )}
              {req.status === "pending_review" && (
                <span className="text-[9px] text-muted-foreground uppercase tracking-wider font-semibold">
                  Pending Review
                </span>
              )}
            </div>

            {/* Active: show matches + actions */}
            {req.status === "active" && (
              <>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex -space-x-1.5">
                    {Array.from({ length: Math.min(req.matchCount, 3) }).map((_, i) => (
                      <Avatar key={i} className="h-6 w-6 ring-2 ring-card">
                        <AvatarFallback className="text-[8px] font-bold bg-muted">
                          {String.fromCharCode(65 + i)}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  {req.matchCount > 3 && (
                    <span className="text-[10px] text-muted-foreground">+{req.matchCount - 3}</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="btn-secondary-motion text-xs font-medium gap-1.5">
                    <Pencil className="h-3 w-3" />
                    Edit
                  </Button>
                  <Button size="sm" className="btn-primary-motion text-xs font-semibold">
                    Find Matches
                  </Button>
                </div>
              </>
            )}

            {/* Pending review: show completion */}
            {req.status === "pending_review" && req.profileCompletion !== undefined && (
              <>
                <div className="mb-3">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Profile Completion:</span>
                    <span className="font-bold text-foreground">{req.profileCompletion}%</span>
                  </div>
                  <Progress value={req.profileCompletion} className="h-2" />
                </div>
                <Button variant="outline" size="sm" className="w-full btn-secondary-motion text-xs font-medium">
                  Complete Profile
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

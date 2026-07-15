"use client";

import { useState, useEffect } from "react";
import { MapPin, Wallet } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// ─── Types ────────────────────────────────────────────────────────────────────

interface RoommateProfile {
  id: string;
  name: string;
  age: number;
  occupation: string;
  avatar: string | null;
  matchPercent: number;
  budget: string;
  preferredAreas: string;
  lifestyle: string[];
  isVerified: boolean;
  isTopMatch: boolean;
}

// ─── Data Fetching — TODO: Replace with real API calls ────────────────────────

async function fetchRoommates(): Promise<RoommateProfile[]> {
  // Simulates network latency
  await new Promise((r) => setTimeout(r, 300));

  // TODO: Replace with: const res = await fetch('/api/roommates/suggestions'); return res.json();
  return [
    {
      id: "tm1",
      name: "Siddharth K.",
      age: 26,
      occupation: "Software Engineer",
      avatar: null,
      matchPercent: 96,
      budget: "Rs. 15,000/mo",
      preferredAreas: "Baneshwor, Koteshwor",
      lifestyle: ["Non-smoker", "Early Bird", "Gym"],
      isVerified: true,
      isTopMatch: true,
    },
    {
      id: "tm2",
      name: "Priya Sharma",
      age: 24,
      occupation: "Medical Student",
      avatar: null,
      matchPercent: 94,
      budget: "Rs. 12,000/mo",
      preferredAreas: "Pulchowk, Sanepa",
      lifestyle: ["Vegetarian", "Non-smoker"],
      isVerified: true,
      isTopMatch: true,
    },
    {
      id: "rm1",
      name: "Aavash Sharma",
      age: 24,
      occupation: "Software Engineer",
      avatar: null,
      matchPercent: 92,
      budget: "Rs. 12,000/mo",
      preferredAreas: "Baneshwor, Koteshwor",
      lifestyle: ["Non-smoker", "Early Bird", "Pet Friendly"],
      isVerified: true,
      isTopMatch: false,
    },
    {
      id: "rm2",
      name: "Riya Thapa",
      age: 22,
      occupation: "Architecture Student",
      avatar: null,
      matchPercent: 88,
      budget: "Rs. 10,000/mo",
      preferredAreas: "Pulchowk, Sanepa",
      lifestyle: ["Vegetarian", "Night Owl"],
      isVerified: false,
      isTopMatch: false,
    },
    {
      id: "rm3",
      name: "Bikash Maharjan",
      age: 27,
      occupation: "Freelancer",
      avatar: null,
      matchPercent: 85,
      budget: "Rs. 8,000/mo",
      preferredAreas: "Kirtipur, Balkhu",
      lifestyle: ["Non-smoker", "Pet Friendly", "Night Owl"],
      isVerified: true,
      isTopMatch: false,
    },
    {
      id: "rm4",
      name: "Sneha Gurung",
      age: 23,
      occupation: "Graphic Designer",
      avatar: null,
      matchPercent: 82,
      budget: "Rs. 11,000/mo",
      preferredAreas: "Jhamsikhel, Sanepa",
      lifestyle: ["Vegetarian", "Early Bird"],
      isVerified: true,
      isTopMatch: false,
    },
  ];
}

// ─── Filter Chips ─────────────────────────────────────────────────────────────

const FILTER_CHIPS = ["All", "Verified", "Students", "Professionals", "Non-smoker", "Pet Friendly"];

// ─── Component ────────────────────────────────────────────────────────────────

export function RoommatesTab() {
  const [roommates, setRoommates] = useState<RoommateProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchRoommates().then((data) => {
      setRoommates(data);
      setIsLoading(false);
    });
  }, []);

  const topMatches = roommates.filter((r) => r.isTopMatch);
  const allRoommates = roommates.filter((r) => !r.isTopMatch);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-32 rounded-xl bg-muted animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Filter chips */}
      <div className="flex flex-wrap gap-2">
        {FILTER_CHIPS.map((chip, i) => (
          <button
            key={chip}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              i === 0
                ? "bg-foreground text-background border-foreground"
                : "bg-card text-muted-foreground border-border hover:border-foreground hover:text-foreground"
            }`}
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Top AI Roommate Matches */}
      {topMatches.length > 0 && (
        <div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-3">
            Top AI Roommate Matches
          </p>
          <div className="grid grid-cols-2 gap-4">
            {topMatches.map((match) => (
              <Card key={match.id} className="card-ai-match">
                <CardContent className="p-5 flex flex-col items-center text-center gap-3">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={match.avatar ?? undefined} />
                    <AvatarFallback className="text-lg font-bold bg-primary/10 text-primary">
                      {match.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <Badge className="text-[10px] bg-success/10 text-success border-0 font-bold">
                    {match.matchPercent}% Match
                  </Badge>
                  <div>
                    <p className="text-sm font-bold text-foreground">{match.name}</p>
                    <p className="text-xs text-muted-foreground">{match.occupation}</p>
                  </div>
                  <Button className="w-full btn-primary-motion text-xs font-semibold rounded-lg">
                    Connect
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Detailed Roommate Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {allRoommates.map((mate) => (
          <Card key={mate.id} className="card-listing">
            <CardContent className="p-4">
              {/* Header with avatar and match % */}
              <div className="flex items-start gap-3 mb-3">
                <Avatar className="h-14 w-14 shrink-0">
                  <AvatarImage src={mate.avatar ?? undefined} />
                  <AvatarFallback className="text-base font-bold bg-primary/10 text-primary">
                    {mate.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <Badge className="text-[10px] bg-success/10 text-success border-0 font-bold px-1.5">
                    {mate.matchPercent}% Match
                  </Badge>
                </div>
              </div>

              {/* Name and info */}
              <h4 className="text-sm font-bold text-foreground">
                {mate.name}, {mate.age}
              </h4>
              <p className="text-xs text-muted-foreground">{mate.occupation}</p>

              {/* Budget */}
              <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground">
                <Wallet className="h-3 w-3" />
                Budget: {mate.budget}
              </div>

              {/* Preferred areas */}
              <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" />
                Preferred: {mate.preferredAreas}
              </div>

              {/* Lifestyle tags */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {mate.lifestyle.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] text-primary font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 mt-4">
                <Button size="sm" className="flex-1 btn-primary-motion text-xs font-semibold rounded-lg">
                  Connect
                </Button>
                <Button size="sm" variant="outline" className="flex-1 btn-secondary-motion text-xs font-semibold rounded-lg">
                  Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* List Your Room FAB */}
      <div className="flex justify-end">
        <Button className="rounded-full gap-2 px-5 font-semibold bg-foreground text-background hover:bg-foreground/90">
          <span className="text-lg">⊕</span>
          List Your Room
        </Button>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// ─── Types ────────────────────────────────────────────────────────────────────

interface AIRecommendation {
  id: string;
  name: string;
  occupation: string;
  location: string;
  avatar: string | null;
  matchPercent: number;
  coverImage: string;
  tags: string[];
  budget: number;
}

// ─── Data Fetching — TODO: Replace with real API ──────────────────────────────

async function fetchRecommendations(): Promise<AIRecommendation[]> {
  await new Promise((r) => setTimeout(r, 300));

  // TODO: Replace with: const res = await fetch('/api/ai-match/recommendations'); return res.json();
  return [
    {
      id: "rec-1",
      name: "Anish Shrestha",
      occupation: "Software Engineer",
      location: "Lazimpat",
      avatar: null,
      matchPercent: 96,
      coverImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80",
      tags: ["Non-smoker", "Early Bird", "Vegetarian"],
      budget: 22000,
    },
    {
      id: "rec-2",
      name: "Sujata Gurung",
      occupation: "Product Designer",
      location: "Patan",
      avatar: null,
      matchPercent: 92,
      coverImage: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&q=80",
      tags: ["Pet Friendly", "Night Owl", "Yoga"],
      budget: 18000,
    },
    {
      id: "rec-3",
      name: "Prabin Thapa",
      occupation: "Medical Student",
      location: "Maharajgunj",
      avatar: null,
      matchPercent: 89,
      coverImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80",
      tags: ["Quiet Study", "No Pets", "Gym"],
      budget: 15000,
    },
  ];
}

// ─── Component ────────────────────────────────────────────────────────────────

export function TopRecommendations() {
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchRecommendations().then((data) => {
      setRecommendations(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <section>
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-xl font-bold text-foreground">Top AI Recommendations</h2>
        <Link href="/explore" className="text-sm text-primary font-medium flex items-center gap-1 hover:underline">
          View All <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
      <p className="text-sm text-muted-foreground mb-5">
        High-fidelity matches based on your latest preferences.
      </p>

      {isLoading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-72 rounded-xl bg-muted animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {recommendations.map((rec) => (
            <Card key={rec.id} className="card-listing overflow-hidden">
              {/* Cover image with match badge */}
              <div className="relative h-40">
                <Image
                  src={rec.coverImage}
                  alt={rec.name}
                  fill
                  className="object-cover"
                />
                <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-full">
                  {rec.matchPercent}% Match
                </Badge>
              </div>

              <CardContent className="p-4">
                {/* User info */}
                <div className="flex items-center gap-2.5 mb-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={rec.avatar ?? undefined} />
                    <AvatarFallback className="text-xs font-bold bg-primary/10 text-primary">
                      {rec.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{rec.name}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      {rec.occupation} • <MapPin className="h-2.5 w-2.5 inline" /> {rec.location}
                    </p>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {rec.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-[10px] px-2 py-0.5 font-medium rounded">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Budget + Connect */}
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-foreground">
                    ₹ {Math.round(rec.budget / 1000)}k
                    <span className="text-xs font-normal text-muted-foreground"> /mo</span>
                  </p>
                  <Button size="sm" className="btn-primary-motion text-xs font-semibold rounded-lg px-4">
                    Connect
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { MapPin, Pencil, Wifi, Ban, Eye, MessageSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Listing {
  id: string;
  title: string;
  location: string;
  price: number;
  image: string;
  status: "active" | "boosted" | "paused";
  tags: string[];
  views: number;
  inquiries: number;
  performanceBars: number[];
}

// ─── Data Fetching — TODO: Replace with real API ──────────────────────────────

async function fetchListings(): Promise<Listing[]> {
  await new Promise((r) => setTimeout(r, 300));

  return [
    {
      id: "l1",
      title: "Premium Studio - Jhamsikhel",
      location: "Lalitpur, Nepal",
      price: 35000,
      image: "https://images.unsplash.com/photo-1522771739289-72998db70261?w=300&q=80",
      status: "active",
      tags: ["2 Guests", "Wifi Included", "Furnished"],
      views: 428,
      inquiries: 14,
      performanceBars: [3, 5, 7, 4, 6, 8, 5],
    },
    {
      id: "l2",
      title: "Modern 2BHK - Baluwatar",
      location: "Kathmandu, Nepal",
      price: 55000,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=300&q=80",
      status: "boosted",
      tags: ["Family Friendly", "Parking", "Gym"],
      views: 1102,
      inquiries: 32,
      performanceBars: [4, 6, 8, 7, 9, 6, 8],
    },
    {
      id: "l3",
      title: "Cozy Room - Baneshwor",
      location: "Kathmandu, Nepal",
      price: 12000,
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=300&q=80",
      status: "active",
      tags: ["Solo", "Wifi Included"],
      views: 215,
      inquiries: 8,
      performanceBars: [2, 3, 5, 4, 3, 6, 4],
    },
  ];
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ListingsTab() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchListings().then((data) => {
      setListings(data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="h-36 rounded-xl bg-muted animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {listings.map((listing) => (
        <Card key={listing.id} className="card-listing overflow-hidden">
          <CardContent className="p-0">
            <div className="flex flex-col sm:flex-row">
              {/* Image */}
              <div className="relative w-full sm:w-36 h-32 sm:h-auto shrink-0">
                <Image
                  src={listing.image}
                  alt={listing.title}
                  fill
                  className="object-cover"
                />
                <Badge
                  className={`absolute top-2 left-2 text-[9px] font-bold uppercase ${
                    listing.status === "boosted"
                      ? "bg-warning text-warning-dark"
                      : listing.status === "active"
                      ? "bg-success text-white"
                      : "bg-muted-foreground text-white"
                  }`}
                >
                  {listing.status}
                </Badge>
              </div>

              {/* Content */}
              <div className="flex-1 p-4 flex flex-col sm:flex-row gap-4">
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-foreground">{listing.title}</h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                    <MapPin className="h-3 w-3" />
                    {listing.location}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {listing.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-[10px] px-2 py-0.5 font-medium">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Mini bar chart */}
                  <div className="flex items-end gap-0.5 mt-3 h-6">
                    {listing.performanceBars.map((h, i) => (
                      <div
                        key={i}
                        className="w-2 rounded-sm bg-primary/70"
                        style={{ height: `${(h / 10) * 100}%` }}
                      />
                    ))}
                  </div>
                </div>

                {/* Price + Stats + Actions */}
                <div className="flex flex-col items-end justify-between shrink-0">
                  <p className="text-base font-bold text-primary">
                    Rs. {Math.round(listing.price / 1000)}k
                    <span className="text-xs font-normal text-muted-foreground block text-right">per month</span>
                  </p>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                    <span className="flex flex-col items-center">
                      <span className="text-base font-bold text-foreground">{listing.views.toLocaleString()}</span>
                      <span className="text-[10px] uppercase">Views</span>
                    </span>
                    <span className="flex flex-col items-center">
                      <span className="text-base font-bold text-foreground">{listing.inquiries}</span>
                      <span className="text-[10px] uppercase">Inquiries</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-3">
                    <Button variant="ghost" size="icon-xs" aria-label="Edit">
                      <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
                    </Button>
                    <Button variant="ghost" size="icon-xs" aria-label="Share">
                      <Wifi className="h-3.5 w-3.5 text-muted-foreground" />
                    </Button>
                    <Button variant="ghost" size="icon-xs" aria-label="Deactivate">
                      <Ban className="h-3.5 w-3.5 text-destructive" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

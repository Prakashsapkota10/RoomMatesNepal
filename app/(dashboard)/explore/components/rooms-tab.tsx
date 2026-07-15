"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Heart, Wifi, Car, Home, MapPin, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// ─── Types ────────────────────────────────────────────────────────────────────

interface RoomListing {
  id: string;
  title: string;
  location: string;
  image: string;
  price: number;
  matchPercent: number;
  isVerified: boolean;
  isFeatured: boolean;
  amenities: string[];
  tags: string[];
  description: string;
  roomType: string;
  occupancy: string;
  furnishing: string;
}

// ─── Data Fetching — TODO: Replace with real API calls ────────────────────────

async function fetchRooms(): Promise<RoomListing[]> {
  // Simulates network latency
  await new Promise((r) => setTimeout(r, 300));

  // TODO: Replace with: const res = await fetch('/api/listings?type=room'); return res.json();
  return [
    {
      id: "featured-1",
      title: "Luxury Studio in Sanepa",
      location: "Sanepa, Lalitpur",
      image: "https://images.unsplash.com/photo-1522771739289-72998db70261?w=500&q=80",
      price: 18500,
      matchPercent: 98,
      isVerified: true,
      isFeatured: true,
      amenities: ["wifi", "parking", "kitchen"],
      tags: ["Solo Occupancy", "Furnished"],
      description: "Experience modern living in the heart of Sanepa with high-speed internet, rooftop access, and 24/7 security.",
      roomType: "Studio",
      occupancy: "Solo",
      furnishing: "Fully Furnished",
    },
    {
      id: "r1",
      title: "Cozy Flat in Baneshwor",
      location: "Baneshwor, Kathmandu",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&q=80",
      price: 8000,
      matchPercent: 92,
      isVerified: true,
      isFeatured: false,
      amenities: ["wifi", "parking", "kitchen"],
      tags: [],
      description: "",
      roomType: "Single Room",
      occupancy: "Solo",
      furnishing: "Semi-furnished",
    },
    {
      id: "r2",
      title: "Shared Room in Jhamsikhel",
      location: "Jhamsikhel, Lalitpur",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&q=80",
      price: 12500,
      matchPercent: 89,
      isVerified: true,
      isFeatured: false,
      amenities: ["wifi", "kitchen"],
      tags: [],
      description: "",
      roomType: "Shared Room",
      occupancy: "Shared",
      furnishing: "Furnished",
    },
    {
      id: "r3",
      title: "Lakeside Studio in Pokhara",
      location: "Lakeside, Pokhara",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80",
      price: 15000,
      matchPercent: 95,
      isVerified: true,
      isFeatured: false,
      amenities: ["wifi", "parking", "kitchen"],
      tags: [],
      description: "",
      roomType: "Studio",
      occupancy: "Solo",
      furnishing: "Fully Furnished",
    },
    {
      id: "r4",
      title: "Student Room in Kirtipur",
      location: "Kirtipur, Kathmandu",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&q=80",
      price: 6500,
      matchPercent: 84,
      isVerified: false,
      isFeatured: false,
      amenities: ["wifi", "home"],
      tags: [],
      description: "",
      roomType: "Single Room",
      occupancy: "Solo",
      furnishing: "Semi-furnished",
    },
    {
      id: "r5",
      title: "Modern Apartment in Maharajgunj",
      location: "Maharajgunj, Kathmandu",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80",
      price: 14000,
      matchPercent: 91,
      isVerified: true,
      isFeatured: false,
      amenities: ["wifi", "parking", "kitchen"],
      tags: [],
      description: "",
      roomType: "Apartment",
      occupancy: "Shared",
      furnishing: "Fully Furnished",
    },
  ];
}

// ─── Filter Chips ─────────────────────────────────────────────────────────────

const FILTER_CHIPS = ["All", "Rooms", "Verified", "Under Rs. 10,000", "WiFi", "Pet Friendly"];

// ─── Amenity Icon Helper ──────────────────────────────────────────────────────

function AmenityIcon({ type }: { type: string }) {
  switch (type) {
    case "wifi":
      return <Wifi className="h-3.5 w-3.5 text-muted-foreground" />;
    case "parking":
      return <Car className="h-3.5 w-3.5 text-muted-foreground" />;
    case "kitchen":
    case "home":
      return <Home className="h-3.5 w-3.5 text-muted-foreground" />;
    default:
      return null;
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

export function RoomsTab() {
  const [rooms, setRooms] = useState<RoomListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchRooms().then((data) => {
      setRooms(data);
      setIsLoading(false);
    });
  }, []);

  const featured = rooms.find((r) => r.isFeatured);
  const grid = rooms.filter((r) => !r.isFeatured);

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

      {/* Premium Featured Room */}
      {featured && (
        <div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-3">
            Premium Featured Room
          </p>
          <Card className="card-listing overflow-hidden">
            <div className="flex flex-col sm:flex-row">
              <div className="relative sm:w-52 h-44 sm:h-auto shrink-0">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover"
                />
                <Badge className="absolute top-2 left-2 text-[10px] bg-primary text-primary-foreground">
                  Featured
                </Badge>
              </div>
              <CardContent className="p-4 flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-foreground">{featured.title}</h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                      <MapPin className="h-3 w-3" />
                      {featured.location}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-success">
                    {featured.matchPercent}%
                    <br />
                    <span className="text-[10px] text-muted-foreground font-normal">AI Match</span>
                  </span>
                </div>
                <div className="flex gap-2 mt-3">
                  {featured.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-[10px] font-medium">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{featured.description}</p>
                <div className="flex items-center justify-between mt-4">
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Monthly Rent</p>
                    <p className="text-base font-bold text-foreground">
                      Rs. {featured.price.toLocaleString()}
                      <span className="text-xs font-normal text-muted-foreground">/mo</span>
                    </p>
                  </div>
                  <Button size="sm" className="btn-primary-motion text-xs font-semibold">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
      )}

      {/* Room Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {grid.map((room) => (
          <Card key={room.id} className="card-listing overflow-hidden">
            <div className="relative h-28">
              <Image
                src={room.image}
                alt={room.title}
                fill
                className="object-cover"
              />
              {room.isVerified && (
                <Badge className="absolute top-2 left-2 text-[9px] bg-success text-white gap-0.5 px-1.5">
                  <CheckCircle2 className="h-2.5 w-2.5" />
                  Verified
                </Badge>
              )}
              {!room.isVerified && (
                <Badge className="absolute top-2 left-2 text-[9px] bg-muted-foreground/70 text-white px-1.5">
                  Standard
                </Badge>
              )}
              <button
                className="absolute top-2 right-2 h-6 w-6 rounded-full bg-white/80 dark:bg-card/80 flex items-center justify-center"
                aria-label="Save"
              >
                <Heart className="h-3 w-3 text-muted-foreground" />
              </button>
            </div>
            <CardContent className="p-2.5">
              <div className="flex items-center gap-1.5 mb-1">
                <p className="text-xs font-semibold text-foreground truncate max-w-[60px]">
                  {room.title.split(" ").slice(0, 1).join("")}...
                </p>
                <span className="text-[10px] font-bold text-success">{room.matchPercent}%</span>
                <span className="text-[9px] text-primary font-medium">Match</span>
              </div>
              <p className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                <MapPin className="h-2.5 w-2.5" />
                {room.location}
              </p>
              <div className="flex items-center gap-1.5 mt-1.5">
                {room.amenities.map((a) => (
                  <AmenityIcon key={a} type={a} />
                ))}
              </div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs font-bold text-foreground">
                  Rs. {room.price.toLocaleString()}
                  <span className="text-[10px] font-normal text-muted-foreground">/mo</span>
                </p>
                <Button variant="ghost" size="xs" className="text-[10px] font-semibold text-primary h-auto p-0">
                  Details
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

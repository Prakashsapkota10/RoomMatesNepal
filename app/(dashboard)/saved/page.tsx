"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Bookmark,
  Trash2,
  Share2,
  Calendar,
  MessageSquare,
  Heart,
  Plus,
  Download,
  SlidersHorizontal,
  Sparkles,
  CheckCircle2,
  MapPin,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

type Tab = "rooms" | "roommates" | "posts" | "ai";

interface SavedRoom {
  id: string;
  image: string;
  type: string;
  location: string;
  title: string;
  price: number;
  description: string;
  savedAgo: string;
}

interface SavedRoommate {
  id: string;
  name: string;
  avatar: string;
  occupation: string;
  verified: boolean;
  compatibility: number;
  tags: string[];
}

interface SavedPost {
  id: string;
  author: string;
  authorAvatar: string;
  timeAgo: string;
  title: string;
  content: string;
  comments: number;
  likes: number;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const SAVED_ROOMS: SavedRoom[] = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=75",
    type: "Room",
    location: "New Baneshwor",
    title: "Luxury Penthouse...",
    price: 25000,
    description: "Spacious 1BHK with private balcony and high-speed internet. Ideal for digital...",
    savedAgo: "2 days ago",
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&q=75",
    type: "Room",
    location: "Maharajgunj",
    title: "Cozy Study Studio",
    price: 15000,
    description: "Quiet neighborhood, perfect for students. Walking distance to major...",
    savedAgo: "1 week ago",
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&q=75",
    type: "Apartment",
    location: "Lazimpat",
    title: "Modern Apartment",
    price: 32000,
    description: "Fully furnished 2BHK apartment with parking. Great for professionals...",
    savedAgo: "2 weeks ago",
  },
];

const SAVED_ROOMMATES: SavedRoommate[] = [
  {
    id: "1",
    name: "Priya S.",
    avatar: "P",
    occupation: "Software Developer",
    verified: true,
    compatibility: 98,
    tags: ["Non-smoker", "Vegetarian", "Quiet hours"],
  },
  {
    id: "2",
    name: "Arun M.",
    avatar: "A",
    occupation: "Medical Student",
    verified: true,
    compatibility: 91,
    tags: ["Early Bird", "Clean", "Gym"],
  },
  {
    id: "3",
    name: "Nikita R.",
    avatar: "N",
    occupation: "Graphic Designer",
    verified: false,
    compatibility: 87,
    tags: ["Art Lover", "Quiet", "Remote Worker"],
  },
  {
    id: "4",
    name: "Ramesh T.",
    avatar: "R",
    occupation: "Marketing Manager",
    verified: true,
    compatibility: 85,
    tags: ["Non-smoker", "Pet Friendly", "Clean"],
  },
];

const SAVED_POSTS: SavedPost[] = [
  {
    id: "1",
    author: "Roommate Marketplace",
    authorAvatar: "RM",
    timeAgo: "4h ago",
    title: "Roommate Marketplace",
    content: "Seeking flatmates for a shared flat in Lalitpur near Pulchowk Campus. We already have 2 people, looking for 1 more. Rent is Rs. 12,000 excluding utilities. Kitchen is fully equipped and we have a cleaning lady visiting thrice ...",
    comments: 24,
    likes: 156,
  },
  {
    id: "2",
    author: "Housing Tips",
    authorAvatar: "HT",
    timeAgo: "1d ago",
    title: "Housing Tips Nepal",
    content: "Top 5 things to check before signing a rental agreement in Kathmandu. Always verify the landlord's ownership documents and check water supply schedules in your area...",
    comments: 18,
    likes: 89,
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function SavedPage() {
  const [activeTab, setActiveTab] = useState<Tab>("rooms");
  const [searchQuery, setSearchQuery] = useState("");

  const tabs: { id: Tab; label: string; count: number }[] = [
    { id: "rooms", label: "Saved Rooms", count: SAVED_ROOMS.length },
    { id: "roommates", label: "Saved Roommates", count: SAVED_ROOMMATES.length },
    { id: "posts", label: "Community Posts", count: SAVED_POSTS.length },
    { id: "ai", label: "AI Suggestions", count: 0 },
  ];

  return (
    <div className="flex flex-col gap-6 page-enter">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Saved Items</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Your curated collection of potential homes and partners.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="btn-secondary-motion gap-1.5 rounded-lg text-xs">
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Date Saved
          </Button>
          <Button size="sm" className="btn-primary-motion gap-1.5 rounded-lg text-xs">
            <Download className="h-3.5 w-3.5" />
            Export
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 flex-wrap">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "rounded-full text-xs px-4",
              activeTab === tab.id && "pointer-events-none"
            )}
          >
            {tab.id === "ai" && <Sparkles className="h-3 w-3 mr-1.5" />}
            {tab.label} ({tab.count})
          </Button>
        ))}
      </div>

      {/* Content */}
      {activeTab === "rooms" && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SAVED_ROOMS.map((room) => (
            <Card key={room.id} className="card-listing group overflow-hidden">
              {/* Image */}
              <div className="relative h-44 overflow-hidden bg-muted">
                <img
                  src={room.image}
                  alt={room.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Action icons */}
                <div className="absolute top-3 right-3 flex gap-1.5">
                  <button className="flex h-7 w-7 items-center justify-center rounded-full bg-red-500/90 text-white shadow-md hover:bg-red-600 transition-colors">
                    <Trash2 className="h-3 w-3" />
                  </button>
                  <button className="flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-foreground shadow-md hover:bg-white transition-colors">
                    <Share2 className="h-3 w-3" />
                  </button>
                </div>
                {/* Type + Location badge */}
                <div className="absolute bottom-3 left-3">
                  <Badge className="bg-[color:var(--success)] text-white text-[10px] font-semibold shadow-md">
                    {room.type} • {room.location}
                  </Badge>
                </div>
              </div>

              {/* Info */}
              <CardContent className="p-4 flex flex-col gap-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-sm leading-snug line-clamp-1 group-hover:text-primary transition-colors">
                    {room.title}
                  </h3>
                  <span className="text-sm font-bold text-primary whitespace-nowrap">
                    Rs. {room.price.toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">{room.description}</p>
                <div className="flex items-center justify-between pt-2 border-t mt-1">
                  <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    Saved {room.savedAgo}
                  </span>
                  <Link href={`/listings/${room.id}`} className="text-xs font-semibold text-primary hover:underline underline-offset-2">
                    View Details
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "roommates" && (
        <div className="grid sm:grid-cols-2 gap-5">
          {SAVED_ROOMMATES.map((mate) => (
            <Card key={mate.id} className="card-listing">
              <CardContent className="p-5 flex items-start gap-4">
                {/* Avatar */}
                <div className="relative shrink-0">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-[color:var(--community)]/20 text-primary font-bold text-lg">
                    {mate.avatar}
                  </div>
                  {mate.verified && (
                    <CheckCircle2 className="absolute -bottom-0.5 -right-0.5 h-4 w-4 text-[color:var(--trust)] fill-white" />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="font-semibold text-sm">{mate.name}</h3>
                    {mate.verified && (
                      <Badge variant="secondary" className="text-[10px] py-0 gap-0.5">
                        <CheckCircle2 className="h-2.5 w-2.5" /> Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">{mate.occupation}</p>

                  {/* Compatibility bar */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-[color:var(--community)]">AI Compatibility</span>
                    <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                      <div className="h-full rounded-full bg-[color:var(--community)]" style={{ width: `${mate.compatibility}%` }} />
                    </div>
                    <span className="text-xs font-bold text-[color:var(--community)]">{mate.compatibility}%</span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {mate.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-[10px] px-2 py-0.5 font-medium">{tag}</Badge>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Button size="sm" className="btn-primary-motion flex-1 rounded-lg text-xs font-semibold gap-1.5">
                      <MessageSquare className="h-3 w-3" />
                      Contact {mate.name.split(" ")[0]}
                    </Button>
                    <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-red-500 hover:border-red-200 transition-colors">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "posts" && (
        <div className="grid sm:grid-cols-2 gap-5">
          {SAVED_POSTS.map((post) => (
            <Card key={post.id} className="card-dashboard">
              <CardContent className="p-5">
                {/* Author row */}
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[color:var(--community-light)] text-[color:var(--community)] font-bold text-xs shrink-0">
                    {post.authorAvatar}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm leading-tight">{post.title}</p>
                    <p className="text-[11px] text-muted-foreground">{post.timeAgo}</p>
                  </div>
                </div>

                {/* Content */}
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-4 mb-4">
                  {post.content}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MessageSquare className="h-3 w-3" /> {post.comments}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="h-3 w-3" /> {post.likes}
                    </span>
                  </div>
                  <button className="flex h-7 w-7 items-center justify-center rounded-md border border-border text-muted-foreground hover:text-red-500 hover:border-red-200 transition-colors">
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "ai" && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted mb-3">
            <Sparkles className="h-7 w-7 text-muted-foreground" />
          </div>
          <h3 className="text-base font-bold mb-1">AI Suggestions Coming Soon</h3>
          <p className="text-sm text-muted-foreground max-w-xs mb-4">
            Our AI will suggest rooms and roommates based on your saved preferences.
          </p>
        </div>
      )}

      {/* Explore More CTA */}
      <Card className="border-dashed">
        <CardContent className="p-8 flex flex-col items-center text-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <Plus className="h-6 w-6 text-muted-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">Explore More Options</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              You can save more rooms and roommates to compare them later.
            </p>
          </div>
          <Link href="/listings">
            <Button variant="outline" size="sm" className="btn-secondary-motion rounded-lg text-xs font-medium mt-1">
              Start Browsing
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

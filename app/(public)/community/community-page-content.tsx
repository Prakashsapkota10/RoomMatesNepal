"use client";

import { useState } from "react";
import {
  ThumbsUp,
  MessageSquare,
  Share2,
  MoreHorizontal,
  Image as ImageIcon,
  BarChart3,
  Smile,
  Star,
  CheckCircle2,
  Trophy,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const REPUTATION = {
  score: 2450,
  weeklyGain: 120,
  badges: [
    { label: "Early Adopter", icon: Star, color: "var(--warning)" },
    { label: "Top Helper", icon: CheckCircle2, color: "var(--success)" },
    { label: "Thought L.", icon: Sparkles, color: "var(--community)" },
  ],
};

const TOP_CONTRIBUTORS = [
  { rank: 1, name: "Aayush M.", points: 4820 },
  { rank: 2, name: "Kriti K.", points: 4150 },
  { rank: 3, name: "Rohan B.", points: 3900 },
];

const CATEGORIES = ["Trending", "Recent", "Roommate Search", "Local Tips", "Events"];

interface Post {
  id: string;
  author: string;
  avatar: string;
  avatarImage?: string;
  timeAgo: string;
  category: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
}

const POSTS: Post[] = [
  {
    id: "1",
    author: "Siddhartha R.",
    avatar: "S",
    timeAgo: "2 hours ago",
    category: "Local Tips",
    content: "Does anyone know the best quiet cafes in Jhamsikhel for remote work? My current favorite is getting a bit too noisy during the afternoons. Bonus points if they have strong Wi-Fi 🎯 💻",
    likes: 24,
    comments: 12,
  },
  {
    id: "2",
    author: "Priya S.",
    avatar: "P",
    avatarImage: "/priya.jpg",
    timeAgo: "5 hours ago",
    category: "Events",
    content: "Great turnout at the Rooftop Mixer last night! It was amazing meeting so many new residents from across Kathmandu. Can't wait for the next one! 🎉\n✨",
    image: "/priya.jpg",
    likes: 89,
    comments: 7,
  },
  {
    id: "3",
    author: "Nabin A.",
    avatar: "N",
    timeAgo: "8 hours ago",
    category: "Roommate Search",
    content: "Looking for a roommate in Bouddha area. Preferably someone who works in tech and is okay with a cat 🐱. Budget around Rs. 8,000-10,000 per person. DM me if interested!",
    likes: 15,
    comments: 22,
  },
];

const GUIDELINES = [
  "Be respectful and helpful to all members.",
  "No spamming or unauthorized self-promotion.",
  "Maintain privacy of other roommates.",
  "Report any suspicious or harmful content.",
];

// ─── Component ────────────────────────────────────────────────────────────────

export function CommunityPageContent() {
  const [activeCategory, setActiveCategory] = useState("Trending");

  return (
    <div className="flex flex-col gap-6 pt-24 pb-12 page-enter">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {/* Reputation */}
          <Card className="bg-gradient-to-br from-[color:var(--success-light)] to-background">
            <CardContent className="p-5">
              <p className="text-xs font-semibold text-[color:var(--success)] uppercase tracking-wide mb-1">Your Reputation</p>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl font-extrabold text-foreground">{REPUTATION.score.toLocaleString()}</span>
                <span className="text-xs text-[color:var(--success)] font-medium">+{REPUTATION.weeklyGain} this week</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {REPUTATION.badges.map((badge) => (
                  <Badge key={badge.label} variant="secondary" className="text-[10px] gap-1 py-0.5 px-2">
                    <badge.icon className="h-2.5 w-2.5" style={{ color: badge.color }} />
                    {badge.label}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Total Posts */}
          <Card>
            <CardContent className="p-5 flex flex-col items-center justify-center text-center">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground mb-1">Total Posts</p>
              <span className="text-3xl font-extrabold text-foreground">42</span>
              <div className="w-12 h-1 rounded-full bg-primary mt-2" />
            </CardContent>
          </Card>

          {/* Total Comments */}
          <Card>
            <CardContent className="p-5 flex flex-col items-center justify-center text-center">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground mb-1">Total Comments</p>
              <span className="text-3xl font-extrabold text-foreground">158</span>
              <div className="w-12 h-1 rounded-full bg-primary mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
          {/* Left — Feed */}
          <div className="flex flex-col gap-5">
            {/* Compose */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-[color:var(--community)]/20 text-primary font-bold text-xs shrink-0">
                    R
                  </div>
                  <div className="flex-1">
                    <div className="rounded-xl border bg-muted/30 px-4 py-2.5 mb-3 cursor-text">
                      <p className="text-sm text-muted-foreground">Share something with the community...</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <button className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-muted transition-colors text-muted-foreground"><ImageIcon className="h-4 w-4" /></button>
                        <button className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-muted transition-colors text-muted-foreground"><BarChart3 className="h-4 w-4" /></button>
                        <button className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-muted transition-colors text-muted-foreground"><Smile className="h-4 w-4" /></button>
                      </div>
                      <Button size="sm" className="btn-primary-motion rounded-full px-5 text-xs font-semibold">
                        Post
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Category Tabs */}
            <div className="flex items-center gap-2 flex-wrap">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "rounded-full px-3.5 py-1.5 text-xs font-medium border transition-colors",
                    activeCategory === cat
                      ? "bg-primary border-primary text-primary-foreground"
                      : "border-border bg-background text-muted-foreground hover:border-primary hover:text-primary"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Posts */}
            <div className="flex flex-col gap-5">
              {POSTS.map((post) => (
                <Card key={post.id} className="card-dashboard">
                  <CardContent className="p-5">
                    {/* Author */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        {post.avatarImage ? (
                          <img src={post.avatarImage} alt={post.author} className="h-10 w-10 rounded-full object-cover shrink-0" />
                        ) : (
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-[color:var(--community)]/20 text-primary font-bold text-sm shrink-0">
                            {post.avatar}
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-sm leading-tight">{post.author}</p>
                          <p className="text-[11px] text-muted-foreground">
                            {post.timeAgo} in <span className="text-primary font-medium">{post.category}</span>
                          </p>
                        </div>
                      </div>
                      <button className="flex h-7 w-7 items-center justify-center rounded-md hover:bg-muted transition-colors text-muted-foreground">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Content */}
                    <p className="text-sm text-foreground leading-relaxed mb-3 whitespace-pre-line">{post.content}</p>

                    {/* Image */}
                    {post.image && (
                      <div className="rounded-xl overflow-hidden mb-3">
                        <img src={post.image} alt="" className="w-full h-52 object-cover" />
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-3 border-t">
                      <div className="flex items-center gap-4">
                        <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                          <ThumbsUp className="h-3.5 w-3.5" />
                          <span className="font-medium">{post.likes}</span>
                        </button>
                        <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                          <MessageSquare className="h-3.5 w-3.5" />
                          <span>{post.comments} Comments</span>
                        </button>
                      </div>
                      <button className="flex h-7 w-7 items-center justify-center rounded-md hover:bg-muted transition-colors text-muted-foreground">
                        <Share2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="flex flex-col gap-5">
            {/* Top Contributors */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Trophy className="h-4 w-4 text-[color:var(--warning)]" />
                  <h3 className="font-bold text-sm">Top Contributors</h3>
                </div>
                <div className="flex flex-col gap-3">
                  {TOP_CONTRIBUTORS.map((user) => (
                    <div key={user.rank} className="flex items-center gap-2.5">
                      <span className="text-xs font-bold text-muted-foreground w-4">{user.rank}</span>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-bold shrink-0">
                        {user.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold leading-tight truncate">{user.name}</p>
                        <p className="text-[10px] text-muted-foreground">{user.points.toLocaleString()} pts</p>
                      </div>
                      {user.rank === 1 && <Trophy className="h-3.5 w-3.5 text-[color:var(--warning)]" />}
                    </div>
                  ))}
                </div>
                <button className="text-xs text-primary font-medium hover:underline underline-offset-2 mt-3 block">
                  View Full Leaderboard
                </button>
              </CardContent>
            </Card>

            {/* Community Guidelines */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <ShieldCheck className="h-4 w-4 text-[color:var(--trust)]" />
                  <h3 className="font-bold text-sm">Community Guidelines</h3>
                </div>
                <ul className="flex flex-col gap-2">
                  {GUIDELINES.map((rule, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[color:var(--success)] shrink-0 mt-0.5" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-[10px] text-muted-foreground italic mt-3 leading-relaxed">
                  Our community is built on trust and shared values. Help us keep RoomMate Nepal a safe space for everyone.
                </p>
              </CardContent>
            </Card>

            {/* Host Event CTA */}
            <Card className="bg-primary text-primary-foreground overflow-hidden">
              <CardContent className="p-4">
                <h3 className="font-bold text-sm mb-1">Host an Event!</h3>
                <p className="text-xs text-primary-foreground/85 leading-relaxed mb-3">
                  Earn 500 bonus points by hosting a community meetup in your co-living space.
                </p>
                <Button size="sm" className="bg-white text-primary hover:bg-white/90 rounded-lg text-xs font-semibold w-full">
                  Get Started
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

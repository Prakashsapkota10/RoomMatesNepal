"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  MessageSquare,
  Heart,
  Share2,
  Bookmark,
  BadgeCheck,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// ─── Mock Data — replace with real API fetch using the [id] param ─────────────

// TODO: Replace with: await communityService.getDiscussion(id)
const MOCK_DISCUSSION = {
  id: "1",
  title: "Best areas in Kathmandu for remote workers?",
  content:
    "I'm a remote software developer looking for a quiet area in Kathmandu with good internet connectivity. I prefer cafes nearby and a peaceful environment. Budget is around 15-20k per month for a room. Any suggestions? I've heard Jhamsikhel and Sanepa are good but wanted more opinions from people actually living there.",
  category: { id: "1", name: "Room Hunting", slug: "room-hunting", color: "#1554D1" },
  author: {
    id: "user-1",
    name: "Arjun Prajapati",
    avatar: null as string | null,
    trustScore: 85,
    isVerified: true,
    role: "Premium Member",
  },
  views: 234,
  replies: 5,
  likes: 12,
  createdAt: "2024-12-10T10:30:00Z",
  isFeatured: false,
  isSolved: false,
  isBookmarked: false,
};

// TODO: Replace with: await communityService.getReplies(discussionId)
const MOCK_REPLIES = [
  {
    id: "r1",
    content:
      "Jhamsikhel is great for remote workers! There are several coworking-friendly cafes like Himalayan Java and the internet speed is reliable. I pay 18k for a 1BHK there.",
    author: { id: "u2", name: "Sita Thapa", avatar: null as string | null, isVerified: true },
    likes: 8,
    createdAt: "2024-12-10T14:20:00Z",
  },
  {
    id: "r2",
    content:
      "I'd recommend Sanepa too. It's slightly cheaper than Jhamsikhel and you can find rooms for 15k. Very quiet in the mornings. The only downside is fewer cafes within walking distance.",
    author: { id: "u3", name: "Bikash Maharjan", avatar: null as string | null, isVerified: false },
    likes: 5,
    createdAt: "2024-12-11T09:15:00Z",
  },
  {
    id: "r3",
    content:
      "Have you considered Bakhundole? It's between Jhamsikhel and Sanepa, quieter, and has fiber internet from Vianet/Worldlink available. I've been working from home there for 2 years.",
    author: { id: "u4", name: "Priya Sharma", avatar: null as string | null, isVerified: true },
    likes: 11,
    createdAt: "2024-12-11T16:45:00Z",
  },
];

// ─── Page Component ───────────────────────────────────────────────────────────

export default function DiscussionDetailPage() {
  const [replyContent, setReplyContent] = useState("");
  const [replies, setReplies] = useState(MOCK_REPLIES);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [liked, setLiked] = useState(false);

  async function handleReply(e: React.FormEvent) {
    e.preventDefault();
    if (!replyContent.trim()) return;

    setIsSubmitting(true);

    // TODO: Replace with real API call
    // await communityService.postReply(discussionId, { content: replyContent });
    const newReply = {
      id: `r${Date.now()}`,
      content: replyContent,
      author: { id: "current-user", name: "You", avatar: null as string | null, isVerified: true },
      likes: 0,
      createdAt: new Date().toISOString(),
    };

    // Simulate delay
    await new Promise((r) => setTimeout(r, 300));
    setReplies((prev) => [...prev, newReply]);
    setReplyContent("");
    setIsSubmitting(false);
  }

  return (
    <div className="container mx-auto px-4 lg:px-8 py-8 max-w-3xl page-enter">
      {/* Back link */}
      <Link
        href="/community"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Community
      </Link>

      {/* Discussion */}
      <Card className="mb-6">
        <CardContent className="p-6">
          {/* Category badge */}
          <Badge variant="secondary" className="text-xs mb-3">
            {MOCK_DISCUSSION.category.name}
          </Badge>

          {/* Title */}
          <h1 className="text-xl font-bold text-foreground mb-4">
            {MOCK_DISCUSSION.title}
          </h1>

          {/* Author */}
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="h-9 w-9">
              <AvatarImage src={MOCK_DISCUSSION.author.avatar ?? undefined} />
              <AvatarFallback className="text-xs font-bold bg-primary/10 text-primary">
                {MOCK_DISCUSSION.author.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <span className="text-sm font-medium flex items-center gap-1">
                {MOCK_DISCUSSION.author.name}
                {MOCK_DISCUSSION.author.isVerified && (
                  <BadgeCheck className="h-3.5 w-3.5 text-primary" />
                )}
              </span>
              <span className="text-xs text-muted-foreground">
                {MOCK_DISCUSSION.author.role} • {new Date(MOCK_DISCUSSION.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Content */}
          <p className="text-sm text-muted-foreground leading-relaxed mb-5">
            {MOCK_DISCUSSION.content}
          </p>

          {/* Actions */}
          <div className="flex items-center gap-4 pt-3 border-t text-sm text-muted-foreground">
            <button
              onClick={() => setLiked(!liked)}
              className={`flex items-center gap-1.5 transition-colors ${liked ? "text-primary" : "hover:text-primary"}`}
            >
              <Heart className={`h-4 w-4 ${liked ? "fill-primary" : ""}`} />
              {MOCK_DISCUSSION.likes + (liked ? 1 : 0)}
            </button>
            <span className="flex items-center gap-1.5">
              <MessageSquare className="h-4 w-4" />
              {replies.length} replies
            </span>
            <span className="flex items-center gap-1.5">
              {MOCK_DISCUSSION.views} views
            </span>
            <button className="flex items-center gap-1.5 hover:text-primary transition-colors ml-auto">
              <Share2 className="h-4 w-4" />
              Share
            </button>
            <button className="flex items-center gap-1.5 hover:text-primary transition-colors">
              <Bookmark className="h-4 w-4" />
              Save
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Replies */}
      <div className="flex flex-col gap-4 mb-6">
        <h2 className="text-base font-bold text-foreground">
          Replies ({replies.length})
        </h2>

        {replies.map((reply) => (
          <Card key={reply.id}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarImage src={reply.author.avatar ?? undefined} />
                  <AvatarFallback className="text-[10px] font-bold bg-muted">
                    {reply.author.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-sm font-medium">{reply.author.name}</span>
                    {reply.author.isVerified && (
                      <BadgeCheck className="h-3 w-3 text-primary" />
                    )}
                    <span className="text-xs text-muted-foreground">
                      • {new Date(reply.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {reply.content}
                  </p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                    <button className="flex items-center gap-1 hover:text-primary transition-colors">
                      <Heart className="h-3 w-3" />
                      {reply.likes}
                    </button>
                    <button className="hover:text-primary transition-colors">Reply</button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Reply Form */}
      <Card>
        <CardContent className="p-4">
          <form onSubmit={handleReply} className="flex flex-col gap-3">
            <label className="text-sm font-medium text-foreground">
              Post a Reply
            </label>
            <textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Share your thoughts or answer the question..."
              rows={3}
              className="flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
              required
            />
            <div className="flex justify-end">
              <Button
                type="submit"
                size="sm"
                className="btn-primary-motion gap-1.5 font-semibold"
                disabled={isSubmitting || !replyContent.trim()}
              >
                <Send className="h-3.5 w-3.5" />
                {isSubmitting ? "Posting..." : "Post Reply"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

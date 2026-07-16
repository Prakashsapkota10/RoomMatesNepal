"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Conversation } from "./types";

// ─── Data Fetching — TODO: Replace with real API ──────────────────────────────

async function fetchConversations(): Promise<Conversation[]> {
  await new Promise((r) => setTimeout(r, 200));

  // TODO: Replace with: const res = await fetch('/api/messages/conversations'); return res.json();
  return [
    {
      id: "conv-1",
      user: {
        id: "u1",
        name: "Sita Karki",
        avatar: null,
        occupation: "Software Engineer at CloudTech",
        isOnline: true,
        trustScore: 98,
        interests: ["Tech & Coding", "Hiking", "Vegan Cooking", "Minimalism"],
      },
      lastMessage: "Hey! I saw your room listing i...",
      lastMessageTime: "2m ago",
      unreadCount: 1,
    },
    {
      id: "conv-2",
      user: {
        id: "u2",
        name: "Bibek Thapa",
        avatar: null,
        occupation: "Freelance Designer",
        isOnline: false,
        trustScore: 85,
        interests: ["Design", "Photography", "Travel"],
      },
      lastMessage: "The deposit terms look good. Whe...",
      lastMessageTime: "1h ago",
      unreadCount: 0,
    },
    {
      id: "conv-3",
      user: {
        id: "u3",
        name: "Riya Shrestha",
        avatar: null,
        occupation: "Medical Student",
        isOnline: false,
        trustScore: 92,
        interests: ["Reading", "Yoga", "Cooking"],
      },
      lastMessage: "Shared the house rules document...",
      lastMessageTime: "昨天",
      unreadCount: 0,
    },
  ];
}

// ─── Component ────────────────────────────────────────────────────────────────

interface ConversationListProps {
  activeId: string | null;
  onSelect: (conv: Conversation) => void;
}

export function ConversationList({ activeId, onSelect }: ConversationListProps) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "unread" | "matches">("all");

  useEffect(() => {
    fetchConversations().then((data) => {
      setConversations(data);
      setIsLoading(false);
    });
  }, []);

  const filtered = conversations.filter((c) => {
    if (filter === "unread") return c.unreadCount > 0;
    if (filter === "matches") return c.user.trustScore >= 90;
    return true;
  });

  return (
    <>
      {/* Search */}
      <div className="p-3 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            className="pl-9 h-8 text-xs bg-muted/50 border-none rounded-lg"
          />
        </div>
      </div>

      {/* Filter chips */}
      <div className="flex gap-2 px-3 py-2 border-b">
        {(["all", "unread", "matches"] as const).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={cn(
              "px-2.5 py-1 rounded-full text-[10px] font-medium border transition-colors capitalize",
              filter === f
                ? "bg-foreground text-background border-foreground"
                : "bg-card text-muted-foreground border-border hover:border-foreground"
            )}
          >
            {f === "matches" ? "Potential Matches" : f === "all" ? "All" : "Unread"}
          </button>
        ))}
      </div>

      {/* Conversation items */}
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="flex flex-col gap-2 p-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-14 rounded-lg bg-muted animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-4 text-center text-xs text-muted-foreground">No conversations</div>
        ) : (
          filtered.map((conv) => (
            <button
              key={conv.id}
              type="button"
              onClick={() => onSelect(conv)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-3 text-left transition-colors hover:bg-muted/50",
                activeId === conv.id && "bg-muted"
              )}
            >
              <div className="relative shrink-0">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={conv.user.avatar ?? undefined} />
                  <AvatarFallback className="text-xs font-bold bg-primary/10 text-primary">
                    {conv.user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                {conv.user.isOnline && (
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-success ring-2 ring-card" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-foreground truncate">{conv.user.name}</p>
                  <span className="text-[10px] text-muted-foreground shrink-0">{conv.lastMessageTime}</span>
                </div>
                <p className="text-xs text-muted-foreground truncate mt-0.5">{conv.lastMessage}</p>
              </div>
              {conv.unreadCount > 0 && (
                <Badge className="h-5 min-w-5 rounded-full px-1 text-[10px] shrink-0">
                  {conv.unreadCount}
                </Badge>
              )}
            </button>
          ))
        )}
      </div>
    </>
  );
}

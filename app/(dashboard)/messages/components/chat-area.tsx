"use client";

import { useState, useEffect, useRef } from "react";
import {
  ArrowLeft,
  Phone,
  Video,
  MoreVertical,
  Send,
  Check,
  CheckCheck,
  Smile,
  ImageIcon,
  Plus,
  Paperclip,
  Camera,
  MapPin,
  User,
  Flag,
  Ban,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { Conversation, Message } from "./types";

// ─── Common Emojis ────────────────────────────────────────────────────────────

const EMOJI_LIST = ["😊", "👍", "❤️", "😂", "🏠", "🎉", "🙏", "✅", "👋", "🔥", "💯", "😍", "🤝", "📍", "🏡", "☕"];

// ─── Data Fetching — TODO: Replace with real API ──────────────────────────────

async function fetchMessages(_conversationId: string): Promise<Message[]> {
  await new Promise((r) => setTimeout(r, 200));

  // TODO: Replace with: const res = await fetch(`/api/messages/${conversationId}`); return res.json();
  return [
    {
      id: "m1",
      senderId: "u1",
      content: "Namaste Aaryan! I'm really interested in the master bedroom you listed. Is it still available for next month?",
      timestamp: "10:24 AM",
      isRead: true,
    },
    {
      id: "m2",
      senderId: "current-user",
      content: "Namaste Sita! Yes, it's still available. I've had a few inquiries but no deposit yet. Are you looking to move in on the 1st?",
      timestamp: "10:26 AM",
      isRead: true,
    },
    {
      id: "m3",
      senderId: "u1",
      content: "That looks perfect! Yes, the 1st works for me. Can we jump on a quick video call tonight to discuss the house rules?",
      timestamp: "10:30 AM",
      isRead: true,
    },
  ];
}

// ─── Component ────────────────────────────────────────────────────────────────

interface ChatAreaProps {
  conversation: Conversation;
  onShowProfile: () => void;
  onBack: () => void;
}

export function ChatArea({ conversation, onShowProfile, onBack }: ChatAreaProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newMessage, setNewMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const emojiRef = useRef<HTMLDivElement>(null);
  const attachRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoading(true);
    fetchMessages(conversation.id).then((data) => {
      setMessages(data);
      setIsLoading(false);
    });
  }, [conversation.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Close popups on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (emojiRef.current && !emojiRef.current.contains(e.target as Node)) {
        setShowEmojiPicker(false);
      }
      if (attachRef.current && !attachRef.current.contains(e.target as Node)) {
        setShowAttachMenu(false);
      }
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setShowMoreMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // TODO: Replace with real API call to send message
    const msg: Message = {
      id: `m${Date.now()}`,
      senderId: "current-user",
      content: newMessage.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isRead: false,
    };
    setMessages((prev) => [...prev, msg]);
    setNewMessage("");
    setShowEmojiPicker(false);
  }

  function handleEmojiSelect(emoji: string) {
    setNewMessage((prev) => prev + emoji);
  }

  function handleImageSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // TODO: Upload image to storage and send as message with image URL
    const msg: Message = {
      id: `m${Date.now()}`,
      senderId: "current-user",
      content: `📷 Image: ${file.name}`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isRead: false,
    };
    setMessages((prev) => [...prev, msg]);
    e.target.value = "";
    setShowAttachMenu(false);
  }

  return (
    <>
      {/* Chat Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b shrink-0">
        {/* Back button — mobile only */}
        <Button
          variant="ghost"
          size="icon-sm"
          className="md:hidden"
          onClick={onBack}
          aria-label="Back to conversations"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>

        {/* User info — clickable to show profile panel */}
        <button
          type="button"
          onClick={onShowProfile}
          className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
        >
          <div className="relative">
            <Avatar className="h-9 w-9">
              <AvatarImage src={conversation.user.avatar ?? undefined} />
              <AvatarFallback className="text-xs font-bold bg-primary/10 text-primary">
                {conversation.user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            {conversation.user.isOnline && (
              <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-success ring-1.5 ring-card" />
            )}
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-foreground">{conversation.user.name}</p>
            <p className="text-[10px] text-success font-medium">
              {conversation.user.isOnline ? "● Online" : "Offline"}
            </p>
          </div>
        </button>

        {/* Action icons */}
        <div className="ml-auto flex items-center gap-1">
          <Button variant="ghost" size="icon-sm" aria-label="Voice call">
            <Phone className="h-4 w-4 text-muted-foreground" />
          </Button>
          <Button variant="ghost" size="icon-sm" aria-label="Video call">
            <Video className="h-4 w-4 text-muted-foreground" />
          </Button>

          {/* Three-dot menu with options */}
          <div className="relative" ref={moreRef}>
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="More options"
              onClick={() => setShowMoreMenu(!showMoreMenu)}
            >
              <MoreVertical className="h-4 w-4 text-muted-foreground" />
            </Button>

            {showMoreMenu && (
              <div className="absolute right-0 top-full mt-1 w-44 rounded-lg border bg-card shadow-lg z-50 py-1">
                <button
                  type="button"
                  className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                  onClick={() => {
                    onShowProfile();
                    setShowMoreMenu(false);
                  }}
                >
                  <User className="h-4 w-4 text-muted-foreground" />
                  View Profile
                </button>
                <button
                  type="button"
                  className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                  onClick={() => {
                    // TODO: Implement report functionality
                    setShowMoreMenu(false);
                  }}
                >
                  <Flag className="h-4 w-4 text-muted-foreground" />
                  Report
                </button>
                <button
                  type="button"
                  className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-destructive hover:bg-muted transition-colors"
                  onClick={() => {
                    // TODO: Implement block functionality
                    setShowMoreMenu(false);
                  }}
                >
                  <Ban className="h-4 w-4" />
                  Block
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {isLoading ? (
          <div className="flex flex-col gap-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className={`h-16 w-2/3 rounded-xl bg-muted animate-pulse ${i % 2 === 1 ? "ml-auto" : ""}`} />
            ))}
          </div>
        ) : (
          <>
            {/* Date separator */}
            <div className="flex items-center justify-center mb-4">
              <span className="text-[10px] text-muted-foreground bg-muted px-3 py-1 rounded-full font-medium uppercase tracking-wider">
                Today
              </span>
            </div>

            {/* Message bubbles */}
            <div className="flex flex-col gap-3">
              {messages.map((msg) => {
                const isMe = msg.senderId === "current-user";
                return (
                  <div
                    key={msg.id}
                    className={cn("flex gap-2", isMe ? "justify-end" : "justify-start")}
                  >
                    {!isMe && (
                      <Avatar className="h-7 w-7 shrink-0 mt-auto">
                        <AvatarImage src={conversation.user.avatar ?? undefined} />
                        <AvatarFallback className="text-[9px] font-bold bg-muted">
                          {conversation.user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div className={cn("max-w-[70%] flex flex-col", isMe ? "items-end" : "items-start")}>
                      <div
                        className={cn(
                          "px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed",
                          isMe
                            ? "bg-primary text-primary-foreground rounded-br-md"
                            : "bg-muted text-foreground rounded-bl-md"
                        )}
                      >
                        {msg.content}
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-[10px] text-muted-foreground">{msg.timestamp}</span>
                        {isMe && (
                          msg.isRead
                            ? <CheckCheck className="h-3 w-3 text-primary" />
                            : <Check className="h-3 w-3 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                    {isMe && (
                      <Avatar className="h-7 w-7 shrink-0 mt-auto">
                        <AvatarFallback className="text-[9px] font-bold bg-primary/10 text-primary">
                          Y
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                );
              })}
            </div>
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Message input area */}
      <div className="border-t shrink-0">
        {/* Emoji picker */}
        {showEmojiPicker && (
          <div ref={emojiRef} className="px-4 py-2 border-b bg-muted/30">
            <div className="grid grid-cols-8 gap-1">
              {EMOJI_LIST.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => handleEmojiSelect(emoji)}
                  className="h-8 w-8 flex items-center justify-center rounded hover:bg-muted transition-colors text-lg"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        )}

        <form onSubmit={handleSend} className="flex items-center gap-2 px-4 py-3">
          {/* Plus / Attachment button */}
          <div className="relative" ref={attachRef}>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="shrink-0 text-muted-foreground hover:text-foreground"
              onClick={() => setShowAttachMenu(!showAttachMenu)}
              aria-label="Attachments"
            >
              <Plus className="h-5 w-5" />
            </Button>

            {showAttachMenu && (
              <div className="absolute bottom-full left-0 mb-2 w-40 rounded-lg border bg-card shadow-lg z-50 py-1">
                <button
                  type="button"
                  className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                  onClick={() => {
                    fileInputRef.current?.click();
                    setShowAttachMenu(false);
                  }}
                >
                  <ImageIcon className="h-4 w-4 text-muted-foreground" />
                  Photo / Image
                </button>
                <button
                  type="button"
                  className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                  onClick={() => setShowAttachMenu(false)}
                >
                  <Paperclip className="h-4 w-4 text-muted-foreground" />
                  Document
                </button>
                <button
                  type="button"
                  className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                  onClick={() => setShowAttachMenu(false)}
                >
                  <Camera className="h-4 w-4 text-muted-foreground" />
                  Camera
                </button>
                <button
                  type="button"
                  className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                  onClick={() => setShowAttachMenu(false)}
                >
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  Location
                </button>
              </div>
            )}
          </div>

          {/* Hidden file input for image upload */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageSelect}
          />

          {/* Text input */}
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 h-9 text-sm bg-muted/50 border-none rounded-lg"
          />

          {/* Emoji button */}
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="shrink-0 text-muted-foreground hover:text-foreground"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            aria-label="Emoji"
          >
            <Smile className="h-5 w-5" />
          </Button>

          {/* Image quick-send button */}
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="shrink-0 text-muted-foreground hover:text-foreground"
            onClick={() => fileInputRef.current?.click()}
            aria-label="Send image"
          >
            <ImageIcon className="h-5 w-5" />
          </Button>

          {/* Send button */}
          <Button
            type="submit"
            size="icon"
            className="h-9 w-9 rounded-lg shrink-0"
            disabled={!newMessage.trim()}
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </>
  );
}

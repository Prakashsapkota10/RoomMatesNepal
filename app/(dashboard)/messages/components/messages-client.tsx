"use client";

import { useState } from "react";
import { ConversationList } from "./conversation-list";
import { ChatArea } from "./chat-area";
import { ProfilePanel } from "./profile-panel";
import type { Conversation } from "./types";

/**
 * Messages client component — responsive 3-panel layout:
 * Left: conversation list
 * Center: chat area
 * Right: user profile card (hidden until user clicks profile)
 *
 * Mobile: shows one panel at a time.
 */
export function MessagesClient() {
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [mobileView, setMobileView] = useState<"list" | "chat">("list");

  function handleSelectConversation(conv: Conversation) {
    setActiveConversation(conv);
    setShowProfile(false);
    setMobileView("chat");
  }

  function handleShowProfile() {
    setShowProfile(true);
  }

  function handleCloseProfile() {
    setShowProfile(false);
  }

  function handleBackToList() {
    setMobileView("list");
    setActiveConversation(null);
    setShowProfile(false);
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] rounded-xl overflow-hidden border bg-card">
      {/* Conversation List — hidden on mobile when chat is active */}
      <div className={`w-full md:w-72 lg:w-80 border-r flex-shrink-0 flex flex-col ${
        mobileView === "chat" ? "hidden md:flex" : "flex"
      }`}>
        <ConversationList
          activeId={activeConversation?.id ?? null}
          onSelect={handleSelectConversation}
        />
      </div>

      {/* Chat Area */}
      <div className={`flex-1 flex flex-col min-w-0 ${
        mobileView === "list" ? "hidden md:flex" : "flex"
      }`}>
        {activeConversation ? (
          <ChatArea
            conversation={activeConversation}
            onShowProfile={handleShowProfile}
            onBack={handleBackToList}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
            Select a conversation to start messaging
          </div>
        )}
      </div>

      {/* Profile Panel — only visible when user clicks profile */}
      {showProfile && activeConversation && (
        <div className="hidden lg:flex w-72 border-l flex-shrink-0 flex-col overflow-y-auto">
          <ProfilePanel
            conversation={activeConversation}
            onClose={handleCloseProfile}
          />
        </div>
      )}
    </div>
  );
}

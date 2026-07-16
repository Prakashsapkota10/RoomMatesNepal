/**
 * Message types — TODO: Replace with shared types from backend/database schema.
 */

export interface Conversation {
  id: string;
  user: {
    id: string;
    name: string;
    avatar: string | null;
    occupation: string;
    isOnline: boolean;
    trustScore: number;
    interests: string[];
  };
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

export interface SharedAsset {
  id: string;
  thumbnail: string;
  type: "image" | "document";
}

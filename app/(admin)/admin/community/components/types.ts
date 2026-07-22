/**
 * Shared types for the admin Community Management page.
 * TODO: Replace with the real post/comment DTOs returned by the backend community API.
 */

export type PostCategory = "question" | "discussion" | "tip" | "safety_alert";

export type PostStatus = "live" | "flagged" | "removed";

export interface ReportedComment {
  id: string;
  authorName: string;
  isAnonymous?: boolean;
  timeAgo: string;
  quote: string;
  reportedFor: string;
}

export interface CommunityPostRow {
  id: string;
  authorName: string;
  authorAvatar?: string;
  authorLocation: string;
  category: PostCategory;
  title: string;
  content: string;
  hashtags: string[];
  comments: number;
  likes: number;
  reportCount: number;
  status: PostStatus;
  postedAt: string;
  postedTime: string;
  reportedComments: ReportedComment[];
}

// ─── Comment Moderation ────────────────────────────────────────────────────

export type CommentModerationStatus = "pending" | "approved" | "removed";

export type CommentReportReason =
  | "harassment"
  | "spam"
  | "misinformation"
  | "inappropriate_language"
  | "other";

/** A single reply within a discussion thread, used to render surrounding context. */
export interface ThreadComment {
  id: string;
  authorName: string;
  authorAvatar?: string;
  authorVerified: boolean;
  isAcceptedAnswer?: boolean;
  content: string;
  likes: number;
  timeAgo: string;
  /** Present only on the reported comment within the thread. */
  reportReason?: CommentReportReason;
  isReported?: boolean;
}

/**
 * A reported comment row for the moderation queue — includes enough of the
 * parent discussion + sibling replies to render the "view in context" dialog.
 */
export interface AdminCommentRow {
  id: string;
  authorName: string;
  authorAvatar?: string;
  authorVerified: boolean;
  content: string;
  reportReason: CommentReportReason;
  reportCount: number;
  reportedBy: string;
  likes: number;
  status: CommentModerationStatus;
  postedAt: string;
  timeAgo: string;
  discussionId: string;
  discussionTitle: string;
  discussionCategory: PostCategory;
  /** Full reply thread for the parent discussion, in order, including this comment. */
  thread: ThreadComment[];
}

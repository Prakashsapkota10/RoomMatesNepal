"use client";

import { AlertTriangle, EyeOff, Pin, Lock, Trash2, Flag } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { PostStatusBadge } from "./post-status-badge";
import type { CommunityPostRow } from "./types";

interface PostDetailsDialogProps {
  post: CommunityPostRow | null;
  onOpenChange: (open: boolean) => void;
}

/**
 * Post Details dialog — author + posted time, status badge, post content
 * with hashtags, admin action grid (Hide/Pin/Lock/Delete), reported
 * comments list, and a Submit Moderation Verdict action. Mirrors the
 * reference design.
 * TODO: wire admin actions and the verdict submission to the real moderation API.
 */
export function PostDetailsDialog({ post, onOpenChange }: PostDetailsDialogProps) {
  if (!post) return null;

  const isRemoved = post.status === "removed";

  return (
    <Dialog open={!!post} onOpenChange={(open) => !open && onOpenChange(false)}>
      <DialogContent className="sm:max-w-md p-0 gap-0 h-[88vh] max-h-[820px] overflow-hidden flex flex-col">
        <DialogHeader className="px-4 pt-4 pb-2 flex-row items-center justify-between gap-2 shrink-0">
          <DialogTitle>Post Details</DialogTitle>
        </DialogHeader>

        <div className="overflow-y-auto flex-1 px-4 pb-4 flex flex-col gap-4">
          {/* Author + status */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <Avatar size="default">
                <AvatarImage src={post.authorAvatar} alt={post.authorName} />
                <AvatarFallback className="text-xs font-semibold bg-primary/10 text-primary">
                  {post.authorName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-semibold text-foreground leading-tight">{post.authorName}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  Posted on {post.postedAt} · {post.postedTime}
                </p>
              </div>
            </div>
            <PostStatusBadge status={post.status} />
          </div>

          {/* Post content card */}
          <div className="rounded-xl bg-[color:var(--error-light)]/60 border border-destructive/20 p-3.5">
            <div className="flex items-start gap-2">
              {post.category === "safety_alert" && (
                <AlertTriangle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
              )}
              <div className="min-w-0">
                <p className="text-sm font-bold text-foreground leading-snug">{post.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed mt-1.5">{post.content}</p>
                {post.hashtags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {post.hashtags.map((tag) => (
                      <span key={tag} className="text-[11px] font-medium text-primary">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Admin actions */}
          <div>
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              Admin Actions
            </p>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" className="btn-secondary-motion gap-1.5 font-medium" disabled={isRemoved}>
                <EyeOff className="h-3.5 w-3.5" />
                Hide Post
              </Button>
              <Button variant="outline" size="sm" className="btn-secondary-motion gap-1.5 font-medium" disabled={isRemoved}>
                <Pin className="h-3.5 w-3.5" />
                Pin Post
              </Button>
              <Button variant="outline" size="sm" className="btn-secondary-motion gap-1.5 font-medium" disabled={isRemoved}>
                <Lock className="h-3.5 w-3.5" />
                Lock Comments
              </Button>
              <Button
                size="sm"
                className="gap-1.5 font-medium bg-destructive text-destructive-foreground hover:bg-destructive/90 btn-primary-motion"
                disabled={isRemoved}
              >
                <Trash2 className="h-3.5 w-3.5" />
                Delete Post
              </Button>
            </div>
          </div>

          {/* Reported comments */}
          {post.reportedComments.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">
                  Reported Comments ({post.reportedComments.length})
                </p>
                <button type="button" className="text-xs text-primary font-medium hover:underline">
                  Review All
                </button>
              </div>
              <div className="flex flex-col gap-2">
                {post.reportedComments.map((comment) => (
                  <div key={comment.id} className="rounded-lg border-l-2 border-destructive bg-muted/40 p-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-foreground">{comment.authorName}</span>
                      <span className="text-[10px] text-muted-foreground shrink-0">{comment.timeAgo}</span>
                    </div>
                    <p className="text-xs text-muted-foreground italic mt-1">&ldquo;{comment.quote}&rdquo;</p>
                    <p className="flex items-center gap-1 text-[11px] text-destructive font-medium mt-1.5">
                      <Flag className="h-3 w-3" />
                      Reported for: {comment.reportedFor}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Submit verdict */}
        <div className="p-4 border-t bg-muted/30 shrink-0">
          <Button className="w-full btn-primary-motion font-semibold">Submit Moderation Verdict</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

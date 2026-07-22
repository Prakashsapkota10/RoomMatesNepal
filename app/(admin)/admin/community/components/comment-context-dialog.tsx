"use client";

import { Heart, Flag, Check, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { CategoryBadge } from "./category-badge";
import { CommentReasonBadge } from "./comment-reason-badge";
import { CommentStatusBadge } from "./comment-status-badge";
import { cn } from "@/lib/utils";
import type { AdminCommentRow } from "./types";

interface CommentContextDialogProps {
  comment: AdminCommentRow | null;
  onOpenChange: (open: boolean) => void;
}

/**
 * "View in Context" dialog — shows the reported comment inside its full
 * reply thread (mirrors the client-side discussion detail replies view),
 * so the admin can judge tone and surrounding conversation before acting.
 * Reported comments are highlighted; Approve/Remove act on the flagged
 * comment specifically.
 * TODO: wire Approve/Remove to the real moderation API.
 */
export function CommentContextDialog({ comment, onOpenChange }: CommentContextDialogProps) {
  if (!comment) return null;

  const isApproved = comment.status === "approved";
  const isRemoved = comment.status === "removed";

  return (
    <Dialog open={!!comment} onOpenChange={(open) => !open && onOpenChange(false)}>
      <DialogContent className="sm:max-w-lg p-0 gap-0 h-[88vh] max-h-[820px] overflow-hidden flex flex-col">
        <DialogHeader className="px-4 pt-4 pb-2 flex-row items-center justify-between gap-2 shrink-0">
          <DialogTitle>Comment in Context</DialogTitle>
        </DialogHeader>

        <div className="overflow-y-auto flex-1 px-4 pb-4 flex flex-col gap-4">
          {/* Parent discussion reference */}
          <div className="rounded-lg border bg-muted/30 p-3">
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">
              In discussion
            </p>
            <div className="flex items-center gap-2">
              <CategoryBadge category={comment.discussionCategory} />
              <p className="text-sm font-semibold text-foreground leading-snug line-clamp-1">
                {comment.discussionTitle}
              </p>
            </div>
          </div>

          {/* Reply thread */}
          <div className="flex flex-col gap-2.5">
            {comment.thread.map((reply) => (
              <div
                key={reply.id}
                className={cn(
                  "rounded-lg p-3",
                  reply.isReported
                    ? "border-l-2 border-destructive bg-destructive/5"
                    : "border"
                )}
              >
                <div className="flex items-start gap-2.5">
                  <Avatar size="sm" className="mt-0.5">
                    <AvatarImage src={reply.authorAvatar} alt={reply.authorName} />
                    <AvatarFallback className="text-[10px] font-semibold bg-muted">
                      {reply.authorName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-foreground">{reply.authorName}</span>
                      <span className="text-[11px] text-muted-foreground shrink-0">{reply.timeAgo}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-1">{reply.content}</p>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Heart className="h-3 w-3" />
                        {reply.likes}
                      </span>
                      {reply.isReported && reply.reportReason && (
                        <span className="flex items-center gap-1 text-[11px] text-destructive font-medium">
                          <Flag className="h-3 w-3" />
                          Reported
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Report details for the flagged comment */}
          <div className="rounded-xl bg-[color:var(--error-light)]/60 border border-destructive/20 p-3.5">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <p className="text-xs font-bold text-foreground">Report Details</p>
              <CommentStatusBadge status={comment.status} />
            </div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-muted-foreground">Reason:</span>
              <CommentReasonBadge reason={comment.reportReason} />
            </div>
            <p className="text-xs text-muted-foreground">
              Reported by <span className="font-medium text-foreground">{comment.reportedBy}</span> ·{" "}
              {comment.reportCount} {comment.reportCount === 1 ? "report" : "reports"} total
            </p>
          </div>
        </div>

        {/* Approve / Remove actions */}
        <div className="flex items-center gap-2 p-4 border-t bg-muted/30 shrink-0">
          <Button className="flex-1 btn-primary-motion gap-1.5 font-semibold" disabled={isApproved}>
            <Check className="h-4 w-4" />
            Approve Comment
          </Button>
          <Button
            variant="outline"
            className="flex-1 btn-secondary-motion gap-1.5 font-semibold border-destructive/40 text-destructive hover:bg-destructive/10"
            disabled={isRemoved}
          >
            <Trash2 className="h-4 w-4" />
            Remove Comment
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

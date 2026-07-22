"use client";

import { Eye, Check, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import type { AdminCommentRow } from "./types";

interface CommentRowActionsProps {
  comment: AdminCommentRow;
  onView: (comment: AdminCommentRow) => void;
}

/**
 * Row-level moderation actions for reported comments: view in context,
 * approve (dismiss the report), and remove the comment. Approve/Remove
 * disable once the comment is already in that state.
 * TODO: wire approve/remove to the real moderation API.
 */
export function CommentRowActions({ comment, onView }: CommentRowActionsProps) {
  const isApproved = comment.status === "approved";
  const isRemoved = comment.status === "removed";

  return (
    <div className="flex items-center justify-end gap-1">
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label={`View comment by ${comment.authorName} in context`}
              onClick={() => onView(comment)}
            >
              <Eye className="h-3.5 w-3.5 text-muted-foreground" />
            </Button>
          }
        />
        <TooltipContent>View in Context</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              variant="outline"
              size="icon-sm"
              disabled={isApproved}
              aria-label={`Approve comment by ${comment.authorName}`}
              className="border-[color:var(--trust)]/40 hover:bg-[color:var(--trust-light)]"
            >
              <Check className="h-3.5 w-3.5 text-[color:var(--trust)]" />
            </Button>
          }
        />
        <TooltipContent>Approve</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              variant="outline"
              size="icon-sm"
              disabled={isRemoved}
              aria-label={`Remove comment by ${comment.authorName}`}
              className="border-destructive/40 hover:bg-destructive/10"
            >
              <Trash2 className="h-3.5 w-3.5 text-destructive" />
            </Button>
          }
        />
        <TooltipContent>Remove Comment</TooltipContent>
      </Tooltip>
    </div>
  );
}

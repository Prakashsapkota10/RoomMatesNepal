"use client";

import { AlertTriangle, Heart } from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { CommentReasonBadge } from "./comment-reason-badge";
import { CommentStatusBadge } from "./comment-status-badge";
import { CommentRowActions } from "./comment-row-actions";
import type { AdminCommentRow } from "./types";

interface ReportedCommentsTableProps {
  comments: AdminCommentRow[];
  onView: (comment: AdminCommentRow) => void;
}

/**
 * Reported Comments table for /admin/community — Comment (author + excerpt),
 * Discussion (parent post title), Reason, Reports, Status, Actions.
 */
export function ReportedCommentsTable({ comments, onView }: ReportedCommentsTableProps) {
  if (comments.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-sm font-medium text-foreground">No reported comments right now.</p>
        <p className="text-xs text-muted-foreground mt-1">Flagged comments will show up here for review.</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Comment</TableHead>
          <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Discussion</TableHead>
          <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Reason</TableHead>
          <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Reports</TableHead>
          <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Status</TableHead>
          <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {comments.map((comment, index) => (
          <TableRow
            key={comment.id}
            className="animate-in fade-in slide-in-from-bottom-1 duration-300 fill-mode-both cursor-pointer"
            style={{ animationDelay: `${index * 40}ms` }}
            onClick={() => onView(comment)}
          >
            <TableCell>
              <div className="flex items-start gap-2.5 max-w-[260px]">
                <Avatar size="sm" className="mt-0.5">
                  <AvatarImage src={comment.authorAvatar} alt={comment.authorName} />
                  <AvatarFallback className="text-[10px] font-semibold bg-primary/10 text-primary">
                    {comment.authorName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground leading-tight">{comment.authorName}</p>
                  <p className="text-xs text-muted-foreground leading-snug mt-0.5 line-clamp-2">
                    &ldquo;{comment.content}&rdquo;
                  </p>
                  <div className="flex items-center gap-1 mt-1 text-[11px] text-muted-foreground">
                    <Heart className="h-3 w-3" />
                    {comment.likes} · {comment.timeAgo}
                  </div>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <p className="text-xs text-foreground leading-snug line-clamp-2 max-w-[160px]">
                {comment.discussionTitle}
              </p>
            </TableCell>
            <TableCell>
              <CommentReasonBadge reason={comment.reportReason} />
            </TableCell>
            <TableCell>
              <span className="flex items-center gap-1 text-xs font-semibold text-destructive">
                <AlertTriangle className="h-3.5 w-3.5" />
                {comment.reportCount}
              </span>
            </TableCell>
            <TableCell>
              <CommentStatusBadge status={comment.status} />
            </TableCell>
            <TableCell onClick={(e) => e.stopPropagation()}>
              <CommentRowActions comment={comment} onView={onView} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

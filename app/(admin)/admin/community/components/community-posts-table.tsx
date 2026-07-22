"use client";

import { MessageSquare, Heart, AlertTriangle } from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { CategoryBadge } from "./category-badge";
import { PostStatusBadge } from "./post-status-badge";
import { PostRowActions } from "./post-row-actions";
import type { CommunityPostRow } from "./types";

interface CommunityPostsTableProps {
  posts: CommunityPostRow[];
  onView: (post: CommunityPostRow) => void;
}

/**
 * Recent Activity table for /admin/community — mirrors the reference
 * design's column layout: Author, Category, Engagement, Reports, Status,
 * Date, Actions.
 */
export function CommunityPostsTable({ posts, onView }: CommunityPostsTableProps) {
  if (posts.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-sm font-medium text-foreground">No posts match this filter.</p>
        <p className="text-xs text-muted-foreground mt-1">Try switching tabs or adjusting your filters.</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Author</TableHead>
          <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Category</TableHead>
          <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Engagement</TableHead>
          <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Reports</TableHead>
          <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Status</TableHead>
          <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Date</TableHead>
          <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((post, index) => (
          <TableRow
            key={post.id}
            className="animate-in fade-in slide-in-from-bottom-1 duration-300 fill-mode-both cursor-pointer"
            style={{ animationDelay: `${index * 40}ms` }}
            onClick={() => onView(post)}
          >
            <TableCell>
              <div className="flex items-center gap-2.5">
                <Avatar size="sm">
                  <AvatarImage src={post.authorAvatar} alt={post.authorName} />
                  <AvatarFallback className="text-[10px] font-semibold bg-primary/10 text-primary">
                    {post.authorName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground leading-tight">{post.authorName}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{post.authorLocation}</p>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <CategoryBadge category={post.category} />
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MessageSquare className="h-3.5 w-3.5" />
                  {post.comments}
                </span>
                <span className="flex items-center gap-1">
                  <Heart className="h-3.5 w-3.5" />
                  {post.likes}
                </span>
              </div>
            </TableCell>
            <TableCell>
              <span
                className={`flex items-center gap-1 text-xs font-semibold ${
                  post.reportCount > 0 ? "text-destructive" : "text-muted-foreground"
                }`}
              >
                <AlertTriangle className="h-3.5 w-3.5" />
                {post.reportCount}
              </span>
            </TableCell>
            <TableCell>
              <PostStatusBadge status={post.status} />
            </TableCell>
            <TableCell>
              <span className="text-xs text-muted-foreground">{post.postedAt}</span>
            </TableCell>
            <TableCell onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-end">
                <PostRowActions post={post} onView={onView} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

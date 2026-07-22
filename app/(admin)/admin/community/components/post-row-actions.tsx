"use client";

import { MoreVertical, Eye, EyeOff, Pin, Lock, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import type { CommunityPostRow } from "./types";

interface PostRowActionsProps {
  post: CommunityPostRow;
  onView: (post: CommunityPostRow) => void;
}

/**
 * Row-level moderation menu for community posts — View Details, Hide/Unhide,
 * Pin, Lock Comments, Delete. Matches the reference design's "⋮" trigger,
 * with the same actions surfaced in the Post Details dialog's admin panel.
 * TODO: wire each action to the real moderation API.
 */
export function PostRowActions({ post, onView }: PostRowActionsProps) {
  const isRemoved = post.status === "removed";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" size="icon-sm" aria-label={`Actions for ${post.title}`}>
            <MoreVertical className="h-3.5 w-3.5 text-muted-foreground" />
          </Button>
        }
      />
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onView(post)}>
          <Eye className="h-3.5 w-3.5" />
          View Details
        </DropdownMenuItem>
        <DropdownMenuItem disabled={isRemoved}>
          <EyeOff className="h-3.5 w-3.5" />
          Hide Post
        </DropdownMenuItem>
        <DropdownMenuItem disabled={isRemoved}>
          <Pin className="h-3.5 w-3.5" />
          Pin Post
        </DropdownMenuItem>
        <DropdownMenuItem disabled={isRemoved}>
          <Lock className="h-3.5 w-3.5" />
          Lock Comments
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" disabled={isRemoved}>
          <Trash2 className="h-3.5 w-3.5" />
          Delete Post
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

"use client";

import { MoreVertical, Pencil, Pin, PinOff, Send, Archive, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import type { AnnouncementRow } from "./types";

interface AnnouncementRowActionsProps {
  announcement: AnnouncementRow;
  onEdit: (announcement: AnnouncementRow) => void;
}

/**
 * Row-level management menu for announcements: Edit, Publish Now (for
 * drafts/scheduled), Pin/Unpin, Archive, Delete.
 * TODO: wire each action to the real announcements API.
 */
export function AnnouncementRowActions({ announcement, onEdit }: AnnouncementRowActionsProps) {
  const isArchived = announcement.status === "archived";
  const canPublishNow = announcement.status === "draft" || announcement.status === "scheduled";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" size="icon-sm" aria-label={`Actions for ${announcement.title}`}>
            <MoreVertical className="h-3.5 w-3.5 text-muted-foreground" />
          </Button>
        }
      />
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onEdit(announcement)}>
          <Pencil className="h-3.5 w-3.5" />
          Edit
        </DropdownMenuItem>
        {canPublishNow && (
          <DropdownMenuItem>
            <Send className="h-3.5 w-3.5" />
            Publish Now
          </DropdownMenuItem>
        )}
        <DropdownMenuItem disabled={isArchived}>
          {announcement.isPinned ? (
            <>
              <PinOff className="h-3.5 w-3.5" />
              Unpin
            </>
          ) : (
            <>
              <Pin className="h-3.5 w-3.5" />
              Pin to Top
            </>
          )}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled={isArchived}>
          <Archive className="h-3.5 w-3.5" />
          Archive
        </DropdownMenuItem>
        <DropdownMenuItem variant="destructive">
          <Trash2 className="h-3.5 w-3.5" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

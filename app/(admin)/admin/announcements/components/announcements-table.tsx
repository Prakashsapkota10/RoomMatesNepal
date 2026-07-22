"use client";

import { Eye, Pin } from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { AudienceBadge } from "./audience-badge";
import { AnnouncementStatusBadge } from "./announcement-status-badge";
import { AnnouncementRowActions } from "./announcement-row-actions";
import type { AnnouncementRow } from "./types";

interface AnnouncementsTableProps {
  announcements: AnnouncementRow[];
  onEdit: (announcement: AnnouncementRow) => void;
}

/**
 * Recent Announcements table — mirrors the reference design's column
 * layout: Title, Audience, Status, Views, Action.
 */
export function AnnouncementsTable({ announcements, onEdit }: AnnouncementsTableProps) {
  if (announcements.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-sm font-medium text-foreground">No announcements match this filter.</p>
        <p className="text-xs text-muted-foreground mt-1">Try switching tabs or adjusting your filters.</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Title</TableHead>
          <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Audience</TableHead>
          <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Status</TableHead>
          <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Views</TableHead>
          <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {announcements.map((a, index) => (
          <TableRow
            key={a.id}
            className="animate-in fade-in slide-in-from-bottom-1 duration-300 fill-mode-both cursor-pointer"
            style={{ animationDelay: `${index * 40}ms` }}
            onClick={() => onEdit(a)}
          >
            <TableCell>
              <div className="flex items-start gap-1.5 max-w-[240px]">
                {a.isPinned && <Pin className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />}
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground leading-tight line-clamp-1">{a.title}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{a.createdAgo}</p>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <AudienceBadge audience={a.audience} />
            </TableCell>
            <TableCell>
              <AnnouncementStatusBadge status={a.status} />
            </TableCell>
            <TableCell>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Eye className="h-3.5 w-3.5" />
                {a.views.toLocaleString()}
              </span>
            </TableCell>
            <TableCell onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-end">
                <AnnouncementRowActions announcement={a} onEdit={onEdit} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

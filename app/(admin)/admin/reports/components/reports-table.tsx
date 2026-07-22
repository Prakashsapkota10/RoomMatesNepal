"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ReasonBadge } from "./reason-badge";
import { PriorityBadge } from "./priority-badge";
import { EvidenceLink } from "./evidence-link";
import { ReportRowActions } from "./report-row-actions";
import type { AdminReportRow } from "./types";

interface ReportsTableProps {
  reports: AdminReportRow[];
}

/**
 * Report Management table — mirrors the reference design's column layout:
 * Reporter, Reported User, Reason, Evidence, Priority, Status, Actions.
 */
export function ReportsTable({ reports }: ReportsTableProps) {
  if (reports.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-sm font-medium text-foreground">No reports match this filter.</p>
        <p className="text-xs text-muted-foreground mt-1">Try switching tabs or adjusting your filters.</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Reporter</TableHead>
          <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Reported User</TableHead>
          <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Reason</TableHead>
          <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Evidence</TableHead>
          <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Priority</TableHead>
          <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Status</TableHead>
          <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reports.map((report, index) => (
          <TableRow
            key={report.id}
            className="animate-in fade-in slide-in-from-bottom-1 duration-300 fill-mode-both"
            style={{ animationDelay: `${index * 40}ms` }}
          >
            <TableCell>
              <div className="flex items-center gap-2.5">
                <Avatar size="sm">
                  <AvatarImage src={report.reporterAvatar} alt={report.reporterName} />
                  <AvatarFallback className="text-[10px] font-semibold bg-primary/10 text-primary">
                    {report.reporterName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground leading-tight">{report.reporterName}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">ID: #{report.displayId}</p>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2.5">
                <Avatar size="sm">
                  <AvatarImage src={report.reportedUserAvatar} alt={report.reportedUserName} />
                  <AvatarFallback className="text-[10px] font-semibold bg-destructive/10 text-destructive">
                    {report.reportedUserName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-foreground">{report.reportedUserName}</span>
              </div>
            </TableCell>
            <TableCell>
              <ReasonBadge reason={report.reason} />
            </TableCell>
            <TableCell>
              <EvidenceLink file={report.evidenceFile} type={report.evidenceType} />
            </TableCell>
            <TableCell>
              <PriorityBadge priority={report.priority} />
            </TableCell>
            <TableCell>
              <span className="text-xs text-muted-foreground">{report.lastActivity}</span>
            </TableCell>
            <TableCell>
              <ReportRowActions report={report} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

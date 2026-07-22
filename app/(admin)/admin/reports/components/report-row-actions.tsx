"use client";

import { Megaphone, Ban, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import type { AdminReportRow } from "./types";

interface ReportRowActionsProps {
  report: AdminReportRow;
}

/**
 * Row-level moderation actions for the reports table, left to right:
 * Warn User, Suspend User, Resolve. Resolve is disabled once the report is
 * already resolved or dismissed.
 * TODO: wire each action to the real moderation API (warn/suspend/resolve).
 */
export function ReportRowActions({ report }: ReportRowActionsProps) {
  const isClosed = report.queueStatus === "resolved" || report.queueStatus === "dismissed";

  return (
    <div className="flex items-center justify-end gap-1">
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label={`Warn ${report.reportedUserName}`}
            >
              <Megaphone className="h-3.5 w-3.5 text-[color:var(--warning-dark)]" />
            </Button>
          }
        />
        <TooltipContent>Warn User</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label={`Suspend ${report.reportedUserName}`}
            >
              <Ban className="h-3.5 w-3.5 text-destructive" />
            </Button>
          }
        />
        <TooltipContent>Suspend User</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              variant="ghost"
              size="icon-sm"
              disabled={isClosed}
              aria-label={`Resolve report ${report.displayId}`}
            >
              <Check className="h-3.5 w-3.5 text-[color:var(--trust)]" />
            </Button>
          }
        />
        <TooltipContent>Resolve</TooltipContent>
      </Tooltip>
    </div>
  );
}

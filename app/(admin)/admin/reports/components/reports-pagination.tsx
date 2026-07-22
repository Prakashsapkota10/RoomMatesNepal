"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ReportsPaginationProps {
  page: number;
  totalPages: number;
  totalResults: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

/**
 * Compact Previous/Next pagination footer for the reports table, matching
 * the reference design's "Showing 1 to 10 of 148 reports" + chevron buttons.
 * TODO: wire `page` to a backend-paginated query instead of client-side slicing.
 */
export function ReportsPagination({
  page,
  totalPages,
  totalResults,
  pageSize,
  onPageChange,
}: ReportsPaginationProps) {
  const start = totalResults === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalResults);

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t">
      <span className="text-xs text-muted-foreground">
        Showing {start} to {end} of {totalResults} reports
      </span>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon-sm"
          className="btn-secondary-motion"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
        </Button>
        <Button
          variant="outline"
          size="icon-sm"
          className="btn-secondary-motion"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          aria-label="Next page"
        >
          <ChevronRight className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}

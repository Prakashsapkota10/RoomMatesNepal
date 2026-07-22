"use client";

import { Button } from "@/components/ui/button";

interface AnnouncementsPaginationProps {
  page: number;
  totalPages: number;
  totalResults: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

/** Simple Previous/Next pagination footer for the announcements table. */
export function AnnouncementsPagination({
  page,
  totalPages,
  totalResults,
  pageSize,
  onPageChange,
}: AnnouncementsPaginationProps) {
  const start = totalResults === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalResults);

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t">
      <span className="text-xs text-muted-foreground">
        Showing {start}-{end} of {totalResults} entries
      </span>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="btn-secondary-motion"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          Previous
        </Button>
        <Button
          size="sm"
          className="btn-primary-motion"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

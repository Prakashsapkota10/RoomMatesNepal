"use client";

import { Button } from "@/components/ui/button";

interface UsersPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

/**
 * Simple Previous/Next pagination footer for the users table.
 * TODO: wire `page` to a backend-paginated query instead of client-side slicing.
 */
export function UsersPagination({ page, totalPages, onPageChange }: UsersPaginationProps) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-t">
      <span className="text-xs text-muted-foreground">
        Page {page} of {totalPages}
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

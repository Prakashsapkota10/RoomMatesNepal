"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ListingsPaginationProps {
  page: number;
  totalPages: number;
  totalResults: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

/**
 * Numbered Previous/Next pagination footer for the listings tables, matching
 * the reference design's "Showing 1-10 of 142 results" + numbered pages.
 * TODO: wire `page` to a backend-paginated query instead of client-side slicing.
 */
export function ListingsPagination({
  page,
  totalPages,
  totalResults,
  pageSize,
  onPageChange,
}: ListingsPaginationProps) {
  const start = totalResults === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalResults);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-t">
      <span className="text-xs text-muted-foreground">
        Showing {start}-{end} of {totalResults} results
      </span>
      <div className="flex items-center gap-1.5">
        <Button
          variant="outline"
          size="sm"
          className="btn-secondary-motion"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          Previous
        </Button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <Button
            key={p}
            variant={p === page ? "default" : "outline"}
            size="icon-sm"
            onClick={() => onPageChange(p)}
            className={cn("btn-secondary-motion", p === page && "btn-primary-motion")}
            aria-current={p === page ? "page" : undefined}
          >
            {p}
          </Button>
        ))}

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

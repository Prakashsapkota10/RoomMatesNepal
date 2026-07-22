"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CommunityPaginationProps {
  page: number;
  totalPages: number;
  totalResults: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

/**
 * Numbered pagination footer for the community posts table, matching the
 * reference design's "Showing 1-10 of 1,284 entries" + numbered pages.
 * TODO: wire `page` to a backend-paginated query instead of client-side slicing.
 */
export function CommunityPagination({
  page,
  totalPages,
  totalResults,
  pageSize,
  onPageChange,
}: CommunityPaginationProps) {
  const start = totalResults === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalResults);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-t">
      <span className="text-xs text-muted-foreground">
        Showing {start}-{end} of {totalResults} entries
      </span>
      <div className="flex items-center gap-1.5">
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

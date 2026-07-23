"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface VerificationsPaginationProps {
  page: number;
  totalPages: number;
  totalResults: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

/**
 * Numbered pagination footer for the verification requests table, matching
 * the "Showing 1 to 8 of 48 cases" + numbered pages pattern used elsewhere
 * in the admin dashboard.
 * TODO: wire `page` to a backend-paginated query instead of client-side slicing.
 */
export function VerificationsPagination({
  page,
  totalPages,
  totalResults,
  pageSize,
  onPageChange,
}: VerificationsPaginationProps) {
  const start = totalResults === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalResults);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-t">
      <span className="text-xs text-muted-foreground">
        Showing {start} to {end} of {totalResults.toLocaleString()} cases
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

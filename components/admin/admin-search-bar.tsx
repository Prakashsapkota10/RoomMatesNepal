"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface AdminSearchBarProps {
  /** Placeholder text */
  placeholder?: string;
  /** Additional class names */
  className?: string;
}

/**
 * Reusable admin search bar.
 *
 * Not every admin page needs a search input, so this lives as its own
 * component instead of being baked into the admin topbar/layout. Import it
 * and drop it into a page's header row only where it's actually needed
 * (e.g. /admin/users, /admin/listings, /admin/reports).
 *
 * Currently client-side only — TODO: wire to backend search/filter API.
 */
export function AdminSearchBar({
  placeholder = "Search listing ID, user, or report...",
  className,
}: AdminSearchBarProps) {
  return (
    <div className={cn("relative w-full max-w-md", className)}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder={placeholder}
        className="pl-9 h-9 text-sm bg-muted/50 border-none rounded-lg"
      />
    </div>
  );
}

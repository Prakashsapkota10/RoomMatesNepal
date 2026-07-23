"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AdminSearchBarProps {
  /** Placeholder text */
  placeholder?: string;
  /** Additional class names */
  className?: string;
  /** Controlled value — omit to use as a plain uncontrolled input (existing pages that don't wire up search yet). */
  value?: string;
  /** Called with the new value on every keystroke — only relevant when `value` is provided. */
  onChange?: (value: string) => void;
}

/**
 * Reusable admin search bar.
 *
 * Not every admin page needs a search input, so this lives as its own
 * component instead of being baked into the admin topbar/layout. Import it
 * and drop it into a page's header row only where it's actually needed
 * (e.g. /admin/users, /admin/listings, /admin/reports, /admin/payments).
 *
 * Supports an optional controlled `value`/`onChange` pair for pages that
 * actually filter a list client-side (e.g. Payments); pages that haven't
 * wired up search yet can keep using it uncontrolled.
 * TODO: wire to backend search/filter API.
 */
export function AdminSearchBar({
  placeholder = "Search listing ID, user, or report...",
  className,
  value,
  onChange,
}: AdminSearchBarProps) {
  const isControlled = value !== undefined;

  return (
    <div className={cn("relative w-full max-w-md", className)}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder={placeholder}
        value={isControlled ? value : undefined}
        onChange={isControlled ? (e) => onChange?.(e.target.value) : undefined}
        className={cn("pl-9 h-9 text-sm bg-muted/50 border-none rounded-lg", isControlled && value && "pr-8")}
      />
      {isControlled && value && (
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label="Clear search"
          onClick={() => onChange?.("")}
          className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6"
        >
          <X className="h-3.5 w-3.5 text-muted-foreground" />
        </Button>
      )}
    </div>
  );
}

"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  /** Placeholder text */
  placeholder?: string;
  /** Additional class names */
  className?: string;
}

/**
 * Reusable search bar component.
 * Use this in any page/section that requires search functionality.
 * Currently client-side only — TODO: wire to backend search API.
 */
export function SearchBar({
  placeholder = "Search rooms, mates...",
  className,
}: SearchBarProps) {
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

"use client";

import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  value: string;
  onChange: (query: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="flex items-center gap-2 rounded-full border bg-card shadow-sm px-4 py-2 max-w-xl mx-auto">
      <Search className="h-4 w-4 text-muted-foreground shrink-0" />
      <input
        type="text"
        placeholder="Search discussions, questions, guides, or cities..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        aria-label="Search community discussions"
      />
      <Button size="sm" className="rounded-full px-5 font-semibold">
        Search
      </Button>
    </div>
  );
}

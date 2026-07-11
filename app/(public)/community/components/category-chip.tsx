"use client";

import { cn } from "@/lib/utils";
import type { CommunityCategory } from "../types";

interface CategoryChipProps {
  category: CommunityCategory;
  isActive: boolean;
  onClick: (slug: string) => void;
}

export function CategoryChip({ category, isActive, onClick }: CategoryChipProps) {
  return (
    <button
      onClick={() => onClick(category.slug)}
      className={cn(
        "inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-150 border whitespace-nowrap",
        isActive
          ? "bg-primary text-white border-primary"
          : "bg-card text-foreground border-border hover:border-primary hover:text-primary"
      )}
      aria-pressed={isActive}
      aria-label={`Filter by ${category.name}`}
    >
      {category.name}
    </button>
  );
}

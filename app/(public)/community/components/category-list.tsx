"use client";

import type { CommunityCategory } from "../types";
import { CategoryChip } from "./category-chip";

interface CategoryListProps {
  categories: CommunityCategory[];
  activeCategory: string;
  onCategoryChange: (slug: string) => void;
}

export function CategoryList({ categories, activeCategory, onCategoryChange }: CategoryListProps) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Discussion categories">
      {categories.map((category) => (
        <CategoryChip
          key={category.id}
          category={category}
          isActive={activeCategory === category.slug}
          onClick={onCategoryChange}
        />
      ))}
    </div>
  );
}

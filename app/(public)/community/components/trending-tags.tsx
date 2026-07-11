import type { TrendingTag } from "../types";

interface TrendingTagsProps {
  tags: TrendingTag[];
}

export function TrendingTags({ tags }: TrendingTagsProps) {
  return (
    <div className="rounded-2xl border bg-card p-5">
      <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">
        Trending Tags
      </h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button
            key={tag.id}
            className="inline-flex items-center rounded-full border bg-blue-50 px-3 py-1 text-xs font-medium text-primary hover:bg-blue-100 transition-colors"
            aria-label={`View discussions tagged ${tag.name}`}
          >
            {tag.name}
          </button>
        ))}
      </div>
    </div>
  );
}

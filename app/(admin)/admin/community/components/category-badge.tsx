"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { PostCategory } from "./types";

const STYLES: Record<PostCategory, string> = {
  question: "bg-muted text-muted-foreground",
  discussion: "bg-primary/10 text-primary",
  tip: "bg-[color:var(--ai-light)] text-[color:var(--ai-dark)]",
  safety_alert: "bg-[color:var(--error-light)] text-[color:var(--error-dark)]",
};

const LABELS: Record<PostCategory, string> = {
  question: "Question",
  discussion: "Discussion",
  tip: "Tip",
  safety_alert: "Safety Alert",
};

/** Category tag for a community post row (Question/Discussion/Tip/Safety Alert). */
export function CategoryBadge({ category }: { category: PostCategory }) {
  return (
    <Badge className={cn("text-[10px] font-semibold border-0", STYLES[category])}>
      {LABELS[category]}
    </Badge>
  );
}

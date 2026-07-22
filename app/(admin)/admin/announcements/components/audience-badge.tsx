"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { AnnouncementAudience } from "./types";

const STYLES: Record<AnnouncementAudience, string> = {
  all: "bg-muted text-muted-foreground",
  seekers: "bg-primary/10 text-primary",
  owners: "bg-[color:var(--community-light)] text-[color:var(--community-dark)]",
  admins: "bg-[color:var(--trust-light)] text-[color:var(--trust-dark)]",
};

const LABELS: Record<AnnouncementAudience, string> = {
  all: "All",
  seekers: "Seekers",
  owners: "Owners",
  admins: "Admins",
};

/** Audience pill for an announcement row — All/Seekers/Owners/Admins. */
export function AudienceBadge({ audience }: { audience: AnnouncementAudience }) {
  return (
    <Badge className={cn("text-[10px] font-semibold border-0", STYLES[audience])}>
      {LABELS[audience]}
    </Badge>
  );
}

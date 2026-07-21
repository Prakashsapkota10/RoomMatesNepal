"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { UserRole } from "@/types";

const STYLES: Record<UserRole, string> = {
  user: "bg-primary/10 text-primary",
  tenant: "bg-[color:var(--ai-light)] text-[color:var(--ai-dark)]",
  admin: "bg-[color:var(--community-light)] text-[color:var(--community-dark)]",
};

const LABELS: Record<UserRole, string> = {
  user: "Room Seeker",
  tenant: "Room Owner",
  admin: "Admin",
};

/** Small pill badge for a user's role — reuses the design system's brand colors. */
export function RoleBadge({ role }: { role: UserRole }) {
  return (
    <Badge className={cn("text-[10px] font-semibold border-0", STYLES[role])}>
      {LABELS[role]}
    </Badge>
  );
}

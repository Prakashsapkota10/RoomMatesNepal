"use client";

import { cn } from "@/lib/utils";

export type AccountStatus = "active" | "inactive" | "suspended";

const DOT_COLOR: Record<AccountStatus, string> = {
  active: "bg-[color:var(--success)]",
  inactive: "bg-muted-foreground/50",
  suspended: "bg-[color:var(--error)]",
};

const LABEL: Record<AccountStatus, string> = {
  active: "Active",
  inactive: "Inactive",
  suspended: "Suspended",
};

/** Status dot + label used in the users table's Status column. */
export function AccountStatusDot({ status }: { status: AccountStatus }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground">
      <span className={cn("h-1.5 w-1.5 rounded-full shrink-0", DOT_COLOR[status])} />
      {LABEL[status]}
    </span>
  );
}

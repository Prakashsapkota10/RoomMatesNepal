"use client";

import { RefreshCw, RefreshCwOff } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/**
 * Read-only "On" / "Off" indicator for auto-renewal — deliberately not an
 * interactive toggle in the table. Changing auto-renewal is a financial
 * lifecycle setting and only happens from the detail drawer behind a
 * confirmation dialog (see cancel-subscription-dialog.tsx sibling actions).
 */
export function AutoRenewBadge({ enabled }: { enabled: boolean }) {
  return (
    <Badge
      className={cn(
        "gap-1 text-[10px] font-semibold border-0",
        enabled
          ? "bg-[color:var(--success-light)] text-[color:var(--success-dark)]"
          : "bg-muted text-muted-foreground"
      )}
    >
      {enabled ? <RefreshCw className="h-2.5 w-2.5" /> : <RefreshCwOff className="h-2.5 w-2.5" />}
      {enabled ? "On" : "Off"}
    </Badge>
  );
}

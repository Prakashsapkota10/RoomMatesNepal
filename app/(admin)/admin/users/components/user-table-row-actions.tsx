"use client";

import { Eye, ShieldCheck, ShieldOff, Trash2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import type { AdminUserRow } from "./types";

interface UserTableRowActionsProps {
  user: AdminUserRow;
}

/**
 * Row-level quick actions for the users table: view profile, verify/revoke
 * verification, and delete/restore. Icon-only buttons with tooltips to keep
 * the row compact, matching the reference design.
 * TODO: wire each action to the real admin API (view profile, verify, delete/suspend).
 */
export function UserTableRowActions({ user }: UserTableRowActionsProps) {
  const isSuspended = user.status === "suspended";

  return (
    <div className="flex items-center justify-end gap-1">
      <Tooltip>
        <TooltipTrigger
          render={
            <Button variant="ghost" size="icon-sm" aria-label={`View ${user.name}'s profile`}>
              <Eye className="h-3.5 w-3.5 text-muted-foreground" />
            </Button>
          }
        />
        <TooltipContent>View Profile</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label={user.verification === "verified" ? `Revoke ${user.name}'s verification` : `Verify ${user.name}`}
            >
              {user.verification === "verified" ? (
                <ShieldOff className="h-3.5 w-3.5 text-[color:var(--warning-dark)]" />
              ) : (
                <ShieldCheck className="h-3.5 w-3.5 text-[color:var(--trust)]" />
              )}
            </Button>
          }
        />
        <TooltipContent>
          {user.verification === "verified" ? "Revoke Verification" : "Verify User"}
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label={isSuspended ? `Restore ${user.name}'s account` : `Suspend ${user.name}'s account`}
            >
              {isSuspended ? (
                <RotateCcw className="h-3.5 w-3.5 text-[color:var(--trust)]" />
              ) : (
                <Trash2 className="h-3.5 w-3.5 text-destructive" />
              )}
            </Button>
          }
        />
        <TooltipContent>{isSuspended ? "Restore Account" : "Suspend Account"}</TooltipContent>
      </Tooltip>
    </div>
  );
}

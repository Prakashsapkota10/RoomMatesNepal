"use client";

import { MoreVertical, Eye, History, CheckCircle2, AlertTriangle, Send, XCircle, Ban } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import type { VerificationRow } from "./types";

interface VerificationRowActionsProps {
  verification: VerificationRow;
  onViewDetails: (verification: VerificationRow) => void;
  onMarkVerified: (verification: VerificationRow) => void;
  onMarkNeedsAttention: (verification: VerificationRow) => void;
  onRequestAdditional: (verification: VerificationRow) => void;
  onReject: (verification: VerificationRow) => void;
  onSuspend: (verification: VerificationRow) => void;
}

/**
 * Row-level action menu — actions are context-aware based on the case's
 * current status, so e.g. "Mark as Verified" never appears on an already-
 * verified row and "Suspend Account" only appears where it's a meaningful
 * next step.
 * TODO: wire "View Full Profile" / "View History" to their real routes.
 */
export function VerificationRowActions({
  verification,
  onViewDetails,
  onMarkVerified,
  onMarkNeedsAttention,
  onRequestAdditional,
  onReject,
  onSuspend,
}: VerificationRowActionsProps) {
  const { status } = verification;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" size="icon-sm" aria-label={`Actions for ${verification.userName}`}>
            <MoreVertical className="h-3.5 w-3.5 text-muted-foreground" />
          </Button>
        }
      />
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onViewDetails(verification)}>
          <Eye className="h-3.5 w-3.5" />
          View Full Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onViewDetails(verification)}>
          <History className="h-3.5 w-3.5" />
          View Verification History
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {(status === "pending" || status === "under_review" || status === "needs_attention") && (
          <DropdownMenuItem onClick={() => onMarkVerified(verification)}>
            <CheckCircle2 className="h-3.5 w-3.5" />
            Mark as Verified
          </DropdownMenuItem>
        )}

        {status !== "needs_attention" && status !== "suspended" && status !== "rejected" && (
          <DropdownMenuItem onClick={() => onMarkNeedsAttention(verification)}>
            <AlertTriangle className="h-3.5 w-3.5" />
            Mark as Needs Attention
          </DropdownMenuItem>
        )}

        {(status === "pending" || status === "under_review" || status === "needs_attention") && (
          <DropdownMenuItem onClick={() => onRequestAdditional(verification)}>
            <Send className="h-3.5 w-3.5" />
            Request Additional Verification
          </DropdownMenuItem>
        )}

        {(status === "pending" || status === "under_review" || status === "needs_attention") && (
          <DropdownMenuItem variant="destructive" onClick={() => onReject(verification)}>
            <XCircle className="h-3.5 w-3.5" />
            Reject Verification
          </DropdownMenuItem>
        )}

        {status !== "suspended" && (
          <DropdownMenuItem variant="destructive" onClick={() => onSuspend(verification)}>
            <Ban className="h-3.5 w-3.5" />
            Suspend Account
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

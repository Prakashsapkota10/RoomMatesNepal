"use client";

import { AlertTriangle, SearchX } from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { RoleBadge } from "../../users/components/role-badge";
import { TrustScoreBar } from "../../users/components/trust-score-bar";
import { VerificationStatusBadge } from "./verification-status-badge";
import { PriorityBadge } from "./priority-badge";
import { VerificationSignalList } from "./verification-signal-list";
import { VerificationRowActions } from "./verification-row-actions";
import { VERIFICATION_TYPE_LABELS } from "./constants";
import { formatVerificationDate } from "./verification.utils";
import type { VerificationRow } from "./types";

interface VerificationTableProps {
  verifications: VerificationRow[];
  isLoading?: boolean;
  isError?: boolean;
  onRetry?: () => void;
  onViewDetails: (verification: VerificationRow) => void;
  onMarkVerified: (verification: VerificationRow) => void;
  onMarkNeedsAttention: (verification: VerificationRow) => void;
  onRequestAdditional: (verification: VerificationRow) => void;
  onReject: (verification: VerificationRow) => void;
  onSuspend: (verification: VerificationRow) => void;
}

function TableSkeletonRows() {
  return (
    <>
      {Array.from({ length: 5 }, (_, i) => (
        <TableRow key={i} className="hover:bg-transparent">
          {Array.from({ length: 8 }, (_, j) => (
            <TableCell key={j}>
              <Skeleton className="h-4 w-full max-w-24" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}

/**
 * Verification request table for /admin/verifications — User, Role,
 * Verification Type, Verification Signals, Trust Score, Submitted Date,
 * Priority, Status, Actions. Handles loading (skeleton rows), error, and
 * empty states inline.
 */
export function VerificationTable({
  verifications,
  isLoading = false,
  isError = false,
  onRetry,
  onViewDetails,
  onMarkVerified,
  onMarkNeedsAttention,
  onRequestAdditional,
  onReject,
  onSuspend,
}: VerificationTableProps) {
  if (isError) {
    return (
      <div className="py-16 flex flex-col items-center text-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
          <AlertTriangle className="h-5 w-5 text-destructive" />
        </div>
        <p className="text-sm font-medium text-foreground">Couldn&apos;t load verification requests.</p>
        <p className="text-xs text-muted-foreground">Something went wrong while fetching cases.</p>
        {onRetry && (
          <Button variant="outline" size="sm" className="btn-secondary-motion mt-2" onClick={onRetry}>
            Try Again
          </Button>
        )}
      </div>
    );
  }

  if (!isLoading && verifications.length === 0) {
    return (
      <div className="py-16 flex flex-col items-center text-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
          <SearchX className="h-5 w-5 text-muted-foreground" />
        </div>
        <p className="text-sm font-medium text-foreground">No verification cases found.</p>
        <p className="text-xs text-muted-foreground">Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">User</TableHead>
          <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Role</TableHead>
          <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Type</TableHead>
          <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Signals</TableHead>
          <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Trust Score</TableHead>
          <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Submitted</TableHead>
          <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Priority</TableHead>
          <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Status</TableHead>
          <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableSkeletonRows />
        ) : (
          verifications.map((v, index) => (
            <TableRow
              key={v.id}
              className="animate-in fade-in slide-in-from-bottom-1 duration-300 fill-mode-both cursor-pointer"
              style={{ animationDelay: `${index * 40}ms` }}
              onClick={() => onViewDetails(v)}
            >
              <TableCell>
                <div className="flex items-center gap-2.5">
                  <Avatar size="sm">
                    <AvatarImage src={v.userAvatar} alt={v.userName} />
                    <AvatarFallback className="text-[10px] font-semibold bg-primary/10 text-primary">
                      {v.userName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground leading-tight">{v.userName}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">#{v.userDisplayId}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <RoleBadge role={v.role} />
              </TableCell>
              <TableCell>
                <span className="text-xs text-muted-foreground max-w-[140px] truncate block">
                  {VERIFICATION_TYPE_LABELS[v.primaryType]}
                </span>
              </TableCell>
              <TableCell>
                <VerificationSignalList signals={v.signals.slice(0, 3)} compact />
              </TableCell>
              <TableCell>
                <TrustScoreBar score={v.trustScore} />
              </TableCell>
              <TableCell>
                <span className="text-xs text-muted-foreground">{formatVerificationDate(v.submittedAt)}</span>
              </TableCell>
              <TableCell>
                <PriorityBadge priority={v.priority} />
              </TableCell>
              <TableCell>
                <VerificationStatusBadge status={v.status} />
              </TableCell>
              <TableCell onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-end">
                  <VerificationRowActions
                    verification={v}
                    onViewDetails={onViewDetails}
                    onMarkVerified={onMarkVerified}
                    onMarkNeedsAttention={onMarkNeedsAttention}
                    onRequestAdditional={onRequestAdditional}
                    onReject={onReject}
                    onSuspend={onSuspend}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}

"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { TrustScoreBar } from "./trust-score-bar";
import { VerificationBadge } from "./verification-badge";
import { AccountStatusDot } from "./account-status-dot";
import { RoleBadge } from "./role-badge";
import { UserTableRowActions } from "./user-table-row-actions";
import type { AdminUserRow } from "./types";

interface UsersTableProps {
  users: AdminUserRow[];
}

/**
 * User Management table — mirrors the reference design's column layout:
 * User (avatar + name + ID), Contact, City, Trust Score, Verification,
 * Status, Actions.
 */
export function UsersTable({ users }: UsersTableProps) {
  if (users.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-sm font-medium text-foreground">No users match these filters.</p>
        <p className="text-xs text-muted-foreground mt-1">Try adjusting or clearing your filters.</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">User</TableHead>
          <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Contact</TableHead>
          <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">City</TableHead>
          <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Trust Score</TableHead>
          <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Verification</TableHead>
          <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Status</TableHead>
          <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user, index) => (
          <TableRow
            key={user.id}
            className="animate-in fade-in slide-in-from-bottom-1 duration-300 fill-mode-both"
            style={{ animationDelay: `${index * 40}ms` }}
          >
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar size="default">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="text-xs font-semibold bg-primary/10 text-primary">
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground leading-tight">{user.name}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="text-[11px] text-muted-foreground">ID: {user.displayId}</span>
                    <RoleBadge role={user.role} />
                  </div>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <p className="text-xs text-foreground">{user.email}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{user.phone}</p>
            </TableCell>
            <TableCell>
              <span className="text-sm text-foreground">{user.city}</span>
            </TableCell>
            <TableCell>
              <TrustScoreBar score={user.trustScore} />
            </TableCell>
            <TableCell>
              <VerificationBadge state={user.verification} />
            </TableCell>
            <TableCell>
              <AccountStatusDot status={user.status} />
            </TableCell>
            <TableCell>
              <UserTableRowActions user={user} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

"use client";

import { useState } from "react";
import { Lock, Plus, Pencil, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { RoleEditorDialog } from "./role-editor-dialog";
import { useToast } from "./toast-provider";
import type { AdminRole } from "./types";

interface RolesAccessCardProps {
  roles: AdminRole[];
  onChange: (roles: AdminRole[]) => void;
}

function permissionSummary(role: AdminRole): string {
  if (role.isProtected) return "Full Access";
  if (role.permissions.length === 0) return "No Access";
  if (role.permissions.length >= 8) return "Broad Access";
  return `${role.permissions.length} Permissions`;
}

/**
 * Roles & Access Control card — role table (name, active users, permission
 * summary, actions), a Create Role button, and Edit/Delete flows. Deleting
 * requires confirmation and Super Admin can never be deleted.
 * TODO: wire to a real roles API.
 */
export function RolesAccessCard({ roles, onChange }: RolesAccessCardProps) {
  const { showToast } = useToast();
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<AdminRole | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AdminRole | null>(null);

  function handleCreate() {
    setEditingRole(null);
    setEditorOpen(true);
  }

  function handleEdit(role: AdminRole) {
    setEditingRole(role);
    setEditorOpen(true);
  }

  function handleSaveRole(role: AdminRole) {
    const exists = roles.some((r) => r.id === role.id);
    if (exists) {
      onChange(roles.map((r) => (r.id === role.id ? role : r)));
      showToast("Role updated.");
    } else {
      onChange([...roles, role]);
      showToast("Role created.");
    }
  }

  function handleConfirmDelete() {
    if (!deleteTarget) return;
    onChange(roles.filter((r) => r.id !== deleteTarget.id));
    showToast("Role deleted.", "info");
    setDeleteTarget(null);
  }

  return (
    <Card>
      <CardContent className="p-5 flex flex-col gap-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
              <Lock className="h-3.5 w-3.5 text-primary" />
            </div>
            <h3 className="text-sm font-bold text-foreground">Roles & Access Control</h3>
          </div>
          <Button size="sm" className="btn-primary-motion gap-1.5 font-semibold" onClick={handleCreate}>
            <Plus className="h-3.5 w-3.5" />
            Create Role
          </Button>
        </div>

        <div className="rounded-xl border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Role Name</TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Active Users</TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Permissions</TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                      <span className="text-sm font-medium text-foreground">{role.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">{role.activeUsers} Users</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-[11px] font-medium">
                      {permissionSummary(role)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label={`Edit ${role.name}`}
                        onClick={() => handleEdit(role)}
                      >
                        <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label={`Delete ${role.name}`}
                        disabled={role.isProtected}
                        onClick={() => setDeleteTarget(role)}
                      >
                        <Trash2 className="h-3.5 w-3.5 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      <RoleEditorDialog
        open={editorOpen}
        onOpenChange={setEditorOpen}
        role={editingRole}
        onSave={handleSaveRole}
      />

      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete &ldquo;{deleteTarget?.name}&rdquo;?</AlertDialogTitle>
            <AlertDialogDescription>
              Users currently assigned to this role will lose its permissions. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={handleConfirmDelete}
            >
              Delete Role
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}

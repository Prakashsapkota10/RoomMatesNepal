"use client";

import { useState } from "react";
import { AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ALL_PERMISSIONS, PERMISSION_LABELS } from "./constants";
import type { AdminRole, PermissionKey } from "./types";

interface RoleEditorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  role: AdminRole | null;
  onSave: (role: AdminRole) => void;
}

function emptyDraft(): AdminRole {
  return {
    id: `role-${Date.now()}`,
    name: "",
    description: "",
    activeUsers: 0,
    permissions: [],
  };
}

/**
 * Create/Edit Role modal — name, description, and a permission checkbox
 * grid. Used for both "Create Role" (role=null) and "Edit" (role set).
 * TODO: wire to a real roles API.
 */
export function RoleEditorDialog({ open, onOpenChange, role, onSave }: RoleEditorDialogProps) {
  const [draft, setDraft] = useState<AdminRole>(role ?? emptyDraft());
  const [nameError, setNameError] = useState<string | null>(null);
  const isCreateMode = !role;

  // Resync the draft whenever the dialog reopens (create or edit mode) —
  // adjusting state during render instead of an effect.
  const [prevOpen, setPrevOpen] = useState(open);
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) {
      setDraft(role ?? emptyDraft());
      setNameError(null);
    }
  }

  function togglePermission(permission: PermissionKey) {
    setDraft((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter((p) => p !== permission)
        : [...prev.permissions, permission],
    }));
  }

  function handleSave() {
    if (!draft.name.trim()) {
      setNameError("Role name cannot be empty.");
      return;
    }
    onSave(draft);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0 gap-0 h-[85vh] max-h-[720px] overflow-hidden flex flex-col">
        <DialogHeader className="px-4 pt-4 pb-2 shrink-0">
          <DialogTitle>{isCreateMode ? "Create Role" : "Edit Role"}</DialogTitle>
        </DialogHeader>

        <div className="overflow-y-auto flex-1 px-4 pb-4 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="role-name" className="text-xs text-muted-foreground font-medium">
              Role Name
            </Label>
            <Input
              id="role-name"
              value={draft.name}
              onChange={(e) => {
                setDraft({ ...draft, name: e.target.value });
                setNameError(e.target.value.trim() ? null : "Role name cannot be empty.");
              }}
              disabled={draft.isProtected}
              aria-invalid={!!nameError}
              className="h-10"
            />
            {nameError && (
              <p className="flex items-center gap-1 text-[11px] text-destructive">
                <AlertCircle className="h-3 w-3" />
                {nameError}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="role-description" className="text-xs text-muted-foreground font-medium">
              Description
            </Label>
            <Textarea
              id="role-description"
              value={draft.description}
              onChange={(e) => setDraft({ ...draft, description: e.target.value })}
              placeholder="Briefly describe what this role can do..."
              className="min-h-20"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-muted-foreground font-medium">Permissions</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {ALL_PERMISSIONS.map((permission) => (
                <label
                  key={permission}
                  className="flex items-center gap-2 rounded-lg border p-2.5 text-sm cursor-pointer hover:border-primary/40 transition-colors"
                >
                  <Checkbox
                    checked={draft.permissions.includes(permission)}
                    onCheckedChange={() => togglePermission(permission)}
                    disabled={draft.isProtected}
                  />
                  {PERMISSION_LABELS[permission]}
                </label>
              ))}
            </div>
            {draft.isProtected && (
              <p className="text-[11px] text-muted-foreground">
                Super Admin always has full access and cannot be restricted.
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 p-4 border-t bg-muted/30 shrink-0">
          <Button variant="outline" size="sm" className="btn-secondary-motion font-medium" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button size="sm" className="btn-primary-motion font-semibold" onClick={handleSave}>
            {isCreateMode ? "Create Role" : "Save Changes"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

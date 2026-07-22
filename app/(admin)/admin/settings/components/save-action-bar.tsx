"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { useToast } from "./toast-provider";

interface SaveActionBarProps {
  hasUnsavedChanges: boolean;
  isSaving: boolean;
  onSave: () => Promise<void>;
  onDiscard: () => void;
}

/**
 * Sticky bottom action bar — becomes active only when there are unsaved
 * changes. Discard requires confirmation; Save shows a loading state and a
 * success toast, then resets the unsaved-changes flag via the parent hook.
 */
export function SaveActionBar({ hasUnsavedChanges, isSaving, onSave, onDiscard }: SaveActionBarProps) {
  const { showToast } = useToast();
  const [discardConfirmOpen, setDiscardConfirmOpen] = useState(false);

  function handleDiscardClick() {
    if (!hasUnsavedChanges) return;
    setDiscardConfirmOpen(true);
  }

  function handleConfirmDiscard() {
    onDiscard();
    setDiscardConfirmOpen(false);
    showToast("Changes discarded.", "info");
  }

  async function handleSaveClick() {
    if (!hasUnsavedChanges || isSaving) return;
    await onSave();
    showToast("All settings saved successfully.");
  }

  return (
    <>
      <div className="sticky bottom-0 -mx-4 lg:-mx-6 mt-2 border-t bg-background/95 backdrop-blur-sm px-4 lg:px-6 py-3 flex items-center justify-end gap-2 z-10">
        <span className="text-xs text-muted-foreground mr-auto">
          {hasUnsavedChanges ? "You have unsaved changes." : "All changes saved."}
        </span>
        <Button
          variant="outline"
          size="sm"
          className="btn-secondary-motion font-medium"
          disabled={!hasUnsavedChanges || isSaving}
          onClick={handleDiscardClick}
        >
          Discard Changes
        </Button>
        <Button
          size="sm"
          className="btn-primary-motion font-semibold"
          disabled={!hasUnsavedChanges || isSaving}
          onClick={handleSaveClick}
        >
          {isSaving ? "Saving..." : "Save All Settings"}
        </Button>
      </div>

      <AlertDialog open={discardConfirmOpen} onOpenChange={setDiscardConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Discard all unsaved changes?</AlertDialogTitle>
            <AlertDialogDescription>
              This will restore every setting on this page back to its last saved state.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={handleConfirmDiscard}
            >
              Discard Changes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

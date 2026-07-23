"use client";

import { useState } from "react";
import { AlertTriangle, Download, Database, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DeleteTestDataDialog } from "./delete-test-data-dialog";
import { ResetPlatformDialog } from "./reset-platform-dialog";
import { useToast } from "@/components/admin/toast-provider";

/**
 * Danger Zone card — visually distinct red-tinted card for irreversible
 * data-governance actions: download backup (simulated), delete test data
 * (typed confirmation), and reset platform data (multi-step confirmation).
 * TODO: wire "Download Database Backup" to a real export endpoint if one exists.
 */
export function DangerZoneCard() {
  const { showToast } = useToast();
  const [isDownloading, setIsDownloading] = useState(false);
  const [deleteTestDataOpen, setDeleteTestDataOpen] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);

  function handleDownloadBackup() {
    setIsDownloading(true);
    // Simulated backup preparation — TODO: replace with a real export call.
    setTimeout(() => {
      setIsDownloading(false);
      showToast("Database backup prepared successfully.");
    }, 900);
  }

  return (
    <Card className="border-destructive/30 bg-destructive/5">
      <CardContent className="p-5 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-destructive/10">
            <AlertTriangle className="h-3.5 w-3.5 text-destructive" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-destructive">Danger Zone</h3>
            <p className="text-xs text-muted-foreground">
              Irreversible actions related to data governance. Proceed with extreme caution.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Button
            variant="outline"
            size="sm"
            className="btn-secondary-motion gap-1.5 font-medium justify-center border-destructive/30 text-destructive hover:bg-destructive/10"
            disabled={isDownloading}
            onClick={handleDownloadBackup}
          >
            <Download className="h-3.5 w-3.5" />
            {isDownloading ? "Preparing..." : "Download Database Backup"}
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="btn-secondary-motion gap-1.5 font-medium justify-center border-destructive/30 text-destructive hover:bg-destructive/10"
            onClick={() => setDeleteTestDataOpen(true)}
          >
            <Database className="h-3.5 w-3.5" />
            Delete Test Data
          </Button>

          <Button
            variant="destructive"
            size="sm"
            className="gap-1.5 font-semibold justify-center"
            onClick={() => setResetOpen(true)}
          >
            <Trash2 className="h-3.5 w-3.5" />
            Reset Platform Data
          </Button>
        </div>
      </CardContent>

      <DeleteTestDataDialog open={deleteTestDataOpen} onOpenChange={setDeleteTestDataOpen} />
      <ResetPlatformDialog open={resetOpen} onOpenChange={setResetOpen} />
    </Card>
  );
}

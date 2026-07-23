"use client";

import { useState } from "react";
import { Wrench, RefreshCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress, ProgressTrack, ProgressIndicator } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
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
import { useToast } from "@/components/admin/toast-provider";
import type { PlatformSettings } from "./types";

interface MaintenanceCardProps {
  value: PlatformSettings["maintenance"];
  onChange: (value: PlatformSettings["maintenance"]) => void;
}

/**
 * Maintenance card — last backup status, database load, purge cache
 * (with confirmation + loading + toast), and maintenance mode toggle
 * (with confirmation and active-state indicator).
 * TODO: wire to real backup/cache/maintenance-mode APIs.
 */
export function MaintenanceCard({ value, onChange }: MaintenanceCardProps) {
  const { showToast } = useToast();
  const [purgeConfirmOpen, setPurgeConfirmOpen] = useState(false);
  const [maintenanceConfirmOpen, setMaintenanceConfirmOpen] = useState(false);
  const [isPurging, setIsPurging] = useState(false);

  function handlePurgeConfirmed() {
    setPurgeConfirmOpen(false);
    setIsPurging(true);
    // Simulated cache purge — TODO: replace with a real cache-purge API call.
    setTimeout(() => {
      setIsPurging(false);
      showToast("System cache purged successfully.");
    }, 900);
  }

  function handleMaintenanceConfirmed() {
    const next = !value.maintenanceModeEnabled;
    onChange({ ...value, maintenanceModeEnabled: next });
    setMaintenanceConfirmOpen(false);
    showToast(next ? "Maintenance mode enabled." : "Maintenance mode disabled.");
  }

  return (
    <Card>
      <CardContent className="p-5 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
            <Wrench className="h-3.5 w-3.5 text-primary" />
          </div>
          <h3 className="text-sm font-bold text-foreground">Maintenance</h3>
        </div>

        <div className="flex items-center justify-between gap-3 rounded-lg border p-3">
          <span className="text-sm font-medium text-foreground">Last System Backup</span>
          <span className="text-xs text-muted-foreground">{value.lastBackupLabel}</span>
        </div>

        <div className="flex flex-col gap-1.5 rounded-lg border p-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Database Load</span>
            <span className="text-xs text-muted-foreground tabular-nums">{value.databaseLoadPercent}%</span>
          </div>
          <Progress value={value.databaseLoadPercent}>
            <ProgressTrack className="h-1.5">
              <ProgressIndicator />
            </ProgressTrack>
          </Progress>
        </div>

        {value.maintenanceModeEnabled && (
          <div className="flex items-center gap-2 rounded-lg bg-[color:var(--warning-light)] px-3 py-2">
            <Badge className="bg-[color:var(--warning)] text-white text-[10px] font-semibold border-0">
              ACTIVE
            </Badge>
            <span className="text-xs font-medium text-[color:var(--warning-dark)]">
              Maintenance mode is currently enabled — users may be unable to access the platform.
            </span>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <Button
            variant="outline"
            size="sm"
            className="btn-secondary-motion gap-1.5 font-medium justify-center"
            disabled={isPurging}
            onClick={() => setPurgeConfirmOpen(true)}
          >
            <RefreshCw className={isPurging ? "h-3.5 w-3.5 animate-spin" : "h-3.5 w-3.5"} />
            {isPurging ? "Purging..." : "Purge System Cache"}
          </Button>
          <Button
            variant={value.maintenanceModeEnabled ? "destructive" : "outline"}
            size="sm"
            className={value.maintenanceModeEnabled ? "font-semibold justify-center" : "btn-secondary-motion font-medium justify-center"}
            onClick={() => setMaintenanceConfirmOpen(true)}
          >
            {value.maintenanceModeEnabled ? "Exit Maintenance Mode" : "Enter Maintenance Mode"}
          </Button>
        </div>
      </CardContent>

      {/* Purge cache confirmation */}
      <AlertDialog open={purgeConfirmOpen} onOpenChange={setPurgeConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Purge System Cache?</AlertDialogTitle>
            <AlertDialogDescription>
              This clears cached platform data. Some pages may load slightly slower immediately afterward.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handlePurgeConfirmed}>Purge Cache</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Maintenance mode confirmation */}
      <AlertDialog open={maintenanceConfirmOpen} onOpenChange={setMaintenanceConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {value.maintenanceModeEnabled ? "Exit Maintenance Mode?" : "Enter Maintenance Mode?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {value.maintenanceModeEnabled
                ? "The platform will become accessible to all users again."
                : "Users may be temporarily unable to access the platform."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className={value.maintenanceModeEnabled ? undefined : "bg-[color:var(--warning)] text-white hover:bg-[color:var(--warning)]/90"}
              onClick={handleMaintenanceConfirmed}
            >
              {value.maintenanceModeEnabled ? "Exit Maintenance Mode" : "Enable Maintenance Mode"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}

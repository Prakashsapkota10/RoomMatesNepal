"use client";

import { Info, AlertTriangle, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AnnouncementPriority } from "./types";

const CONFIG: Record<AnnouncementPriority, { icon: typeof Info; color: string; label: string }> = {
  info: { icon: Info, color: "text-[color:var(--trust)]", label: "Info" },
  warning: { icon: AlertTriangle, color: "text-[color:var(--warning-dark)]", label: "Warning" },
  critical: { icon: ShieldAlert, color: "text-destructive", label: "Critical" },
};

/** Small icon + label indicating an announcement's priority level. */
export function PriorityIndicator({ priority }: { priority: AnnouncementPriority }) {
  const { icon: Icon, color, label } = CONFIG[priority];
  return (
    <span className={cn("flex items-center gap-1 text-xs font-medium", color)}>
      <Icon className="h-3.5 w-3.5" />
      {label}
    </span>
  );
}

"use client";

import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ModerationMiniStat as ModerationMiniStatData } from "./types";

/**
 * Small stat tile used inside the Moderation Performance card — icon,
 * value, label, and a colored note line (e.g. trend or priority callout).
 */
export function ModerationMiniStat({
  label,
  value,
  note,
  noteColor,
  icon,
  iconColor,
  iconBg,
}: ModerationMiniStatData) {
  const Icon = (Icons as unknown as Record<string, LucideIcon>)[icon];

  return (
    <div className="rounded-xl bg-muted/60 p-3.5">
      <div className={cn("flex h-7 w-7 items-center justify-center rounded-lg shrink-0 mb-2", iconBg)}>
        {Icon && <Icon className={cn("h-3.5 w-3.5", iconColor)} />}
      </div>
      <p className="text-[11px] text-muted-foreground font-medium">{label}</p>
      <p className="text-lg font-bold text-foreground mt-0.5">{value}</p>
      <p className={cn("text-[11px] font-medium mt-1", noteColor)}>{note}</p>
    </div>
  );
}

"use client";

import Link from "next/link";
import * as Icons from "lucide-react";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress, ProgressTrack, ProgressIndicator } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export interface PendingAction {
  id: string;
  label: string;
  count: number;
  /** lucide-react icon name, e.g. "ShieldCheck" — resolved client-side to
   *  avoid passing non-serializable component references across the RSC boundary. */
  icon: string;
  iconColor: string;
  iconBg: string;
  progress: number;
  note: string;
  href: string;
}

interface PendingActionsProps {
  actions: PendingAction[];
}

/**
 * Pending Actions panel — highlights queues that need admin attention
 * (verification requests, reported content, etc.) with a progress indicator.
 * TODO: replace with real queue counts/SLA data from backend.
 */
export function PendingActions({ actions }: PendingActionsProps) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-bold text-foreground">Pending Actions</h3>
      {actions.map((action) => {
        const Icon = (Icons as unknown as Record<string, LucideIcon>)[action.icon];
        return (
          <Link key={action.id} href={action.href}>
            <Card className="card-dashboard">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg shrink-0", action.iconBg)}>
                    {Icon && <Icon className={cn("h-4.5 w-4.5", action.iconColor)} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-semibold text-foreground leading-snug">
                        {action.label}
                      </p>
                      <span className="text-lg font-bold text-foreground shrink-0">
                        {action.count}
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-0.5">Action Required</p>
                    <Progress value={action.progress} className="mt-2.5">
                      <ProgressTrack className="h-1.5">
                        <ProgressIndicator />
                      </ProgressTrack>
                    </Progress>
                    <div className="flex items-center justify-between mt-1.5">
                      <span className="text-[11px] text-muted-foreground">{action.note}</span>
                      <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}

"use client";

import { Check } from "lucide-react";
import { formatSubscriptionDateTime } from "./subscription.utils";
import type { SubscriptionHistoryStep } from "./types";

/**
 * Vertical subscription lifecycle timeline shown in the detail drawer.
 * Data-driven — each row only carries the events that actually happened to
 * it (started, renewed, plan changed, payment failed, cancelled, ...).
 */
export function SubscriptionTimeline({ steps }: { steps: SubscriptionHistoryStep[] }) {
  if (steps.length === 0) {
    return <p className="text-xs text-muted-foreground">No subscription history yet.</p>;
  }

  return (
    <ol className="flex flex-col">
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        return (
          <li key={`${step.label}-${step.timestamp}`} className="relative flex gap-3 pb-5 last:pb-0">
            {!isLast && (
              <span
                className="absolute left-[9px] top-5 bottom-0 w-px bg-[color:var(--success)]/40"
                aria-hidden="true"
              />
            )}
            <span className="relative z-10 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-[color:var(--success)] text-white mt-0.5">
              <Check className="h-2.5 w-2.5" strokeWidth={3} />
            </span>
            <div className="min-w-0 pt-0.5">
              <p className="text-sm font-semibold leading-tight text-foreground">{step.label}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                {formatSubscriptionDateTime(step.timestamp)}
                {step.actor && <span> · {step.actor}</span>}
              </p>
              {step.detail && <p className="text-xs text-muted-foreground mt-1">{step.detail}</p>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

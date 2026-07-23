"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPaymentDate } from "./payment.utils";
import type { PaymentTimelineStep } from "./types";

/**
 * Vertical payment timeline shown in the detail drawer. Data-driven — each
 * payment row only carries the steps that actually apply to it (see
 * mock-payments.ts), so a subscription never shows rent-specific steps and
 * a rent payment never shows deposit-specific steps. Future/inapplicable
 * steps are simply absent rather than rendered as disabled placeholders.
 */
export function PaymentTimeline({ steps }: { steps: PaymentTimelineStep[] }) {
  if (steps.length === 0) return null;

  return (
    <ol className="flex flex-col">
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        return (
          <li key={step.label} className="relative flex gap-3 pb-5 last:pb-0">
            {!isLast && (
              <span
                className={cn(
                  "absolute left-[9px] top-5 bottom-0 w-px",
                  step.completed ? "bg-[color:var(--success)]/40" : "bg-border"
                )}
                aria-hidden="true"
              />
            )}
            <span
              className={cn(
                "relative z-10 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full mt-0.5",
                step.completed ? "bg-[color:var(--success)] text-white" : "bg-muted border border-border"
              )}
            >
              {step.completed && <Check className="h-2.5 w-2.5" strokeWidth={3} />}
            </span>
            <div className="min-w-0 pt-0.5">
              <p
                className={cn(
                  "text-sm font-semibold leading-tight",
                  step.completed ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {step.label}
              </p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{formatPaymentDate(step.timestamp)}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

"use client";

import { Check } from "lucide-react";
import { PLAN_CATALOG } from "./constants";
import type { PlanId } from "./types";

/**
 * Feature list for the subscriber's current plan — entirely data-driven
 * from PLAN_CATALOG, so each plan's features render correctly without any
 * per-plan conditional markup here.
 */
export function PlanFeatures({ planId }: { planId: PlanId }) {
  const plan = PLAN_CATALOG[planId];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {plan.features.map((feature) => (
        <div key={feature} className="flex items-center gap-2 rounded-lg border px-2.5 py-2 text-xs text-foreground">
          <Check className="h-3.5 w-3.5 text-[color:var(--success)] shrink-0" />
          <span className="truncate">{feature}</span>
        </div>
      ))}
    </div>
  );
}

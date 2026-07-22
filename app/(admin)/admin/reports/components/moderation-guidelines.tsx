"use client";

import { ShieldAlert, Lock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const GUIDELINES = [
  {
    icon: ShieldAlert,
    title: "Enforcement Policy",
    description: "Three warnings lead to a mandatory 48-hour suspension. Extreme harassment is immediate permanent ban.",
    accent: "text-primary bg-primary/10",
  },
  {
    icon: Lock,
    title: "Privacy Rules",
    description: "Never share reporter identity with the reported user. Scrub sensitive metadata from evidence images.",
    accent: "text-[color:var(--community-dark)] bg-[color:var(--community-light)]",
  },
];

/** Reference cards summarizing moderation policy for the reports queue. */
export function ModerationGuidelines() {
  return (
    <Card>
      <CardContent className="p-5">
        <h3 className="text-sm font-bold text-foreground mb-4">Moderation Guidelines</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {GUIDELINES.map(({ icon: Icon, title, description, accent }) => (
            <div key={title} className="rounded-xl border p-3.5">
              <div className="flex items-center gap-2 mb-1.5">
                <div className={`flex h-6 w-6 items-center justify-center rounded-md shrink-0 ${accent}`}>
                  <Icon className="h-3.5 w-3.5" />
                </div>
                <p className="text-xs font-semibold text-foreground">{title}</p>
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

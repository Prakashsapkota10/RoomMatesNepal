"use client";

import { ShieldCheck, MapPin, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// ─── Mock boost tips — TODO: Replace with real tips from backend ──────────────

const BOOST_TIPS = [
  {
    id: "verify",
    icon: ShieldCheck,
    title: "Verify Identity",
    description: "Complete your KYC to unlock premium roommates.",
    points: 15,
  },
  {
    id: "location",
    icon: MapPin,
    title: "Expand Location",
    description: "Add areas like Jhamsikhel or Baluwatar.",
    points: 8,
  },
  {
    id: "schedule",
    icon: Calendar,
    title: "Sync Schedule",
    description: "Connect calendar for wake/sleep alignment.",
    points: 5,
  },
];

/**
 * Boost Match Score card — actionable tips to improve AI match quality.
 * TODO: Replace with personalized suggestions from backend.
 */
export function BoostMatchScore() {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-base font-bold text-foreground">Boost Match Score</h3>

      <div className="flex flex-col gap-3">
        {BOOST_TIPS.map((tip) => {
          const Icon = tip.icon;
          return (
            <Card key={tip.id} className="card-dashboard">
              <CardContent className="p-4 flex items-start gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-foreground">{tip.title}</p>
                    <span className="text-xs font-bold text-success shrink-0">+{tip.points} pts</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{tip.description}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Button className="w-full btn-primary-motion font-semibold rounded-lg">
        Optimize Profile
      </Button>
    </div>
  );
}

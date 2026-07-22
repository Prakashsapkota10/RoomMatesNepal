"use client";

import { useState } from "react";
import { Megaphone, Monitor, Smartphone, ShieldAlert, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ComposerState } from "./announcement-composer";

interface LivePreviewPanelProps {
  value: ComposerState;
}

const PRIORITY_ACCENT: Record<ComposerState["priority"], string> = {
  info: "bg-primary",
  warning: "bg-[color:var(--warning)]",
  critical: "bg-destructive",
};

const PRIORITY_ICON: Record<ComposerState["priority"], typeof Megaphone> = {
  info: Megaphone,
  warning: AlertTriangle,
  critical: ShieldAlert,
};

/**
 * Live Preview — Desktop/Mobile toggle showing how the in-app announcement
 * banner will render for end users as the admin types, mirroring the
 * reference design's preview panel.
 */
export function LivePreviewPanel({ value }: LivePreviewPanelProps) {
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const Icon = PRIORITY_ICON[value.priority];

  return (
    <div className="flex flex-col gap-3 lg:sticky lg:top-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-foreground">Live Preview</h3>
        <div className="flex items-center rounded-lg border p-0.5">
          <Button
            variant={device === "desktop" ? "default" : "ghost"}
            size="xs"
            onClick={() => setDevice("desktop")}
            className={cn("gap-1 text-xs h-7", device === "desktop" && "btn-primary-motion")}
          >
            <Monitor className="h-3.5 w-3.5" />
            Desktop
          </Button>
          <Button
            variant={device === "mobile" ? "default" : "ghost"}
            size="xs"
            onClick={() => setDevice("mobile")}
            className={cn("gap-1 text-xs h-7", device === "mobile" && "btn-primary-motion")}
          >
            <Smartphone className="h-3.5 w-3.5" />
            Mobile
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className={cn("h-1.5 w-full", PRIORITY_ACCENT[value.priority])} />
          <div className={cn("flex flex-col items-center text-center p-6", device === "mobile" && "px-4")}>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-4">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <h4 className={cn("font-bold text-foreground mb-2", device === "mobile" ? "text-base" : "text-lg")}>
              {value.title || "Your Title Here"}
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              {value.body ||
                "The content of your announcement will appear here as you type. Start sharing your update with the community."}
            </p>
            <Button className="w-full btn-primary-motion font-semibold">Acknowledge &amp; Continue</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

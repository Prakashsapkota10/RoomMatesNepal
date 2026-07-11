"use client";

import { MessageSquare, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AIAssistantCard() {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-primary to-primary/80 p-5 text-white">
      <div className="flex items-center gap-2 mb-2">
        <h3 className="text-base font-bold">AI Assistant</h3>
        <Zap className="h-4 w-4" />
      </div>
      <p className="text-xs text-white/80 mb-4 leading-relaxed">
        Instant help with rental laws, roommate matching, or scam detection.
      </p>

      <div className="flex flex-col gap-2">
        <Button
          variant="secondary"
          className="w-full gap-2 rounded-lg text-sm font-semibold bg-white/20 text-white border-0 hover:bg-white/30"
        >
          <MessageSquare className="h-4 w-4" />
          Ask AI
        </Button>
        <Button
          className="w-full gap-2 rounded-lg text-sm font-semibold bg-red-500 text-white border-0 hover:bg-red-600"
        >
          <Shield className="h-4 w-4" />
          Detect Rental Scam
        </Button>
      </div>
    </div>
  );
}

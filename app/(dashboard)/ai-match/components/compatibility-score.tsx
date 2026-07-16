"use client";

import { CheckCircle2, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";

/**
 * AI Compatibility Core — large circular score ring with description and badges.
 * TODO: Replace score with real AI-computed value from backend.
 */
export function CompatibilityScore() {
  // TODO: Fetch from backend
  const score = 84;

  // SVG circle calculations
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col sm:flex-row items-center gap-8 p-6 rounded-2xl bg-muted/30">
      {/* Score Ring */}
      <div className="relative shrink-0">
        <svg width="200" height="200" viewBox="0 0 200 200" className="-rotate-90">
          {/* Background circle */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="12"
            className="text-muted"
          />
          {/* Gradient ring */}
          <defs>
            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#14B8A6" />
              <stop offset="50%" stopColor="#1554D1" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="url(#scoreGradient)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-black text-foreground">{score}</span>
          <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold mt-1">
            Match Quality
          </span>
        </div>
      </div>

      {/* Description */}
      <div className="flex-1 text-center sm:text-left">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
          Your AI Compatibility Core
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
          Our neural engine has analyzed your living habits, financial reliability,
          and social temperament against the Kathmandu rental market.
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          <Badge variant="outline" className="gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full">
            <CheckCircle2 className="h-3.5 w-3.5 text-success" />
            Lifestyle Synced
          </Badge>
          <Badge variant="outline" className="gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full">
            <Wallet className="h-3.5 w-3.5 text-primary" />
            Budget Aligned
          </Badge>
        </div>
      </div>
    </div>
  );
}

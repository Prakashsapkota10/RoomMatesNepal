"use client";

import { Progress, ProgressTrack, ProgressIndicator } from "@/components/ui/progress";
import { TRUST_BREAKDOWN_WEIGHTS } from "./types";
import type { TrustScoreBreakdown as TrustScoreBreakdownType } from "./types";

const FACTOR_LABELS: Record<keyof TrustScoreBreakdownType, string> = {
  profileCompleteness: "Profile Completeness",
  contactVerification: "Contact Verification",
  accountHistory: "Account History",
  reviewsRatings: "Reviews & Ratings",
  communitySafety: "Community Safety",
};

const FACTOR_ORDER: (keyof TrustScoreBreakdownType)[] = [
  "profileCompleteness",
  "contactVerification",
  "accountHistory",
  "reviewsRatings",
  "communitySafety",
];

/**
 * Explainable trust score factors — each shown with its own progress bar,
 * percentage, and the weight it contributes to the total score. This is
 * the "why" behind the number in TrustScoreCard; there is no black-box
 * AI percentage anywhere in this feature.
 */
export function TrustScoreBreakdown({ breakdown }: { breakdown: TrustScoreBreakdownType }) {
  return (
    <div className="flex flex-col gap-3">
      {FACTOR_ORDER.map((key) => (
        <div key={key} className="flex flex-col gap-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-foreground font-medium">{FACTOR_LABELS[key]}</span>
            <span className="text-muted-foreground">
              {breakdown[key]}%{" "}
              <span className="text-muted-foreground/60">(weight {TRUST_BREAKDOWN_WEIGHTS[key]}%)</span>
            </span>
          </div>
          <Progress value={breakdown[key]}>
            <ProgressTrack className="h-1.5">
              <ProgressIndicator />
            </ProgressTrack>
          </Progress>
        </div>
      ))}
    </div>
  );
}

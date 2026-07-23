"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { RoleBadge } from "../../users/components/role-badge";
import { VerificationStatusBadge } from "./verification-status-badge";
import { TrustScoreCard } from "./trust-score-card";
import { TrustScoreBreakdown } from "./trust-score-breakdown";
import { VerificationSignalList } from "./verification-signal-list";
import { VerificationTimeline } from "./verification-timeline";
import { SafetyActivitySummary } from "./safety-activity-summary";
import { ReviewNotes } from "./review-notes";
import { formatVerificationDate } from "./verification.utils";
import type { VerificationRow } from "./types";

interface VerificationDetailDrawerProps {
  verification: VerificationRow | null;
  onOpenChange: (open: boolean) => void;
  onAddNote: (verificationId: string, message: string) => void;
  onMarkVerified: (verification: VerificationRow) => void;
  onMarkNeedsAttention: (verification: VerificationRow) => void;
  onRequestAdditional: (verification: VerificationRow) => void;
  onReject: (verification: VerificationRow) => void;
  onSuspend: (verification: VerificationRow) => void;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-2">{children}</p>
  );
}

function ChannelRow({ label, status }: { label: string; status: string }) {
  const isGood = status === "verified" || status === "complete";
  const isBad = status === "failed" || status === "rejected" || status === "suspended";
  const color = isGood ? "text-[color:var(--success-dark)]" : isBad ? "text-destructive" : "text-[color:var(--warning-dark)]";
  const display = status.replace(/_/g, " ").replace(/^./, (c) => c.toUpperCase());
  return (
    <div className="flex items-center justify-between py-1.5">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className={`text-sm font-medium ${color}`}>{display}</span>
    </div>
  );
}

/**
 * Right-side verification detail drawer for /admin/verifications. Every
 * section here is built from account/contact/activity/review signals —
 * there is deliberately no document viewer, selfie preview, or face-match
 * score anywhere in this component.
 */
export function VerificationDetailDrawer({
  verification,
  onOpenChange,
  onAddNote,
  onMarkVerified,
  onMarkNeedsAttention,
  onRequestAdditional,
  onReject,
  onSuspend,
}: VerificationDetailDrawerProps) {
  return (
    <Sheet open={!!verification} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md p-0 gap-0 flex flex-col">
        {verification && (
          <>
            <SheetHeader className="px-4 pt-4 pb-3 border-b shrink-0">
              <SheetTitle>Verification Details</SheetTitle>
            </SheetHeader>

            <div className="overflow-y-auto flex-1">
              {/* User summary */}
              <div className="flex flex-col items-center gap-2 px-4 pt-6 pb-5 border-b text-center">
                <Avatar size="lg">
                  <AvatarImage src={verification.userAvatar} alt={verification.userName} />
                  <AvatarFallback className="text-sm font-semibold bg-primary/10 text-primary">
                    {verification.userName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <p className="text-base font-bold text-foreground mt-1">{verification.userName}</p>
                <div className="flex items-center gap-1.5">
                  <RoleBadge role={verification.role} />
                  <VerificationStatusBadge status={verification.status} />
                </div>
                <p className="text-xs text-muted-foreground">
                  Member since {formatVerificationDate(verification.memberSince)}
                </p>
                <p className="text-[11px] text-muted-foreground">User ID: #{verification.userDisplayId}</p>
              </div>

              <div className="p-4 flex flex-col gap-5">
                {/* Trust score */}
                <div>
                  <SectionLabel>Trust Score</SectionLabel>
                  <TrustScoreCard score={verification.trustScore} summary={verification.trustScoreSummary} />
                </div>

                {/* Verification status */}
                <div>
                  <SectionLabel>Verification Status</SectionLabel>
                  <div className="rounded-xl border p-3">
                    <ChannelRow label="Email" status={verification.channels.email} />
                    <ChannelRow label="Phone" status={verification.channels.phone} />
                    <ChannelRow label="Profile" status={verification.channels.profile} />
                    <ChannelRow label="Manual Review" status={verification.channels.manualReview} />
                  </div>
                </div>

                {/* Trust signals */}
                <div>
                  <SectionLabel>Trust Signals</SectionLabel>
                  <div className="rounded-xl border p-3.5">
                    <TrustScoreBreakdown breakdown={verification.trustBreakdown} />
                  </div>
                </div>

                {/* Verification signals */}
                <div>
                  <SectionLabel>Verification Signals</SectionLabel>
                  <VerificationSignalList signals={verification.signals} />
                </div>

                {/* Safety & activity summary */}
                <div>
                  <SectionLabel>Safety &amp; Activity Summary</SectionLabel>
                  <SafetyActivitySummary summary={verification.safety} userDisplayId={verification.userDisplayId} />
                </div>

                {/* Verification history */}
                <div>
                  <SectionLabel>Verification History</SectionLabel>
                  <div className="rounded-xl border p-3.5">
                    <VerificationTimeline steps={verification.history} />
                  </div>
                </div>

                {/* Internal review notes */}
                <div>
                  <SectionLabel>Internal Review Notes</SectionLabel>
                  <ReviewNotes
                    notes={verification.notes}
                    onAddNote={(message) => onAddNote(verification.id, message)}
                  />
                </div>
              </div>
            </div>

            {/* Context-aware admin actions */}
            <SheetFooter className="flex-row flex-wrap gap-2 p-4 border-t bg-muted/30 shrink-0">
              {(verification.status === "pending" ||
                verification.status === "under_review" ||
                verification.status === "needs_attention") && (
                <Button
                  className="flex-1 btn-primary-motion gap-1.5 font-semibold min-w-[calc(50%-0.25rem)]"
                  onClick={() => onMarkVerified(verification)}
                >
                  Mark as Verified
                </Button>
              )}
              {verification.status !== "needs_attention" &&
                verification.status !== "suspended" &&
                verification.status !== "rejected" && (
                  <Button
                    variant="outline"
                    className="flex-1 btn-secondary-motion gap-1.5 font-semibold min-w-[calc(50%-0.25rem)]"
                    onClick={() => onMarkNeedsAttention(verification)}
                  >
                    Needs Attention
                  </Button>
                )}
              {(verification.status === "pending" ||
                verification.status === "under_review" ||
                verification.status === "needs_attention") && (
                <Button
                  variant="outline"
                  className="flex-1 btn-secondary-motion gap-1.5 font-medium min-w-[calc(50%-0.25rem)]"
                  onClick={() => onRequestAdditional(verification)}
                >
                  Request Additional Verification
                </Button>
              )}
              {(verification.status === "pending" ||
                verification.status === "under_review" ||
                verification.status === "needs_attention") && (
                <Button
                  variant="outline"
                  className="flex-1 btn-secondary-motion gap-1.5 font-semibold border-destructive/40 text-destructive hover:bg-destructive/10 min-w-[calc(50%-0.25rem)]"
                  onClick={() => onReject(verification)}
                >
                  Reject Verification
                </Button>
              )}
              {verification.status !== "suspended" && (
                <Button
                  variant="destructive"
                  className="flex-1 gap-1.5 font-semibold min-w-[calc(50%-0.25rem)]"
                  onClick={() => onSuspend(verification)}
                >
                  Suspend Account
                </Button>
              )}
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

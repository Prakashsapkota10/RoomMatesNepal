"use client";

import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  User,
  FileText,
  MessageSquare,
  Star,
  Lock,
  Smartphone,
  Mail,
  Award,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const TRUST_SCORE = 72;
const MAX_SCORE = 100;

const SCORE_BREAKDOWN = [
  { label: "Profile Completed", points: 15, maxPoints: 15, completed: true, icon: User },
  { label: "Email Verified", points: 10, maxPoints: 10, completed: true, icon: Mail },
  { label: "Phone Verified", points: 10, maxPoints: 10, completed: true, icon: Smartphone },
  { label: "ID Document Uploaded", points: 15, maxPoints: 15, completed: true, icon: FileText },
  { label: "Active for 30+ Days", points: 10, maxPoints: 10, completed: true, icon: TrendingUp },
  { label: "5+ Messages Sent", points: 7, maxPoints: 10, completed: false, icon: MessageSquare },
  { label: "Received 3+ Reviews", points: 5, maxPoints: 15, completed: false, icon: Star },
  { label: "2FA Enabled", points: 0, maxPoints: 10, completed: false, icon: Lock },
  { label: "Linked Social Account", points: 0, maxPoints: 5, completed: false, icon: Award },
];

const RECENT_ACTIVITY = [
  { action: "Email verified", date: "2 weeks ago", positive: true },
  { action: "Profile photo uploaded", date: "3 weeks ago", positive: true },
  { action: "Citizenship document submitted", date: "1 month ago", positive: true },
  { action: "Phone number verified", date: "1 month ago", positive: true },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getScoreColor(score: number) {
  if (score >= 80) return "text-[color:var(--success)]";
  if (score >= 60) return "text-[color:var(--trust)]";
  if (score >= 40) return "text-[color:var(--warning)]";
  return "text-[color:var(--error)]";
}

function getScoreBg(score: number) {
  if (score >= 80) return "bg-[color:var(--success)]";
  if (score >= 60) return "bg-[color:var(--trust)]";
  if (score >= 40) return "bg-[color:var(--warning)]";
  return "bg-[color:var(--error)]";
}

function getScoreLabel(score: number) {
  if (score >= 80) return "Excellent";
  if (score >= 60) return "Good";
  if (score >= 40) return "Fair";
  return "Needs Improvement";
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function TrustScorePage() {
  const percentage = Math.round((TRUST_SCORE / MAX_SCORE) * 100);
  const circumference = 2 * Math.PI * 54;
  const dashOffset = circumference - (circumference * percentage) / 100;

  return (
    <div className="flex flex-col gap-6 page-enter max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Trust Score</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Your trust score reflects how verified and trustworthy your profile appears to others.
        </p>
      </div>

      {/* Score Overview Card */}
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center gap-8">
            {/* Circular Score Ring */}
            <div className="relative flex items-center justify-center shrink-0">
              <svg width="140" height="140" viewBox="0 0 120 120" className="-rotate-90">
                {/* Track */}
                <circle cx="60" cy="60" r="54" fill="none" strokeWidth="8" className="stroke-muted/30" />
                {/* Progress */}
                <circle
                  cx="60" cy="60" r="54"
                  fill="none"
                  strokeWidth="8"
                  strokeLinecap="round"
                  className={cn("transition-all duration-1000", getScoreColor(TRUST_SCORE).replace("text-", "stroke-"))}
                  style={{
                    strokeDasharray: circumference,
                    strokeDashoffset: dashOffset,
                    stroke: TRUST_SCORE >= 80 ? "var(--success)" : TRUST_SCORE >= 60 ? "var(--trust)" : TRUST_SCORE >= 40 ? "var(--warning)" : "var(--error)",
                  }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={cn("text-3xl font-extrabold", getScoreColor(TRUST_SCORE))}>{TRUST_SCORE}</span>
                <span className="text-xs text-muted-foreground">/ {MAX_SCORE}</span>
              </div>
            </div>

            {/* Score Summary */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center gap-2 justify-center sm:justify-start mb-2">
                <Badge className={cn("gap-1", getScoreBg(TRUST_SCORE), "text-white")}>
                  <ShieldCheck className="h-3 w-3" />
                  {getScoreLabel(TRUST_SCORE)}
                </Badge>
              </div>
              <h2 className="text-lg font-bold mb-1">Your Trust Score is {TRUST_SCORE}/100</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Complete more verifications to increase your score and build trust with potential roommates.
              </p>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <Button size="sm" className="btn-primary-motion gap-1.5 rounded-lg font-medium">
                  <TrendingUp className="h-3.5 w-3.5" />
                  Improve Score
                </Button>
                <Button size="sm" variant="outline" className="btn-secondary-motion gap-1.5 rounded-lg font-medium">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Verify Identity
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Score Breakdown */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-bold text-base mb-4">Score Breakdown</h3>
          <div className="flex flex-col gap-3">
            {SCORE_BREAKDOWN.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 rounded-xl border p-3 transition-colors hover:bg-muted/30"
              >
                {/* Icon */}
                <div className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-lg shrink-0",
                  item.completed ? "bg-[color:var(--success-light)]" : "bg-muted"
                )}>
                  <item.icon className={cn("h-4 w-4", item.completed ? "text-[color:var(--success)]" : "text-muted-foreground")} />
                </div>

                {/* Label + Status */}
                <div className="flex-1 min-w-0">
                  <p className={cn("text-sm font-medium", item.completed ? "text-foreground" : "text-muted-foreground")}>
                    {item.label}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {item.points}/{item.maxPoints} points
                  </p>
                </div>

                {/* Progress bar */}
                <div className="w-20 hidden sm:block">
                  <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className={cn("h-full rounded-full", item.completed ? "bg-[color:var(--success)]" : "bg-[color:var(--warning)]")}
                      style={{ width: `${(item.points / item.maxPoints) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Status badge */}
                {item.completed ? (
                  <CheckCircle2 className="h-4 w-4 text-[color:var(--success)] shrink-0" />
                ) : item.points > 0 ? (
                  <Badge variant="secondary" className="text-[10px] shrink-0">In Progress</Badge>
                ) : (
                  <AlertCircle className="h-4 w-4 text-muted-foreground shrink-0" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* How to Improve + Recent Activity */}
      <div className="grid sm:grid-cols-2 gap-6">
        {/* Tips */}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-bold text-base mb-3">How to Improve</h3>
            <ul className="flex flex-col gap-2.5">
              {[
                "Enable Two-Factor Authentication (+10 pts)",
                "Get 3 more reviews from roommates (+10 pts)",
                "Send 3 more messages (+3 pts)",
                "Link your Google or Facebook (+5 pts)",
              ].map((tip) => (
                <li key={tip} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <TrendingUp className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-bold text-base mb-3">Recent Activity</h3>
            <ul className="flex flex-col gap-2.5">
              {RECENT_ACTIVITY.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-xs">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[color:var(--success)] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-foreground font-medium">{item.action}</span>
                    <span className="text-muted-foreground ml-1.5">{item.date}</span>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Score Legend */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-bold text-base mb-3">Score Ranges</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { range: "80-100", label: "Excellent", color: "var(--success)" },
              { range: "60-79", label: "Good", color: "var(--trust)" },
              { range: "40-59", label: "Fair", color: "var(--warning)" },
              { range: "0-39", label: "Needs Work", color: "var(--error)" },
            ].map((item) => (
              <div key={item.range} className="flex items-center gap-2 rounded-lg border p-2.5">
                <div className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <div>
                  <p className="text-xs font-bold">{item.range}</p>
                  <p className="text-[10px] text-muted-foreground">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

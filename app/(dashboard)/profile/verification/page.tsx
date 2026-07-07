import type { Metadata } from "next";
import { ShieldCheck, Upload, Clock, CheckCircle, XCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { verifySession } from "@/lib/auth";
import { buildMeta } from "@/lib/metadata";

export const metadata: Metadata = buildMeta({ title: "Verification", noIndex: true });

const VERIFICATION_STEPS = [
  {
    id: "email",
    title: "Email Verification",
    desc: "Confirm your email address",
    status: "verified" as const,
    points: 20,
  },
  {
    id: "phone",
    title: "Phone Verification",
    desc: "Verify your Nepali mobile number via OTP",
    status: "pending" as const,
    points: 15,
  },
  {
    id: "id",
    title: "Government ID",
    desc: "Upload citizenship card, passport, or driving license",
    status: "not_started" as const,
    points: 25,
  },
  {
    id: "address",
    title: "Address Verification",
    desc: "Confirm your current residential address",
    status: "not_started" as const,
    points: 10,
  },
];

const STATUS_CONFIG = {
  verified: { label: "Verified", icon: CheckCircle, color: "text-green-500", badge: "secondary" as const },
  under_review: { label: "Under Review", icon: Clock, color: "text-yellow-500", badge: "outline" as const },
  pending: { label: "Not Started", icon: XCircle, color: "text-muted-foreground", badge: "outline" as const },
  not_started: { label: "Not Started", icon: XCircle, color: "text-muted-foreground", badge: "outline" as const },
};

export default async function VerificationPage() {
  await verifySession();
  const completedPoints = VERIFICATION_STEPS.filter((s) => s.status === "verified").reduce((sum, s) => sum + s.points, 0);
  const totalPoints = VERIFICATION_STEPS.reduce((sum, s) => sum + s.points, 0);

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-primary" />
          Verification
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Complete verification steps to boost your Trust Score and get more visibility.
        </p>
      </div>

      {/* Progress summary */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Verification Progress</span>
            <span className="text-sm font-bold text-primary">
              {completedPoints}/{totalPoints} pts
            </span>
          </div>
          <Progress value={(completedPoints / totalPoints) * 100} />
        </CardContent>
      </Card>

      {/* Steps */}
      <div className="flex flex-col gap-4">
        {VERIFICATION_STEPS.map((step) => {
          const config = STATUS_CONFIG[step.status];
          const Icon = config.icon;
          const isActionable = step.status === "pending" || step.status === "not_started";

          return (
            <Card key={step.id}>
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                      step.status === "verified" ? "bg-green-500/10" : "bg-muted"
                    }`}
                  >
                    <Icon className={`h-5 w-5 ${config.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-sm font-semibold">{step.title}</h3>
                      <Badge variant={config.badge} className="text-xs shrink-0">
                        {config.label}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{step.desc}</p>
                    <p className="text-xs text-primary font-medium mt-1">+{step.points} trust points</p>
                  </div>
                  {isActionable && (
                    <Button size="sm" variant="outline" className="gap-1.5 shrink-0">
                      <Upload className="h-3.5 w-3.5" />
                      {step.id === "phone" ? "Verify" : "Upload"}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="bg-muted/30">
        <CardContent className="p-4 text-xs text-muted-foreground">
          <p className="font-medium text-foreground mb-1">Your data is secure</p>
          All documents are encrypted and used only for identity verification. We do not share your documents with third parties. Documents are reviewed within 24 hours.
        </CardContent>
      </Card>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Check, CreditCard, ArrowRight, Sparkles } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { verifySession } from "@/lib/auth";
import { buildMeta } from "@/lib/metadata";
import { SUBSCRIPTION_PLANS } from "@/lib/constants";

export const metadata: Metadata = buildMeta({ title: "Subscription", noIndex: true });

export default async function SubscriptionPage() {
  await verifySession();

  const currentPlan = "basic";
  const nextBillingDate = "August 7, 2026";

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold">Subscription</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your plan and billing.
        </p>
      </div>

      {/* Current plan */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <CreditCard className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">Current Plan</span>
              </div>
              <p className="text-xl font-bold capitalize">{currentPlan}</p>
              <p className="text-sm text-muted-foreground mt-0.5">
                Next billing: {nextBillingDate} &middot; NPR 499/month
              </p>
            </div>
            <Badge className="capitalize">{currentPlan}</Badge>
          </div>
          <Separator className="my-4" />
          <div className="flex gap-3">
            <Link href="/pricing">
              <Button variant="outline" size="sm">
                Upgrade Plan
              </Button>
            </Link>
            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
              Cancel Subscription
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Feature comparison */}
      <div className="grid sm:grid-cols-2 gap-4">
        {SUBSCRIPTION_PLANS.filter((p) => p.id !== "free").map((plan) => (
          <Card
            key={plan.id}
            className={plan.id === currentPlan ? "ring-2 ring-primary" : ""}
          >
            <CardContent className="p-5 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{plan.name}</p>
                  <p className="text-lg font-bold mt-0.5">
                    NPR {plan.price}
                    <span className="text-xs text-muted-foreground font-normal">/mo</span>
                  </p>
                </div>
                {plan.id === currentPlan ? (
                  <Badge>Current</Badge>
                ) : plan.highlighted ? (
                  <Badge variant="secondary">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Popular
                  </Badge>
                ) : null}
              </div>
              <ul className="flex flex-col gap-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <Check className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              {plan.id !== currentPlan && (
                <Link href={`/pricing?upgrade=${plan.id}`}>
                  <Button variant="outline" size="sm" className="w-full gap-1">
                    Switch to {plan.name}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Billing history link */}
      <Link href="/payment-history">
        <Card className="hover:border-primary/50 transition-colors">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CreditCard className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Payment History</p>
                <p className="text-xs text-muted-foreground">View all past transactions</p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}

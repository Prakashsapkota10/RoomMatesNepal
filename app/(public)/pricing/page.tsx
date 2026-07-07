import type { Metadata } from "next";
import Link from "next/link";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { buildMeta } from "@/lib/metadata";
import { SUBSCRIPTION_PLANS } from "@/lib/constants";

export const metadata: Metadata = buildMeta({
  title: "Pricing",
  description: "Simple, transparent pricing for RoomMate Nepal. Start free and upgrade when you're ready.",
});

const FEATURE_TABLE = [
  { feature: "Active listings", free: "3", basic: "10", premium: "Unlimited", enterprise: "Unlimited" },
  { feature: "Applications / month", free: "5", basic: "Unlimited", premium: "Unlimited", enterprise: "Unlimited" },
  { feature: "AI match suggestions", free: "—", basic: "5/mo", premium: "Unlimited", enterprise: "Unlimited" },
  { feature: "Featured listing badge", free: "—", basic: "—", premium: "✓", enterprise: "✓" },
  { feature: "Analytics dashboard", free: "—", basic: "—", premium: "✓", enterprise: "✓" },
  { feature: "Multiple properties", free: "—", basic: "—", premium: "—", enterprise: "✓" },
  { feature: "API access", free: "—", basic: "—", premium: "—", enterprise: "✓" },
  { feature: "Support", free: "Standard", basic: "Priority", premium: "24/7", enterprise: "Dedicated" },
];

const BILLING_FAQS = [
  {
    q: "Can I switch plans at any time?",
    a: "Yes. Upgrades take effect immediately. Downgrades take effect at the start of your next billing cycle.",
  },
  {
    q: "Is there a free trial for paid plans?",
    a: "Yes — all paid plans include a 7-day free trial. No credit card required to start.",
  },
  {
    q: "What happens to my listings if I downgrade?",
    a: "Active listings above your plan's limit will be paused (not deleted). Reactivate them by upgrading or removing excess listings.",
  },
  {
    q: "Do you offer discounts for NGOs or students?",
    a: "Yes. Contact us at hello@roommatenepal.com with proof of eligibility for a 40% non-profit or student discount.",
  },
];

export default function PricingPage() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="py-16 lg:py-24 bg-muted/30 text-center">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <Badge variant="secondary" className="mb-4">Pricing</Badge>
          <h1 className="text-3xl lg:text-5xl font-bold mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Start free. Upgrade when you need more. No hidden fees, no surprises.
          </p>
        </div>
      </section>

      {/* Plan cards */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {SUBSCRIPTION_PLANS.map((plan) => (
              <Card
                key={plan.id}
                className={plan.highlighted ? "ring-2 ring-primary relative" : ""}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="gap-1">
                      <Sparkles className="h-3 w-3" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardContent className="p-6 flex flex-col gap-5">
                  <div>
                    <h2 className="font-bold text-xl">{plan.name}</h2>
                    <div className="flex items-baseline gap-1 mt-2">
                      <span className="text-3xl font-bold">
                        {plan.price === 0 ? "Free" : `NPR ${plan.price}`}
                      </span>
                      {plan.price > 0 && (
                        <span className="text-sm text-muted-foreground">/month</span>
                      )}
                    </div>
                  </div>

                  <ul className="flex flex-col gap-2.5">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={plan.price === 0 ? "/register" : `/register?plan=${plan.id}`}
                    className="mt-auto"
                  >
                    <Button
                      variant={plan.highlighted ? "default" : "outline"}
                      className="w-full"
                    >
                      {plan.price === 0 ? "Get Started Free" : `Start Free Trial`}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Feature comparison table */}
      <section className="py-14 bg-muted/20">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <h2 className="text-xl font-semibold text-center mb-8">Compare Features</h2>
          <div className="overflow-x-auto rounded-xl border bg-background">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-medium text-muted-foreground w-1/3">Feature</th>
                  {["Free", "Basic", "Premium", "Enterprise"].map((p) => (
                    <th key={p} className="p-4 font-semibold text-center">{p}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {FEATURE_TABLE.map((row, i) => (
                  <tr key={row.feature} className={i % 2 === 0 ? "bg-muted/20" : ""}>
                    <td className="p-4 text-muted-foreground">{row.feature}</td>
                    {[row.free, row.basic, row.premium, row.enterprise].map((val, j) => (
                      <td key={j} className="p-4 text-center font-medium">
                        {val === "✓" ? (
                          <Check className="h-4 w-4 text-primary mx-auto" />
                        ) : val === "—" ? (
                          <span className="text-muted-foreground">—</span>
                        ) : (
                          val
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Billing FAQs */}
      <section className="py-14">
        <div className="container mx-auto px-4 lg:px-8 max-w-2xl">
          <h2 className="text-xl font-semibold text-center mb-8">Billing FAQs</h2>
          <Accordion multiple>
            {BILLING_FAQS.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger>{faq.q}</AccordionTrigger>
                <AccordionContent>{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}

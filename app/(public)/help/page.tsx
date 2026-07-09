import type { Metadata } from "next";
import Link from "next/link";
import {
  Search,
  BookOpen,
  User,
  Home,
  Sparkles,
  CreditCard,
  Shield,
  MessageSquare,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { buildMeta } from "@/lib/metadata";

export const metadata: Metadata = buildMeta({
  title: "Help Center",
  description: "Find answers to common questions about RoomMate Nepal — listings, accounts, AI matching, payments, and more.",
});

const CATEGORIES = [
  {
    icon: User,
    title: "Account & Profile",
    desc: "Registration, verification, trust score",
    href: "#account",
    articles: 8,
  },
  {
    icon: Home,
    title: "Listings",
    desc: "Creating, editing, managing your rooms",
    href: "#listings",
    articles: 12,
  },
  {
    icon: Sparkles,
    title: "AI Matching",
    desc: "How matching works, improving scores",
    href: "#matching",
    articles: 6,
  },
  {
    icon: CreditCard,
    title: "Payments & Plans",
    desc: "Subscriptions, billing, refunds",
    href: "#payments",
    articles: 9,
  },
  {
    icon: MessageSquare,
    title: "Messaging",
    desc: "Chatting with users, file sharing",
    href: "#messaging",
    articles: 5,
  },
  {
    icon: Shield,
    title: "Safety & Trust",
    desc: "Reporting, blocking, verification",
    href: "#safety",
    articles: 7,
  },
];

const FAQS_BY_CATEGORY = [
  {
    id: "account",
    title: "Account & Profile",
    items: [
      {
        q: "How do I verify my account?",
        a: "Go to Profile → Verification. Upload a clear photo of your citizenship card or passport. Verification is reviewed within 24 hours.",
      },
      {
        q: "What is the Trust Score?",
        a: "Trust Score (0–100) reflects your profile completeness, ID verification, positive reviews, and platform activity. Higher scores get more visibility.",
      },
      {
        q: "How do I change my role from User to Tenant?",
        a: "Navigate to Profile → Settings → Account Type. Select 'Tenant (Property Owner)' and complete the additional verification steps.",
      },
    ],
  },
  {
    id: "listings",
    title: "Listings",
    items: [
      {
        q: "How many listings can I create?",
        a: "Free plan: 3 listings. Basic: 10. Premium and Enterprise: unlimited. Manage your listings from My Listings dashboard.",
      },
      {
        q: "How long does listing approval take?",
        a: "Standard listings go live immediately. If your account is new, listings may take up to 2 hours for automated review.",
      },
      {
        q: "Can I edit a listing after publishing?",
        a: "Yes. Go to My Listings, click on the listing, then Edit. Major changes (price, location) may reset the listing's featured position.",
      },
    ],
  },
  {
    id: "matching",
    title: "AI Matching",
    items: [
      {
        q: "How is my compatibility score calculated?",
        a: "We analyse 20+ factors including sleep schedule, cleanliness level, guest policy, noise tolerance, pet preference, and work-from-home habits.",
      },
      {
        q: "Why isn't my match score high?",
        a: "Complete your lifestyle preferences in Profile → Preferences. Incomplete profiles default to neutral values which lower overall match quality.",
      },
    ],
  },
  {
    id: "payments",
    title: "Payments & Plans",
    items: [
      {
        q: "Which payment methods are accepted?",
        a: "We accept Khalti, eSewa, bank transfer (for Enterprise), and major international cards via Stripe.",
      },
      {
        q: "Can I cancel my subscription anytime?",
        a: "Yes. Cancel anytime from Profile → Subscription. You'll retain access until the current billing period ends. No partial refunds.",
      },
    ],
  },
];

export default function HelpPage() {
  return (
    <div className="flex flex-col page-enter">
      {/* Hero */}
      <section className="py-16 lg:py-20 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl text-center">
          <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
          <h1 className="text-3xl lg:text-4xl font-bold mb-3">Help Center</h1>
          <p className="text-muted-foreground text-lg mb-8">
            Find answers fast. Search our guides or browse by topic.
          </p>
              <div className="input-container flex items-center gap-2 rounded-xl border bg-background px-4 py-2.5 shadow-sm">
            <Search className="h-4 w-4 text-muted-foreground shrink-0" />
            <input
              type="text"
              placeholder="Search help articles..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              aria-label="Search help articles"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-14 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-xl font-semibold mb-6 text-center">Browse Topics</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {CATEGORIES.map(({ icon: Icon, title, desc, href, articles }) => (
              <a key={title} href={href}>
                <Card className="card-listing group">
                  <CardContent className="p-5 flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">
                          {title}
                        </h3>
                        <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                      <Badge variant="secondary" className="mt-2 text-xs">
                        {articles} articles
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ sections */}
      <section className="py-14 lg:py-16 bg-muted/20">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <h2 className="text-xl font-semibold mb-8">Common Questions</h2>
          <div className="space-y-8">
            {FAQS_BY_CATEGORY.map((cat) => (
              <div key={cat.id} id={cat.id}>
                <h3 className="font-medium text-muted-foreground text-sm uppercase tracking-wide mb-4">
                  {cat.title}
                </h3>
                <Accordion multiple>
                  {cat.items.map((item, i) => (
                    <AccordionItem key={i} value={`${cat.id}-${i}`}>
                      <AccordionTrigger>{item.q}</AccordionTrigger>
                      <AccordionContent>{item.a}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Still need help */}
      <section className="py-14 border-t">
        <div className="container mx-auto px-4 lg:px-8 max-w-xl text-center">
          <MessageSquare className="h-10 w-10 text-primary mx-auto mb-3" />
          <h2 className="text-xl font-semibold mb-2">Still need help?</h2>
          <p className="text-muted-foreground text-sm mb-6">
            Our support team is available Sunday–Friday, 9AM–6PM NPT.
          </p>
          <Link href="/contact">
              <button className="btn-primary-motion inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                Contact Support
                <ChevronRight className="h-4 w-4" />
              </button>
          </Link>
        </div>
      </section>
    </div>
  );
}

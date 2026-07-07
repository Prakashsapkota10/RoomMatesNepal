import type { Metadata } from "next";
import { Shield, Sparkles, Users, Heart, MapPin, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buildMeta } from "@/lib/metadata";

export const metadata: Metadata = buildMeta({
  title: "About",
  description: "Learn about RoomMate Nepal — our mission, team, and the story behind Nepal's first AI-powered roommate finder.",
});

const TEAM = [
  { name: "Arjun Shrestha", role: "Co-founder & CEO", avatar: "A", location: "Kathmandu" },
  { name: "Priya Tamang", role: "Co-founder & CTO", avatar: "P", location: "Kathmandu" },
  { name: "Bikash Rai", role: "Head of Product", avatar: "B", location: "Pokhara" },
  { name: "Sneha Karki", role: "AI/ML Engineer", avatar: "S", location: "Kathmandu" },
];

const VALUES = [
  {
    icon: Shield,
    title: "Safety First",
    desc: "Every listing goes through verification. Trust scores and document checks ensure safe interactions.",
  },
  {
    icon: Sparkles,
    title: "AI-Driven",
    desc: "Our matching engine goes beyond filters. Real compatibility is about more than just location and price.",
  },
  {
    icon: Heart,
    title: "Community Focused",
    desc: "We build neighbourhoods, not just transactions. RoomMate Nepal is built for Nepalis, by Nepalis.",
  },
  {
    icon: Target,
    title: "Transparent",
    desc: "No hidden fees. No dark patterns. Just honest pricing and honest matches.",
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="py-20 lg:py-28 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center">
          <Badge variant="secondary" className="mb-4">Our Story</Badge>
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            Built for Nepal's{" "}
            <span className="text-primary">Next Generation</span> of Renters
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            RoomMate Nepal was born from a simple frustration: finding a safe,
            compatible roommate in Kathmandu was a stressful, word-of-mouth
            process. We built the platform we wished existed.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We believe everyone deserves a home environment where they can
                thrive. That means not just finding a room — but finding the
                right people to share it with.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                By combining AI-powered compatibility matching with verified
                listings and secure communication, we're making shared living
                in Nepal safer, simpler, and more fulfilling.
              </p>
            </div>
            <div className="rounded-2xl border bg-gradient-to-br from-primary/5 to-primary/10 p-10 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-primary mx-auto mb-3" />
                <p className="font-semibold text-lg">25+ Cities</p>
                <p className="text-muted-foreground text-sm">Across Nepal 🇳🇵</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-20 bg-muted/20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold">What We Stand For</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <Card key={title}>
                <CardContent className="p-6 flex flex-col gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl lg:text-3xl font-bold">The Team</h2>
            <p className="text-muted-foreground mt-2">Passionate Nepalis solving a real problem</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {TEAM.map((member) => (
              <div key={member.name} className="flex flex-col items-center text-center gap-3">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary font-bold text-xl">
                  {member.avatar}
                </div>
                <div>
                  <p className="font-semibold">{member.name}</p>
                  <p className="text-xs text-muted-foreground">{member.role}</p>
                  <p className="text-xs text-muted-foreground flex items-center justify-center gap-1 mt-1">
                    <MapPin className="h-3 w-3" /> {member.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-t bg-muted/20">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { value: "2022", label: "Founded" },
              { value: "10K+", label: "Users" },
              { value: "3.5K+", label: "Listings" },
              { value: "25+", label: "Cities" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col gap-1">
                <span className="text-2xl font-bold">{s.value}</span>
                <span className="text-sm text-muted-foreground">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

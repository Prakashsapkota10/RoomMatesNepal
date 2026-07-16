"use client";

import { useState } from "react";
import {
  Moon,
  Sun,
  Sparkles,
  Volume2,
  Users,
  Cigarette,
  Dog,
  Briefcase,
  BookOpen,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export function LivingPreferencesTab() {
  const [cleanliness, setCleanliness] = useState(4);
  const [budget, setBudget] = useState(15000);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Living Preferences</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            These preferences power your AI compatibility score for better matches.
          </p>
        </div>
        <Button className="btn-primary-motion font-semibold shrink-0">
          Save Preferences
        </Button>
      </div>

      {/* Main content grid */}
      <div className="grid lg:grid-cols-[1fr_280px] gap-6">
        {/* Left column — Preferences */}
        <div className="flex flex-col gap-5">
          {/* Sleep Schedule */}
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
                  <Moon className="h-3.5 w-3.5 text-primary" />
                </div>
                <h3 className="text-sm font-semibold text-foreground">Sleep Schedule</h3>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: "early-bird", label: "Early Bird", desc: "Before 10 PM", icon: Sun },
                  { value: "flexible", label: "Flexible", desc: "Varies", icon: Sparkles },
                  { value: "night-owl", label: "Night Owl", desc: "After midnight", icon: Moon },
                ].map((opt) => (
                  <label
                    key={opt.value}
                    className="flex cursor-pointer flex-col items-center gap-1.5 rounded-xl border p-3 text-center has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-colors"
                  >
                    <input
                      type="radio"
                      name="sleepSchedule"
                      value={opt.value}
                      className="sr-only"
                      defaultChecked={opt.value === "flexible"}
                    />
                    <opt.icon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs font-medium">{opt.label}</span>
                    <span className="text-[10px] text-muted-foreground">{opt.desc}</span>
                  </label>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Cleanliness Level */}
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Cleanliness Level</h3>
                  <p className="text-[10px] text-muted-foreground">1 = relaxed, 5 = very clean & tidy</p>
                </div>
              </div>
              <div className="px-1">
                <input
                  type="range"
                  min={1}
                  max={5}
                  step={1}
                  value={cleanliness}
                  onChange={(e) => setCleanliness(Number(e.target.value))}
                  className="w-full h-1.5 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between mt-2">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <span
                      key={n}
                      className={`text-xs ${
                        n === cleanliness ? "font-bold text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {n}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-[10px] text-muted-foreground">Relaxed</span>
                  <span className="text-[10px] text-muted-foreground">Very Clean</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* House Rules */}
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
                  <Volume2 className="h-3.5 w-3.5 text-primary" />
                </div>
                <h3 className="text-sm font-semibold text-foreground">House Rules</h3>
              </div>
              <div className="flex flex-col gap-4">
                {[
                  { name: "smoking", label: "Smoking Allowed", desc: "Do you allow smoking indoors?", icon: Cigarette },
                  { name: "pets", label: "Pets Welcome", desc: "Are you OK living with pets?", icon: Dog },
                  { name: "wfh", label: "Work From Home", desc: "Do you work from home regularly?", icon: Briefcase },
                  { name: "quiet", label: "Quiet Study Environment", desc: "Need a quiet space for studying?", icon: BookOpen },
                ].map((item) => (
                  <div key={item.name} className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <item.icon className="h-4 w-4 text-muted-foreground shrink-0" />
                      <div className="min-w-0">
                        <Label htmlFor={item.name} className="text-sm font-medium cursor-pointer">
                          {item.label}
                        </Label>
                        <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                    <Switch id={item.name} name={item.name} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Guest Policy */}
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
                  <Users className="h-3.5 w-3.5 text-primary" />
                </div>
                <h3 className="text-sm font-semibold text-foreground">Guest Policy</h3>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: "no-guests", label: "No Guests", desc: "Prefer private space" },
                  { value: "occasional", label: "Occasional", desc: "Now and then" },
                  { value: "frequent", label: "Frequent", desc: "Social household" },
                ].map((opt) => (
                  <label
                    key={opt.value}
                    className="flex cursor-pointer flex-col gap-1 rounded-xl border p-3 text-sm text-center has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-colors"
                  >
                    <input
                      type="radio"
                      name="guestPolicy"
                      value={opt.value}
                      className="sr-only"
                      defaultChecked={opt.value === "occasional"}
                    />
                    <span className="text-xs font-medium">{opt.label}</span>
                    <span className="text-[10px] text-muted-foreground">{opt.desc}</span>
                  </label>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Monthly Budget */}
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
                  <svg className="h-3.5 w-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-foreground">Monthly Budget (NPR)</h3>
              </div>
              <div className="px-1">
                <input
                  type="range"
                  min={3000}
                  max={50000}
                  step={1000}
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full h-1.5 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
                />
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[10px] text-muted-foreground">Rs. 3,000</span>
                  <span className="px-2 py-0.5 rounded border text-xs font-bold text-foreground">
                    Rs. {budget.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-muted-foreground">Rs. 50,000+</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column — Info cards */}
        <aside className="flex flex-col gap-4">
          {/* AI Match Info */}
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-4 w-4" />
                <p className="text-xs font-bold uppercase tracking-wider">AI Matching</p>
              </div>
              <p className="text-xs opacity-90 leading-relaxed">
                Your living preferences directly influence your AI compatibility score. The more
                accurate your preferences, the better your roommate matches.
              </p>
              <div className="mt-3 flex items-center gap-2">
                <div className="h-1.5 flex-1 rounded-full bg-white/20">
                  <div className="h-full rounded-full bg-white" style={{ width: "78%" }} />
                </div>
                <span className="text-xs font-bold">78%</span>
              </div>
              <p className="text-[10px] opacity-70 mt-1">Preference completeness</p>
            </CardContent>
          </Card>

          {/* Quick Tips */}
          <Card>
            <CardContent className="p-4">
              <p className="text-sm font-semibold text-foreground mb-2">Quick Tips</p>
              <ul className="flex flex-col gap-2">
                <li className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  <span className="text-xs text-muted-foreground">
                    Be honest about your habits for better compatibility
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  <span className="text-xs text-muted-foreground">
                    Update preferences when your lifestyle changes
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  <span className="text-xs text-muted-foreground">
                    Budget range helps filter listings that fit your needs
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Compatibility Preview */}
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-4">
              <p className="text-xs font-semibold text-primary mb-2">Your Top Match Factors</p>
              <div className="flex flex-col gap-2">
                {[
                  { label: "Sleep schedule", value: "85%" },
                  { label: "Cleanliness", value: "92%" },
                  { label: "Noise level", value: "78%" },
                  { label: "Budget alignment", value: "70%" },
                ].map((factor) => (
                  <div key={factor.label} className="flex items-center justify-between">
                    <span className="text-[10px] text-muted-foreground">{factor.label}</span>
                    <span className="text-[10px] font-semibold text-foreground">{factor.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}

"use client";

import {
  Eye,
  EyeOff,
  MapPin,
  Phone,
  Mail,
  Users,
  Search,
  Shield,
  ExternalLink,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export function PrivacyTab() {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Privacy Settings</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Control who can see your information and how your data is used.
          </p>
        </div>
        <Button className="btn-primary-motion font-semibold shrink-0">
          Save Changes
        </Button>
      </div>

      {/* Main content grid */}
      <div className="grid lg:grid-cols-[1fr_280px] gap-6">
        {/* Left column */}
        <div className="flex flex-col gap-5">
          {/* Profile Visibility */}
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
                  <Eye className="h-3.5 w-3.5 text-primary" />
                </div>
                <h3 className="text-sm font-semibold text-foreground">Profile Visibility</h3>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: "public", label: "Public", desc: "Anyone can view" },
                  { value: "verified", label: "Verified Only", desc: "Only verified users" },
                  { value: "private", label: "Private", desc: "Only matches" },
                ].map((opt) => (
                  <label
                    key={opt.value}
                    className="flex cursor-pointer flex-col gap-1 rounded-xl border p-3 text-sm text-center has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-colors"
                  >
                    <input
                      type="radio"
                      name="profileVisibility"
                      value={opt.value}
                      className="sr-only"
                      defaultChecked={opt.value === "verified"}
                    />
                    <span className="text-xs font-medium">{opt.label}</span>
                    <span className="text-[10px] text-muted-foreground">{opt.desc}</span>
                  </label>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
                  <Phone className="h-3.5 w-3.5 text-primary" />
                </div>
                <h3 className="text-sm font-semibold text-foreground">Contact Visibility</h3>
              </div>
              <div className="flex flex-col gap-4">
                {[
                  { name: "showPhone", label: "Show Phone Number", desc: "Allow others to see your phone number", icon: Phone },
                  { name: "showEmail", label: "Show Email Address", desc: "Display email on your public profile", icon: Mail },
                  { name: "showLocation", label: "Show Exact Location", desc: "Display your precise neighborhood", icon: MapPin },
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

          {/* Search & Discovery */}
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
                  <Search className="h-3.5 w-3.5 text-primary" />
                </div>
                <h3 className="text-sm font-semibold text-foreground">Search & Discovery</h3>
              </div>
              <div className="flex flex-col gap-4">
                {[
                  { name: "searchable", label: "Appear in Search Results", desc: "Let others find you through search" },
                  { name: "aiRecommendations", label: "AI Recommendations", desc: "Allow AI to suggest you as a potential match" },
                  { name: "activityStatus", label: "Show Activity Status", desc: "Display when you were last active" },
                ].map((item) => (
                  <div key={item.name} className="flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <Label htmlFor={item.name} className="text-sm font-medium cursor-pointer">
                        {item.label}
                      </Label>
                      <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                    </div>
                    <Switch id={item.name} name={item.name} defaultChecked />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Blocking */}
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
                  <EyeOff className="h-3.5 w-3.5 text-primary" />
                </div>
                <h3 className="text-sm font-semibold text-foreground">Blocked Users</h3>
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                Users you&apos;ve blocked cannot view your profile or send you messages.
              </p>
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-7 w-7 rounded-full bg-muted border-2 border-card flex items-center justify-center"
                    >
                      <Users className="h-3 w-3 text-muted-foreground" />
                    </div>
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">3 blocked users</span>
                <Button variant="outline" size="xs" className="ml-auto text-xs">
                  Manage
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column — Info cards */}
        <aside className="flex flex-col gap-4">
          {/* Privacy Score */}
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4" />
                <p className="text-xs font-bold uppercase tracking-wider">Privacy Score</p>
              </div>
              <p className="text-3xl font-bold">
                High
              </p>
              <p className="text-xs opacity-80 mt-1">
                Your privacy settings are well configured. Only verified users can view your full profile.
              </p>
              <div className="mt-3 h-1.5 w-full rounded-full bg-white/20">
                <div className="h-full rounded-full bg-white" style={{ width: "85%" }} />
              </div>
            </CardContent>
          </Card>

          {/* Data Usage */}
          <Card>
            <CardContent className="p-4">
              <p className="text-sm font-semibold text-foreground mb-2">Your Data</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                We collect minimal data to provide our matching service. You can request a full export or deletion at any time.
              </p>
              <div className="flex flex-col gap-2 mt-3">
                <Button variant="outline" size="sm" className="text-xs w-full justify-start">
                  Download My Data
                </Button>
                <Button variant="destructive" size="sm" className="text-xs w-full justify-start">
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Policy Links */}
          <Card>
            <CardContent className="p-4">
              <p className="text-sm font-semibold text-foreground mb-3">Legal</p>
              <div className="flex flex-col gap-2">
                {[
                  { label: "Privacy Policy", href: "#" },
                  { label: "Terms of Service", href: "#" },
                  { label: "Cookie Policy", href: "#" },
                ].map((link) => (
                  <button
                    key={link.label}
                    type="button"
                    className="flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
                  >
                    {link.label}
                    <ExternalLink className="h-3 w-3" />
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}

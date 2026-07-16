"use client";

import {
  Lock,
  Smartphone,
  KeyRound,
  ShieldCheck,
  Monitor,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function SecurityTab() {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Security Settings</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Protect your account with strong passwords and two-factor authentication.
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
          {/* Change Password */}
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
                  <Lock className="h-3.5 w-3.5 text-primary" />
                </div>
                <h3 className="text-sm font-semibold text-foreground">Change Password</h3>
              </div>
              <div className="flex flex-col gap-4 max-w-md">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="currentPassword" className="text-xs text-muted-foreground">
                    Current Password
                  </Label>
                  <Input id="currentPassword" type="password" placeholder="••••••••" className="h-9" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="newPassword" className="text-xs text-muted-foreground">
                    New Password
                  </Label>
                  <Input id="newPassword" type="password" placeholder="••••••••" className="h-9" />
                  <p className="text-[10px] text-muted-foreground">
                    Min 8 characters with uppercase, lowercase, and number
                  </p>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="confirmPassword" className="text-xs text-muted-foreground">
                    Confirm New Password
                  </Label>
                  <Input id="confirmPassword" type="password" placeholder="••••••••" className="h-9" />
                </div>
                <Button variant="outline" size="sm" className="w-fit text-xs mt-1">
                  Update Password
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Two-Factor Authentication */}
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
                  <Smartphone className="h-3.5 w-3.5 text-primary" />
                </div>
                <h3 className="text-sm font-semibold text-foreground">Two-Factor Authentication</h3>
              </div>
              <div className="flex flex-col gap-4">
                {[
                  {
                    name: "sms2fa",
                    label: "SMS Authentication",
                    desc: "Receive verification codes via text message",
                    enabled: true,
                  },
                  {
                    name: "app2fa",
                    label: "Authenticator App",
                    desc: "Use Google Authenticator or similar apps",
                    enabled: false,
                  },
                  {
                    name: "email2fa",
                    label: "Email Verification",
                    desc: "Receive verification codes via email",
                    enabled: true,
                  },
                ].map((item) => (
                  <div key={item.name} className="flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <Label htmlFor={item.name} className="text-sm font-medium cursor-pointer">
                        {item.label}
                      </Label>
                      <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                    </div>
                    <Switch id={item.name} name={item.name} defaultChecked={item.enabled} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Login Sessions */}
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
                    <Monitor className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground">Active Sessions</h3>
                </div>
                <Button variant="destructive" size="xs" className="text-xs">
                  Revoke All
                </Button>
              </div>
              <div className="flex flex-col gap-3">
                {[
                  {
                    device: "Chrome on Windows",
                    location: "Kathmandu, Nepal",
                    time: "Current session",
                    current: true,
                  },
                  {
                    device: "Safari on iPhone",
                    location: "Kathmandu, Nepal",
                    time: "2 hours ago",
                    current: false,
                  },
                  {
                    device: "Firefox on MacOS",
                    location: "Lalitpur, Nepal",
                    time: "3 days ago",
                    current: false,
                  },
                ].map((session, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between gap-3 p-3 rounded-lg border"
                  >
                    <div className="flex items-center gap-3">
                      <Monitor className="h-4 w-4 text-muted-foreground shrink-0" />
                      <div>
                        <p className="text-xs font-medium text-foreground">
                          {session.device}
                          {session.current && (
                            <span className="ml-2 text-[10px] font-semibold text-success">
                              (Current)
                            </span>
                          )}
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          {session.location} • {session.time}
                        </p>
                      </div>
                    </div>
                    {!session.current && (
                      <Button variant="ghost" size="xs" className="text-[10px] text-destructive hover:text-destructive">
                        Revoke
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recovery Options */}
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
                  <KeyRound className="h-3.5 w-3.5 text-primary" />
                </div>
                <h3 className="text-sm font-semibold text-foreground">Recovery Options</h3>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <p className="text-xs font-medium text-foreground">Recovery Email</p>
                    <p className="text-[10px] text-muted-foreground">j***@gmail.com</p>
                  </div>
                  <Button variant="outline" size="xs" className="text-xs">
                    Update
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <p className="text-xs font-medium text-foreground">Recovery Phone</p>
                    <p className="text-[10px] text-muted-foreground">+977 98••••••00</p>
                  </div>
                  <Button variant="outline" size="xs" className="text-xs">
                    Update
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column — Info cards */}
        <aside className="flex flex-col gap-4">
          {/* Security Status */}
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="h-4 w-4" />
                <p className="text-xs font-bold uppercase tracking-wider">Security Status</p>
              </div>
              <p className="text-2xl font-bold">Strong</p>
              <p className="text-xs opacity-80 mt-1">
                Your account has strong security measures in place. 2FA is active.
              </p>
              <div className="mt-3 h-1.5 w-full rounded-full bg-white/20">
                <div className="h-full rounded-full bg-white" style={{ width: "90%" }} />
              </div>
            </CardContent>
          </Card>

          {/* Security Checklist */}
          <Card>
            <CardContent className="p-4">
              <p className="text-sm font-semibold text-foreground mb-3">Security Checklist</p>
              <div className="flex flex-col gap-2.5">
                {[
                  { label: "Strong password set", done: true },
                  { label: "Two-factor enabled", done: true },
                  { label: "Recovery email added", done: true },
                  { label: "Authenticator app", done: false },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <div
                      className={`h-4 w-4 rounded-full flex items-center justify-center ${
                        item.done ? "bg-success/10" : "bg-muted"
                      }`}
                    >
                      {item.done ? (
                        <ShieldCheck className="h-2.5 w-2.5 text-success" />
                      ) : (
                        <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                      )}
                    </div>
                    <span
                      className={`text-xs ${
                        item.done ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="border-warning/20 bg-warning/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-warning" />
                <p className="text-xs font-semibold text-warning">Security Alert</p>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                A new device logged into your account 2 hours ago from Kathmandu. If this
                wasn&apos;t you, change your password immediately.
              </p>
              <Button variant="outline" size="sm" className="mt-3 text-xs w-full">
                Review Activity
              </Button>
            </CardContent>
          </Card>

          {/* Last Password Change */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                <p className="text-xs font-medium text-foreground">Last Password Change</p>
              </div>
              <p className="text-xs text-muted-foreground ml-5.5">45 days ago</p>
              <p className="text-[10px] text-muted-foreground ml-5.5 mt-1">
                We recommend changing your password every 90 days.
              </p>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Sun, Moon, Monitor, Type, Maximize2, Palette } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export function AppearanceTab() {
  const [fontSize, setFontSize] = useState(14);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Appearance</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Customize how RoomMate Nepal looks and feels for you.
          </p>
        </div>
        <Button className="btn-primary-motion font-semibold shrink-0">
          Save Preferences
        </Button>
      </div>

      {/* Main content grid */}
      <div className="grid lg:grid-cols-[1fr_280px] gap-6">
        {/* Left column */}
        <div className="flex flex-col gap-5">
          {/* Theme Selection */}
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
                  <Palette className="h-3.5 w-3.5 text-primary" />
                </div>
                <h3 className="text-sm font-semibold text-foreground">Theme</h3>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: "light", label: "Light", icon: Sun, preview: "bg-white border-border" },
                  { value: "dark", label: "Dark", icon: Moon, preview: "bg-[#161B22] border-[#30363d]" },
                  { value: "system", label: "System", icon: Monitor, preview: "bg-gradient-to-r from-white to-[#161B22] border-border" },
                ].map((theme) => (
                  <label
                    key={theme.value}
                    className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border p-4 has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-colors"
                  >
                    <input
                      type="radio"
                      name="theme"
                      value={theme.value}
                      className="sr-only"
                      defaultChecked={theme.value === "light"}
                    />
                    {/* Theme preview */}
                    <div className={`h-12 w-full rounded-lg border ${theme.preview}`} />
                    <div className="flex items-center gap-1.5">
                      <theme.icon className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-xs font-medium">{theme.label}</span>
                    </div>
                  </label>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Font Size */}
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
                  <Type className="h-3.5 w-3.5 text-primary" />
                </div>
                <h3 className="text-sm font-semibold text-foreground">Font Size</h3>
              </div>
              <div className="px-1">
                <input
                  type="range"
                  min={12}
                  max={18}
                  step={1}
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-full h-1.5 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
                />
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[10px] text-muted-foreground">Small</span>
                  <span className="px-2 py-0.5 rounded border text-xs font-bold text-foreground">
                    {fontSize}px
                  </span>
                  <span className="text-[10px] text-muted-foreground">Large</span>
                </div>
              </div>
              {/* Preview */}
              <div className="mt-4 p-3 rounded-lg border bg-muted/30">
                <p className="text-muted-foreground" style={{ fontSize: `${fontSize}px` }}>
                  This is how text will appear across the application.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Layout & Density */}
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
                  <Maximize2 className="h-3.5 w-3.5 text-primary" />
                </div>
                <h3 className="text-sm font-semibold text-foreground">Layout Density</h3>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: "compact", label: "Compact", desc: "More content, less spacing" },
                  { value: "comfortable", label: "Comfortable", desc: "Balanced spacing" },
                  { value: "spacious", label: "Spacious", desc: "More breathing room" },
                ].map((opt) => (
                  <label
                    key={opt.value}
                    className="flex cursor-pointer flex-col gap-1 rounded-xl border p-3 text-sm text-center has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-colors"
                  >
                    <input
                      type="radio"
                      name="density"
                      value={opt.value}
                      className="sr-only"
                      defaultChecked={opt.value === "comfortable"}
                    />
                    <span className="text-xs font-medium">{opt.label}</span>
                    <span className="text-[10px] text-muted-foreground">{opt.desc}</span>
                  </label>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* UI Preferences */}
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
                  <Palette className="h-3.5 w-3.5 text-primary" />
                </div>
                <h3 className="text-sm font-semibold text-foreground">UI Preferences</h3>
              </div>
              <div className="flex flex-col gap-4">
                {[
                  { name: "animations", label: "Enable Animations", desc: "Smooth transitions and micro-interactions", defaultChecked: true },
                  { name: "reducedMotion", label: "Reduced Motion", desc: "Minimize animations for accessibility", defaultChecked: false },
                  { name: "sidebarCollapsed", label: "Collapsed Sidebar", desc: "Start with sidebar collapsed by default", defaultChecked: false },
                  { name: "compactCards", label: "Compact Card View", desc: "Show more listings per page", defaultChecked: false },
                ].map((item) => (
                  <div key={item.name} className="flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <Label htmlFor={item.name} className="text-sm font-medium cursor-pointer">
                        {item.label}
                      </Label>
                      <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                    </div>
                    <Switch id={item.name} name={item.name} defaultChecked={item.defaultChecked} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column — Info cards */}
        <aside className="flex flex-col gap-4">
          {/* Current Theme */}
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Sun className="h-4 w-4" />
                <p className="text-xs font-bold uppercase tracking-wider">Active Theme</p>
              </div>
              <p className="text-2xl font-bold">Light</p>
              <p className="text-xs opacity-80 mt-1">
                Optimized for daytime use with high contrast and readability.
              </p>
            </CardContent>
          </Card>

          {/* Color Accent */}
          <Card>
            <CardContent className="p-4">
              <p className="text-sm font-semibold text-foreground mb-3">Accent Color</p>
              <div className="grid grid-cols-5 gap-2">
                {[
                  { color: "bg-[#1554D1]", label: "Blue" },
                  { color: "bg-[#14B8A6]", label: "Teal" },
                  { color: "bg-[#10B981]", label: "Green" },
                  { color: "bg-[#8B5CF6]", label: "Purple" },
                  { color: "bg-[#F59E0B]", label: "Amber" },
                ].map((accent) => (
                  <button
                    key={accent.label}
                    type="button"
                    className={`h-8 w-8 rounded-full ${accent.color} border-2 border-transparent hover:border-foreground/30 transition-colors ring-offset-2 ring-offset-card first:ring-2 first:ring-primary`}
                    aria-label={accent.label}
                    title={accent.label}
                  />
                ))}
              </div>
              <p className="text-[10px] text-muted-foreground mt-2">
                Changes the primary accent color across the app.
              </p>
            </CardContent>
          </Card>

          {/* Accessibility */}
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-4">
              <p className="text-xs font-semibold text-primary mb-2">Accessibility</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                We support screen readers, keyboard navigation, and reduced motion preferences.
                Enable &quot;Reduced Motion&quot; for a calmer experience.
              </p>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { SlidersHorizontal, X, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NEPAL_CITIES } from "@/lib/constants";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface RoommateFilters {
  location: string;
  budgetMin: number;
  budgetMax: number;
  gender: string;
  occupation: string[];
  lifestyle: {
    nonSmoker: boolean;
    noAlcohol: boolean;
    vegetarian: boolean;
    petFriendly: boolean;
    earlyBird: boolean;
    nightOwl: boolean;
    clean: boolean;
    quiet: boolean;
  };
  moveInDate: string;
  verifiedOnly: boolean;
  minTrustScore: number;
  minCompatibility: number;
  sortBy: string;
}

export const DEFAULT_FILTERS: RoommateFilters = {
  location: "all",
  budgetMin: 0,
  budgetMax: 50000,
  gender: "any",
  occupation: [],
  lifestyle: {
    nonSmoker: false,
    noAlcohol: false,
    vegetarian: false,
    petFriendly: false,
    earlyBird: false,
    nightOwl: false,
    clean: false,
    quiet: false,
  },
  moveInDate: "",
  verifiedOnly: false,
  minTrustScore: 0,
  minCompatibility: 0,
  sortBy: "newest",
};

interface FiltersDrawerProps {
  filters: RoommateFilters;
  onFiltersChange: (filters: RoommateFilters) => void;
  onClearFilters: () => void;
}

// ─── Static options ───────────────────────────────────────────────────────────

const OCCUPATION_TYPES = [
  { id: "student", label: "Student" },
  { id: "professional", label: "Working Professional" },
  { id: "remote", label: "Remote Worker" },
];

const LIFESTYLE_OPTIONS = [
  { id: "nonSmoker", label: "Non-Smoker" },
  { id: "noAlcohol", label: "Doesn't Drink" },
  { id: "vegetarian", label: "Vegetarian" },
  { id: "petFriendly", label: "Pet Friendly" },
  { id: "earlyBird", label: "Early Bird" },
  { id: "nightOwl", label: "Night Owl" },
  { id: "clean", label: "Clean" },
  { id: "quiet", label: "Quiet" },
];

const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "highestMatch", label: "Highest Match" },
  { value: "highestTrust", label: "Highest Trust" },
  { value: "lowestBudget", label: "Lowest Budget" },
  { value: "highestRated", label: "Highest Rated" },
];

// ─── Inner form (used in both desktop card and mobile sheet) ─────────────────

interface FiltersFormProps {
  /** Current "pending" draft — not yet applied to the grid */
  draft: RoommateFilters;
  onChange: (draft: RoommateFilters) => void;
  /** Called when user clicks Apply (desktop) or is in mobile sheet (immediate) */
  onApply: () => void;
  onClear: () => void;
  /** In mobile sheet we apply immediately on every change */
  immediate?: boolean;
}

function FiltersForm({ draft, onChange, onApply, onClear, immediate = false }: FiltersFormProps) {
  const update = (updates: Partial<RoommateFilters>) => {
    const next = { ...draft, ...updates };
    onChange(next);
    if (immediate) onApply();
  };

  const toggleOccupation = (id: string) => {
    const updated = draft.occupation.includes(id)
      ? draft.occupation.filter((o) => o !== id)
      : [...draft.occupation, id];
    update({ occupation: updated });
  };

  const toggleLifestyle = (key: keyof RoommateFilters["lifestyle"]) => {
    update({ lifestyle: { ...draft.lifestyle, [key]: !draft.lifestyle[key] } });
  };

  return (
    <div className="flex flex-col gap-0">
      {/* ── Location ─────────────────────────────────────────────────── */}
      <div className="space-y-2 px-4 py-3">
        <Label className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
          Location
        </Label>
        <Select value={draft.location} onValueChange={(v) => update({ location: v ?? "all" })}>
          <SelectTrigger className="input-container h-8 text-xs">
            <SelectValue placeholder="Select location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            {NEPAL_CITIES.map((city) => (
              <SelectItem key={city} value={city.toLowerCase()}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* ── Budget ───────────────────────────────────────────────────── */}
      <div className="space-y-2 px-4 py-3">
        <Label className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
          Budget (NPR/month)
        </Label>
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-primary">{draft.budgetMin.toLocaleString()}</span>
          <span className="text-muted-foreground">—</span>
          <span className="font-bold text-primary">{draft.budgetMax.toLocaleString()}</span>
        </div>
        <Slider
          value={[draft.budgetMin, draft.budgetMax]}
          min={0}
          max={50000}
          step={1000}
          onValueChange={(v) => { const arr = Array.isArray(v) ? v : [v]; update({ budgetMin: arr[0], budgetMax: arr[1] ?? arr[0] }); }}
          className="py-1"
        />
      </div>

      <Separator />

      {/* ── Gender ───────────────────────────────────────────────────── */}
      <div className="space-y-2 px-4 py-3">
        <Label className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
          Gender
        </Label>
        <RadioGroup
          value={draft.gender}
          onValueChange={(v) => update({ gender: v })}
          className="flex gap-2"
        >
          {(["any", "male", "female"] as const).map((g) => (
            <Label
              key={g}
              htmlFor={`gender-${g}`}
              className="flex-1 flex cursor-pointer items-center justify-center rounded-md border px-2 py-1.5 text-xs font-medium transition-colors has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/8 has-[[data-state=checked]]:text-primary"
            >
              <RadioGroupItem value={g} id={`gender-${g}`} className="sr-only" />
              {g === "any" ? "Any" : g.charAt(0).toUpperCase() + g.slice(1)}
            </Label>
          ))}
        </RadioGroup>
      </div>

      <Separator />

      {/* ── Occupation ───────────────────────────────────────────────── */}
      <div className="space-y-2 px-4 py-3">
        <Label className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
          Occupation
        </Label>
        <div className="space-y-1.5">
          {OCCUPATION_TYPES.map((occ) => (
            <div key={occ.id} className="flex items-center gap-2">
              <Checkbox
                id={`occ-${occ.id}`}
                checked={draft.occupation.includes(occ.id)}
                onCheckedChange={() => toggleOccupation(occ.id)}
              />
              <Label htmlFor={`occ-${occ.id}`} className="text-xs font-normal cursor-pointer leading-none">
                {occ.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* ── Lifestyle ────────────────────────────────────────────────── */}
      <div className="space-y-2 px-4 py-3">
        <Label className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
          Lifestyle
        </Label>
        <div className="flex flex-col gap-1.5">
          {LIFESTYLE_OPTIONS.map((opt) => (
            <div key={opt.id} className="flex items-center gap-2">
              <Checkbox
                id={`ls-${opt.id}`}
                checked={draft.lifestyle[opt.id as keyof typeof draft.lifestyle]}
                onCheckedChange={() =>
                  toggleLifestyle(opt.id as keyof RoommateFilters["lifestyle"])
                }
              />
              <Label htmlFor={`ls-${opt.id}`} className="text-xs font-normal cursor-pointer leading-none">
                {opt.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* ── Verified Only ────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-4 py-3">
        <Label htmlFor="verified-only" className="cursor-pointer text-xs">
          Verified Only
        </Label>
        <Switch
          id="verified-only"
          checked={draft.verifiedOnly}
          onCheckedChange={(checked) => update({ verifiedOnly: checked })}
        />
      </div>

      <Separator />

      {/* ── Min Trust Score ──────────────────────────────────────────── */}
      <div className="space-y-2 px-4 py-3">
        <div className="flex items-center justify-between">
          <Label className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            Trust Score
          </Label>
          <span className="text-xs font-bold text-primary">
            {draft.minTrustScore}+
          </span>
        </div>
        <Slider
          value={[draft.minTrustScore]}
          min={0}
          max={100}
          step={10}
          onValueChange={(v) => { const arr = Array.isArray(v) ? v : [v]; update({ minTrustScore: arr[0] }); }}
          className="py-1"
        />
      </div>

      <Separator />

      {/* ── Min Compatibility ────────────────────────────────────────── */}
      <div className="space-y-2 px-4 py-3">
        <div className="flex items-center justify-between">
          <Label className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            Compatibility
          </Label>
          <span className="text-xs font-bold text-primary">
            {draft.minCompatibility}%+
          </span>
        </div>
        <Slider
          value={[draft.minCompatibility]}
          min={0}
          max={100}
          step={5}
          onValueChange={(v) => { const arr = Array.isArray(v) ? v : [v]; update({ minCompatibility: arr[0] }); }}
          className="py-1"
        />
      </div>

      <Separator />

      {/* ── Sort By ──────────────────────────────────────────────────── */}
      <div className="space-y-2 px-4 py-3">
        <Label className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
          Sort By
        </Label>
        <Select value={draft.sortBy} onValueChange={(v) => update({ sortBy: v ?? "newest" })}>
          <SelectTrigger className="input-container h-8 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

// ─── Exported component ───────────────────────────────────────────────────────

export function FiltersDrawer({ filters, onFiltersChange, onClearFilters }: FiltersDrawerProps) {
  /**
   * Use the parent filters as the single source of truth.
   * Changes apply immediately on both mobile and desktop.
   */
  const [draft, setDraft] = useState<RoommateFilters>(filters);

  // Sync draft when parent resets filters (e.g. clearFilters)
  const parentKey = JSON.stringify(filters);
  const [lastParentKey, setLastParentKey] = useState(parentKey);
  if (parentKey !== lastParentKey) {
    setDraft(filters);
    setLastParentKey(parentKey);
  }

  const handleChange = (d: RoommateFilters) => {
    setDraft(d);
    onFiltersChange(d);
  };

  const handleClear = () => {
    setDraft(DEFAULT_FILTERS);
    onClearFilters();
  };

  return (
    <>
      {/* ── Mobile: bottom Sheet ─────────────────────────────────────── */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger className="btn-secondary-motion group/button inline-flex shrink-0 items-center justify-center gap-2 w-full rounded-xl border border-border bg-background px-4 py-2 text-sm font-medium whitespace-nowrap transition-all hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
            <SlidersHorizontal className="h-4 w-4" />
            Filters &amp; Sort
          </SheetTrigger>
          <SheetContent side="left" className="w-full sm:max-w-md p-0 flex flex-col">
            <SheetHeader className="px-5 py-4 border-b shrink-0">
              <SheetTitle className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filters &amp; Sort
              </SheetTitle>
            </SheetHeader>

            <ScrollArea className="flex-1">
              <FiltersForm
                draft={draft}
                onChange={handleChange}
                onApply={() => {}}
                onClear={handleClear}
                immediate
              />
            </ScrollArea>

            {/* sticky footer */}
            <div className="shrink-0 border-t bg-card px-5 py-4 flex gap-3">
              <Button
                variant="outline"
                className="btn-secondary-motion flex-1 rounded-xl text-sm font-medium"
                onClick={handleClear}
              >
                <X className="h-3.5 w-3.5 mr-1.5" />
                Clear All
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* ── Desktop: sticky card sidebar ─────────────────────────────── */}
      <div className="hidden lg:block">
        <div className="sticky top-20">
          <div className="rounded-2xl border bg-card shadow-sm overflow-hidden flex flex-col max-h-[calc(100vh-120px)]">

            {/* Card header */}
            <div className="shrink-0 flex items-center justify-between px-4 py-3 border-b bg-muted/30">
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10">
                  <SlidersHorizontal className="h-3.5 w-3.5 text-primary" />
                </div>
                <h3 className="font-semibold text-sm">Filters</h3>
              </div>
              <button
                onClick={handleClear}
                className="text-xs text-primary hover:underline font-medium"
              >
                Reset
              </button>
            </div>

            {/* Scrollable filters body */}
            <ScrollArea className="flex-1 min-h-0">
              <FiltersForm
                draft={draft}
                onChange={handleChange}
                onApply={() => {}}
                onClear={handleClear}
                immediate
              />
            </ScrollArea>
          </div>
        </div>
      </div>
    </>
  );
}

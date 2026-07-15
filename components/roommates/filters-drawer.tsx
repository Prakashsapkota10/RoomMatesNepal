"use client";

import { useEffect, useState } from "react";
import { SlidersHorizontal, X, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NEPAL_CITIES } from "@/lib/constants";

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

export type ListingFilters = RoommateFilters;
export const DEFAULT_LISTING_FILTERS = DEFAULT_FILTERS;

const OCCUPATION_TYPES = [
  { id: "student", label: "Student" },
  { id: "professional", label: "Professional" },
  { id: "remote", label: "Remote Worker" },
];

const LIFESTYLE_OPTIONS = [
  { id: "nonSmoker", label: "Non-Smoker" },
  { id: "noAlcohol", label: "No Alcohol" },
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

interface FiltersDrawerProps {
  filters: RoommateFilters;
  onFiltersChange: (filters: RoommateFilters) => void;
  onClearFilters: () => void;
}

interface FiltersFormProps {
  draft: RoommateFilters;
  onChange: (draft: RoommateFilters) => void;
  onClear: () => void;
}

function FiltersForm({ draft, onChange, onClear }: FiltersFormProps) {
  const update = (updates: Partial<RoommateFilters>) => {
    onChange({ ...draft, ...updates });
  };

  const toggleOccupation = (id: string) => {
    const next = draft.occupation.includes(id)
      ? draft.occupation.filter((item) => item !== id)
      : [...draft.occupation, id];
    update({ occupation: next });
  };

  const toggleLifestyle = (key: keyof RoommateFilters["lifestyle"]) => {
    update({ lifestyle: { ...draft.lifestyle, [key]: !draft.lifestyle[key] } });
  };

  return (
    <div className="flex flex-col gap-0">
      <div className="space-y-2 px-4 py-3">
        <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          Location
        </Label>
        <Select value={draft.location} onValueChange={(value) => update({ location: value ?? "all" })}>
          <SelectTrigger className="h-8 text-sm">
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

      <div className="space-y-2 px-4 py-3">
        <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          Budget Range (NPR/month)
        </Label>
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-primary">{draft.budgetMin.toLocaleString()}</span>
          <span className="text-muted-foreground">to</span>
          <span className="font-bold text-primary">{draft.budgetMax.toLocaleString()}</span>
        </div>
        <Slider
          value={[draft.budgetMin, draft.budgetMax]}
          min={0}
          max={50000}
          step={1000}
          onValueChange={(value) => {
            const arr = Array.isArray(value) ? value : [value];
            update({ budgetMin: arr[0], budgetMax: arr[1] ?? arr[0] });
          }}
          className="py-1"
        />
      </div>

      <Separator />

      <div className="space-y-2 px-4 py-3">
        <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          Gender Preference
        </Label>
        <RadioGroup
          value={draft.gender}
          onValueChange={(value) => update({ gender: value })}
          className="grid grid-cols-3 gap-1.5"
        >
          {(["any", "male", "female"] as const).map((option) => (
            <Label
              key={option}
              htmlFor={`gender-${option}`}
              className="flex cursor-pointer items-center justify-center rounded-lg border px-2 py-1.5 text-xs font-medium transition-all duration-150 hover:border-primary/50 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/8 has-[[data-state=checked]]:text-primary"
            >
              <RadioGroupItem value={option} id={`gender-${option}`} className="sr-only" />
              {option === "any" ? "Any" : option.charAt(0).toUpperCase() + option.slice(1)}
            </Label>
          ))}
        </RadioGroup>
      </div>

      <Separator />

      <div className="space-y-2 px-4 py-3">
        <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          Occupation
        </Label>
        <div className="grid gap-2">
          {OCCUPATION_TYPES.map((occupation) => (
            <Label
              key={occupation.id}
              htmlFor={`occ-${occupation.id}`}
              className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium transition-all duration-150 hover:border-primary/40 ${
                draft.occupation.includes(occupation.id)
                  ? "border-primary bg-primary/8 text-primary"
                  : "border-border text-foreground"
              }`}
            >
              <Checkbox
                id={`occ-${occupation.id}`}
                checked={draft.occupation.includes(occupation.id)}
                onCheckedChange={() => toggleOccupation(occupation.id)}
                className="h-3.5 w-3.5 shrink-0"
              />
              {occupation.label}
            </Label>
          ))}
        </div>
      </div>

      <Separator />

      <div className="space-y-2 px-4 py-3">
        <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          Lifestyle
        </Label>
        <div className="grid grid-cols-2 gap-1.5">
          {LIFESTYLE_OPTIONS.map((option) => (
            <Label
              key={option.id}
              htmlFor={`ls-${option.id}`}
              className={`flex cursor-pointer items-center gap-2 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-all duration-150 hover:border-primary/40 ${
                draft.lifestyle[option.id as keyof typeof draft.lifestyle]
                  ? "border-primary bg-primary/8 text-primary"
                  : "border-border text-foreground"
              }`}
            >
              <Checkbox
                id={`ls-${option.id}`}
                checked={draft.lifestyle[option.id as keyof typeof draft.lifestyle]}
                onCheckedChange={() => toggleLifestyle(option.id as keyof RoommateFilters["lifestyle"])}
                className="h-3.5 w-3.5 shrink-0"
              />
              {option.label}
            </Label>
          ))}
        </div>
      </div>

      <Separator />

      <div className="space-y-2 px-4 py-3">
        <Label htmlFor="move-in-date" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          Move-in Date
        </Label>
        <input
          id="move-in-date"
          type="date"
          value={draft.moveInDate}
          onChange={(event) => update({ moveInDate: event.target.value })}
          className="flex h-8 w-full rounded-lg border bg-background px-3 py-1.5 text-sm outline-none"
        />
      </div>

      <Separator />

      <div className="flex items-center justify-between px-4 py-3">
        <Label htmlFor="verified-only" className="cursor-pointer text-xs font-medium">
          Verified Only
        </Label>
        <Switch
          id="verified-only"
          checked={draft.verifiedOnly}
          onCheckedChange={(checked) => update({ verifiedOnly: checked === true })}
        />
      </div>

      <Separator />

      <div className="space-y-2 px-4 py-3">
        <div className="flex items-center justify-between">
          <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Min Trust Score
          </Label>
          <span className="text-xs font-bold tabular-nums" style={{ color: "var(--trust)" }}>
            {draft.minTrustScore}/100
          </span>
        </div>
        <Slider
          value={[draft.minTrustScore]}
          min={0}
          max={100}
          step={10}
          onValueChange={(value) => {
            const arr = Array.isArray(value) ? value : [value];
            update({ minTrustScore: arr[0] });
          }}
          className="py-1"
        />
      </div>

      <Separator />

      <div className="space-y-2 px-4 py-3">
        <div className="flex items-center justify-between">
          <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Min Compatibility
          </Label>
          <span className="text-xs font-bold tabular-nums" style={{ color: "var(--ai)" }}>
            {draft.minCompatibility}%
          </span>
        </div>
        <Slider
          value={[draft.minCompatibility]}
          min={0}
          max={100}
          step={5}
          onValueChange={(value) => {
            const arr = Array.isArray(value) ? value : [value];
            update({ minCompatibility: arr[0] });
          }}
          className="py-1"
        />
      </div>

      <Separator />

      <div className="space-y-2 px-4 py-3">
        <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          Sort By
        </Label>
        <Select value={draft.sortBy} onValueChange={(value) => update({ sortBy: value ?? "newest" })}>
          <SelectTrigger className="h-8 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="border-t px-4 py-3">
        <Button variant="outline" className="w-full rounded-xl text-xs" onClick={onClear}>
          <X className="mr-1.5 h-3.5 w-3.5" />
          Clear All
        </Button>
      </div>
    </div>
  );
}

export function FiltersDrawer({ filters, onFiltersChange, onClearFilters }: FiltersDrawerProps) {
  const [draft, setDraft] = useState<RoommateFilters>(filters);

  useEffect(() => {
    setDraft(filters);
  }, [filters]);

  const handleChange = (next: RoommateFilters) => {
    setDraft(next);
    onFiltersChange(next);
  };

  const handleClear = () => {
    setDraft(DEFAULT_FILTERS);
    onClearFilters();
  };

  return (
    <>
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted">
            <SlidersHorizontal className="h-4 w-4" />
            Filters &amp; Sort
          </SheetTrigger>
          <SheetContent side="left" className="flex w-full flex-col p-0 sm:max-w-md">
            <SheetHeader className="shrink-0 border-b px-4 py-3">
              <SheetTitle className="flex items-center gap-2 text-sm">
                <Filter className="h-4 w-4" />
                Filters
              </SheetTitle>
            </SheetHeader>
            <ScrollArea className="flex-1">
              <FiltersForm draft={draft} onChange={handleChange} onClear={handleClear} />
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden lg:block">
        <div className="sticky top-20">
          <div className="flex h-[calc(100vh-88px)] flex-col overflow-hidden rounded-2xl border bg-card shadow-sm">
            <div className="flex items-center justify-between border-b bg-card px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10">
                  <SlidersHorizontal className="h-3 w-3 text-primary" />
                </div>
                <h3 className="text-sm font-semibold">Filters</h3>
              </div>
              <button
                onClick={handleClear}
                className="flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors duration-150 hover:text-destructive"
              >
                <X className="h-3 w-3" />
                Clear All
              </button>
            </div>
            <ScrollArea className="min-h-0 flex-1">
              <FiltersForm draft={draft} onChange={handleChange} onClear={handleClear} />
            </ScrollArea>
          </div>
        </div>
      </div>
    </>
  );
}

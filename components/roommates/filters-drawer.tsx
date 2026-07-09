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
import { NEPAL_CITIES, LISTING_TYPES, FURNISHING_TYPES, AMENITIES_LIST } from "@/lib/constants";

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

export interface ListingFilters {
  location: string;
  priceMin: number;
  priceMax: number;
  type: string;
  gender: string;
  furnishing: string;
  amenities: string[];
  verifiedOnly: boolean;
  minTrustScore: number;
  minMatchScore: number;
  sortBy: string;
}

export const DEFAULT_LISTING_FILTERS: ListingFilters = {
  location: "all",
  priceMin: 0,
  priceMax: 50000,
  type: "all",
  gender: "any",
  furnishing: "all",
  amenities: [],
  verifiedOnly: false,
  minTrustScore: 0,
  minMatchScore: 0,
  sortBy: "newest",
};

interface RoommateFiltersDrawerProps {
  variant?: "roommate";
  filters: RoommateFilters;
  onFiltersChange: (filters: RoommateFilters) => void;
  onClearFilters: () => void;
}

interface ListingFiltersDrawerProps {
  variant: "listing";
  filters: ListingFilters;
  onFiltersChange: (filters: ListingFilters) => void;
  onClearFilters: () => void;
}

type FiltersDrawerProps = RoommateFiltersDrawerProps | ListingFiltersDrawerProps;

// ─── Static options ───────────────────────────────────────────────────────────

const OCCUPATION_TYPES = [
  { id: "student",       label: "Student" },
  { id: "it",            label: "IT / Software" },
  { id: "professional",  label: "Working Professional" },
  { id: "remote",        label: "Remote Worker" },
  { id: "healthcare",    label: "Healthcare" },
  { id: "teacher",       label: "Teacher / Educator" },
  { id: "business",      label: "Business Owner" },
  { id: "freelancer",    label: "Freelancer" },
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

const LISTING_SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "lowestPrice", label: "Lowest Price" },
  { value: "highestRated", label: "Highest Rated" },
  { value: "highestTrust", label: "Highest Trust" },
  { value: "bestMatch", label: "Best Match" },
];

const LISTING_AMENITIES = AMENITIES_LIST.slice(0, 8);

const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "highestMatch", label: "Highest Match" },
  { value: "highestTrust", label: "Highest Trust" },
  { value: "lowestBudget", label: "Lowest Budget" },
  { value: "highestRated", label: "Highest Rated" },
];

// ─── Listing filter form ──────────────────────────────────────────────────────

interface ListingFiltersFormProps {
  draft: ListingFilters;
  onChange: (draft: ListingFilters) => void;
  onApply: () => void;
  onClear: () => void;
  immediate?: boolean;
}

function ListingFiltersForm({ draft, onChange, onApply, onClear, immediate = false }: ListingFiltersFormProps) {
  const update = (updates: Partial<ListingFilters>) => {
    const next = { ...draft, ...updates };
    onChange(next);
    if (immediate) onApply();
  };

  const toggleAmenity = (amenity: string) => {
    const updated = draft.amenities.includes(amenity)
      ? draft.amenities.filter((a) => a !== amenity)
      : [...draft.amenities, amenity];
    update({ amenities: updated });
  };

  return (
    <div className="flex flex-col gap-0">
      {/* ── Location ─────────────────────────────────────────────────── */}
      <div className="space-y-1.5 px-4 py-3">
        <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          Location
        </Label>
        <Select value={draft.location} onValueChange={(v) => update({ location: v })}>
          <SelectTrigger className="input-container h-8 text-sm">
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

      {/* ── Price Range ──────────────────────────────────────────────── */}
      <div className="space-y-2 px-4 py-3">
        <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          Price Range (NPR/month)
        </Label>
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-primary">{draft.priceMin.toLocaleString()}</span>
          <span className="text-muted-foreground">to</span>
          <span className="font-bold text-primary">{draft.priceMax.toLocaleString()}</span>
        </div>
        <Slider
          value={[draft.priceMin, draft.priceMax]}
          min={0}
          max={50000}
          step={1000}
          onValueChange={([min, max]) => update({ priceMin: min, priceMax: max })}
          className="py-1"
        />
      </div>

      <Separator />

      {/* ── Room Type ────────────────────────────────────────────────── */}
      <div className="space-y-1.5 px-4 py-3">
        <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          Room Type
        </Label>
        <Select value={draft.type} onValueChange={(v) => update({ type: v })}>
          <SelectTrigger className="input-container h-8 text-sm">
            <SelectValue placeholder="All types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {LISTING_TYPES.map((t) => (
              <SelectItem key={t.value} value={t.value}>
                {t.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* ── Gender ───────────────────────────────────────────────────── */}
      <div className="space-y-2 px-4 py-3">
        <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          Gender Preference
        </Label>
        <RadioGroup
          value={draft.gender}
          onValueChange={(v) => update({ gender: v })}
          className="grid grid-cols-3 gap-1.5"
        >
          {(["any", "male", "female"] as const).map((g) => (
            <Label
              key={g}
              htmlFor={`listing-gender-${g}`}
              className="flex cursor-pointer items-center justify-center rounded-lg border px-2 py-1.5 text-xs font-medium transition-all duration-150 hover:border-primary/50 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/8 has-[[data-state=checked]]:text-primary"
            >
              <RadioGroupItem value={g} id={`listing-gender-${g}`} className="sr-only" />
              {g === "any" ? "Any" : g.charAt(0).toUpperCase() + g.slice(1)}
            </Label>
          ))}
        </RadioGroup>
      </div>

      <Separator />

      {/* ── Furnishing ───────────────────────────────────────────────── */}
      <div className="space-y-1.5 px-4 py-3">
        <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          Furnishing
        </Label>
        <Select value={draft.furnishing} onValueChange={(v) => update({ furnishing: v })}>
          <SelectTrigger className="input-container h-8 text-sm">
            <SelectValue placeholder="Any furnishing" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any Furnishing</SelectItem>
            {FURNISHING_TYPES.map((f) => (
              <SelectItem key={f.value} value={f.value}>
                {f.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* ── Amenities ────────────────────────────────────────────────── */}
      <div className="space-y-2 px-4 py-3">
        <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          Amenities
        </Label>
        <div className="grid grid-cols-2 gap-1.5">
          {LISTING_AMENITIES.map((amenity) => (
            <Label
              key={amenity}
              htmlFor={`amenity-${amenity}`}
              className={`flex cursor-pointer items-center gap-2 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-all duration-150 hover:border-primary/40 ${
                draft.amenities.includes(amenity)
                  ? "border-primary bg-primary/8 text-primary"
                  : "border-border text-foreground"
              }`}
            >
              <Checkbox
                id={`amenity-${amenity}`}
                checked={draft.amenities.includes(amenity)}
                onCheckedChange={() => toggleAmenity(amenity)}
                className="h-3.5 w-3.5 shrink-0"
              />
              {amenity}
            </Label>
          ))}
        </div>
      </div>

      <Separator />

      {/* ── Verified Only ────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-4 py-3">
        <Label htmlFor="listing-verified-only" className="cursor-pointer text-xs font-medium">
          Verified Listings Only
        </Label>
        <Switch
          id="listing-verified-only"
          checked={draft.verifiedOnly}
          onCheckedChange={(checked) => update({ verifiedOnly: checked })}
        />
      </div>

      <Separator />

      {/* ── Min Trust Score ──────────────────────────────────────────── */}
      <div className="space-y-2 px-4 py-3">
        <div className="flex items-center justify-between">
          <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Min Landlord Trust
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
          onValueChange={([v]) => update({ minTrustScore: v })}
          className="py-1"
        />
      </div>

      <Separator />

      {/* ── Min Match Score ──────────────────────────────────────────── */}
      <div className="space-y-2 px-4 py-3">
        <div className="flex items-center justify-between">
          <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Min Match Score
          </Label>
          <span className="text-xs font-bold tabular-nums" style={{ color: "var(--ai)" }}>
            {draft.minMatchScore}%
          </span>
        </div>
        <Slider
          value={[draft.minMatchScore]}
          min={0}
          max={100}
          step={5}
          onValueChange={([v]) => update({ minMatchScore: v })}
          className="py-1"
        />
      </div>

      <Separator />

      {/* ── Sort By ──────────────────────────────────────────────────── */}
      <div className="space-y-1.5 px-4 py-3">
        <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          Sort By
        </Label>
        <Select value={draft.sortBy} onValueChange={(v) => update({ sortBy: v })}>
          <SelectTrigger className="input-container h-8 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {LISTING_SORT_OPTIONS.map((opt) => (
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
      <div className="space-y-1.5 px-4 py-3">
        <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          Location
        </Label>
        <Select value={draft.location} onValueChange={(v) => update({ location: v })}>
          <SelectTrigger className="input-container h-8 text-sm">
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
          onValueChange={([min, max]) => update({ budgetMin: min, budgetMax: max })}
          className="py-1"
        />
      </div>

      <Separator />

      {/* ── Gender ───────────────────────────────────────────────────── */}
      <div className="space-y-2 px-4 py-3">
        <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          Gender Preference
        </Label>
        <RadioGroup
          value={draft.gender}
          onValueChange={(v) => update({ gender: v })}
          className="grid grid-cols-3 gap-1.5"
        >
          {(["any", "male", "female"] as const).map((g) => (
            <Label
              key={g}
              htmlFor={`gender-${g}`}
              className="flex cursor-pointer items-center justify-center rounded-lg border px-2 py-1.5 text-xs font-medium transition-all duration-150 hover:border-primary/50 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/8 has-[[data-state=checked]]:text-primary"
            >
              <RadioGroupItem value={g} id={`gender-${g}`} className="sr-only" />
              {g === "any" ? "Any" : g.charAt(0).toUpperCase() + g.slice(1)}
            </Label>
          ))}
        </RadioGroup>
      </div>

      <Separator />

      {/* ── Occupation (multi-select checkboxes) ─────────────────────── */}
      <div className="space-y-2 px-4 py-3">
        <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          Occupation
        </Label>
        <div className="grid grid-cols-1 gap-1.5">
          {OCCUPATION_TYPES.map((occ) => (
            <Label
              key={occ.id}
              htmlFor={`occ-${occ.id}`}
              className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium transition-all duration-150 hover:border-primary/40 ${
                draft.occupation.includes(occ.id)
                  ? "border-primary bg-primary/8 text-primary"
                  : "border-border text-foreground"
              }`}
            >
              <Checkbox
                id={`occ-${occ.id}`}
                checked={draft.occupation.includes(occ.id)}
                onCheckedChange={() => toggleOccupation(occ.id)}
                className="h-3.5 w-3.5 shrink-0"
              />
              {occ.label}
            </Label>
          ))}
        </div>
      </div>

      <Separator />

      {/* ── Lifestyle (all 8 options) ─────────────────────────────────── */}
      <div className="space-y-2 px-4 py-3">
        <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          Lifestyle
        </Label>
        <div className="grid grid-cols-2 gap-1.5">
          {LIFESTYLE_OPTIONS.map((opt) => (
            <Label
              key={opt.id}
              htmlFor={`ls-${opt.id}`}
              className={`flex cursor-pointer items-center gap-2 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-all duration-150 hover:border-primary/40 ${
                draft.lifestyle[opt.id as keyof typeof draft.lifestyle]
                  ? "border-primary bg-primary/8 text-primary"
                  : "border-border text-foreground"
              }`}
            >
              <Checkbox
                id={`ls-${opt.id}`}
                checked={draft.lifestyle[opt.id as keyof typeof draft.lifestyle]}
                onCheckedChange={() =>
                  toggleLifestyle(opt.id as keyof RoommateFilters["lifestyle"])
                }
                className="h-3.5 w-3.5 shrink-0"
              />
              {opt.label}
            </Label>
          ))}
        </div>
      </div>

      <Separator />

      {/* ── Move-in Date ─────────────────────────────────────────────── */}
      <div className="space-y-1.5 px-4 py-3">
        <Label
          htmlFor="move-in-date"
          className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground"
        >
          Move-in Date
        </Label>
        <input
          id="move-in-date"
          type="date"
          value={draft.moveInDate}
          onChange={(e) => update({ moveInDate: e.target.value })}
          className="input-container flex h-8 w-full rounded-lg border bg-background px-3 py-1.5 text-xs outline-none"
        />
      </div>

      <Separator />

      {/* ── Verified Only ────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-4 py-3">
        <Label htmlFor="verified-only" className="cursor-pointer text-xs font-medium">
          Verified Users Only
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
          onValueChange={([v]) => update({ minTrustScore: v })}
          className="py-1"
        />
      </div>

      <Separator />

      {/* ── Min Compatibility ────────────────────────────────────────── */}
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
          onValueChange={([v]) => update({ minCompatibility: v })}
          className="py-1"
        />
      </div>

      <Separator />

      {/* ── Sort By ──────────────────────────────────────────────────── */}
      <div className="space-y-1.5 px-4 py-3">
        <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          Sort By
        </Label>
        <Select value={draft.sortBy} onValueChange={(v) => update({ sortBy: v })}>
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

export function FiltersDrawer(props: FiltersDrawerProps) {
  const variant = props.variant ?? "roommate";

  /**
   * Desktop: keep a local "draft" so the grid only re-renders on Apply,
   * not on every slider tick.
   */
  const [roommateDraft, setRoommateDraft] = useState<RoommateFilters>(
    variant === "roommate" ? props.filters : DEFAULT_FILTERS
  );
  const [listingDraft, setListingDraft] = useState<ListingFilters>(
    variant === "listing" ? props.filters : DEFAULT_LISTING_FILTERS
  );

  const handleApply = () => {
    if (variant === "listing") {
      props.onFiltersChange(listingDraft);
    } else {
      props.onFiltersChange(roommateDraft);
    }
  };

  const handleClear = () => {
    if (variant === "listing") {
      setListingDraft(DEFAULT_LISTING_FILTERS);
    } else {
      setRoommateDraft(DEFAULT_FILTERS);
    }
    props.onClearFilters();
  };

  const formContent =
    variant === "listing" ? (
      <ListingFiltersForm
        draft={listingDraft}
        onChange={(d) => {
          setListingDraft(d);
        }}
        onApply={handleApply}
        onClear={handleClear}
      />
    ) : (
      <FiltersForm
        draft={roommateDraft}
        onChange={setRoommateDraft}
        onApply={handleApply}
        onClear={handleClear}
      />
    );

  const mobileFormContent =
    variant === "listing" ? (
      <ListingFiltersForm
        draft={listingDraft}
        onChange={(d) => {
          setListingDraft(d);
          if (props.variant === "listing") props.onFiltersChange(d);
        }}
        onApply={() => props.variant === "listing" && props.onFiltersChange(listingDraft)}
        onClear={handleClear}
        immediate
      />
    ) : (
      <FiltersForm
        draft={roommateDraft}
        onChange={(d) => {
          setRoommateDraft(d);
          if (props.variant !== "listing") props.onFiltersChange(d);
        }}
        onApply={() => props.variant !== "listing" && props.onFiltersChange(roommateDraft)}
        onClear={handleClear}
        immediate
      />
    );

  return (
    <>
      {/* ── Mobile: bottom Sheet ─────────────────────────────────────── */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="btn-secondary-motion gap-2 w-full rounded-xl">
              <SlidersHorizontal className="h-4 w-4" />
              Filters &amp; Sort
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full sm:max-w-md p-0 flex flex-col">
            <SheetHeader className="px-5 py-4 border-b shrink-0">
              <SheetTitle className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filters &amp; Sort
              </SheetTitle>
            </SheetHeader>

            <ScrollArea className="flex-1">
              {mobileFormContent}
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
              <Button
                className="btn-primary-motion flex-1 rounded-xl text-sm font-semibold"
                onClick={handleApply}
              >
                <Filter className="h-3.5 w-3.5 mr-1.5" />
                Apply Filters
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* ── Desktop: sticky card sidebar ─────────────────────────────── */}
      <div className="hidden lg:block">
        <div className="sticky top-20">
          <div className="rounded-2xl border bg-card shadow-sm overflow-hidden flex flex-col h-[calc(100vh-88px)]">
            <div className="shrink-0 flex items-center justify-between px-4 py-3 border-b bg-card">
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10">
                  <SlidersHorizontal className="h-3 w-3 text-primary" />
                </div>
                <h3 className="font-bold text-sm">Filters &amp; Sort</h3>
              </div>
              <button
                onClick={handleClear}
                className="text-xs text-muted-foreground hover:text-destructive transition-colors duration-150 font-medium flex items-center gap-1"
              >
                <X className="h-3 w-3" />
                Clear All
              </button>
            </div>

            <ScrollArea className="flex-1 min-h-0">
              {formContent}
              <div className="h-2" />
            </ScrollArea>

            <div className="shrink-0 border-t bg-card px-4 py-3">
              <Button
                onClick={handleApply}
                className="btn-primary-motion w-full rounded-xl font-semibold gap-2 h-9"
              >
                <Filter className="h-3.5 w-3.5" />
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

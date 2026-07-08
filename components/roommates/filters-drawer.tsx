"use client";

import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
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

interface FiltersDrawerProps {
  filters: RoommateFilters;
  onFiltersChange: (filters: RoommateFilters) => void;
  onClearFilters: () => void;
}

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

function FiltersContent({ filters, onFiltersChange, onClearFilters }: FiltersDrawerProps) {
  const updateFilters = (updates: Partial<RoommateFilters>) => {
    onFiltersChange({ ...filters, ...updates });
  };

  const toggleOccupation = (occupation: string) => {
    const current = filters.occupation;
    const updated = current.includes(occupation)
      ? current.filter((o) => o !== occupation)
      : [...current, occupation];
    updateFilters({ occupation: updated });
  };

  const toggleLifestyle = (key: keyof RoommateFilters["lifestyle"]) => {
    updateFilters({
      lifestyle: {
        ...filters.lifestyle,
        [key]: !filters.lifestyle[key],
      },
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-lg">Filters</h3>
        <Button
          onClick={onClearFilters}
          variant="ghost"
          size="sm"
          className="h-8 px-3 text-xs"
        >
          Clear All
        </Button>
      </div>

      {/* Location */}
      <div className="space-y-2">
        <Label>Location</Label>
        <Select value={filters.location} onValueChange={(value) => updateFilters({ location: value })}>
          <SelectTrigger className="input-container">
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

      {/* Budget Range */}
      <div className="space-y-3">
        <Label>Budget Range (NPR/month)</Label>
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-primary">{filters.budgetMin.toLocaleString()}</span>
          <span className="text-muted-foreground">to</span>
          <span className="font-semibold text-primary">{filters.budgetMax.toLocaleString()}</span>
        </div>
        <Slider
          value={[filters.budgetMin, filters.budgetMax]}
          min={0}
          max={50000}
          step={1000}
          onValueChange={([min, max]) => updateFilters({ budgetMin: min, budgetMax: max })}
          className="py-2"
        />
      </div>

      <Separator />

      {/* Gender */}
      <div className="space-y-3">
        <Label>Gender Preference</Label>
        <RadioGroup value={filters.gender} onValueChange={(value) => updateFilters({ gender: value })}>
          {["any", "male", "female"].map((gender) => (
            <div key={gender} className="flex items-center space-x-2">
              <RadioGroupItem value={gender} id={`gender-${gender}`} />
              <Label htmlFor={`gender-${gender}`} className="font-normal cursor-pointer">
                {gender === "any" ? "Any" : gender.charAt(0).toUpperCase() + gender.slice(1)}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <Separator />

      {/* Occupation */}
      <div className="space-y-3">
        <Label>Occupation</Label>
        <div className="space-y-2">
          {OCCUPATION_TYPES.map((occ) => (
            <div key={occ.id} className="flex items-center space-x-2">
              <Checkbox
                id={`occ-${occ.id}`}
                checked={filters.occupation.includes(occ.id)}
                onCheckedChange={() => toggleOccupation(occ.id)}
              />
              <Label htmlFor={`occ-${occ.id}`} className="font-normal cursor-pointer">
                {occ.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Lifestyle */}
      <div className="space-y-3">
        <Label>Lifestyle</Label>
        <div className="space-y-2">
          {LIFESTYLE_OPTIONS.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              <Checkbox
                id={`lifestyle-${option.id}`}
                checked={filters.lifestyle[option.id as keyof typeof filters.lifestyle]}
                onCheckedChange={() => toggleLifestyle(option.id as keyof typeof filters.lifestyle)}
              />
              <Label htmlFor={`lifestyle-${option.id}`} className="font-normal cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Move-in Date */}
      <div className="space-y-2">
        <Label htmlFor="move-in-date">Move-in Date</Label>
        <input
          id="move-in-date"
          type="date"
          value={filters.moveInDate}
          onChange={(e) => updateFilters({ moveInDate: e.target.value })}
          className="input-container flex h-10 w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none"
        />
      </div>

      <Separator />

      {/* Verified Users Only */}
      <div className="flex items-center justify-between">
        <Label htmlFor="verified-only" className="cursor-pointer">
          Verified Users Only
        </Label>
        <Switch
          id="verified-only"
          checked={filters.verifiedOnly}
          onCheckedChange={(checked) => updateFilters({ verifiedOnly: checked })}
        />
      </div>

      <Separator />

      {/* Minimum Trust Score */}
      <div className="space-y-3">
        <Label>Minimum Trust Score</Label>
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-muted-foreground">Score:</span>
          <span className="font-semibold text-[color:var(--trust)]">{filters.minTrustScore}/100</span>
        </div>
        <Slider
          value={[filters.minTrustScore]}
          min={0}
          max={100}
          step={10}
          onValueChange={([value]) => updateFilters({ minTrustScore: value })}
        />
      </div>

      <Separator />

      {/* Minimum Compatibility Score */}
      <div className="space-y-3">
        <Label>Minimum Compatibility</Label>
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-muted-foreground">Score:</span>
          <span className="font-semibold text-[color:var(--ai)]">{filters.minCompatibility}%</span>
        </div>
        <Slider
          value={[filters.minCompatibility]}
          min={0}
          max={100}
          step={5}
          onValueChange={([value]) => updateFilters({ minCompatibility: value })}
        />
      </div>

      <Separator />

      {/* Sort By */}
      <div className="space-y-2">
        <Label>Sort By</Label>
        <Select value={filters.sortBy} onValueChange={(value) => updateFilters({ sortBy: value })}>
          <SelectTrigger className="input-container">
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
    </div>
  );
}

export function FiltersDrawer({ filters, onFiltersChange, onClearFilters }: FiltersDrawerProps) {
  return (
    <>
      {/* Mobile: Sheet Drawer */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="btn-secondary-motion gap-2 w-full">
              <SlidersHorizontal className="h-4 w-4" />
              Filters & Sort
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full sm:max-w-md">
            <SheetHeader className="mb-6">
              <SheetTitle>Filters & Sort</SheetTitle>
            </SheetHeader>
            <ScrollArea className="h-[calc(100vh-120px)]">
              <div className="pr-4">
                <FiltersContent
                  filters={filters}
                  onFiltersChange={onFiltersChange}
                  onClearFilters={onClearFilters}
                />
              </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop: Sticky Sidebar */}
      <div className="hidden lg:block">
        <div className="sticky top-20">
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <ScrollArea className="max-h-[calc(100vh-160px)]">
              <FiltersContent
                filters={filters}
                onFiltersChange={onFiltersChange}
                onClearFilters={onClearFilters}
              />
            </ScrollArea>
          </div>
        </div>
      </div>
    </>
  );
}
